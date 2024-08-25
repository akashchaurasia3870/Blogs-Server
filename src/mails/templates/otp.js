const otpTemp = (otp) => {
  return `<!DOCTYPE html>
  <html>
  <head>
  <title>OTP</title>
  </head>
  <body>
  <div style="font-family: Helvetica,Arial,sans-serif;overflow:auto;line-height:2">
        <div style="margin:0px auto;width:100%;padding:20px 0">
          <h1>Please confirm your OTP</h1>
          <p style="color:#434343">Use the following OTP to complete your registration procedures.</p>
          <span style="background: #000;margin: 0 auto;width: max-content;padding: 10px;color: #fff;border-radius: 4px;">${otp}</span>
          <p style="font-size:0.9em;">Thanks and regards,<br />Sell&BuyMart</p>
        </div>
      </div>
  </body>
  </html>`;
}

export default otpTemp