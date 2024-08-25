const weeklyTemp = () => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank You for Subscribing</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f9f9f9;
              text-align: center;
              padding: 20px;
          }
          .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 10px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          h1 {
              color: #333;
          }
          p {
              color: #666;
          }

          a {
            color: white !important;
            text-decoration: none;
         }        

          .btn {
              display: inline-block;
              padding: 10px 20px;
              margin-top: 20px;
              background-color: #000;
              color: #fff;
              text-decoration: none;
              border-radius: 5px;
              font-weight: bold;
          }
          .btn:hover {
              background-color: #000;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <h1>Thank You for Subscribing!</h1>
          <p>We appreciate your interest in our weekly newsletter. Stay tuned for exciting updates, news, and exclusive content.</p>
          <p>If you have any questions or feedback, feel free to reply to this email. We'd love to hear from you!</p>
          <a href="https://sabm-client.vercel.app/" class="btn">See More</a>
      </div>
  </body>
  </html>
  `
}
export default weeklyTemp