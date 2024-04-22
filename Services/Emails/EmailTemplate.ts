export const htmlEmailPage = function (user: string, magicLink: string) {
    return `
    
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Activate Your Account</title>
        <style>
            *{
                direction:ltr;
            }
            body {
                 font-family: 'Cairo', sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
                text-align: center;
            }
    
            .container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #fff;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
    
            h2 {
                color: #333;
            }
    
            p {
                color: #666;
                line-height: 1.6;
            }
    
            a {
                color: #007BFF;
                text-decoration: none;
                font-weight: bold;
            }
    
            .btn {
                display: inline-block;
                padding: 10px 20px;
                background-color: #007BFF;
                color: #fff;
                text-decoration: none;
                border-radius: 5px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Activate Your New Account</h2>
            <p>Hello ${user},</p>
            <p>Thank you for choosing to create a new account with us. To complete the registration process, please click the button below:</p>
            
            <a class="btn" href="${magicLink}">Activate Your Account</a>
    
            <p>If you encounter any issues or need assistance, please contact our support team via email at <a href="[support email address]">[support email address]</a>.</p>
    
            <p>We wish you an enjoyable experience with ANALYTICS.</p>
        </div>
    </body>
    </html>
    `;
}