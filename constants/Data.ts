export const customerData: CustomerData[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "(555) 123-4567",
    address: "123 Main St, Anytown, USA 12345",
    vehicles: [
      {
        id: 1,
        name: "Toyota Camry",
        make: "Toyota",
        model: "Camry",
        year: 2020,
      },
      {
        id: 2,
        name: "Honda Civic",
        make: "Honda",
        model: "Civic",
        year: 2018,
      },
    ],
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    phone: "(555) 123-4567",
    address: "123 Main St, Anytown, USA 12345",
    vehicles: [
      {
        id: 1,
        name: "Toyota Camry",
        make: "Toyota",
        model: "Camry",
        year: 2020,
      },
      {
        id: 2,
        name: "Honda Civic",
        make: "Honda",
        model: "Civic",
        year: 2018,
      },
    ],
  },
];

export const vehicleData: VehicleData[] = [
  {
    id: 1,
    name: "Toyota Camry",
    make: "Toyota",
    model: "Camry",
    problems: "Check Engine Light",
    year: 2019,
  },
  {
    id: 2,
    name: "Honda Civic",
    make: "Honda",
    model: "Civic",
    problems: "Brake Pads",
    year: 2020,
  },
  {
    id: 3,
    name: "Ford Focus",
    make: "Ford",
    model: "Focus",
    problems: "Transmission",
    year: 2018,
  },
];

export const appointments: AppointmentData[] = [
  {
    id: 1,
    name: "Alice Johnson",
    vehicle: "2019 Toyota Camry",
    service: "Oil Change",
    date: "2023-06-15",
    status: "Completed",
  },
  {
    id: 2,
    name: "Bob Smith",
    vehicle: "2020 Honda Accord",
    service: "Tire Rotation",
    date: "2023-07-20",
    status: "In Progress",
  },
  {
    id: 3,
    name: "Charlie Brown",
    vehicle: "2018 Ford Focus",
    service: "Brake Inspection",
    date: "2023-08-10",
    status: "Scheduled",
  },
  {
    id: 4,
    name: "Diana Prince",
    vehicle: "2021 Tesla Model 3",
    service: "Battery Check",
    date: "2023-09-05",
    status: "Completed",
  },
  {
    id: 5,
    name: "Ethan Hunt",
    vehicle: "2017 Chevrolet Malibu",
    service: "Transmission Repair",
    date: "2023-10-01",
    status: "In Progress",
  },
  {
    id: 6,
    name: "Fred Jones",
    vehicle: "2016 Toyota Camry",
    service: "Tire Rotation",
    date: "2023-11-05",
    status: "Cancelled",
  },
];

export const stockData: Stock[] = [
  {
    id: 1,
    name: "Engine Oil",
    quantity: 2,
    reorder: 10,
    price: 10,
  },
  {
    id: 2,
    name: "Brake Pads",
    quantity: 3,
    reorder: 12,
    price: 15,
  },
  {
    id: 3,
    name: "Spark Plugs",
    quantity: 5,
    reorder: 20,
    price: 8,
  },
  {
    id: 4,
    name: "Air Filter",
    quantity: 4,
    reorder: 15,
    price: 12,
  },
];
