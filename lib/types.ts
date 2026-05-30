export enum ProductCategory {
  All = "all",
  Fruits = "fruits",
  Vegetables = "vegetables",
  Dairy = "dairy",
  Bakery = "bakery",
  Pantry = "pantry",
}

export enum OrderStatus {
  Idle = "idle",
  Processing = "processing",
  Success = "success",
  Failure = "failure",
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  unit: string;
  rating: number;
  deliveryEta: string;
  image: string;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  location: string;
}
