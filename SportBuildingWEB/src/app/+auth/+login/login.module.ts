import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { I18nModule } from '../../shared/i18n/i18n.module';
import { FormsModule } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,    
    I18nModule,
    FormsModule,
    ReactiveFormsModule,
  ], 
  exports: [
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
