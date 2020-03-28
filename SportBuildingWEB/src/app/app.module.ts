
import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

/*
 * Platform and Environment providers/directives/pipes
 */
import { routing } from './app.routing'
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';

// Core providers
import {CoreModule} from "./core/core.module";
import {SmartadminLayoutModule} from "./shared/layout/layout.module";

import { ModalModule } from 'ngx-bootstrap/modal';

import { Http, HttpModule } from '@angular/http';

import { SharedService } from "../app/services/shared.service";

import { LoginService } from './services/login.service';


import { CustomValidator } from './services/customValidator.service';

import { EmailService } from './services/email.service';

import { WINDOW_PROVIDERS } from './services/windowProvider.service';
import { LogAcessoService } from './services/logAcesso.service';


import { HttpClientModule } from '@angular/common/http'

import { ModalService } from './services/modal.service';

import { DatePipe } from '@angular/common';

import { ProfissionalService } from './services/profissional.service';
import { ProfissionalListaComponent } from './Custom/profissional/profissional-lista/profissional-lista.component';
import { ProfileModule } from './+app-views/+profile/profile.module';
import { ProfissionalModule } from './Custom/profissional/profissional.module';
import { ProfissionalPerfilComponent } from './Custom/profissional/profissional-perfil/profissional-perfil.component';
import { StatsModule } from './shared/stats/stats.module';
import { AuthModule } from './+auth/auth.module';
import { BairroService } from './services/bairro.service';
import { CondominioService } from './services/condominio.service';
import { CondominioPerfilComponent } from './Custom/condominio/condominio-perfil/condominio-perfil.component';
import { EspecialidadeService } from './services/especialidade.service';
import { PedidoAulaComponent } from './Custom/pedido-aula/pedido-aula/pedido-aula.component';
import { MyDatePickerModule } from 'mydatepicker';
import { PedidoAulaService } from './services/pedidoAula.service';
import { ProfissionalAgendaComponent } from './Custom/profissional/profissional-agenda/profissional-agenda.component';









// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    ProfissionalListaComponent , 
    ProfissionalPerfilComponent,
    PedidoAulaComponent,
    ProfissionalAgendaComponent,
    CondominioPerfilComponent,
    

    
  ],
  imports: [ // import Angular's modules
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ModalModule.forRoot(),
    CoreModule,
    SmartadminLayoutModule,
    routing,
    HttpModule, 
    ReactiveFormsModule,
    ProfileModule,
    AuthModule,
    MyDatePickerModule
  
    

    
   
  ],
  exports: [
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    // ENV_PROVIDERS,
    APP_PROVIDERS,
    WINDOW_PROVIDERS,
    SharedService,
    ProfissionalService,
    LoginService,
    CustomValidator,
    EmailService,
    LogAcessoService,
    ModalService,
    BairroService,
    CondominioService,
    EspecialidadeService,
    DatePipe,
    PedidoAulaService
 
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef, public appState: AppState) {}


}

