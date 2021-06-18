import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

import { Subject } from 'rxjs';
import { Exercise } from './exercise.model'
import { UIService } from '../shared/ui.service';


@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  private firebaseSubscriptions: Subscription[] = []

  exerciseSelected = new Subject<Exercise>()//when user selects exercise in the dropdown
  exercisesChanged = new Subject<Exercise[]>();//exercises populated in the dropdown when new-training component initializes
  exerciseHistoryChanged = new Subject<Exercise[]>()//after user completes or cancels exercise the exercise is populated to database and that data is received here from the database
  exerciseHistory: Exercise[] = []//the exercise that user has completed or canceled. it is of type Exercise array (Exercise[] changes the type Exercise to Exercise array) which is initially set to empty by =[] sign.

  private availableExercises: Exercise[] = []

  private runningExercise: Exercise

  constructor(private firestore: AngularFirestore,
    private uiService: UIService
  ) { }


  fetchAvailableExercises() {
    this.uiService.loadingState.next(true)

    this.firebaseSubscriptions.push(
      this.firestore.collection<Exercise>('AvailableExercises')
        .snapshotChanges()
        .pipe(map(docArray => {

          return docArray.map(doc => {
            const data = doc.payload.doc.data()
            const id = doc.payload.doc.id

            return { id, ...data }
          })
        }))
        .subscribe((exercises: Exercise[]) => {
          this.availableExercises = exercises
          this.exercisesChanged.next([...this.availableExercises])
          this.uiService.loadingState.next(false)

        }, () => {
          //error part
          this.exercisesChanged.next(null)
          this.uiService.loadingState.next(false)
          this.uiService.showSnackbar('Fetching exercises failed. Please try again later', null, 3000, 'top')
        })
    )
  }


  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(item => item.id === selectedId)

    this.exerciseSelected.next({ ...this.runningExercise })
  }

  getRunningExercise() {
    return { ...this.runningExercise }
  }

  completeExercise() {
    this.addDataToDatabase(
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
    this.addDataToDatabase(
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

  fetchCompletedOrCancelledExercises() {
    this.firebaseSubscriptions.push(
      this.firestore
        .collection('ExerciseHistory')
        .valueChanges()
        .subscribe((exercises: Exercise[]) => {
          this.exerciseHistoryChanged.next(exercises)
        })
    )
  }

  private addDataToDatabase(exercise: Exercise) {
    this.firestore.collection('ExerciseHistory').add(exercise)
  }



  cancelSubscriptions() {
    this.firebaseSubscriptions.forEach(subs => {
      subs.unsubscribe()
    })
  }

}
