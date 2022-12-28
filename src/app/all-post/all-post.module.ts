import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllPostRoutingModule } from './all-post-routing.module';
// import { AllPostComponent } from './all-post.component';

@NgModule({
  declarations: [
    // AllPostComponent
  ],
  imports: [
    CommonModule,
    AllPostRoutingModule,
  ]
})
export class AllPostModule { }
