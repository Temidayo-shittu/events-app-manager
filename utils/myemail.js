const nodemailer= require('nodemailer')

    let transporter= nodemailer.createTransport({
        host: 'sandbox.smtp.mailtrap.io',
        port: 25,
        secure:true,
         auth:{
             user: '9f3c9fea2c5d84',
             pass: '0173b2af7ef1d9'
         }

        })

        let mailOptions= {
            from: 'Temidayo Shittu <temidayo@gmail.com>',
            to: 'temidayo@gmail.com',
            subject: 'Attendee notification',
            text: 'Hello World'
        }

         transporter.sendMail(mailOptions, (error,info)=>{
             if(error) {
                 return console.log(error.message)
             }
             console.log('success')
         })
            
           
        
        

