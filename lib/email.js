const nodemailer = require('nodemailer');
const emailConfig = require('../config/email')

module.exports = {
   sendEmail: async (parceiro)=>{
      let transporter = nodemailer.createTransport({
         host: emailConfig.hostEmail,
         port: emailConfig.portEmail,
         secure: false, // true for 465, false for other ports
         auth: {
           user: emailConfig.userEmail, // generated ethereal user
           pass: emailConfig.passwordEmail, // generated ethereal password
         },
       });
       await emailAdministrador(transporter, parceiro);
   }
}

async function emailAdministrador(transporter, parceiro){
   let adminEmail = '<div style="font-size: 1.2em;">'
   adminEmail += '<h1 style="background-color: #2193ED; color: white;"><center>Doe Brasil</center></h1>'
   adminEmail += '<p>O Parceiro '+parceiro.nome+' realizou o cadastro na plataforma <a href="http://doebrasil.org" target="_blank">doeBrasil.org</a> como <b>Parceiro</b></b>.</p>'
   adminEmail += '<p>Os contatos do parceiro são telefone '+parceiro.telefone +' e/ou e-mail: '+parceiro.email+'</p>'
   adminEmail += '<p>Atenciosamente, <br>Equipe doebrasil.org</p></div>'

   try{
      let info = await transporter.sendMail({
         from: emailConfig.userEmail, // sender address
         to: emailConfig.userEmail, //  For now, send all informations to me
         subject: emailConfig.tag+' DoeBrasil.org: Novo Parceiro!', // Subject line
         html: adminEmail, // html body
      });
      await emailBoasVindas(transporter, parceiro);
   }catch(error){
      console.error(error)

   }
}

async function emailBoasVindas(transporter, parceiro){
   let welcomeEmail = `<div style="font-size: 1.2em;">
      <h1 style="background-color: #2193ED; color: white;"><center>Doe Brasil</center></h1>
      <p>Bem vindo ao <a href="http://doebrasil.org" target="_blank">doeBrasil.org</a>,</p>
      <p>Seu cadastro como <b>Parceiro</b> passará por aprovação e em até 24h estará liberado para uso.
      Um novo e-mail será enviado em breve com detalhes para acesso a plataforma.</p>
      <p>Atenciosamente, <br>Equipe doebrasil.org</p>
      </div>`

      try{
         let info = await transporter.sendMail({
            from: emailConfig.userEmail, // sender address
            to: parceiro.email, //  For now, send all informations to me
            subject: "Boas vindas doebrasil.org", // Subject line
            //text: "Vamos testar esse s", // plain text body
            html: welcomeEmail, // html body
         });
      }catch(error){
         console.error(error)

      }

}