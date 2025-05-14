
const getVerificationEmailTemplate = (otpCode,subject) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                padding: 20px;
                text-align: center;
            }
            .container {
                background: #fff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                max-width: 400px;
                margin: auto;
            }
         
            h2 {
                color: #333;
            }
            .otp {
                background: #007bff;
                color: #fff;
                font-size: 20px;
                font-weight: bold;
                padding: 10px;
                border-radius: 5px;
                display: inline-block;
                margin: 10px 0;
            }
            p {
                color: #555;
            }
            .footer {
                font-size: 12px;
                color: #999;
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            
            <h2>Email Verification</h2>
            <p>${subject}</p>
            <div class="otp">${otpCode}</div>
            <p>This OTP will expire in 5 minutes.</p>
            <p>If you didn’t request this, you can ignore this email.</p>
            <div class="footer">© 2025 Pricemaart. All rights reserved.</div>
        </div>
    </body>
    </html>
    `;
  };
  
  export default getVerificationEmailTemplate;
  