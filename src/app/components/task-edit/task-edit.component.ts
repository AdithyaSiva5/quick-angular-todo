import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../service/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../model/task.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-edit',
  imports: [CommonModule, FormsModule],
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.css',
})
export class TaskEditComponent implements OnInit {
  taskName: string = '';
  taskDescription: string = '';
  taskStatus: 'To Do' | 'In Progress' | 'Done' = 'To Do';
  taskId?: number;
  taskAdditional?: string = '';

  constructor(
    private _taskService: TaskService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.taskId = +id;
        const task = this._taskService.getTask(this.taskId);
        if (task) {
          this.taskName = task.title;
          this.taskDescription = task.description;
          this.taskStatus = task.status;
          this.taskAdditional = task.additionalInfo;
        }
      }
    });
  }
  editTask() {
    const updatedTask: Task = {
      id: this.taskId as number,
      title: this.taskName,
      description: this.taskDescription,
      status: this.taskStatus,
      additionalInfo: this.taskAdditional,
    };
    this._taskService.updateTask(updatedTask);

    this._router.navigate(['']);
  }
}
