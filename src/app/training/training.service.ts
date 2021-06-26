import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Exercise } from './exercise.model'
import { UIService } from '../shared/ui.service';

import * as fromTraining from './training.reducer'
import * as UI from '../shared/ui.actions'
import * as Training from './training.actions'
import { Store } from '@ngrx/store';


@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  private firebaseSubscriptions: Subscription[] = []


  constructor(private firestore: AngularFirestore,
    private uiService: UIService, private store: Store<fromTraining.State>
  ) { }


  fetchAvailableExercises() {
    this.store.dispatch(new UI.StartLoading())

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
          this.store.dispatch(new Training.SetAvailableExercises(exercises))
          this.store.dispatch(new UI.StopLoading())

        }, () => {
          //error part
          this.store.dispatch(new UI.StopLoading())
          this.uiService.showSnackbar('Fetching exercises failed. Please try again later', null, 3000, 'top')
        })
    )
  }


  startExercise(selectedId: string) {
    this.store.dispatch(new Training.StartExercise(selectedId))
  }


  completeExercise() {
    this.store.select(fromTraining.getActiveExerxises).subscribe(ex => {
      this.addDataToDatabase(
        {
          ...ex,
          date: new Date(),
          state: 'completed'
        }
      )
    })


    this.store.dispatch(new Training.StopExercise())
  }

  cancelExercise(progress: number) {
    this.store.select(fromTraining.getActiveExerxises).subscribe(ex => {
      this.addDataToDatabase(
        {
          ...ex,
          date: new Date(),
          state: 'cancelled',
          duration: ex.duration * (progress / 100),
          calories: ex.calories * (progress / 100),
        }
      )

    })


    this.store.dispatch(new Training.StopExercise())
  }

  fetchCompletedOrCancelledExercises() {
    this.firebaseSubscriptions.push(
      this.firestore
        .collection('ExerciseHistory')
        .valueChanges()
        .subscribe((exercises: Exercise[]) => {
          this.store.dispatch(new Training.SetFinishedExercises(exercises))
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
