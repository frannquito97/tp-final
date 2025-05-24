import { Component, EventEmitter, Input, input, OnDestroy, Output } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subscription, take } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styles: ``
})
export class TimerComponent implements OnDestroy {
  @Input() duration: number = environment.duration;
  @Output() timerFinished: EventEmitter<void> = new EventEmitter<void>();
  timer: number =0;

  private suscripcion: Subscription | undefined;
  
  constructor(private router:Router){}
  
  iniciarTimer(): void{
    this.timer = this.duration;
    this.suscripcion = interval(1000)
    .pipe(take(this.duration + 1))
    .subscribe({
      next: (value) => {
        this.timer = this.duration - value;
      },
      complete: async () => {
        console.log('finish timer');
        Swal.fire({
          title: 'Time Over!',
          icon: 'info',
          confirmButtonColor: 'blue',
          confirmButtonText: 'Back to Home',
          showCancelButton: true,
          cancelButtonText: 'Play Again',
          cancelButtonColor: 'green',
          html: 'Game over, Play Again?'
        }).then( (result) => {
          if(result.value){
            this.timerFinished.emit();
            this.router.navigateByUrl('/home');
          }else if(result.dismiss === Swal.DismissReason.cancel){
            window.location.reload();
          }
        })
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
