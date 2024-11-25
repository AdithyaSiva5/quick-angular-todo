import { Component, OnInit } from '@angular/core';
import { Task } from '../../model/task.model';
import { TaskService } from '../../service/task.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-details',
  imports: [CommonModule],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.css',
})
export class TaskDetailsComponent implements OnInit {
  task?: Task;

  constructor(
    private _taskService: TaskService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    const id = this._route.snapshot.paramMap.get('id');
    if (id) {
      const taskId = +id;
      this.task = this._taskService.getTask(taskId);
    }
  }
}
