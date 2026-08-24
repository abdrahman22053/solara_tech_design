import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({ selector: 'app-error-state', standalone: true, imports: [ButtonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: `<div class="error-state"><div class="error-icon"><i class="pi pi-exclamation-triangle"></i></div><h3>Impossible de charger les données</h3><p>Une erreur temporaire est survenue. Réessayez dans quelques instants.</p><p-button label="Réessayer" icon="pi pi-refresh" [outlined]="true" (onClick)="retry.emit()" /></div>` })
export class ErrorStateComponent { retry = output<void>(); }
