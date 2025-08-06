CREATE TABLE invoice_items (
    id SERIAL PRIMARY KEY,
    invoice_id INTEGER REFERENCES invoices(id) ON DELETE CASCADE,
    item_type VARCHAR(50), -- 'labor', 'discount', 'material', etc.
    description TEXT,
    item_price DECIMAL(10,2)
);