export const customerData: CustomerData[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "(555) 123-4567",
    address: "123 Main St, Anytown, USA 12345",
    password: "password",
    avatar: "/pic.png",
    createdAt: "2023-06-15",
    updatedAt: "2023-06-15",
    cars: [
      {
        id: 1,
        user_id: 1,
        make: "Toyota",
        model: "Camry",
        year: 2020,
      },
      {
        id: 2,
        user_id: 1,
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
    appointments: [
      {
        id: 1,
        name: "Alice Johnson",
        car: "2019 Toyota Camry",
        date: "2023-06-15",
        service: [
          {
            id: 1,
            name: "Oil Change",
            price: 50,
          },
        ],
        status: "Completed",
        mechanics: [
          {
            id: 1,
            name: "John Doe",
            role: "Manager",
            email: "johndoe@gmail.com",
            avatar: "/placeholder.jpg",
          },
        ],
      },
      {
        id: 2,
        name: "Alice Johnson",
        car: "2019 Toyota Camry",
        service: [
          {
            id: 1,
            name: "Oil Change",
            price: 50,
          },
        ],
        date: "2023-06-19",
        status: "Completed",
        mechanics: [
          {
            id: 1,
            name: "John Doe",
            role: "Manager",
            email: "johndoe@gmail.com",
            avatar: "/placeholder.jpg",
          },
        ],
      },
    ],
    cart: [
      {
        id: 1,
        name: "Engine Oil",
        price: 10,
        quantity: 2,
        product_id: 1,
      },
      {
        id: 2,
        name: "Brake Pads",
        price: 15,
        quantity: 1,
        product_id: 2,
      },
    ],
    payments: [
      {
        paymentID: 1,
        orderID: 1,
        amount: 60,
        paymentDate: "2023-06-15",
        paymentStatus: "Paid",
      },
      {
        paymentID: 2,
        orderID: 2,
        amount: 45,
        paymentDate: "2023-06-15",
        paymentStatus: "Paid",
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
    createdAt: "2023-06-15",
    updatedAt: "2023-06-15",
    cars: [
      {
        id: 3,
        user_id: 2,
        make: "Toyota",
        model: "Land Cruiser",
        year: 2020,
      },
      {
        id: 4,
        user_id: 2,
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
    appointments: [],
    cart: [],
    payments: [],
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
    service: [
      {
        id: 1,
        name: "Oil Change",
        price: 50,
      },
    ],
    date: "2023-06-15",
    status: "Completed",
    mechanics: [
      {
        id: 1,
        name: "Jane Smith",
        role: "Technician",
        email: "jane.smith@example.com",
        avatar: "/placeholder.jpg",
      },
    ],
  },
  {
    id: 2,
    name: "Bob Smith",
    car: "2020 Honda Accord",
    service: [
      {
        id: 2,
        name: "Tire Rotation",
        price: 30,
      },
    ],
    date: "2023-07-20",
    status: "In Service",
    mechanics: [
      {
        id: 2,
        name: "Michael Brown",
        role: "Technician",
        email: "michael.brown@example.com",
        avatar: "/placeholder.jpg",
      },
    ],
  },
  {
    id: 3,
    name: "Charlie Brown",
    car: "2018 Ford Focus",
    service: [
      {
        id: 3,
        name: "Brake Inspection",
        price: 40,
      },
    ],
    date: "2023-08-10",
    status: "Scheduled",
    mechanics: [
      {
        id: 3,
        name: "Emily Johnson",
        role: "Receptionist",
        email: "emily.johnson@example.com",
        avatar: "/placeholder.jpg",
      },
    ],
  },
  {
    id: 4,
    name: "Diana Prince",
    car: "2021 Tesla Model 3",
    service: [
      {
        id: 4,
        name: "Battery Check",
        price: 20,
      },
    ],
    date: "2023-09-05",
    status: "Completed",
    mechanics: [
      {
        id: 4,
        name: "Sarah Davis",
        role: "Accountant",
        email: "sarah.davis@example.com",
        avatar: "/placeholder.jpg",
      },
    ],
  },
  {
    id: 5,
    name: "Ethan Hunt",
    car: "2017 Chevrolet Malibu",
    service: [
      {
        id: 5,
        name: "Transmission Repair",
        price: 100,
      },
    ],
    date: "2024-11-01",
    status: "In Service",
    mechanics: [
      {
        id: 5,
        name: "John Doe",
        role: "Manager",
        email: "john.doe@example.com",
        avatar: "/placeholder.jpg",
      },
    ],
  },
  {
    id: 6,
    name: "Fred Jones",
    car: "2016 Toyota Camry",
    service: [
      {
        id: 2,
        name: "Tire Rotation",
        price: 30,
      },
    ],
    date: "2024-10-05",
    status: "Cancelled",
    mechanics: [
      {
        id: 1,
        name: "Jane Smith",
        role: "Technician",
        email: "jane.smith@example.com",
        avatar: "/placeholder.jpg",
      },
    ],
  },
  {
    id: 7,
    name: "Grace Lee",
    car: "2015 Honda Civic",
    service: [
      {
        id: 3,
        name: "Brake Inspection",
        price: 40,
      },
    ],
    date: "2024-11-10",
    status: "Scheduled",
    mechanics: [
      {
        id: 2,
        name: "Michael Brown",
        role: "Technician",
        email: "michael.brown@example.com",
        avatar: "/placeholder.jpg",
      },
    ],
  },
  {
    id: 8,
    name: "Henry Walker",
    car: "2020 Ford Mustang",
    service: [
      {
        id: 1,
        name: "Oil Change",
        price: 50,
      },
    ],
    date: new Date().toISOString().split("T")[0],
    status: "Walk-In",
    mechanics: [
      {
        id: 3,
        name: "Emily Johnson",
        role: "Receptionist",
        email: "emily.johnson@example.com",
        avatar: "/placeholder.jpg",
      },
    ],
  },
  {
    id: 9,
    name: "Isabella Green",
    car: "2019 Chevrolet Impala",
    service: [
      {
        id: 10,
        name: "General Inspection",
        price: 0,
      },
    ],
    date: new Date().toISOString().split("T")[0],
    status: "Walk-In",
    mechanics: [
      {
        id: 4,
        name: "Sarah Davis",
        role: "Accountant",
        email: "sarah.davis@example.com",
        avatar: "/placeholder.jpg",
      },
    ],
  },
  {
    id: 10,
    name: "Jack White",
    car: "2018 Nissan Altima",
    service: [
      {
        id: 9,
        name: "Battery Replacement",
        price: 70,
      },
    ],
    date: new Date().toISOString().split("T")[0],
    status: "Walk-In",
    mechanics: [
      {
        id: 5,
        name: "John Doe",
        role: "Manager",
        email: "john.doe@example.com",
        avatar: "/placeholder.jpg",
      },
    ],
  },
  {
    id: 11,
    name: "Karen Davis",
    car: "2017 Hyundai Sonata",
    service: [
      {
        id: 2,
        name: "Tire Rotation",
        price: 30,
      },
    ],
    date: new Date().toISOString().split("T")[0],
    status: "Walk-In",
    mechanics: [
      {
        id: 1,
        name: "Jane Smith",
        role: "Technician",
        email: "jane.smith@example.com",
        avatar: "/placeholder.jpg",
      },
    ],
  },
];

export const product: Product[] = [
  {
    id: 1,
    name: "Engine Oil",
    quantity: 6,
    reorder: 10,
    category: "Oil",
    price: 10,
    serviceId: 1,
    image: "/placeholder.jpg",
    desc: "High-quality engine oil for optimal vehicle performance.",
  },
  {
    id: 2,
    name: "Brake Pads",
    quantity: 3,
    reorder: 12,
    category: "Brakes",
    price: 15,
    serviceId: 3,
    image: "/pic.png",
    desc: "Durable brake pads for safe and reliable braking.",
  },
  {
    id: 3,
    name: "Spark Plugs",
    quantity: 6,
    reorder: 20,
    category: "Ignition",
    price: 8,
    serviceId: 6,
    image: "/placeholder.jpg",
    desc: "Premium spark plugs for improved engine performance.",
  },
  {
    id: 4,
    name: "Air Filter",
    quantity: 4,
    reorder: 15,
    category: "Filters",
    price: 12,
    serviceId: 7,
    image: "/placeholder.jpg",
    desc: "High-quality air filter for improved fuel efficiency.",
  },
  {
    id: 5,
    name: "Windshield Wiper Blades",
    quantity: 6,
    reorder: 25,
    category: "Accessories",
    price: 18,
    serviceId: 8,
    image: "/placeholder.jpg",
    desc: "Durable wiper blades for clear visibility in all conditions.",
  },
  {
    id: 6,
    name: "Battery",
    quantity: 2,
    reorder: 10,
    category: "Electrical",
    price: 25,
    serviceId: 9,
    image: "/placeholder.jpg",
    desc: "Long-lasting battery for reliable vehicle starting.",
  },
];

export const servicesData: Service[] = [
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
    value: "Upcoming",
    label: "Upcoming",
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
    image: "/pic.png",
    content:
      "Electric vehicles (EVs) are becoming increasingly popular due to their environmental benefits and lower operating costs. However, many new EV owners are unsure about the maintenance requirements of their vehicles. This guide will walk you through everything you need to know about keeping your electric vehicle in top condition.",
    createdAt: "2023-06-15",
  },
  {
    id: 2,
    title: "How to Choose the Right Tires for Your Vehicle",
    tags: "Tires",
    category: "Car Maintenance",
    image: "/placeholder.jpg",
    content:
      "Choosing the right tires for your vehicle is essential for safety and performance. With so many options available, it can be overwhelming to find the best tires for your needs. This guide will help you understand the different types of tires and how to choose the right ones for your vehicle.",
    createdAt: "2023-07-20",
  },
];
