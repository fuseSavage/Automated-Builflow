const string _smtpClientIP = "mailhost.seagate.com";
    [WebMethod(Description = "If length of content (From, To, Subject) == 0, It will return false")]
    public bool sendMailWithHTML(bool isBodyHTML, string From, string To, string CC, string BCC, string Subject, string Body)
    {
        bool isSuccess = false;
        if (From.Length == 0) return false;
        if (To.Length == 0) return false;
        if (Subject.Length == 0) return false;
        MailMessage mailMessage = new MailMessage();
        NetworkCredential networkCredential = new NetworkCredential();
        mailMessage.From = new MailAddress(From);
        mailMessage.To.Add(To);
        if (CC != "") mailMessage.CC.Add(CC);
        if (BCC != "") mailMessage.Bcc.Add(BCC);
        mailMessage.Subject = Subject;
        mailMessage.IsBodyHtml = isBodyHTML;
        mailMessage.Body = Body;
        SmtpClient smtpClient = new SmtpClient(_smtpClientIP);
        try
        {
            smtpClient.Send(mailMessage);
            isSuccess = true;
        }
        catch (Exception exMail)
        {
            //this._message = exMail.Message;
            //this._source = exMail.Source;
        }
        finally
        {
            mailMessage.Dispose();
            networkCredential = null;
            smtpClient = null;
        }
        return isSuccess;
    }




// const  _smtpClientIP = "mailhost.seagate.com";
        // function sendMailWithHTML(   From,  To,  CC,  BCC,  Subject,  Body) {
        //     let isSuccess = false;
           
        //     const mailMessage  = "test"
        //     // const NetworkCredential  = new NetworkCredential();
        //     mailMessage.From = 'chaiwat.singkibut@seagate.com';
        //     mailMessage.To.Add("chaiwat.singkibut@seagate.com");
        //     if (CC !== "") mailMessage.CC.Add('test');
        //     if (BCC !== "") mailMessage.Bcc.Add('testtt');
        //     mailMessage.Subject = 'tsttts';
        //     // mailMessage.IsBodyHtml = isBodyHTML;
        //     mailMessage.Body = Body;
        //     const SmtpClient  = _smtpClientIP
        //     try
        //     {
        //         SmtpClient.Send(mailMessage);
        //         isSuccess = true;
        //     }
        //     catch (Exception)
        //     {
        //         //this._message = exMail.Message;
        //         //this._source = exMail.Source;
        //     }
           
        //     return isSuccess;
        // }
        // sendMailWithHTML()