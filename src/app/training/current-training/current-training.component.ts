import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from '../stop-training/stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {

  // @Output()
  // exitTraining = new EventEmitter();

  progress:number=0;
  timer:number;

  @Output()
  stopTraining = new EventEmitter<void>()

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.onStartOrResumeTimer();
  }

  onStartOrResumeTimer(){
    this.timer=setInterval(()=>{
      this.progress=this.progress +5
      if(this.progress>=100){
        clearInterval(this.timer);
        //this.onStopTraining();
      }

  },1000);
  }

  onStopTraining(){

    clearInterval(this.timer);

    const dialogRef = this.dialog.open(StopTrainingComponent,{data:{
      progress:this.progress
    }});


    dialogRef.afterClosed().subscribe(result=>{
      if(result===true){
        this.stopTraining.emit();
      } else{
        this.onStartOrResumeTimer();
      }

    })
  }

}
