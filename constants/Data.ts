type CustomerData = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  vehicles: {
    id: number;
    make: string;
    model: string;
    year: number;
  }[];
};

type VehicleData = {
  id: number;
  name: string;
  make: string;
  model: string;
  year: number;
};

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
        make: "Toyota",
        model: "Camry",
        year: 2020,
      },
      {
        id: 2,
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
    year: 2019,
  },
  {
    id: 2,
    name: "Honda Civic",
    make: "Honda",
    model: "Civic",
    year: 2020,
  },
  {
    id: 3,
    name: "Ford Focus",
    make: "Ford",
    model: "Focus",
    year: 2018,
  },
];
