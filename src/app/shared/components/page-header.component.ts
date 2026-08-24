import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="page-header"><div><div class="eyebrow">{{ eyebrow() }}</div><h1>{{ title() }}</h1><p>{{ subtitle() }}</p></div><div class="page-actions"><ng-content /></div></div>`,
})
export class PageHeaderComponent { eyebrow = input('Vue d’ensemble'); title = input(''); subtitle = input(''); }
