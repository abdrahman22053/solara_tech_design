import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [ButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="empty-state"><div class="empty-icon"><i class="pi pi-inbox"></i></div><h3>{{ title() }}</h3><p>{{ message() }}</p>@if (actionLabel()) { <p-button [label]="actionLabel()" icon="pi pi-plus" [text]="true" (onClick)="action.emit()" /> }</div>`,
})
export class EmptyStateComponent { title = input('Aucun résultat'); message = input('Aucune donnée ne correspond à votre recherche.'); actionLabel = input(''); action = output<void>(); }
