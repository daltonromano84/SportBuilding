
using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Configuration;
using System.Linq;
using System.Web;
using SportBulidingDomain.Entities;
using System.Reflection;
using System.Diagnostics;
//using SportBulidingDomain.Uteis.Extensions;

namespace GLAplicacoesAPI.Helpers
{
    public static class Logs
    {
        //public static void LogErro(Exception ex, string message = "", bool isWarning = false)
        //{
        //    GLAplicacoesEntities db = new GLAplicacoesEntities();

        //    HttpContext current = HttpContext.Current;

        //    string erro;

        //    if (ex.GetType().Equals(typeof(DbEntityValidationException)))
        //        erro = GetDbEntityValidationErrors((DbEntityValidationException)ex);
        //    else if (ex.GetType().Equals(typeof(CustomException)))
        //        erro = ex.InnerException == null ? ((CustomException)ex).Message.ToString() : ((CustomException)ex).InnerException.ToString();
        //    else
        //        erro = ex.InnerException == null ? ex.Message.ToString() : ex.InnerException.ToString();
        //    LogErro log = null;
        //    if (current == null)
        //    {
        //        log = new LogErro
        //        {
        //            IDUsuario = null,
        //            IP = ExtensionMethods.ToSafeString(current.Request.UserHostAddress),
        //            HostName = "PortalClienteAPI",
        //            Browser = "Sem Current",
        //            DataLog = DateTime.Now,
        //            Pagina = "Sem Current",
        //            Metodo = isWarning ? "1" : "2",
        //            Mensagem = message.IsNull()
        //                           ? ex is CustomException ? ((CustomException)ex).Mensagem : ex.Message
        //                           : message,
        //            Erro = erro
        //        };
        //    }
        //    else
        //    {
        //        log = new LogErro
        //        {
        //            IDUsuario = current.Session != null && SessionManager.colaborador != null ? SessionManager.colaborador.ID : 0,
        //            IP = ExtensionMethods.ToSafeString(current.Request.UserHostAddress),
        //            HostName = current.Server.MachineName,
        //            Browser = current.Request.UserAgent,
        //            DataLog = DateTime.Now,
        //            Pagina = current.Request.Url.AbsolutePath,
        //            Metodo = current.Request.HttpMethod,
        //            Evento = GetMethodName(ex.TargetSite),
        //            Mensagem = message.IsNull()
        //                           ? ex is CustomException ? ((CustomException)ex).Mensagem : ex.Message
        //                           : message,
        //            HttpContext = current.Request.Params.ToSafeString(),
        //            Erro = erro
        //        };
        //    }

        //    //Insere o log do Erro
        //    db.LogErro.Add(log);
        //    db.SaveChangesAsync();

        //}

        //public static void LogAcesso(long idUsuario, Guid idSession)
        //{
        //    LogAcesso(idUsuario, idSession, 0);
        //}
        //public static void LogAcesso(long idUsuario, Guid idSession, int idExterno)
        //{
        //    HttpContext current = HttpContext.Current;

        //    var log = new LogAcesso
        //    {
        //        IDUsuario = idUsuario,
        //        Ip = ExtensionMethods.ToSafeString(current.Request.UserHostAddress),
        //        HostName = current.Request.Url.Host,
        //        Browser = current.Request.Browser.Browser,
        //        Versao = current.Request.Browser.Version,
        //        DataInclusao = DateTime.Now,
        //        IDSession = idSession,
        //        PaginaDestino = current.Request.Url.AbsolutePath,
        //        PaginaAnterior = current.Request.UrlReferrer != null ? current.Request.UrlReferrer.AbsolutePath : String.Empty
        //    };
        //    var service = new LogAcessoService();
        //    service.SaveOrUpdate(log);
        //}

        //public static void LogAcao(long idUsuario, Guid idSession)
        //{
        //    LogAcao(idUsuario, idSession, 0);
        //}
        //public static void LogAcao(long idUsuario, Guid idSession, int idExterno)
        //{
        //    HttpContext current = HttpContext.Current;

        //    var log = new LogAcao
        //    {
        //        IDUsuario = idUsuario,
        //        Ip = ExtensionMethods.ToSafeString(current.Request.UserHostAddress),
        //        HostName = current.Request.Url.Host,
        //        Browser = current.Request.Browser.Browser,
        //        Versao = current.Request.Browser.Version,
        //        DataInclusao = DateTime.Now,
        //        IDSession = idSession,
        //        PaginaDestino = current.Request.Url.AbsolutePath,
        //        PaginaAnterior = current.Request.UrlReferrer != null ? current.Request.UrlReferrer.AbsolutePath : String.Empty
        //    };
        //    var service = new LogAcaoService();
        //    service.SaveOrUpdate(log);
        //}

        //public static string GetDbEntityValidationErrors(DbEntityValidationException ex)
        //{
        //    string error = String.Empty;
        //    foreach (var validationErrors in ex.EntityValidationErrors)
        //    {
        //        foreach (var validationError in validationErrors.ValidationErrors)
        //        {
        //            error = String.Concat(error, Environment.NewLine, validationError.ErrorMessage);
        //        }
        //    }
        //    return error;
        //}

        //public static string GetMethodName(MethodBase targetSite)
        //{
        //    return targetSite != null
        //               ? targetSite.DeclaringType.FullName + "." + targetSite.Name
        //               : new StackTrace(new StackFrame(1)).GetFrame(1).GetMethod().ToSafeString();
        //}

    }

}