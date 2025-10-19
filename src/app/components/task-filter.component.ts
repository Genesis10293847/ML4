import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'task-filter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="btn-group " role="group">
      <button class="text-muted btn btn-outline-warning fw-bold" [class.active]="service.filter() === 'all'" (click)="service.setFilter('all')">All</button>
      <button class="text-muted btn btn-outline-warning fw-bold" [class.active]="service.filter() === 'active'" (click)="service.setFilter('active')">Active</button>
      <button class="text-muted btn btn-outline-warning fw-bold" [class.active]="service.filter() === 'completed'" (click)="service.setFilter('completed')">Completed</button>
    </div>
  `
})
export class TaskFilterComponent {
  constructor(public service: TaskService) {}
}
