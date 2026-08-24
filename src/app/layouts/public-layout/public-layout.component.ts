import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, ButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="public-layout"><header class="public-nav"><a class="brand" routerLink="/"><span class="brand-mark"><i class="pi pi-sun"></i></span><span>solaris<span class="brand-dot">.</span></span></a><nav><a routerLink="/catalogue">Catalogue</a><a href="#solutions">Solutions</a><a href="#process">Comment ça marche</a><a href="#about">À propos</a></nav><div class="nav-actions"><a class="nav-login" routerLink="/auth/login">Se connecter</a><p-button label="Créer un compte" routerLink="/auth/register" /></div><button class="mobile-menu" aria-label="Ouvrir le menu"><i class="pi pi-bars"></i></button></header><main><router-outlet /></main><footer><div class="brand"><span class="brand-mark"><i class="pi pi-sun"></i></span><span>solaris<span class="brand-dot">.</span></span></div><span>La chaîne solaire, simplifiée.</span><span>© 2025 Solaris Energy</span></footer></div>`,
})
export class PublicLayoutComponent {}
