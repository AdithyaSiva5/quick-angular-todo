import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { TaskEditComponent } from './components/task-edit/task-edit.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
  {
    path: 'tasks',
    component: TaskListComponent,
  },
  {
    path: 'form',
    component: TaskFormComponent,
  },
  {
    path: 'details/:id',
    component: TaskDetailsComponent,
  },
  {
    path: 'edit/:id',
    component: TaskEditComponent,
  },
];
