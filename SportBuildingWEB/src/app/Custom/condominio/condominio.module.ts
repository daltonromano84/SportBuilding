import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CondominioComponent } from './condominio/condominio.component';
import { CondominioPerfilComponent } from './condominio-perfil/condominio-perfil.component';
import { RegisterCondominioRoutingModule } from 'app/+auth/+registerCondominio/registerCondominio-routing.module';
import { SmartadminLayoutModule } from 'app/shared/layout';
import { StatsModule } from 'app/shared/stats/stats.module';

@NgModule({
  imports: [
    CommonModule,
    RegisterCondominioRoutingModule,
    SmartadminLayoutModule,
    StatsModule,
  ],
  declarations: [CondominioComponent, CondominioPerfilComponent]
})
export class CondominioModule { }
