import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { LandingComponent } from './features/catalog/landing.component';
import { CatalogComponent } from './features/catalog/catalog.component';
import { ProductDetailComponent } from './features/catalog/product-detail.component';
import { LoginComponent } from './features/auth/login.component';
import { RegisterComponent } from './features/auth/register.component';
import { PasswordRecoveryComponent } from './shared/components/password-recovery.component';
import { ResetPasswordComponent } from './features/auth/reset-password.component';
import { VerifyEmailComponent } from './features/auth/verify-email.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ProductListComponent } from './features/products/product-list.component';
import { WorkspacePageComponent } from './features/workspace/workspace-page.component';

export const routes: Routes = [
  { path: '', component: PublicLayoutComponent, children: [{ path: '', component: LandingComponent }, { path: 'catalogue', component: CatalogComponent }, { path: 'catalogue/:id', component: ProductDetailComponent }] },
  { path: 'auth', component: AuthLayoutComponent, children: [{ path: 'login', component: LoginComponent }, { path: 'register', component: RegisterComponent }, { path: 'forgot-password', component: PasswordRecoveryComponent }, { path: 'reset-password', component: ResetPasswordComponent }, { path: 'verify-email', component: VerifyEmailComponent }] },
  { path: 'app', component: DashboardLayoutComponent, canActivate: [authGuard], children: [{ path: '', component: DashboardComponent }, { path: 'products', component: ProductListComponent }, { path: 'orders', component: WorkspacePageComponent, data: { kind: 'orders' } }, { path: 'quotes', component: WorkspacePageComponent, data: { kind: 'quotes' } }, { path: 'installations', component: WorkspacePageComponent, data: { kind: 'installations' } }, { path: 'interventions', component: WorkspacePageComponent, data: { kind: 'interventions' } }, { path: 'users', component: WorkspacePageComponent, data: { kind: 'users' } }, { path: 'notifications', component: WorkspacePageComponent, data: { kind: 'notifications' } }, { path: 'settings', component: WorkspacePageComponent, data: { kind: 'settings' } }] },
  { path: '**', redirectTo: '' },
];
