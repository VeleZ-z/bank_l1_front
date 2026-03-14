# Banking Simulation Frontend

Simple frontend built with React + TypeScript + Vite for university banking simulation task(Designed for a JAVA+Springboot Backend).

## Requirements

- Node.js 18+

## Setup

1. Install dependencies:
	`npm install`
2. Start development server:
	`npm run dev`
3. Open the URL shown by Vite (usually `http://localhost:5173`).

## Build

- Production build: `npm run build`
- Preview build: `npm run preview`

## Architecture

The code is organized to be easy to explain:

- `src/components`: reusable UI pieces (`Navbar`, tables, and transfer form)
- `src/pages`: screen-level logic (`CustomersPage`, `TransferPage`, `DashboardPage`)
- `src/services`: API communication (`api.ts`, `customerService.ts`, `transactionService.ts`)
- `src/types`: TypeScript models (`Customer`, `Transaction`)

Main decisions:

- Use React Router for clear navigation between views.
- Keep state local with hooks (`useState`, `useEffect`) for simplicity.
- Use a small reusable API helper around Fetch API.
- Handle loading, error, and empty states in each data-driven view.

## Views

1. Customers view
- Fetches `GET /api/customers`
- Displays customers in a responsive table
- Includes action to open dashboard with selected account

2. Transfer view
- Sends `POST /api/transactions`
- Shows success and error feedback

3. Transactions dashboard
- Searches by account number
- Fetches `GET /api/transactions/{accountNumber}`
- Displays formatted transaction history in a table
