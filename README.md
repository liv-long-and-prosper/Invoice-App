# Moss Manager
A mobile customer and invoice management app built for local roof cleaning businesses.

## Features
* **Customer Management**
   * Add new customers with contact information and addresses
   * View customer list with clickable phone numbers
   * Delete customers with swipe-to-delete functionality
* **Invoice Management**
   * View all invoices with client details and amounts
   * Mark invoices as paid with automatic date tracking
   * Visual paid/unpaid status indicators
* **Real-time Data**
   * Cloud database ensures data is always up-to-date
   * Cross-device synchronization

### Roadmap
* Customer and invoice search functionality
* Customer profiles with service history and notes
* Invoice PDF generation and export
* Automatic phone dialer integration
* Jobs management with calendar view
* Business analytics dashboard
* Expense tracking and tax calculations

## Tech Stack
* **Frontend:** React Native with Expo
* **Backend:** Go with Gorilla Mux
* **Database:** PostgreSQL (hosted on Neon)
* **Navigation:** Expo Router with tab-based navigation

## Setup

### Prerequisites
* Node.js and npm
* Go 1.21+
* Neon database account (or local PostgreSQL)

### Backend Setup
1. Create a Neon database at [neon.tech](https://neon.tech)
2. Copy `.env.example` to `.env` and add your database credentials
3. Install Go dependencies: `go mod download`
4. Run migrations: `go run main.go` (runs automatically)
5. Start the server: `go run main.go`

### Frontend Setup
1. Navigate to the app directory: `cd app/jl-moss-away`
2. Install dependencies: `npm install`
3. Start the development server: `npx expo start`
4. Scan QR code with Expo Go app or run in simulator

## Screenshots
<img width="386" height="797" alt="Screenshot 2025-08-09 at 10 25 53 PM" src="https://github.com/user-attachments/assets/b1276f7c-a5e7-45b9-a529-45718883c325" />
<img width="386" height="797" alt="Screenshot 2025-08-09 at 10 26 00 PM" src="https://github.com/user-attachments/assets/bf5ae96d-98c3-46af-8639-573769aba694" />
<img width="386" height="797" alt="Screenshot 2025-08-09 at 10 26 04 PM" src="https://github.com/user-attachments/assets/fe0f479f-0d58-4d64-bced-a06c53fb711f" />
<img width="386" height="797" alt="Screenshot 2025-08-09 at 10 26 09 PM" src="https://github.com/user-attachments/assets/a19af7a0-aa2e-44bf-9f0c-ff53abd99681" />

