import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Exercise } from './exercise.model'

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  exerciseSelected = new Subject<Exercise>()
  exerciseHistory: Exercise[] = []//it is of type Exercise array (Exercise[] changes the type Exercise to Exercise array) which is initially set to empty by =[] sign.

  private availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
  ]

  private runningExercise: Exercise

  constructor() { }


  getAvailableExercises() {
    return this.availableExercises.slice()
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(item => item.id === selectedId)

    this.exerciseSelected.next({ ...this.runningExercise })
  }

  getRunningExercise() {
    return { ...this.runningExercise }
  }

  completeExercise() {
    this.exerciseHistory.push(
      {
        ...this.runningExercise,
        date: new Date(),
        state: 'completed'
      }
    )

    this.runningExercise = null
    this.exerciseSelected.next(null)
  }

  cancelExercise(progress: number) {
    this.exerciseHistory.push(
      {
        ...this.runningExercise,
        date: new Date(),
        state: 'cancelled',
        duration: this.runningExercise.duration * (progress / 100),
        calories: this.runningExercise.calories * (progress / 100),
      }
    )

    this.runningExercise = null
    this.exerciseSelected.next(null)
  }

  getCompletedOrCancelledExercises() {
    return this.exerciseHistory.slice()
  }

}
