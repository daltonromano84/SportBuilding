import { BlogModule } from '../+app-views/+blog/blog.module';
import { IEspecialidade } from './especialidade.interface';
export interface IProfissional{
    ID: number;
    Nome: string;
    Idade:number;
    Sexo:string;
    IDBairro:number;
    Bairro:string;
    Endereco:string,
    NumeroRegistro:string,
    Comentario:string,
    Status: boolean;
    UserName: string;
    Roles: string;
    DeveTrocarSenha: boolean;
    Email: string;
    OldPassword: string;
    Senha: string;
    ConfirmPassword: string;
    Token: string;
    ADM: boolean;
    Profissional: boolean;
    Condomino: boolean;
    IDCondominio:number;
    Especialidades:string;
    ListaEspecialidades:IEspecialidade[];
   
 
    
}