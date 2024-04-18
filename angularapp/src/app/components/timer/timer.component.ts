import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {interval, Subject} from 'rxjs';
import {repeatWhen, take, takeUntil, takeWhile} from 'rxjs/operators';
import {Title} from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

interface Timer {
  id: number;
  taskId: number;
  type: string;
  status: number;
  timer: string;
}

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('progressBar') progressBar!: ElementRef;
  @Input() timerControlAction!: string;
  @Output() completedTimer = new EventEmitter();
  @Input() taskId: any;

  private timer$:any;
  private time = 25; // initial timer amount in minutes
  private get timerStartValue() {
    return this.time * 60; // seconds
  }

  private currentTimer = 'pomodoro';
  private timerRemaining = this.timerStartValue;
  private start$ = new Subject();
  private stop$ = new Subject();
  private readonly pageTitle;
  private apiUrl = 'https://localhost:7190/api/timer';

  constructor(private titleService: Title, private http: HttpClient) {
    this.pageTitle = this.titleService.getTitle();

    this.timer$ = interval(1000).pipe(
      takeUntil(this.stop$),
      takeWhile(v => v >= 0),
      repeatWhen(() => this.start$)
    ); // 1 second interval
  }

  ngOnInit() {
    console.log(this.taskId);
    this.timer$.subscribe((val:any) => {
      this.timerRemaining -= 1; // countdown 1 by 1
      const percentage = ((this.timerStartValue - this.timerRemaining) / this.timerStartValue) * 100;
      this.progressBar.nativeElement.style.width = percentage + '%';
      this.titleService.setTitle(this.formatLeftTime() + ' | ' + this.pageTitle);
      if (percentage === 100) {
        this.completeTimer();
      }
    });

    this.stop(); // initially stop
  }

  private completeTimer() {
    const addDetails = { id: 0, TaskId: this.taskId, status: 3, type: this.currentTimer };
    this.http.post<any>(`${this.apiUrl}?TaskId=${this.taskId}`, addDetails).subscribe(
      (response: any) => {
        console.log('Task added successfully:', response);
      },
      (error: any) => {
        console.error('Error adding task:', error);
        // Handle error (e.g., display error message to the user)
      }
    );
    this.playAudio();
    this.updateStats();
    this.stop();
  }

  ngAfterViewInit() {
    this.progressBar.nativeElement.style.width = '0%';
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.timerControlAction.currentValue === 'start') {
      this.start();
    } else if (changes.timerControlAction.currentValue === 'pause') {
      this.stop();
    } else if (changes.timerControlAction.currentValue === 'restart') {
      this.restart();
    } else if (changes.timerControlAction.currentValue === 'pomodoro') {
      this.setPomodoroTimer();
    } else if (changes.timerControlAction.currentValue === 'short-break') {
      this.setShortBreakTimer();
    } else if (changes.timerControlAction.currentValue === 'long-break') {
      this.setLongBreakTimer();
    }
  }

  private start() {
    const addDetails = { id: 0, TaskId: this.taskId, status: 2, type: this.currentTimer };
    const payload = {}
    // Replace 'your-api-endpoint' with the actual URL of your Web API endpoint for adding a task
    this.http.post<any>(`${this.apiUrl}?TaskId=${this.taskId}`, addDetails).subscribe(
      (response: any) => {
        console.log('Task added successfully:', response);       
      },
        (error: any) => {
        console.error('Error adding task:', error);
        // Handle error (e.g., display error message to the user)
      }
    );
    this.start$.next();
  }

  private stop() {
    const addDetails = { id: 0, TaskId: this.taskId, status: 1 , type: this.currentTimer };
    this.http.post<any>(`${this.apiUrl}?TaskId=${this.taskId}`, addDetails).subscribe(
      (response: any) => {
        console.log('Task added successfully:', response);
      },
      (error: any) => {
        console.error('Error adding task:', error);
        // Handle error (e.g., display error message to the user)
      }
    );
    this.stop$.next();
  }

  private restart() {
    this.stop();
    const addDetails = { id: 0, TaskId: this.taskId, status: 1, type: this.currentTimer };
    this.http.post<any>(`${this.apiUrl}?TaskId=${this.taskId}`, addDetails).subscribe(
      (response: any) => {
        console.log('Task added successfully:', response);
      },
      (error: any) => {
        console.error('Error adding task:', error);
        // Handle error (e.g., display error message to the user)
      }
    );
    this.timerRemaining = this.timerStartValue;
    this.progressBar.nativeElement.style.width = 0 + '%';
  }

  private playAudio() {
    const audio = new Audio('assets/bell.mp3');
    audio.play();
  }

  public formatLeftTime() {
    return new Date(this.timerRemaining * 1000).toISOString().substr(14, 5); // mm:ss format
  }

  private setPomodoroTimer() {
    this.setTimer('pomodoro', 25);
  }

  private setShortBreakTimer() {
    this.setTimer('short-break', 5);
  }

  private setLongBreakTimer() {
    this.setTimer('long-break', 10);
  }

  private setTimer(timerType:any, time:any) {
    this.time = time;
    this.timerRemaining = this.timerStartValue;
    this.currentTimer = timerType;
    this.restart();
  }

  private updateStats() {
    this.completedTimer.emit(this.currentTimer);
  }
}
