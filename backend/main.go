package main

import (
	// Go imports
	"context"
	"invoice-app-backend/internal/handlers"
	"invoice-app-backend/internal/services"
	"log"
	"net/http"
	"os"

	// External imports
	"github.com/gorilla/mux"
	"github.com/jackc/pgx/v5"
	"github.com/joho/godotenv"

	// Internal imports
	"invoice-app-backend/internal/database"
)

func main() {
	// Load environment variables
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// Connect to database
	connStr := os.Getenv("DATABASE_URL")
	conn, err := pgx.Connect(context.Background(), connStr)
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}
	defer conn.Close(context.Background())

	// Test database connection
	var greeting string
	err = conn.QueryRow(context.Background(), "SELECT 'Database connected!'").Scan(&greeting)
	if err != nil {
		log.Fatal("Database query failed:", err)
	}
	log.Println(greeting)

	// Run migrations
	err = database.RunMigrations(conn)
	if err != nil {
		log.Fatal("Migration failed:", err)
	}

	// Create service instances
	clientService := &services.ClientService{DB: conn}

	// Create handler instances with services injected
	clientHandler := &handlers.ClientHandler{
		DB:      conn,
		Service: clientService,
	}

	invoiceHandler := &handlers.InvoiceHandler{DB: conn}
	invoiceItemHandler := &handlers.InvoiceItemHandler{DB: conn}

	// Set up routes
	r := mux.NewRouter()
	r.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("Server is running!"))
	}).Methods("GET")

	r.HandleFunc("/invoices", invoiceHandler.GetInvoices).Methods("GET")
	r.HandleFunc("/invoices/{id}/mark-paid", invoiceHandler.MarkInvoiceAsPaid).Methods("PUT") // Add this

	r.HandleFunc("/invoices/{id}/items", invoiceItemHandler.CreateInvoiceItem).Methods("POST")
	r.HandleFunc("/invoices/{id}/items/{itemId}", invoiceItemHandler.UpdateInvoiceItem).Methods("PUT")
	r.HandleFunc("/invoices/{id}/items/{itemId}", invoiceItemHandler.DeleteInvoiceItem).Methods("DELETE")

	r.HandleFunc("/clients", clientHandler.GetClients).Methods("GET")
	r.HandleFunc("/clients", clientHandler.CreateClient).Methods("POST")
	r.HandleFunc("/clients/{id}", clientHandler.DeleteClient).Methods("DELETE")

	log.Println("Registered routes:")
	r.Walk(func(route *mux.Route, router *mux.Router, ancestors []*mux.Route) error {
		template, _ := route.GetPathTemplate()
		methods, _ := route.GetMethods()
		log.Printf("Route: %s Methods: %v", template, methods)
		return nil
	})

	// Start server
	log.Println("Server starting on :8080")
	log.Fatal(http.ListenAndServe(":8080", r))

}
