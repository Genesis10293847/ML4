import { Injectable, signal, computed } from '@angular/core';
import { Task } from '../models/task.model';

type Filter = 'all' | 'active' | 'completed';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasks = signal<Task[]>([]);
  private nextId = 1;
  private currentFilter = signal<Filter>('all');

  readonly filteredTasks = computed(() => {
    const f = this.currentFilter();
    const list = this.tasks();
    if (f === 'all') return list;
    if (f === 'active') return list.filter(t => !t.isCompleted);
    return list.filter(t => t.isCompleted);
  });

  readonly filter = computed(() => this.currentFilter());

  addTask(description: string) {
    const task: Task = {
      id: this.nextId++,
      description: description.trim(),
      isCompleted: false,
      createdAt: new Date()
    };
    this.tasks.update(ts => [task, ...ts]);
  }

  editTask(id: number, newDescription: string) {
    this.tasks.update(ts =>
      ts.map(t => (t.id === id ? { ...t, description: newDescription } : t))
    );
  }

  toggleComplete(id: number) {
    this.tasks.update(ts =>
      ts.map(t => (t.id === id ? { ...t, isCompleted: !t.isCompleted } : t))
    );
  }

  setFilter(filter: Filter) {
    this.currentFilter.set(filter);
  }

  getAll() {
    return this.tasks;
  }
}
