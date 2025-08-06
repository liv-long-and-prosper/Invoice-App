-- Add calculated columns to invoices table
ALTER TABLE invoices ADD COLUMN subtotal DECIMAL(10,2) DEFAULT 0;
ALTER TABLE invoices ADD COLUMN total_amount DECIMAL(10,2) DEFAULT 0;

-- Function to recalculate invoice totals
CREATE OR REPLACE FUNCTION update_invoice_totals()
RETURNS TRIGGER AS $$
DECLARE
    target_invoice_id INTEGER;
    calculated_subtotal DECIMAL(10,2);
BEGIN
    -- Determine which invoice to update
    IF TG_OP = 'DELETE' THEN
        target_invoice_id := OLD.invoice_id;
    ELSE
        target_invoice_id := NEW.invoice_id;
    END IF;

    -- Calculate subtotal from all line items
    -- Add positive amounts for non-discount items, subtract for discount items
    SELECT COALESCE(
        SUM(
            CASE
                WHEN item_type = 'discount' THEN -ABS(item_price)  -- Always subtract discounts (make negative)
                ELSE item_price  -- Add regular items as-is
            END
        ), 0)
    INTO calculated_subtotal
    FROM invoice_items
    WHERE invoice_id = target_invoice_id;

    -- Update the invoice (subtotal = total, no tax calculation)
    UPDATE invoices
    SET
        subtotal = calculated_subtotal,
        total_amount = calculated_subtotal
    WHERE id = target_invoice_id;

    -- Return appropriate record
    IF TG_OP = 'DELETE' THEN
        RETURN OLD;
    ELSE
        RETURN NEW;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for all operations on invoice_items
CREATE TRIGGER update_invoice_totals_on_insert
    AFTER INSERT ON invoice_items
    FOR EACH ROW
    EXECUTE FUNCTION update_invoice_totals();

CREATE TRIGGER update_invoice_totals_on_update
    AFTER UPDATE ON invoice_items
    FOR EACH ROW
    EXECUTE FUNCTION update_invoice_totals();

CREATE TRIGGER update_invoice_totals_on_delete
    AFTER DELETE ON invoice_items
    FOR EACH ROW
    EXECUTE FUNCTION update_invoice_totals();