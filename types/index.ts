type CustomerData = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  cars: CarData[];
  orders: OrderData[];
  avatar: string;
  password: string;
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
  image: string;
};

type ServiceData = {
  id: number;
  name: string;
  price: number;
};

type StatusOption = {
  id: number;
  value: string;
  label: string;
};

interface Car {
  id: number;
  customer_id: number;
  name: string;
  make: string;
  model: string;
  year: string;
  problem: string;
}

interface Appointment {
  id: number;
  customer_id: number;
  car: string;
  service: string;
  date: string;
  status: string;
}

interface StaffData {
  id: number;
  name: string;
  role: string;
  email: string;
  avatar: string;
}

interface OrderData {
  id: number;
  product: string;
  quantity: number;
  price: number;
  total: number;
  date: string;
  status: string;
}

interface BlogData {
  id: number;
  title: string;
  category: string;
  tags: string;
  content: string;
  createdAt: string;
}
