import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { UIService } from '../../shared/ui.service';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  exercises: Exercise[]
  exerciseSubscription: Subscription
  isLoading = false
  loadingStateSubscription: Subscription


  constructor(private trainingService: TrainingService,
    private uiService: UIService
  ) {

  }

  ngOnInit(): void {
    this.loadingStateSubscription = this.uiService.loadingState.subscribe(state => {
      this.isLoading = state
    })

    this.fetchExercises()

    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(exercises => this.exercises = exercises)
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises()

  }

  onStartTraining(f: NgForm) {
    this.trainingService.startExercise(f.value.exercise)
  }

  ngOnDestroy() {
    if (this.exerciseSubscription) {

      this.exerciseSubscription.unsubscribe()
    }

    if (this.loadingStateSubscription) {
      this.loadingStateSubscription.unsubscribe()
    }
  }

}
