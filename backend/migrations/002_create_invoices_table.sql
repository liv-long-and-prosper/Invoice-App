CREATE TABLE invoices (
    id SERIAL PRIMARY KEY,
    client_id INTEGER REFERENCES clients(id),
    job_description TEXT,
    payment_terms TEXT DEFAULT 'Due on receipt',
    invoice_date DATE DEFAULT CURRENT_DATE
);

