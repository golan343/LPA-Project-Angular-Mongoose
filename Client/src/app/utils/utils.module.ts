import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoCompleteComponent } from './auto-complete/auto-complete.component';
import {PhonesCodeComponent} from './phones-code/phones-code.component';




@NgModule({
  declarations: [AutoCompleteComponent, PhonesCodeComponent],
  imports: [
    CommonModule
  ],
  exports: [AutoCompleteComponent, PhonesCodeComponent]
})
export class UtilsModule { }
