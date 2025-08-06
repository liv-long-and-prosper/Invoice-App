CREATE TABLE invoices (
    id SERIAL PRIMARY KEY,
    client_id INTEGER REFERENCES clients(client_id),
    invoice_number VARCHAR(50) UNIQUE,
    amount DECIMAL(10,2),
    date DATE,
    created_at TIMESTAMP DEFAULT NOW()
);
