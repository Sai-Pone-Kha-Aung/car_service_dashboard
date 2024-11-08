type CustomerData = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  vehicles: VehicleData[];
};

type VehicleData = {
  id: number;
  name: string;
  make: string;
  model: string;
  year: number;
};

type AppointmentData = {
  id: number;
  name: string;
  vehicle: string;
  service: string;
  date: string;
  status: string;
};
