import { Injectable } from '@angular/core';
import { Task } from '../model/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor() {
    this.loadTasksFromLocalStorage();
  }

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

  private nextId = 4;

  private saveTasksToLocalStorage(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  private loadTasksFromLocalStorage(): void {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);

      this.nextId = this.tasks.length
        ? Math.max(...this.tasks.map((t) => t.id)) + 1
        : 1;
    } else {
      this.tasks = [
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
      this.nextId = 4;
      this.saveTasksToLocalStorage();
    }
  }

  // addTask(task: Omit<Task, 'id'>): Task {
  //   const newTask: Task = { id: this.nextId++, ...task };
  //   this.tasks.push(newTask);
  //   this.saveTasksToLocalStorage();
  //   return newTask;
  // }

  addTask(task: Omit<Task, 'id'>): Task {
    // Findinglowest available id
    const existingIds = this.tasks.map((t) => t.id);
    let newId = 1;
    while (existingIds.includes(newId)) {
      newId++;
    }

    const newTask: Task = { id: newId, ...task };
    this.tasks.push(newTask);
    this.saveTasksToLocalStorage();
    this.nextId = newId + 1;
    return newTask;
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  getTask(id: number): Task | undefined {
    return this.tasks.find((task) => task.id === id);
  }

  updateTask(updatedTask: Task): void {
    const i = this.tasks.findIndex((t) => t.id === updatedTask.id);
    if (i !== 1) {
      this.tasks[i] = updatedTask;
      this.saveTasksToLocalStorage();
    }
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter((t) => t.id !== id);
    this.reorderTaskIds();
    this.saveTasksToLocalStorage();
  }
  private reorderTaskIds(): void {
    this.tasks = this.tasks.map((task, index) => ({ ...task, id: index + 1 }));
  }
}
