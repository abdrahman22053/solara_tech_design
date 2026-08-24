import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PageHeaderComponent } from './page-header.component';

@Component({ selector: 'app-placeholder', standalone: true, imports: [PageHeaderComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: `<app-page-header [eyebrow]="eyebrow()" [title]="title()" [subtitle]="subtitle()" /><div class="coming-soon"><div class="coming-icon"><i class="pi pi-sparkles"></i></div><h2>Votre espace {{ title().toLowerCase() }} arrive.</h2><p>Cette vue est prête à accueillir les données de votre API REST et les workflows métier associés.</p></div>` })
export class PlaceholderComponent { title = input('fonctionnalité'); eyebrow = input('Espace de travail'); subtitle = input(''); }
