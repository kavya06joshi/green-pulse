

# Municipal Circular Waste Exchange Portal

## Design & Theme
- Government-tech style with a **green + blue** color palette
- Clean, professional SaaS dashboard layout using sidebar navigation
- Responsive design for desktop and tablet

## Pages & Features

### 1. Landing Page
- Hero section explaining the circular waste exchange model
- Visual flow: **Citizen Segregation → Municipal Collection → Industrial Purchase**
- Mock statistics section (total waste processed, active industries, revenue generated)
- Two prominent login buttons: **Admin Login** and **Industry Login**

### 2. Admin Login & Dashboard
- Separate login page with demo credentials (pre-filled for easy access)
- **Sidebar navigation** with: Inventory, Orders, Revenue, Analytics

#### Admin Features:
- **Inventory Management**: Add, edit, delete waste listings (type, quantity, quality grade, price, location, expiry date)
- **Order Management**: View all industry orders, approve or mark as completed
- **Stock Status**: Visual indicators (Available / Reserved / Sold)
- **Revenue Dashboard**: Monthly totals, waste-type breakdown with charts (mock data via Recharts)
- **Analytics Cards**: Summary stats at the top of dashboard

### 3. Industry Login & Dashboard
- Separate login page with demo credentials
- **Sidebar navigation** with: Browse Inventory, My Orders

#### Industry Features:
- **Waste Inventory Browser**: Data table showing waste type, quantity, price, location, and availability date
- **Filters**: By waste type, price range, and location
- **Place Order** button on each listing
- **Order History**: Table with status (Reserved / Completed / Cancelled), pickup deadline, and download pickup slip button

### 4. Order Logic (Simulated)
- Placing an order sets status to **"Reserved"** and generates a 3-day pickup deadline
- Auto-cancellation simulation: orders past deadline show as "Cancelled" and stock returns to available
- Simulated refund notification on cancelled orders

### 5. Data & State
- All data stored in React state with mock seed data
- localStorage used to persist session (which role is logged in)
- Mock waste trends graph on both dashboards using Recharts

### 6. Waste Types Supported
- Plastic, Paper, Metal, E-waste, Glass

