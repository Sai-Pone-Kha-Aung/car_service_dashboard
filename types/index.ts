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
  };
};
