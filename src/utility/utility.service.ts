import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
@Injectable()
export class UtilityService {
    transporter: any
    constructor() {
        this.createEmailClient();
  
    }
   async  createEmailClient() {
         this.transporter = await createTransport({
            service: 'gmail',
            auth: {
                user: 'ahmedshafi7812@gmail.com',
                pass: 'Altaf1234'
            }
        });
    }
  
    async sendEmail(userEmail:string,payload: String) {
       
        const url=`http://localhost:3200/auth/varification/${payload}`;
      
        let info = await this.transporter.sendMail({
            from: '"Application Server', // sender address
            to: userEmail, // list of receivers

            subject: `Account Verification`, // Subject line
            //text: `<b> Your Activation code is ${payload}</b>`, // plain text body
            html: `<h3>WELLCOME TO ABAADE</h3>
                    <a href="${url}">Click Hear</a>
            ` // html body
        });
  
        console.log("Message sent: %s", info.messageId);
    }
}
