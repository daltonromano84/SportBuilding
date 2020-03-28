import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { TermsModalComponent } from './terms-modal/terms-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';
import { SmartadminModule } from 'app/shared/smartadmin.module';
import { SmartadminDatatableModule } from 'app/shared/ui/datatable/smartadmin-datatable.module';
import { SmartadminValidationModule } from 'app/shared/forms/validation/smartadmin-validation.module';
import { SmartadminInputModule } from 'app/shared/forms/input/smartadmin-input.module';
import { RegisterCondominioComponent } from './registerCondominio.component';
import { RegisterCondominioRoutingModule } from './registerCondominio-routing.module';



@NgModule({
  imports: [
    CommonModule,
    RegisterCondominioRoutingModule,
    MyDatePickerModule,
  
    SmartadminModule,  
    SmartadminDatatableModule,
    SmartadminValidationModule,
    SmartadminInputModule,
    ReactiveFormsModule

 
  ],
  exports: [],
  declarations: [RegisterCondominioComponent, TermsModalComponent]
})
export class RegisterCondominioModule { }
