import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from '../stop-training/stop-training.component';
import { TrainingService } from '../training.service';

import * as fromTraining from '../training.reducer'
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {

  progress: number = 0;
  timer: number;

  constructor(
    public dialog: MatDialog,
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>
  ) { }

  ngOnInit(): void {
    this.onStartOrResumeTimer();
  }

  onStartOrResumeTimer() {

    this.store.select(fromTraining.getActiveExerxises).subscribe(ex => {
      const steps = ex.duration / 100 * 1000
      this.timer = setInterval(() => {
        this.progress = this.progress + 1
        if (this.progress >= 100) {
          clearInterval(this.timer);
          this.trainingService.completeExercise()
        }

      }, steps);
    })


  }

  onStopTraining() {

    clearInterval(this.timer);//it somehow pauses the interval.

    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });


    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.trainingService.cancelExercise(this.progress)

      } else {
        this.onStartOrResumeTimer();
      }

    })
  }

}
