export const customerData: CustomerData[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "(555) 123-4567",
    address: "123 Main St, Anytown, USA 12345",
    cars: [
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
    cars: [
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

export const carData: CarData[] = [
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
    car: "2019 Toyota Camry",
    service: "Oil Change",
    date: "2023-06-15",
    status: "Completed",
  },
  {
    id: 2,
    name: "Bob Smith",
    car: "2020 Honda Accord",
    service: "Tire Rotation",
    date: "2023-07-20",
    status: "In Service",
  },
  {
    id: 3,
    name: "Charlie Brown",
    car: "2018 Ford Focus",
    service: "Brake Inspection",
    date: "2023-08-10",
    status: "Scheduled",
  },
  {
    id: 4,
    name: "Diana Prince",
    car: "2021 Tesla Model 3",
    service: "Battery Check",
    date: "2023-09-05",
    status: "Completed",
  },
  {
    id: 5,
    name: "Ethan Hunt",
    car: "2017 Chevrolet Malibu",
    service: "Transmission Repair",
    date: "2024-11-01",
    status: "In Service",
  },
  {
    id: 6,
    name: "Fred Jones",
    car: "2016 Toyota Camry",
    service: "Tire Rotation",
    date: "2024-10-05",
    status: "Cancelled",
  },
  {
    id: 7,
    name: "Grace Lee",
    car: "2015 Honda Civic",
    service: "Brake Inspection",
    date: "2024-11-10",
    status: "Scheduled",
  },
  {
    id: 8,
    name: "Henry Walker",
    car: "2020 Ford Mustang",
    service: "Oil Change",
    date: new Date().toISOString().split("T")[0], // Today's date
    status: "Walk-In",
  },
  {
    id: 9,
    name: "Isabella Green",
    car: "2019 Chevrolet Impala",
    service: "General Inspection",
    date: new Date().toISOString().split("T")[0], // Today's date
    status: "Walk-In",
  },
  {
    id: 10,
    name: "Jack White",
    car: "2018 Nissan Altima",
    service: "Battery Replacement",
    date: new Date().toISOString().split("T")[0], // Today's date
    status: "Walk-In",
  },
  {
    id: 11,
    name: "Karen Davis",
    car: "2017 Hyundai Sonata",
    service: "Tire Rotation",
    date: new Date().toISOString().split("T")[0], // Today's date
    status: "Walk-In",
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

export const statusOptions: StatusOption[] = [
  {
    id: 1,
    value: "Completed",
    label: "Completed",
  },
  {
    id: 2,
    value: "In Service",
    label: "In Service",
  },
  {
    id: 3,
    value: "Cancelled",
    label: "Cancelled",
  },
  {
    id: 4,
    value: "Scheduled",
    label: "Scheduled",
  },
  {
    id: 5,
    value: "Walk-In",
    label: "Walk-In",
  },
];

export const staffData: StaffData[] = [
  {
    id: 1,
    name: "John Doe",
    role: "Manager",
    email: "john.doe@example.com",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Technician",
    email: "jane.smith@example.com",
  },
  {
    id: 3,
    name: "Emily Johnson",
    role: "Receptionist",
    email: "emily.johnson@example.com",
  },
  {
    id: 4,
    name: "Michael Brown",
    role: "Technician",
    email: "michael.brown@example.com",
  },
  {
    id: 5,
    name: "Sarah Davis",
    role: "Accountant",
    email: "sarah.davis@example.com",
  },
];
