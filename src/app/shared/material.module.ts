import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { materialModules } from './materialModules';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    ...materialModules
  ],
  exports: [
    ...materialModules
  ]
})
export class MaterialModule { }
