import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import * as fromTraining from '../training.reducer'

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.scss']
})
export class PastTrainingsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'duration', 'calories', 'state', 'date']
  dataSource = new MatTableDataSource<Exercise>()//we are not defining type as array of exercise like Exercise[] because the material table automatically expects to get array of whatever data type we are passing.


  constructor(
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>
  ) { }

  ngOnInit(): void {

    this.store.select(fromTraining.getFinishedExercises).subscribe(ex => {
      this.dataSource.data = ex;
    })


    this.trainingService.fetchCompletedOrCancelledExercises()

  }

}
