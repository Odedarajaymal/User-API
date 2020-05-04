
const sgMail = require('@sendgrid/mail');
const SENDGRID_API_KEY = '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'

sgMail.setApiKey(SENDGRID_API_KEY)

const findbyemail = async(email)=>{
    try {
   await sgMail.send({ 
        to:email,
        from:'odedarajaymal24@gmail.com',
        subject:'signup accout',
        text:'thanks for signup'
    })
}catch(e){
    console.log(e,'eror')
}
}

module.exports = {
    findbyemail
}