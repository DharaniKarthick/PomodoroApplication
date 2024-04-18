import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';

import { PomodoroAppComponent } from './components/pomodoro-app/pomodoro-app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../app/services/auth.interceptor';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { TimerComponent } from './components/timer/timer.component';
import { TimeCategoriesComponent } from './components/time-categories/time-categories.component';
import { TimerControlsComponent } from './components/timer-controls/timer-controls.component';
import { TaskComponent } from './components/task/task.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    PomodoroAppComponent,
    HeaderComponent,
    TimerComponent,
    TimeCategoriesComponent,
    TimerControlsComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, CommonModule, FormsModule, AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
