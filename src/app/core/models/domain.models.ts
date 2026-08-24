export type UserRole = 'ADMIN' | 'DISTRIBUTOR' | 'INSTALLER' | 'TECHNICIAN' | 'CLIENT';
export type ProductCategory = 'PANELS' | 'BATTERIES' | 'INVERTERS' | 'ACCESSORIES';
export type ProductStatus = 'ACTIVE' | 'LOW_STOCK' | 'DRAFT' | 'ARCHIVED';

export interface RoleOption {
  id: UserRole;
  label: string;
  description: string;
  icon: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  company?: string;
  avatar?: string;
}

export interface Product {
  id: string;
  name: string;
  reference: string;
  category: ProductCategory;
  categoryLabel: string;
  price: number;
  stock: number;
  status: ProductStatus;
  distributor: string;
  brand: string;
  power?: string;
  image: string;
  description: string;
  specs: { label: string; value: string }[];
}

export interface DashboardMetric {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: string;
  tone: 'blue' | 'teal' | 'amber' | 'coral';
}

export interface OrderSummary {
  id: string;
  customer: string;
  product: string;
  amount: number;
  status: 'Confirmée' | 'Préparation' | 'Expédiée' | 'Livrée';
  date: string;
}

export interface ActivityItem {
  label: string;
  description: string;
  time: string;
  tone: 'blue' | 'teal' | 'amber' | 'coral';
}
