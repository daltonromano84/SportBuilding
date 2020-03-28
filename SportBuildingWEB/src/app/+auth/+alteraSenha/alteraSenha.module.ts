import { AlteraSenhaComponent } from './alteraSenha.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nModule } from '../../shared/i18n/i18n.module';
import { FormsModule } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';
import { AlteraSenhaRoutingModule } from './alteraSenha-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AlteraSenhaRoutingModule,    
    I18nModule,
    FormsModule,
    ReactiveFormsModule,
  ], 
  exports: [
  ],
  declarations: [AlteraSenhaComponent]
})
export class AlteraSenhaModule { }
