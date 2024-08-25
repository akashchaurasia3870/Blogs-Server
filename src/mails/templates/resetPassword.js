const resetPassTemp = (userId) => {
  return `<!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f7f7f7;
        margin: 0;
        padding: 0;
      }

      a {
        color: white !important;
        text-decoration: none;
       }
    
  
      .container {
        max-width: 600px;
        margin: 50px auto;
        padding: 20px;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      }
  
      h1 {
        color: #333;
      }
  
      p {
        color: #666;
        line-height: 1.6;
      }
  
      .button {
        display: inline-block;
        padding: 10px 20px;
        background-color: #000;
        color: #fff;
        text-decoration: none;
        border-radius: 5px;
      }
    </style>
  </head>
  
  <body>
    <div class="container">
      <h1>Password Reset</h1>
      <p>Hello,</p>
      <p>We received a request to reset your password. Click the button below to reset your password:</p>
      <a href="https://sabm-client.vercel.app/reset-password/${userId}" class="button">Reset Password</a>
      <p>If you didn't request a password reset, you can ignore this email.</p>
    </div>
  </body>
  
  </html>
  `;
}

export default resetPassTemp;