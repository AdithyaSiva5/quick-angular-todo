import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../model/task.model';
import { StatusHighlightDirective } from '../../directive/status-highlight.directive';
import { TaskService } from '../../service/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, StatusHighlightDirective],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [
    {
      id: 1,
      title: 'Task 1',
      description: 'This is task number 1',
      status: 'Done',
      additionalInfo: 'This is task number 1 which is done but review it.',
    },
    {
      id: 2,
      title: 'Task 2',
      description: 'This is task number 2',
      status: 'In Progress',
      additionalInfo:
        'This is task number 2 which is in progress and needs to be completed asap.',
    },
    {
      id: 3,
      title: 'Task 3',
      description: 'This is task number 3',
      status: 'To Do',
      additionalInfo:
        'This is task number 3 start next week and needs to be completed asap.',
    },
  ];

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
  }

  deletetask(id: number): void {
    this.taskService.deleteTask(id);
    this.tasks = this.taskService.getTasks();
  }
  edittask(id: number): void {
    this.router.navigate([`/edit/${id}`]);
  }
  detailstask(id: number): void {
    this.router.navigate([`/details/${id}`]);
  }
}
