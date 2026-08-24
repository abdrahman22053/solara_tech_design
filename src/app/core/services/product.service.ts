import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Product, ProductCategory } from '../models/domain.models';
import { ProductPayload, ProductQuery } from '../models/api.models';

const products: Product[] = [
  { id: 'prd-001', name: 'Panneau Aurora 450W', reference: 'AUR-450-M10', category: 'PANELS', categoryLabel: 'Panneaux solaires', price: 189.90, stock: 248, status: 'ACTIVE', distributor: 'Helio Distribution', brand: 'Aurora', power: '450 Wc', image: 'https://images.pexels.com/photos/29206488/pexels-photo-29206488.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', description: 'Panneau monocristallin haute performance pour installations résidentielles et commerciales.', specs: [{ label: 'Puissance nominale', value: '450 Wc' }, { label: 'Rendement', value: '22,5 %' }, { label: 'Technologie', value: 'Monocristallin M10' }, { label: 'Garantie', value: '25 ans' }] },
  { id: 'prd-002', name: 'Batterie Voltis Home 10', reference: 'VLT-H10-LFP', category: 'BATTERIES', categoryLabel: 'Batteries', price: 2890, stock: 7, status: 'LOW_STOCK', distributor: 'Solaris Energy', brand: 'Voltis', power: '10,2 kWh', image: 'https://images.pexels.com/photos/39057090/pexels-photo-39057090.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', description: 'Système de stockage résidentiel intelligent avec cellules LiFePO4 et pilotage connecté.', specs: [{ label: 'Capacité utile', value: '10,2 kWh' }, { label: 'Technologie', value: 'LiFePO4' }, { label: 'Cycles', value: '> 6 000' }, { label: 'Garantie', value: '10 ans' }] },
  { id: 'prd-003', name: 'Onduleur GridOne 8K', reference: 'GRD-8K-HYB', category: 'INVERTERS', categoryLabel: 'Onduleurs', price: 1640, stock: 34, status: 'ACTIVE', distributor: 'Helio Distribution', brand: 'GridOne', power: '8 kW', image: 'https://images.pexels.com/photos/38171130/pexels-photo-38171130.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', description: 'Onduleur hybride triphasé pour maximiser l’autoconsommation et la flexibilité énergétique.', specs: [{ label: 'Puissance', value: '8 kW' }, { label: 'Rendement', value: '98,2 %' }, { label: 'MPPT', value: '2 trackers' }, { label: 'Garantie', value: '10 ans' }] },
  { id: 'prd-004', name: 'Kit de fixation Toit Plat', reference: 'FIX-ROOF-04', category: 'ACCESSORIES', categoryLabel: 'Accessoires', price: 74.50, stock: 112, status: 'ACTIVE', distributor: 'Solaris Energy', brand: 'MountPro', image: 'https://images.pexels.com/photos/35425767/pexels-photo-35425767.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', description: 'Système de fixation aluminium conçu pour une pose rapide sur toiture plate.', specs: [{ label: 'Matériau', value: 'Aluminium anodisé' }, { label: 'Inclinaison', value: '15°' }, { label: 'Compatibilité', value: 'Modules 60/72 cellules' }, { label: 'Garantie', value: '12 ans' }] },
  { id: 'prd-005', name: 'Panneau Aurora 575W Pro', reference: 'AUR-575-N18', category: 'PANELS', categoryLabel: 'Panneaux solaires', price: 239.90, stock: 89, status: 'ACTIVE', distributor: 'Solaris Energy', brand: 'Aurora', power: '575 Wc', image: 'https://images.pexels.com/photos/8783541/pexels-photo-8783541.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', description: 'Module grand format destiné aux centrales commerciales et industrielles.', specs: [{ label: 'Puissance nominale', value: '575 Wc' }, { label: 'Rendement', value: '22,3 %' }, { label: 'Technologie', value: 'TOPCon N-type' }, { label: 'Garantie', value: '30 ans' }] },
  { id: 'prd-006', name: 'Micro-onduleur Link 1600', reference: 'LNK-MIC-1600', category: 'INVERTERS', categoryLabel: 'Onduleurs', price: 392, stock: 0, status: 'DRAFT', distributor: 'Helio Distribution', brand: 'Link', power: '1600 VA', image: 'https://images.pexels.com/photos/38171183/pexels-photo-38171183.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', description: 'Micro-onduleur compact avec supervision module par module.', specs: [{ label: 'Puissance', value: '1600 VA' }, { label: 'Canaux MPPT', value: '4' }, { label: 'Indice', value: 'IP67' }, { label: 'Garantie', value: '15 ans' }] },
];

@Injectable({ providedIn: 'root' })
export class ProductService {
  getProducts(query: ProductQuery = {}): Observable<Product[]> {
    const search = query.search?.toLowerCase().trim() ?? '';
    const result = products.filter((product) => (!search || `${product.name} ${product.reference} ${product.brand}`.toLowerCase().includes(search)) && (!query.category || product.category === query.category) && (!query.status || product.status === query.status));
    return of(result).pipe(delay(420));
  }
  getProductById(id: string): Observable<Product | undefined> { return of(products.find((product) => product.id === id)).pipe(delay(250)); }
  createProduct(payload: ProductPayload): Observable<Product> { return of<Product>({ ...payload, id: `prd-${Date.now()}`, categoryLabel: this.categoryLabel(payload.category), status: 'DRAFT' }).pipe(delay(500)); }
  updateProduct(id: string, payload: Partial<ProductPayload>): Observable<Product | undefined> { return this.getProductById(id); }
  deleteProduct(id: string): Observable<void> { return of(void 0).pipe(delay(400)); }
  private categoryLabel(category: ProductCategory): string { return { PANELS: 'Panneaux solaires', BATTERIES: 'Batteries', INVERTERS: 'Onduleurs', ACCESSORIES: 'Accessoires' }[category]; }
}
