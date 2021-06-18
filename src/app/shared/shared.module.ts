import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';


@NgModule({
  imports: [CommonModule, MaterialModule, FormsModule,],
  exports: [CommonModule, MaterialModule, FormsModule,],
  declarations: [],
  providers: [],
})
export class SharedModule { }
