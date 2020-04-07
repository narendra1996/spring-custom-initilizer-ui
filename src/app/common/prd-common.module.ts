import { NgModule } from '@angular/core';
import { SingleSelectComponent } from './single-select/single-select.component';
import { CommonService } from './common.service';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    SingleSelectComponent
  ],

  imports: [
    CommonModule
  ],

  providers: [
    CommonService
  ],

  exports: [
    SingleSelectComponent
  ]

})
export class PrdCommonModule { }
