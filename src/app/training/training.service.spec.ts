/* tslint:disable:no-unused-variable */

import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { TrainingService } from './training.service';

describe('Service: Training', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrainingService]
    });
  });

  it('should ...', inject([TrainingService], (service: TrainingService) => {
    expect(service).toBeTruthy();
  }));
});
