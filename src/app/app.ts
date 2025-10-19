import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TaskFilterComponent } from './components/task-filter.component';
import { TaskListComponent } from './components/task-list.component';

@Component({
  selector: 'app-root',
  imports: [RouterModule, TaskFilterComponent, TaskListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('MidLab4');
}
