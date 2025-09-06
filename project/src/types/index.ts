export interface Restaurant {
  id: string;
  name: string;
  image: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  minOrder: number;
  isOpen: boolean;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isVegetarian?: boolean;
  isSpicy?: boolean;
  isPopular?: boolean;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  specialInstructions?: string;
}

export interface Order {
  id: string;
  restaurantId: string;
  items: CartItem[];
  total: number;
  deliveryFee: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'on-way' | 'delivered';
  estimatedDelivery: string;
  createdAt: Date;
}