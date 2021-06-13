import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
  @Output()
  ongoingTraining = new EventEmitter<void>();

  ngOnInit(): void {
  }

  onStartTraining(){
    this.ongoingTraining.emit();
  }

}
