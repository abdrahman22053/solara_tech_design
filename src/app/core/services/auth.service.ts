import { Injectable, signal } from '@angular/core';
import { Observable, from, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoginRequest, LoginResponse, RegisterRequest } from '../models/api.models';
import { User, UserRole } from '../models/domain.models';
import { supabase } from './supabase.client';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly currentUserSignal = signal<User | null>(null);
  readonly currentUser = this.currentUserSignal.asReadonly();
  private initialized = false;

  constructor() {
    supabase.auth.onAuthStateChange((_event, session) => {
      queueMicrotask(() => this.currentUserSignal.set(session?.user ? this.mapUser(session.user) : null));
    });
  }

  ensureSession(): Promise<boolean> {
    if (this.initialized) return Promise.resolve(this.currentUserSignal() !== null);
    return supabase.auth.getSession().then(({ data }) => { this.initialized = true; this.currentUserSignal.set(data.session?.user ? this.mapUser(data.session.user) : null); return Boolean(data.session); });
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    return from(supabase.auth.signInWithPassword({ email: request.email, password: request.password })).pipe(map(({ data, error }) => { if (error || !data.session || !data.user) throw new Error(this.messageFor(error?.message)); const user = this.mapUser(data.user); this.currentUserSignal.set(user); return { accessToken: data.session.access_token, refreshToken: data.session.refresh_token, user }; }), catchError((error: Error) => throwError(() => new Error(error.message))));
  }

  register(request: RegisterRequest): Observable<{ user: User | null; needsEmailConfirmation: boolean }> {
    return from(supabase.auth.signUp({ email: request.email, password: request.password, options: { data: { role: request.role, firstName: request.firstName, lastName: request.lastName, company: request.company, phone: request.phone } } })).pipe(map(({ data, error }) => { if (error) throw new Error(this.messageFor(error.message)); const user = data.user ? this.mapUser(data.user) : null; if (user) this.currentUserSignal.set(user); return { user, needsEmailConfirmation: !data.session }; }), catchError((error: Error) => throwError(() => new Error(error.message))));
  }

  sendPasswordReset(email: string): Observable<void> { return from(supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/auth/reset-password` })).pipe(map(({ error }) => { if (error) throw new Error(this.messageFor(error.message)); })); }
  updatePassword(password: string): Observable<void> { return from(supabase.auth.updateUser({ password })).pipe(map(({ error }) => { if (error) throw new Error(this.messageFor(error.message)); })); }
  logout(): Observable<void> { return from(supabase.auth.signOut()).pipe(map(({ error }) => { if (error) throw new Error(this.messageFor(error.message)); this.currentUserSignal.set(null); })); }
  isAuthenticated(): boolean { return this.currentUserSignal() !== null; }
  hasRole(roles: UserRole[]): boolean { const user = this.currentUserSignal(); return user !== null && roles.includes(user.role); }

  private mapUser(user: { id: string; email?: string; user_metadata?: Record<string, unknown> }): User { const metadata = user.user_metadata; return { id: user.id, email: user.email ?? '', firstName: String(metadata?.['firstName'] ?? 'Utilisateur'), lastName: String(metadata?.['lastName'] ?? ''), role: this.isRole(metadata?.['role']) ? metadata['role'] : 'CLIENT', company: String(metadata?.['company'] ?? '') }; }
  private isRole(value: unknown): value is UserRole { return value === 'ADMIN' || value === 'DISTRIBUTOR' || value === 'INSTALLER' || value === 'TECHNICIAN' || value === 'CLIENT'; }
  private messageFor(message?: string): string { const normalized = message?.toLowerCase() ?? ''; if (normalized.includes('invalid login credentials')) return 'Email ou mot de passe incorrect.'; if (normalized.includes('already registered')) return 'Cette adresse email est déjà utilisée.'; if (normalized.includes('password')) return 'Le mot de passe ne respecte pas les règles de sécurité.'; if (normalized.includes('email')) return 'Veuillez vérifier votre adresse email.'; return 'Une erreur est survenue. Réessayez dans quelques instants.'; }
}
