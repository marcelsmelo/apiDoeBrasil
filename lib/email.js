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

       try{
         let info = await transporter.sendMail({
            from: 'doebrasil@marcelmelo.com.br', // sender address
            to: "marcel.msmelo@gmail.com", //  For now, send all informations to me
            subject: "Novo Parceiro cadastrado", // Subject line
            text: "Vamos testar esse s", // plain text body
            html: `<h1>Novo parceiro cadastrado</h1><br>
                  <h2>ID: ${parceiro.id}</h2>
                   <h2>Nome: ${parceiro.nome}</h2>
                   <h2>Telefone: ${parceiro.telefone}</h2>
                   <h2>Localização: ${parceiro.cidade} - ${parceiro.estado}</h2>`, // html body
         });
         console.log(info);
      }catch(error){
         console.error(error)

      }
   }
}