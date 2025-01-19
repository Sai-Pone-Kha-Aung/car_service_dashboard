export const customerData: CustomerData[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "(555) 123-4567",
    address: "123 Main St, Anytown, USA 12345",
    password: "password",
    avatar: "/pic.png",
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
    orders: [
      {
        id: 1,
        product: "Engine Oil",
        quantity: 6,
        price: 10,
        total: 60,
        date: "2023-06-15",
        status: "Completed",
      },
      {
        id: 2,
        product: "Brake Pads",
        quantity: 3,
        price: 15,
        total: 45,
        date: "2023-06-15",
        status: "On The Way",
      },
    ],
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    phone: "(555) 123-4567",
    address: "123 Main St, Anytown, USA 12345",
    avatar: "/placeholder.jpg",
    password: "password",
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
    orders: [
      {
        id: 1,
        product: "Engine Oil",
        quantity: 6,
        price: 10,
        total: 60,
        date: "2023-06-15",
        status: "Cancelled",
      },
      {
        id: 2,
        product: "Brake Pads",
        quantity: 3,
        price: 15,
        total: 45,
        date: "2023-06-15",
        status: "Completed",
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
    image: "/placeholder.jpg",
  },
  {
    id: 2,
    name: "Brake Pads",
    quantity: 3,
    reorder: 12,
    price: 15,
    serviceId: 3,
    image: "/pic.png",
  },
  {
    id: 3,
    name: "Spark Plugs",
    quantity: 6,
    reorder: 20,
    price: 8,
    serviceId: 6,
    image: "/placeholder.jpg",
  },
  {
    id: 4,
    name: "Air Filter",
    quantity: 4,
    reorder: 15,
    price: 12,
    serviceId: 7,
    image: "/placeholder.jpg",
  },
  {
    id: 5,
    name: "Windshield Wiper Blades",
    quantity: 6,
    reorder: 25,
    price: 18,
    serviceId: 8,
    image: "/placeholder.jpg",
  },
  {
    id: 6,
    name: "Battery",
    quantity: 2,
    reorder: 10,
    price: 25,
    serviceId: 9,
    image: "/placeholder.jpg",
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
  {
    id: 6,
    value: "On The Way",
    label: "On The Way",
  },
];

export const staffData: StaffData[] = [
  {
    id: 1,
    name: "John Doe",
    role: "Manager",
    email: "john.doe@example.com",
    avatar: "/placeholder.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Technician",
    email: "jane.smith@example.com",
    avatar: "/placeholder.jpg",
  },
  {
    id: 3,
    name: "Emily Johnson",
    role: "Receptionist",
    email: "emily.johnson@example.com",
    avatar: "/placeholder.jpg",
  },
  {
    id: 4,
    name: "Michael Brown",
    role: "Technician",
    email: "michael.brown@example.com",
    avatar: "/placeholder.jpg",
  },
  {
    id: 5,
    name: "Sarah Davis",
    role: "Accountant",
    email: "sarah.davis@example.com",
    avatar: "/placeholder.jpg",
  },
];

export const blogData: BlogData[] = [
  {
    id: 1,
    title: "The Complete Guid to Electric Vehicle Maintenace",
    tags: "Maintenance",
    category: "Electric Vehicles",
    content:
      "Electric vehicles (EVs) are becoming increasingly popular due to their environmental benefits and lower operating costs. However, many new EV owners are unsure about the maintenance requirements of their vehicles. This guide will walk you through everything you need to know about keeping your electric vehicle in top condition.",
    createdAt: "2023-06-15",
  },
  {
    id: 2,
    title: "How to Choose the Right Tires for Your Vehicle",
    tags: "Tires",
    category: "Car Maintenance",
    content:
      "Choosing the right tires for your vehicle is essential for safety and performance. With so many options available, it can be overwhelming to find the best tires for your needs. This guide will help you understand the different types of tires and how to choose the right ones for your vehicle.",
    createdAt: "2023-07-20",
  },
];
