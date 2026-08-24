import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({ selector: 'app-loading-state', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, template: `<div class="loading-state" [class.compact]="compact()"><div class="loading-spinner"></div><span>{{ message() }}</span></div>` })
export class LoadingStateComponent { message = input('Chargement en cours...'); compact = input(false); }
