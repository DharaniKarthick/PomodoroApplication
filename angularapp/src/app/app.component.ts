import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //public forecasts?: WeatherForecast[];

  //constructor(http: HttpClient) {
  //  http.get<WeatherForecast[]>('/weatherforecast').subscribe(result => {
  //    this.forecasts = result;
  //  }, error => console.error(error));
  //}
  constructor(private router: Router) {
    //this.login();
  }
  ngOnInit(): void {
    this.router.navigate(['/login']); // Navigate to login route on app initialization
  }

  login(): void {
    this.router.navigate(['pomodoro-app']);
  }
  title = 'angularapp';
}

//interface WeatherForecast {
//  date: string;
//  temperatureC: number;
//  temperatureF: number;
//  summary: string;
//}
