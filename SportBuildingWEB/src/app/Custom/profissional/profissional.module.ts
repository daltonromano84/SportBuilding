import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfissionalCadastroComponent } from './profissional-cadastro/profissional-cadastro.component';
import { ProfissionalRoutingModule } from './profissional-routing.module';
import { ProfissionalListaComponent } from './profissional-lista/profissional-lista.component';
import { ProfissionalPerfilComponent } from './profissional-perfil/profissional-perfil.component';
import { SmartadminLayoutModule } from 'app/shared/layout';
import { StatsModule } from 'app/shared/stats/stats.module';
import { ProfissionalAgendaComponent } from './profissional-agenda/profissional-agenda.component';

@NgModule({
  imports: [
    CommonModule,
    ProfissionalRoutingModule,
    SmartadminLayoutModule,
    StatsModule,
  ],
  declarations: [ProfissionalCadastroComponent, ProfissionalListaComponent, ProfissionalPerfilComponent, ProfissionalAgendaComponent]
})
export class ProfissionalModule { }
