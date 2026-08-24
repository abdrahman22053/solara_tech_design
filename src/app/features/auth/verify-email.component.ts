import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({ selector: 'app-verify-email', standalone: true, imports: [RouterLink, ButtonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: `<div class="login-page"><div class="login-heading"><div class="eyebrow">Vérification du compte</div><h1>Encore une étape<br /><em>importante.</em></h1><p>Consultez votre boîte email et cliquez sur le lien de confirmation pour activer votre espace SolaraTech.</p></div><div class="success-panel"><div class="success-icon"><i class="pi pi-envelope"></i></div><h3>Email de confirmation envoyé</h3><p>Le lien est valable pendant une durée limitée. Pensez à vérifier vos courriers indésirables.</p><p-button label="Retour à la connexion" routerLink="/auth/login" [text]="true" /></div></div>` })
export class VerifyEmailComponent {}
