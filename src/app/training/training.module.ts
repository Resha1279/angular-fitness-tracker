import { NgModule } from '@angular/core';

import { TrainingComponent } from './training.component';

import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { StopTrainingComponent } from './stop-training/stop-training.component'
import { SharedModule } from '../shared/shared.module'
import { TrainingRoutingModule } from './training-routing.module';
import { StoreModule } from '@ngrx/store';
import { trainingReducer } from './training.reducer';


@NgModule({
  imports: [
    SharedModule,
    TrainingRoutingModule,
    StoreModule.forFeature('training', trainingReducer)
  ],
  exports: [],
  declarations: [TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    StopTrainingComponent,

  ],
  providers: [],
  entryComponents: [StopTrainingComponent]//because this component is not called from router or template. it is depricated for ivy but keep it just in case
})
export class TrainingModule { }
