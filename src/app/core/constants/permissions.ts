import { UserRole } from '../models/domain.models';

export const roleLabels: Record<UserRole, string> = {
  ADMIN: 'Administrateur',
  DISTRIBUTOR: 'Distributeur',
  INSTALLER: 'Installateur',
  TECHNICIAN: 'Technicien',
  CLIENT: 'Client',
};

export const rolePermissions: Record<UserRole, string[]> = {
  ADMIN: ['DASHBOARD_READ', 'PRODUCT_READ', 'PRODUCT_CREATE', 'PRODUCT_UPDATE', 'ORDER_READ', 'USER_READ'],
  DISTRIBUTOR: ['DASHBOARD_READ', 'PRODUCT_READ', 'PRODUCT_CREATE', 'PRODUCT_UPDATE', 'ORDER_READ', 'QUOTE_READ'],
  INSTALLER: ['DASHBOARD_READ', 'INSTALLATION_READ', 'INTERVENTION_READ'],
  TECHNICIAN: ['DASHBOARD_READ', 'INTERVENTION_READ'],
  CLIENT: ['DASHBOARD_READ', 'PRODUCT_READ', 'ORDER_CREATE', 'QUOTE_CREATE'],
};
