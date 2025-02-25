interface CustomerData {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  cars: Car[];
  orders: OrderData[];
  avatar?: string;
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
  user_id: number;
  service: Service[];
  date: string;
  status: string;
  time: string;
  mechanics: StaffData[];
}

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  category: string;
  reorder: number;
  serviceid: number;
  image: string;
  description: string;
}

interface Service {
  id: number;
  name: string;
  price: number;
  title: string;
  description: string;
  category: string;
}

interface Car {
  id: number;
  user_id: number;
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
  createdat: string;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  product_id: number;
  image: string;
}

interface PaymentData {
  paymentID: number;
  orderID: number;
  amount: number;
  paymentstatus: string;
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
