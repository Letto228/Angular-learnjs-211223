import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardItemComponent } from './card-item.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [CardItemComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule
  ],
  exports: [CardItemComponent],
})
export class CardItemModule { }
