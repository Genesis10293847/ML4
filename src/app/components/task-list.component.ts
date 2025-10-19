import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';

@Component({
  selector: 'task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="mb-3">
      <input type="text" class="form-control" placeholder="Press [Enter] when done..." [(ngModel)]="newText" (keydown.enter)="add()" />
    </div>

    <ul class="list-group">
      <li *ngFor="let t of tasks" class="list-group-item d-flex align-items-center">
        <input type="checkbox" class="me-2" [checked]="t.isCompleted" (change)="service.toggleComplete(t.id)" />

        <div class="flex-grow-1">
          <div *ngIf="editingId !== t.id" (click)="startEdit(t)">
            <span
              [ngClass]="{
                'bg-warning text-muted fw-bold': true,
                'px-3 py-1 rounded-pill d-inline-block': true,
                'text-decoration-line-through': t.isCompleted
              }"
            >{{ t.description }}</span>
            <small class="text-muted ms-2">{{ t.createdAt | date:'short' }}</small>
          </div>

          <input *ngIf="editingId === t.id" class="form-control" [(ngModel)]="editingText" (blur)="finishEdit(t)" (keydown.enter)="finishEdit(t)" />
        </div>

      </li>
    </ul>
  `,
  styles: [`
    .form-control:focus {
      border-color: #ffc107 !important;
      box-shadow: 0 0 0 0.25rem rgba(255,193,7,.25) !important;
    }
  `]
})
export class TaskListComponent {
  newText = '';
  editingId: number | null = null;
  editingText = '';

  constructor(public service: TaskService) {}

  get tasks(): Task[] {
    return this.service.filteredTasks();
  }

  add() {
    const v = this.newText.trim();
    if (!v) return;
    this.service.addTask(v);
    this.newText = '';
  }

  startEdit(t: Task) {
    this.editingId = t.id;
    this.editingText = t.description;

  }

  finishEdit(t: Task) {
    if (this.editingText.trim() && this.editingText !== t.description) {
      this.service.editTask(t.id, this.editingText.trim());
    }
    this.editingId = null;
    this.editingText = '';
  }
}
