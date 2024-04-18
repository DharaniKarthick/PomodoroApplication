import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface Task {
  id: number;
  title: string;
  description: string;
  status: number;
}

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  tasks: Task[] = [];
  newTask: Task = {
    id: 0, title: '', description: '',  status: 0

  };
  showForm = false;
  editingTaskId: number =0;
  private apiUrl = 'https://localhost:7190/api/pomodoro';
 
  userId: any;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.getAllTasks();
  }

  getAllTasks() {
    this.http.get<any>(`${this.apiUrl}/GetTasks?UserId=${this.userId}`, this.userId).subscribe(
      (response: any) => {
        console.log('All task:', response);
        this.tasks=response;
        this.showForm = false;
      },
      error => {
        console.error('Error adding task:', error);
        // Handle error (e.g., display error message to the user)
      }
    );
  }
  addTask() {
    if (this.newTask.title && this.newTask.description) {
      const taskToAdd = { id: this.editingTaskId, title: this.newTask.title, description: this.newTask.description, status: this.newTask.status, userId: this.userId };
      const payload = {} 
      // Replace 'your-api-endpoint' with the actual URL of your Web API endpoint for adding a task
      this.http.post<any>(`${this.apiUrl}`, taskToAdd).subscribe(
        (response: any) => {
          console.log('Task added successfully:', response);
          this.newTask.id = response;
          if (taskToAdd.id == 0) {
            this.tasks.push({ ...this.newTask });
         }
          this.showForm = false;
          this.getAllTasks();
        },
        error => {
          console.error('Error adding task:', error);
          // Handle error (e.g., display error message to the user)
        }
      );
    }
  }

  todoModalClose() {
    this.showForm = false; // Set showForm to false to close the modal popup
  }

  editTask(taskId: number) {
    this.editingTaskId = taskId;
    const taskToEdit = this.tasks.find(task => task.id === taskId);
    if (taskToEdit) {
      this.newTask.title = taskToEdit.title;
      this.newTask.description = taskToEdit.description;
      this.showForm = true;
    }
    //this.showForm = true;
  }

  updateTask() {
    const taskToUpdateIndex = this.tasks.findIndex(task => task.id === this.editingTaskId);
    if (taskToUpdateIndex !== -1) {
      this.tasks[taskToUpdateIndex].title = this.newTask.title;
      this.tasks[taskToUpdateIndex].description = this.newTask.description;
      this.newTask.title = '';
      this.newTask.description = '';
      this.showForm = false;
      this.editingTaskId = 0;
    }
  }

  deleteTask(taskId: number) {
    //this.tasks = this.tasks.filter(task => task.id !== taskId);
    const taskPayload = this.tasks.filter(task => task.id == taskId);
    this.http.delete<any>(`${this.apiUrl}?UserId=${this.userId}&task=${taskId}`).subscribe(
      (response: any) => {
        console.log('delete action:', response);
        //this.tasks = response;
        this.getAllTasks();
        this.showForm = false;
      },
      error => {
        console.error('Error adding task:', error);
        // Handle error (e.g., display error message to the user)
      }
    );
  }

  navigateToPomodoro(taskId: number, taskTitle: string) {
    this.router.navigate(['/pomodoro-app', taskId], { queryParams: { title: taskTitle } });
  }
}
