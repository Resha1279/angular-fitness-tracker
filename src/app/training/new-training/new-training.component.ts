import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  exercises: Exercise[]
  exerciseSubscription: Subscription


  constructor(private trainingService: TrainingService) {

  }

  ngOnInit(): void {
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(exercises => this.exercises = exercises)
    this.trainingService.fetchAvailableExercises()
  }

  onStartTraining(f: NgForm) {
    this.trainingService.startExercise(f.value.exercise)
  }

  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe()
  }

}
