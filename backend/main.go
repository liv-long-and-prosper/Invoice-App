package main

import (
	// Go imports
	"context"
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

	// Set up routes
	r := mux.NewRouter()
	r.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("Server is running!"))
	}).Methods("GET")

	// Start server
	log.Println("Server starting on :8080")
	log.Fatal(http.ListenAndServe(":8080", r))
}
