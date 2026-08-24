import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ActivityItem, DashboardMetric, OrderSummary } from '../models/domain.models';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  getMetrics(): Observable<DashboardMetric[]> { return of<DashboardMetric[]>([
    { label: 'Chiffre d’affaires', value: '284 920 €', change: '+12,8%', trend: 'up', icon: 'pi-wallet', tone: 'blue' },
    { label: 'Commandes', value: '1 248', change: '+8,4%', trend: 'up', icon: 'pi-shopping-bag', tone: 'teal' },
    { label: 'Produits actifs', value: '186', change: '+4,2%', trend: 'up', icon: 'pi-box', tone: 'amber' },
    { label: 'Taux de conversion', value: '7,64%', change: '-1,2%', trend: 'down', icon: 'pi-chart-line', tone: 'coral' },
  ]).pipe(delay(280)); }
  getOrders(): Observable<OrderSummary[]> { return of<OrderSummary[]>([
    { id: '#CMD-1048', customer: 'Énergie du Sud', product: 'Panneau Aurora 450W', amount: 7596, status: 'Confirmée', date: 'Aujourd’hui, 09:42' },
    { id: '#CMD-1047', customer: 'M. Youssef Haddad', product: 'Batterie Voltis Home 10', amount: 2890, status: 'Préparation', date: 'Hier, 16:18' },
    { id: '#CMD-1046', customer: 'SunTech Solutions', product: 'Onduleur GridOne 8K', amount: 4920, status: 'Expédiée', date: 'Hier, 11:03' },
    { id: '#CMD-1045', customer: 'Mme Amel Bensalem', product: 'Kit de fixation Toit Plat', amount: 745, status: 'Livrée', date: '12 juin, 14:26' },
  ]).pipe(delay(320)); }
  getActivity(): Observable<ActivityItem[]> { return of<ActivityItem[]>([
    { label: 'Nouvelle commande reçue', description: 'Commande #CMD-1048 de Énergie du Sud', time: 'Il y a 18 min', tone: 'blue' },
    { label: 'Stock faible', description: 'Batterie Voltis Home 10 — 7 unités restantes', time: 'Il y a 42 min', tone: 'amber' },
    { label: 'Devis accepté', description: 'Devis #DEV-284 par SunTech Solutions', time: 'Il y a 2 h', tone: 'teal' },
    { label: 'Installation terminée', description: 'Projet résidentiel — 6,4 kWc', time: 'Il y a 4 h', tone: 'coral' },
  ]).pipe(delay(360)); }
}
