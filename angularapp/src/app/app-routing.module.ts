import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PomodoroAppComponent } from './components/pomodoro-app/pomodoro-app.component';
import { SignupComponent } from './components/signup/signup.component';
import { TaskComponent } from './components/task/task.component';


const routes: Routes = [
  { path: '', redirectTo: 'task', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'pomodoro-app/:id', component: PomodoroAppComponent },
  { path: 'task/:userId', component: TaskComponent },
  { path: 'signup', component: SignupComponent }
  // Add other routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
