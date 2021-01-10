import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoCompleteComponent } from './auto-complete/auto-complete.component';



@NgModule({
  declarations: [AutoCompleteComponent],
  imports: [
    CommonModule
  ],
  exports: [AutoCompleteComponent]
})
export class UtilsModule { }
