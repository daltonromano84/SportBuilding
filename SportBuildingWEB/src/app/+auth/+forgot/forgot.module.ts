import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotRoutingModule } from './forgot-routing.module';
import { ForgotComponent } from './forgot.component';
import { I18nModule } from '../../shared/i18n/i18n.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ForgotRoutingModule,    
    I18nModule,
    FormsModule, 
    ReactiveFormsModule,   
  ],
  declarations: [ForgotComponent]
})
export class ForgotModule { }
