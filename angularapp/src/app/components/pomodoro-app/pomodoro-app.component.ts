import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pomodoro-app',
  templateUrl: './pomodoro-app.component.html',
  styleUrls: ['./pomodoro-app.component.scss']
})
export class PomodoroAppComponent implements OnInit {
  public timerControlAction:any;
  public appStatus = {takenPomodoroNum: 0, takenShortBreakNum: 0, takenLongBreakNum: 0};
  taskId: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.taskId = this.route.snapshot.paramMap.get('id');
  }

  receiveAction($event: any) {
    this.timerControlAction = $event;
  }

  timerCompletedEvent($event:any) {
    if ($event === 'pomodoro') {
      this.appStatus.takenPomodoroNum++;
    } else if ($event === 'short-break') {
      this.appStatus.takenShortBreakNum++;
    } else if ($event === 'long-break') {
      this.appStatus.takenLongBreakNum++;
    }
  }

}
