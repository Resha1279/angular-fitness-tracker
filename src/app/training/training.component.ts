import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {

  startTraining: boolean;


  constructor() {
    //startTraining=false is default behavior so it is initialized in the constructor.
    this.startTraining = false;
  }

  ngOnInit(): void {
  }



}
