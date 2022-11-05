import nodemailer from "nodemailer";
require('dotenv/config');

class SendEmailContacFormService {
  async execute() {

    const transporter = nodemailer.createTransport({
      host: process.env.HOST_SMTP,
      port: 465,
      auth: {
        user: process.env.USER_SMTP,
        pass: process.env.PASS_SMTP
      }
    })

    await transporter.sendMail({
      from: '"Blog - Oficina Mecânica Online" <contato.graxa@oficinamecanicaonline.com>',
      to: 'gabriel.bastiani@hotmail.com.br',
      subject: "Mensagem recebida no Blog",
      html: `<div style="background-color: rgb(223, 145, 0); color: black; padding: 0 55px;">
                <h2>Mensagem do formulario de contato no Blog!</h2>
            </div>
            
            <article>
                <p>Você acaba de receber uma nova mensagem de um visitante em seu Blog.</p>
                <p>Para ler a mensagem, acesse o seu painel administrativo na sua conta no Blog, e navegue até o menu "Contatos".</p>
            </article>
            
            <div style="background-color: rgb(223, 145, 0); color: black; padding: 0 55px;">
                <h5>Blog Oficina Mecânica Online</h5>
            </div>`,
    });


    return;
  }
}

export { SendEmailContacFormService };