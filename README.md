# Car Service Dashboard

A full-stack car service management system built with Next.js, React, and PostgreSQL.

## About

Car Service Dashboard is a comprehensive management system for automotive service centers. It streamlines the process of customer management, appointment scheduling, inventory tracking, and service management, providing an all-in-one solution for automotive businesses.

## Key Features

- **Customer Management**: Track customer information, vehicle history, and service records
- **Appointment Scheduling**: Easy-to-use calendar interface for booking and managing appointments
- **Inventory Management**: Keep track of parts inventory and order history
- **Service Management**: Define and manage different service types and pricing
- **Vehicle Database**: Maintain detailed records of customer vehicles
- **Dashboard Analytics**: Visual representation of business performance metrics
- **User Authentication**: Secure login system with role-based access control
- **Admin Panel**: Comprehensive administrative controls
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Tech Stack

- **Frontend**: React 19, Next.js 15, TypeScript
- **Styling**: Tailwind CSS, Shadcn UI
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL
- **Authentication**: Built-in auth system
- **Date Handling**: date-fns
- **Icons**: Lucide React

## Setup

### Prerequisites

- Node.js 18.x or later
- PostgreSQL server
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd car_service_dashboard
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a .env file in the root directory with the following variables:

   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/car_service_db
   NEXTAUTH_SECRET=your-secret-key
   NEXTAUTH_URL=http://localhost:3000
   ```

4. Set up the database:

   ```bash
   # Import the SQL schema
   psql -U username -d your_database -f finalproj_sec[543]_group[8].sql
   ```

5. Run the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

- app: Next.js app router pages and layouts
- components: Reusable React components
- constants: Application constants and data
- context: React context providers
- database: Database connection and queries
- hooks: Custom React hooks
- lib: Utility functions and libraries
- public: Static assets
- utils: Helper functions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

Similar code found with 2 license types
