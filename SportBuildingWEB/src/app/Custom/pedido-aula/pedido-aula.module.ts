import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoAulaComponent } from './pedido-aula/pedido-aula.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyDatePickerModule } from 'mydatepicker';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MyDatePickerModule, 
   
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [PedidoAulaComponent]
})
export class PedidoAulaModule { }
