import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-column',
  templateUrl: './stat-column.component.html',
  styleUrls: ['./stat-column.component.scss'],
})
export class StatColumnComponent {
  @Input() iconClass!: string;
  @Input() title!: string;
}
