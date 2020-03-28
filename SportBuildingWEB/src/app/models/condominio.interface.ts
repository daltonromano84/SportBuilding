import { BlogModule } from '../+app-views/+blog/blog.module';

export interface ICondominio{
    ID: number;
    NomeCondominio: string;
    CNPJ:number;
    Celular:string;
    IDBairro:number;
    Bairro:string;
    Endereco:string,
    NomeResponsavel:string,  
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

    
    
}