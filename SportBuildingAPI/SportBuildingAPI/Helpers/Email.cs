using System;
using System.Collections.Generic;
using System.Net;
//using System.Xml;
using SportBuildingAPI.Models;
using System.Net.Mail;
using System.IO;
using System.Configuration;

namespace SportBuildingAPI.Helpers
{
    //public class Email 
    //{
    //    public bool EnviaEmailRelayHostExterno(List<string> strDestinatario, 
    //                                           string strAssunto, 
    //                                           string strCorpoEmail, 
    //                                           ref ErroModel objErro, 
    //                                           List<string> strCopia = null, 
    //                                           List<string> strCopiaOculta = null, 
    //                                           List<AnexoModel> objAnexos = null)
    //    {

    //        bool blnDestinatarioValido = false;

    //        string strEmailDestinatario = string.Empty;
    //        string strEmailCopia = string.Empty;
    //        string strEmailCopiaOculta = string.Empty;

    //        //XmlDocument xmlConfig = new XmlDocument();

    //        string strHostSMTP = string.Empty;
    //        int intHostPorta = 0;
    //        string strRemetente = string.Empty;
    //        string strCredentialUser = string.Empty;
    //        string strCredentialPwd = string.Empty;

    //        System.Net.Mail.Attachment attAnexo;
    //        List<System.Net.Mail.Attachment> attAnexos = new List<System.Net.Mail.Attachment>();

    //        try
    //        {
    //            //xmlConfig.Load(@"C:\GLFramework\Configuracoes.xml");

    //            // Validações
    //            if (ConfigurationManager.AppSettings["remetente"].Length <= 0)
    //                throw new ApplicationException("Remetente não informado no XML de Configurações");

    //            if (strDestinatario.Count == 0)
    //                throw new ApplicationException("Ao Menos Um Destinatario é Requerido");

    //            if (strAssunto.Length <= 0)
    //                throw new ApplicationException("Assunto Requerido");

    //            if (strCorpoEmail.Length <= 0)
    //                throw new ApplicationException("Corpo do E-mail Requerido");

    //            if (ConfigurationManager.AppSettings["user"].Length == 0)
    //                throw new ApplicationException("Usuário não informado no XML de Configurações");

    //            if (ConfigurationManager.AppSettings["pwd"].Length == 0)
    //                throw new ApplicationException("Senha não informada no XML de Configurações");

    //            if (ConfigurationManager.AppSettings["host"].Length == 0)
    //                throw new ApplicationException("HOST não informado no XML de Configurações");

    //            if (ConfigurationManager.AppSettings["hostPorta"].Length == 0)
    //                throw new ApplicationException("PORTA não informada no XML de Configurações");

    //            strHostSMTP = ConfigurationManager.AppSettings["host"];
    //            intHostPorta = Convert.ToInt16(ConfigurationManager.AppSettings["hostPorta"]);
    //            strRemetente = ConfigurationManager.AppSettings["remetente"];
    //            strCredentialUser = ConfigurationManager.AppSettings["user"];
    //            strCredentialPwd = ConfigurationManager.AppSettings["pwd"];

    //            System.Net.Mail.MailAddress mailRemetente = new System.Net.Mail.MailAddress(strRemetente);

    //            MailMessage objMail = new MailMessage();

    //            System.Net.Mail.SmtpClient objSmtp = new System.Net.Mail.SmtpClient(strHostSMTP);
    //            // Dim objServer As New Mail.SmtpServer(strHostSMTP)

    //            // Monta String de Destinatarios para passar para o email 
    //            // Quebra o List de string para uma string única, separando cada destinatario por virgula
    //            for (int intCount = 0; intCount <= strDestinatario.Count - 1; intCount++)
    //            {

    //                // Teste para identificar se há ao menos um e-mail cadastrado para o contato
    //                if (strDestinatario[intCount].Length > 0)
    //                {
    //                    blnDestinatarioValido = true;

    //                    if (strEmailDestinatario.Length == 0)
    //                        strEmailDestinatario = strDestinatario[intCount];
    //                    else
    //                        strEmailDestinatario = strEmailDestinatario + ", " + strDestinatario[intCount];
    //                }
    //            }

    //            // Monta String de Cópia para passar para o email 
    //            // Quebra o List de string para uma string única, separando cada cópia por virgula
    //            if (strCopia != null)
    //            {
    //                for (int intCount = 0; intCount <= strCopia.Count - 1; intCount++)
    //                {
    //                    if (strEmailCopia.Length == 0)
    //                        strEmailCopia = strCopia[intCount];
    //                    else
    //                        strEmailCopia = strEmailCopia + ", " + strCopia[intCount];
    //                }
    //            }

    //            // Monta String de Cópia Oculta para passar para o email
    //            // Quebra o List de string para uma string única, separando cada cópia oculta por virgula
    //            if (strCopiaOculta != null)
    //            {
    //                for (int intCount = 0; intCount <= strCopiaOculta.Count - 1; intCount++)
    //                {
    //                    if (strEmailCopiaOculta.Length == 0)
    //                        strEmailCopiaOculta = strCopiaOculta[intCount];
    //                    else
    //                        strEmailCopiaOculta = strEmailCopiaOculta + ", " + strCopiaOculta[intCount];
    //                }
    //            }

    //            if (blnDestinatarioValido)
    //            {

    //                // Itens básicos do E-mail
    //                objMail.From = mailRemetente;

    //                objMail.To.Add(strEmailDestinatario);
    //                if (strEmailCopia.Length > 0)
    //                    objMail.CC.Add(strEmailCopia);
    //                if (strEmailCopiaOculta.Length > 0)
    //                    objMail.Bcc.Add(strEmailCopiaOculta);

    //                objMail.Subject = strAssunto;
    //                objMail.IsBodyHtml = true;
    //                objMail.Body = strCorpoEmail;

    //                objSmtp.UseDefaultCredentials = false;

    //                objSmtp.Port = intHostPorta;

    //                objSmtp.EnableSsl = true;
    //                objSmtp.Timeout = 6000000;

    //                // Itens de Autenticação e infra
    //                NetworkCredential cred = new NetworkCredential(strCredentialUser, strCredentialPwd);
    //                objSmtp.Credentials = cred;

    //                // Trata array de Anexos
    //                // Quebra o List de arquivos em byte para converter em Attachment
    //                if (objAnexos != null)
    //                {
    //                    for (int intCount = 0; intCount <= objAnexos.Count - 1; intCount++)
    //                    {
    //                        MemoryStream msAnexo = new MemoryStream(objAnexos[intCount].byteArquivo);
    //                        attAnexo = new System.Net.Mail.Attachment(msAnexo, objAnexos[intCount].strNomeArquivo, objAnexos[intCount].strTipoArquivo);
    //                        objMail.Attachments.Add(attAnexo);
    //                    }
    //                }

    //                objSmtp.Send(objMail);
    //            }

    //            return true;
    //        }
    //        catch (ApplicationException ex)
    //        {
    //            // Apenas preenche erro se já não houver. Para manter o 1º erro
    //            if (objErro.Mensagem.Length == 0)
    //            {
    //                objErro = new ErroModel();

    //                objErro.Codigo = 0;
    //                objErro.Mensagem = "Falha no Disparo do E - mail.CONTATE O ADMINISTRADOR e Apresente a seguinte mensagem: " + ex.Message;
    //            }

    //            return false;

    //        }
    //    }

    //}
}