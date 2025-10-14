import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Summary } from './summary/summary';
import { TaskList } from './task-list/task-list';
import { TaskForm } from './task-form/task-form';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'summary', component: Summary},
    {path: 'task-form', component: TaskForm},
    {path: 'task-list', component: TaskList}
];
