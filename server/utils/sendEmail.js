const nodemailer = require('nodemailer')

module.exports = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            service: 'gmail',
            port: 465,
            secure: true,
            auth: {
                user: 'vishwaudayanga310@gmail.com',
                pass: '########'
            }    
        })

        await transporter.sendMail({
            from: 'vishwaudayanga310@gmail.com',
            to: email,
            subject: subject,
            text: text
        })

        console.log('Email sent successfully!')
    } catch (error) {
        console.log('Email not sent!')
        console.log(error.message)
    }
}
