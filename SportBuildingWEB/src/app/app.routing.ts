/**
 * Created by griga on 7/11/16.
 */


import {Routes, RouterModule} from '@angular/router';
import {MainLayoutComponent} from "./shared/layout/app-layouts/main-layout.component";
import {AuthLayoutComponent} from "./shared/layout/app-layouts/auth-layout.component";
import {ModuleWithProviders} from "@angular/core";
import { OuvidoriaListComponent } from './GLCustom/ouvidoria/ouvidoria-list/ouvidoria-list.component';
import { ProfissionalListaComponent } from './Custom/profissional/profissional-lista/profissional-lista.component';
import { ProfileComponent } from './+app-views/+profile/profile.component';
import { ProfissionalPerfilComponent } from './Custom/profissional/profissional-perfil/profissional-perfil.component';
import { CondominioPerfilComponent } from './Custom/condominio/condominio-perfil/condominio-perfil.component';
import { PedidoAulaComponent } from './Custom/pedido-aula/pedido-aula/pedido-aula.component';
import { ProfissionalAgendaComponent } from './Custom/profissional/profissional-agenda/profissional-agenda.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    data: {pageTitle: 'Home'},
    children: [
      {
        path: '', redirectTo: 'auth/login', pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: 'app/+dashboard/dashboard.module#DashboardModule',
        data: {pageTitle: 'Painel'}
      }, 
 
      
      {
        path: '',
        data: {pageTitle: 'Painel'},
        children: [

          {
            path: 'profissionalLista',
            loadChildren: 'app/Custom/profissional/profissional.module#ProfissionalModule',
            data: {pageTitle: 'Profissional'}
          }, 
          {
            path:'profissional/listProfissional',
            component: ProfissionalListaComponent,
            data: {pageTitle: 'Lista Profissional'} 
          }, 
          {
            path:'profissional/perfil',
            component: ProfissionalPerfilComponent,
            data: {pageTitle: 'Perfil do Profissional'} 
          },
          {
            path:'profissional/agenda',
            component: ProfissionalAgendaComponent,
            data: {pageTitle: 'Agenda do Profissional'} 
          },     
          {
            path:'condominio/perfil',
            component: CondominioPerfilComponent,
            data: {pageTitle: 'Perfil do Condominio'} 
          }, 
          
          {
            path:'aulaPedido/agendar',
            component: PedidoAulaComponent,
            data: {pageTitle: 'Agendar Aula'} 
          },     
        
      
          // {
          //   path: 'colaborador', 
          //   loadChildren: 'app/GLCustom/colaborador/colaborador.module#ColaboradorModule',
          //   data: {pageTitle: 'Colaboradores'}
          // },
          // {
          //   path: 'equipe', 
          //   loadChildren: 'app/GLCustom/equipe/equipe-registro.module#EquipeRegistroModule',
          //   data: {pageTitle: 'Equipes'}
          // },
          // {
          //   path: 'competencia', 
          //   loadChildren: 'app/GLCustom/competencia/competencia-registro.module#CompetenciaRegistroModule',
          //   data: {pageTitle: 'Competencia'}
          // },
          // {
          //   path: 'avaliacao-modelo', 
          //   loadChildren: 'app/GLCustom/avaliacaoModelo/avaliacaoModelo.module#AvaliacaoModeloModule',
          //   data: {pageTitle: 'Modelo de Avaliação'}
          // } ,
          // {
          //   path: 'avaliacao-cabecalho', 
          //   loadChildren: 'app/GLCustom/avaliacaoCabecalho/avaliacaoCabecalho.module#AvaliacaoCabecalhoModule',
          //   data: {pageTitle: 'Cabeçalho de Avaliações'}
          // } ,
          // {
          //   path: 'minhasAvaliacoes', 
          //   loadChildren: 'app/GLCustom/minhaAvaliacao/minhaAvaliacao.module#MinhaAvaliacaoModule',
          //   data: {pageTitle: 'Minhas Avaliações'}
          // } ,
          // {
          //   path: 'dashboardGestor', 
          //   loadChildren: 'app/GLCustom/gestor/gestor.module#GestorModule',
          //   data: {pageTitle: 'Painel do Gestor'}
          // },
          // {
          //   path: 'dashboardRH', 
          //   loadChildren: 'app/GLCustom/RH/rh.module#RHModule',
          //   data: {pageTitle: 'Painel de Recursos Humanos'}
          // },
          // {
          //   path: 'dashboardColaborador', 
          //   loadChildren: 'app/GLCustom/colab/colab.module#ColabModule',
          //   data: {pageTitle: 'Painel do Colaborador'}
          // },
          //  {
          //    path: 'ouvidoriaLista', 
          //    loadChildren: 'app/GLCustom/ouvidoria/ouvidoria.module#OuvidoriaModule',
          //    data: {pageTitle: 'Painel do Colaborador'}
          //  },

          //  {
          //   path:'ouvidoria/listOuvidoria',
          //   component: OuvidoriaListComponent,
          //   data: {pageTitle: 'Painel do Ouvidor'}
          // },
        ]
      },
      
      // {
      //   path: 'smartadmin',
      //   loadChildren: 'app/+smartadmin-intel/smartadmin-intel.module#SmartadminIntelModule',
      //   data: {pageTitle: 'Smartadmin'}
      // },
      // {
      //   path: 'app-views',
      //   loadChildren: 'app/+app-views/app-views.module#AppViewsModule',
      //   data: {pageTitle: 'App Views'}
      // },
      // {
      //   path: 'calendar',
      //   loadChildren: 'app/+calendar/calendar.module#CalendarModule'
      // },
      // {
      //   path: 'e-commerce',
      //   loadChildren: 'app/+e-commerce/e-commerce.module#ECommerceModule',
      //   data: {pageTitle: 'E-commerce'}
      // },

      // {
      //   path: 'forms',
      //   loadChildren: 'app/+forms/forms-showcase.module#FormsShowcaseModule',
      //   data: {pageTitle: 'Forms'}
      // },
      {
        path: 'graphs',
        loadChildren: 'app/+graphs/graphs-showcase.module#GraphsShowcaseModule',
        data: {pageTitle: 'Graphs'}
      },
      // {
      //   path: 'maps',
      //   loadChildren: 'app/+maps/maps.module#MapsModule',
      //   data: {pageTitle: 'Maps'}
      // },
      // {
      //   path: 'miscellaneous',
      //   loadChildren: 'app/+miscellaneous/miscellaneous.module#MiscellaneousModule',
      //   data: {pageTitle: 'Miscellaneous'}
      // },
      // {
      //   path: 'outlook',
      //   loadChildren: 'app/+outlook/outlook.module#OutlookModule',
      //   data: {pageTitle: 'Outlook'}
      // },
      // {
      //   path: 'tables',
      //   loadChildren: 'app/+tables/tables.module#TablesModule',
      //   data: {pageTitle: 'Tables'}
      // },
      // {
      //   path: 'ui',
      //   loadChildren: 'app/+ui-elements/ui-elements.module#UiElementsModule',
      //   data: {pageTitle: 'Ui'}
      // },
      // {
      //   path: 'widgets',
      //   loadChildren: 'app/+widgets/widgets-showcase.module#WidgetsShowcaseModule',
      //   data: {pageTitle: 'Widgets'}
      // },
    ]
  },  
  {path: 'auth', component: AuthLayoutComponent, loadChildren: 'app/+auth/auth.module#AuthModule'},
  {path: '**', redirectTo: 'miscellaneous/error404'},  
  // {
  //   path: 'iManage', 
  //   loadChildren: 'app/GLCustom/iManage/iManage.module#IManageModule',
  //   data: {pageTitle: 'iManage Integração'}
  // },    
  // {
  //   path: 'minhaAvaliacao', 
  //   loadChildren: 'app/GLCustom/minhaAvaliacao/minhaAvaliacao.module#MinhaAvaliacaoModule',
  //   data: {pageTitle: 'Minha Avaliação'}
  // },

];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {useHash: true});
