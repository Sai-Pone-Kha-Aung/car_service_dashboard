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
        name: "Toyota Land Cruiser",
        make: "Toyota",
        model: "Land Cruiser",
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
    date: "2024-11-01",
    status: "In Progress",
  },
  {
    id: 6,
    name: "Fred Jones",
    vehicle: "2016 Toyota Camry",
    service: "Tire Rotation",
    date: "2024-10-05",
    status: "Cancelled",
  },
  {
    id: 7,
    name: "Grace Lee",
    vehicle: "2015 Honda Civic",
    service: "Brake Inspection",
    date: "2024-11-10",
    status: "Scheduled",
  },
];

export const stockData: Stock[] = [
  {
    id: 1,
    name: "Engine Oil",
    quantity: 6,
    reorder: 10,
    price: 10,
    serviceId: 1,
  },
  {
    id: 2,
    name: "Brake Pads",
    quantity: 3,
    reorder: 12,
    price: 15,
    serviceId: 3,
  },
  {
    id: 3,
    name: "Spark Plugs",
    quantity: 6,
    reorder: 20,
    price: 8,
    serviceId: 6,
  },
  {
    id: 4,
    name: "Air Filter",
    quantity: 4,
    reorder: 15,
    price: 12,
    serviceId: 7,
  },
  {
    id: 5,
    name: "Windshield Wiper Blades",
    quantity: 6,
    reorder: 25,
    price: 18,
    serviceId: 8,
  },
  {
    id: 6,
    name: "Battery",
    quantity: 2,
    reorder: 10,
    price: 25,
    serviceId: 9,
  },
];

export const servicesData: ServiceData[] = [
  {
    id: 1,
    name: "Oil Change",
    price: 50,
  },
  {
    id: 2,
    name: "Tire Rotation",
    price: 30,
  },
  {
    id: 3,
    name: "Brake Inspection",
    price: 40,
  },
  {
    id: 4,
    name: "Battery Check",
    price: 20,
  },
  {
    id: 5,
    name: "Transmission Repair",
    price: 100,
  },
  {
    id: 6,
    name: "Tune-Up",
    price: 60,
  },
  {
    id: 7,
    name: "Air Filter Change",
    price: 25,
  },
  {
    id: 8,
    name: "Windshield Wiper Replacement",
    price: 30,
  },
  {
    id: 9,
    name: "Battery Replacement",
    price: 70,
  },
];
