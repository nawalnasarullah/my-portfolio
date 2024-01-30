const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Handle form submissions
app.post('/submit', (req, res) => {
    const { name, email, message } = req.body;

    // Nodemailer configuration
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER || 'nawalisbd@gmail.com',
            pass: process.env.EMAIL_PASSWORD || 'zmbl tzpu ocfx pwgg'
        }
    });

    // Email options
    const mailOptions = {
        from: process.env.EMAIL_USER || 'your-email@gmail.com',
        to: 'nawalisbd@gmail.com',
        subject: `New Message from ${name}`,
        text: message
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Message sent successfully!');
        }
    });
});

// Start the server
app.listen(5500, '192.168.100.55', () => {
    console.log('Server is running at http://192.168.100.55:5500/');
});

