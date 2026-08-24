import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../core/services/auth.service';

@Component({ selector: 'app-password-recovery', standalone: true, imports: [ReactiveFormsModule, RouterLink, ButtonModule, InputTextModule], changeDetection: ChangeDetectionStrategy.OnPush, template: `<div class="login-page"><div class="login-heading"><div class="eyebrow">Récupération de compte</div><h1>Retrouvons votre<br /><em>accès.</em></h1><p>Indiquez votre adresse email et nous vous enverrons un lien sécurisé.</p></div>@if (!sent()) { <form class="login-form" [formGroup]="form" (ngSubmit)="submit()"><div class="field"><label for="recovery-email">Adresse email</label><input pInputText id="recovery-email" type="email" formControlName="email" placeholder="vous@entreprise.com" />@if (form.controls.email.invalid && form.controls.email.touched) { <small>Entrez une adresse email valide.</small> }</div>@if (error()) { <div class="form-error"><i class="pi pi-exclamation-circle"></i>{{ error() }}</div> }<p-button type="submit" label="Recevoir le lien" icon="pi pi-arrow-right" iconPos="right" [disabled]="form.invalid || loading()" [loading]="loading()" styleClass="login-submit" /></form> } @else { <div class="success-panel"><div class="success-icon"><i class="pi pi-check"></i></div><h3>Email envoyé</h3><p>Si un compte correspond à cette adresse, vous recevrez un lien dans quelques instants.</p><p-button label="Retour à la connexion" routerLink="/auth/login" [text]="true" /></div> }<p class="auth-switch"><a routerLink="/auth/login"><i class="pi pi-arrow-left"></i> Retour à la connexion</a></p></div>` })
export class PasswordRecoveryComponent {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  form = this.fb.nonNullable.group({ email: ['', [Validators.required, Validators.email]] });
  loading = signal(false);
  error = signal('');
  sent = signal(false);
  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading.set(true);
    this.error.set('');
    this.auth.sendPasswordReset(this.form.controls.email.value).subscribe({
      next: () => { this.loading.set(false); this.sent.set(true); },
      error: (error: Error) => { this.loading.set(false); this.error.set(error.message); }
    });
  }
}
