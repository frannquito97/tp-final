import { Component, EventEmitter, Input, input, OnDestroy, Output } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styles: ``
})
export class TimerComponent implements OnDestroy {
  @Input() duration: number = 30;
  @Output() timerFinished: EventEmitter<void> = new EventEmitter<void>();
  timer: number =0;

  private suscripcion: Subscription | undefined;
  
  constructor(private route:Router){}
  
  iniciarTimer(): void{
    this.timer = this.duration;
    this.suscripcion = interval(1000)
    .pipe(take(this.duration + 1))
    .subscribe({
      next: (value) => {
        this.timer = this.duration - value;
      },
      complete: () => {
        console.log('finish timer');
        this.timerFinished.emit();
      }
    });
  }

  detenerTimer(): void{
    this.suscripcion?.unsubscribe();
  }

  ngOnDestroy(): void {
    this.detenerTimer();
  }
}
