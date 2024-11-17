type CustomerData = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  cars: CarData[];
};

type CarData = {
  id: number;
  name: string;
  make: string;
  model: string;
  year: number;
  problems?: string;
};

type AppointmentData = {
  id: number;
  name: string;
  car: string;
  service: string;
  date: string;
  status: string;
};

type Stock = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  reorder: number;
  serviceId: number;
};

type ServiceData = {
  id: number;
  name: string;
  price: number;
};
