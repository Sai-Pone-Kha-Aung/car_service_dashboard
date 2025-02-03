interface CustomerData {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  cars: Car[];
  orders: OrderData[];
  avatar: string;
  password: string;
  appointments: AppointmentData[];
  cart: CartItem[];
  payments: PaymentData[];
  createdAt: string;
  updatedAt: string;
}

interface AppointmentData {
  id: number;
  name: string;
  car: string;
  service: ServiceData[];
  date: string;
  status: string;
  mechanics: StaffData[];
}

interface Stock {
  id: number;
  name: string;
  price: number;
  quantity: number;
  category: string;
  reorder: number;
  serviceId: number;
  image: string;
  desc: string;
}

interface ServiceData {
  id: number;
  name: string;
  price: number;
}

interface Car {
  id: number;
  customer_id: number;
  make: string;
  model: string;
  year: number;
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
  image: string;
  content: string;
  createdAt: string;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  product_id: number;
}

interface PaymentData {
  paymentID: number;
  orderID: number;
  amount: number;
  paymentStatus: string;
  paymentDate: string;
}

type CarData = {
  id: number;
  name: string;
  make: string;
  model: string;
  year: number;
  problems?: string;
};

type StatusOption = {
  id: number;
  value: string;
  label: string;
};
