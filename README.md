#Pomodoro Application

This project implements a Pomodoro Timer that uses Angular for frontend, .NET Core WebAPI for backend and uses SQL Server for database Operations.

Implemented Features:

Login Users
SignUp Users
Add, Edit and Detele a task
Each task has a Pomodoro Timer
Progress Bar Animation
Pomodoro, Short Break and Long Break Timers
Showing timer time instantly on page title
rxjs timer (observable)
A bell ring sound when time is up.

## Project SetUp

In Visual Studio 2022, Click on New Project -> Select Angular and .Net Core from the template -> Select a location to create the project -> click on Create. The solution will render 2 projects one with angular and the other with WebAPI.

For Database creation, right click Solution -> Add new Project -> Select Class Library from Template -> click Create. Once the project is added to the solution, right click the Database Project -> Add -> New Item -> Select item 'Service Based Database' -> Provide a name (eg.Pomodoro) -> Add. A new database instance is created with Pomodoro.mdf. 
Click on View -> Server Explorer -> You can see the Pomodoro database there. Right click Database -> Properties -> Connection String. Copy the connection string value and add it to appsetting.json in webapi project.

Develop the code to implement the pomodoro timer.

#.NET Core WebAPI

This project used .NET Core 6 for implementing WebAPI.
Once the user logs-in, the JWT token is generated and sent to the frontend for authorization.

## Development server

In Visual Studio, click Debug -> Start Debugging. Navigate to `https://localhost:7190/swagger/index.html` to individually test the API.

# Angularapp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.18.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
