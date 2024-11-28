import { Injectable } from '@angular/core';
import { Task } from '../model/task.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/api/tasks';
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadTasks();
  }

  private loadTasks(): void {
    this.http.get<Task[]>(this.apiUrl).subscribe(
      tasks => this.tasksSubject.next(tasks)
    );
  }

  getTasks(): Observable<Task[]> {
    return this.tasks$;
  }

  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  addTask(task: Omit<Task, 'id'>): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task).pipe(
      tap(newTask => {
        const currentTasks = this.tasksSubject.value;
        this.tasksSubject.next([...currentTasks, newTask]);
      })
    );
  }

  updateTask(updatedTask: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${updatedTask.id}`, updatedTask).pipe(
      tap(task => {
        const currentTasks = this.tasksSubject.value;
        const updatedTasks = currentTasks.map(t => 
          t.id === task.id ? task : t
        );
        this.tasksSubject.next(updatedTasks);
      })
    );
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const currentTasks = this.tasksSubject.value;
        const filteredTasks = currentTasks.filter(task => task.id !== id);
        this.tasksSubject.next(filteredTasks);
      })
    );
  }
}
