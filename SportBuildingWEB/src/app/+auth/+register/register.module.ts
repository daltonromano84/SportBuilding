import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { TermsModalComponent } from './terms-modal/terms-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';
import { SmartadminModule } from 'app/shared/smartadmin.module';
import { SmartadminDatatableModule } from 'app/shared/ui/datatable/smartadmin-datatable.module';
import { SmartadminValidationModule } from 'app/shared/forms/validation/smartadmin-validation.module';
import { SmartadminInputModule } from 'app/shared/forms/input/smartadmin-input.module';

@NgModule({
  imports: [
    CommonModule,
    RegisterRoutingModule,
    MyDatePickerModule,
  
    SmartadminModule,  
    SmartadminDatatableModule,
    SmartadminValidationModule,
    SmartadminInputModule,
    ReactiveFormsModule

 
  ],
  exports: [],
  declarations: [RegisterComponent, TermsModalComponent]
})
export class RegisterModule { }
