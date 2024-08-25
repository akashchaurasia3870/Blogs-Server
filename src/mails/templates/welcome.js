const welcomeTemp = (username) => {
  return `<!DOCTYPE html>
  <html lang="en">

    <head>
      <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Google!</title>
          <style>
            body {
              font - family: Arial, sans-serif;
            background-color: #f7f7f7;
            margin: 0;
            padding: 0;
    }
            .container {
              max - width: 600px;
            margin: 50px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

            h1 {
              color: #000;
    }

            p {
              color: #000;
            line-height: 1.6;
    }

            .button {
              display: inline-block;
            padding: 10px 20px;
            background-color: #4285f4;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
    }
    a {
      color: white !important;
      text-decoration: none;
    }
  
          </style>
        </head>

        <body>
          <div class="container">
            <h1>Welcome to Sell & Buy Mart!</h1>
            <p>Dear ${username},</p>
            <p>We are thrilled to have you join us at Sell & Buy Mart. Get ready for an amazing experience!</p>
            <p>Explore our services and discover a world of possibilities.</p>
            <a href="https://sabm-client.vercel.app/" class="button">Get Started</a>
          </div>
        </body>
      </html>
    `;
}

export default welcomeTemp