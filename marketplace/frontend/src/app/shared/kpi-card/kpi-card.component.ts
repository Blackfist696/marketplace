import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card p-5">
      <p class="text-xs text-gray-500 mb-1">{{ title }}</p>
      <p class="text-2xl font-bold">{{ value }}</p>
      <p *ngIf="trend" class="text-xs mt-1"
         [class]="trend === 'up' ? 'text-green-600' : 'text-red-600'">
        {{ trendValue }}
      </p>
    </div>
  `,
})
export class KpiCardComponent {
  @Input() title = '';
  @Input() value: string | number = '';
  @Input() trend?: 'up' | 'down';
  @Input() trendValue?: string;
}
