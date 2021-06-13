import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-stop-training',
  templateUrl: './stop-training.component.html',
  styleUrls: ['./stop-training.component.scss']
})
export class StopTrainingComponent implements OnInit {


//angular has constants like MAT_DIALOG_DATA where it somehow stores data like in this case from dialog and we can access this data using constant
  constructor( @Inject(MAT_DIALOG_DATA) public passedData: any ) { }

  ngOnInit() {
  }

}
