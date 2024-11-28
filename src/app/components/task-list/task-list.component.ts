import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../model/task.model';
import { StatusHighlightDirective } from '../../directive/status-highlight.directive';
import { TaskService } from '../../service/task.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, StatusHighlightDirective],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  private taskSubscription?: Subscription;

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {
    this.taskSubscription = this.taskService.getTasks()
      .subscribe(tasks => {
        this.tasks = tasks;
      });
  }

  ngOnDestroy(): void {
    this.taskSubscription?.unsubscribe();
  }

  deletetask(id: number): void {
    this.taskService.deleteTask(id).subscribe();
  }

  edittask(id: number): void {
    this.router.navigate([`/edit/${id}`]);
  }

  detailstask(id: number): void {
    this.router.navigate([`/details/${id}`]);
  }

  gotoform(): void {
    this.router.navigate(['/form']);
  }
}
