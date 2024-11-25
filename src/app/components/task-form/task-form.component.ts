import { Component } from '@angular/core';
import { TaskService } from '../../service/task.service';
import { Router } from '@angular/router';
import { Task } from '../../model/task.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
})
export class TaskFormComponent {
  taskName: string = '';
  taskDescription: string = '';
  taskStatus: 'To Do' | 'In Progress' | 'Done' = 'To Do';
  taskAdditional: string = '';

  constructor(private taskService: TaskService, private router: Router) {}
  addtask() {
    const newTask: Omit<Task, 'id'> = {
      title: this.taskName,
      description: this.taskDescription,
      status: this.taskStatus,
      additionalInfo: this.taskAdditional,
    };

    this.taskService.addTask(newTask);

    this.router.navigate(['']);
  }
}
