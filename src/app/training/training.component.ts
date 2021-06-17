import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit, OnDestroy {

  startTraining: boolean;
  exerciseSubscription: Subscription


  constructor(private trainingService: TrainingService) {

  }

  ngOnInit(): void {
    this.exerciseSubscription = this.trainingService.exerciseSelected.subscribe(exercise => {
      if (exercise) {
        this.startTraining = true
      } else {
        this.startTraining = false
      }
    })
  }

  ngOnDestroy() {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe()
    }
  }


}
