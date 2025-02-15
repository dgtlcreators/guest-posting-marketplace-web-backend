
const fetch = require('node-fetch');
require('dotenv').config();


const sendVerificationEmail = async (email, verificationToken) => {
  const key = process.env.BREVO_API_KEY;
  console.log("key 1 ",key);
  const frontendUrl = "https://guest-posting-marketplace-web-backend-mu57.onrender.com";
  
  const htmlContent = `
    <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 16px; background-color: #F9FAFB; font-family: 'Helvetica Neue', 'Segoe UI', Roboto, sans-serif;">
      <div style="background-color: #fff; padding: 32px; border-radius: 12px; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); max-width: 640px; width: 100%;">
          <div style="text-align: center; margin-bottom: 24px;">
              <h2 style="font-size: 24px; font-weight: 600; color: #1D4ED8;">Welcome to CreatorsXchange!</h2>
          </div>
          <div style="text-align: center; margin-bottom: 24px;">
              <p style="font-size: 18px; color: #4B5563;">
                  Thank you for registering with CreatorsXchange! To complete your sign-up process and activate your account, please verify your email by clicking the button below:
              </p>
          </div>
          <div style="text-align: center; margin-bottom: 24px;">
              <a href="${frontendUrl}/verify?token=${verificationToken}&email=${email}" 
                style="display: inline-block; background-color: #2563EB; color: #fff; font-size: 18px; font-weight: bold; padding: 12px 24px; border-radius: 9999px; text-decoration: none; transition: background-color 0.3s, transform 0.3s;">
                  Verify Email
              </a>
          </div>
          <div style="text-align: center; margin-top: 24px;">
              <p style="font-size: 14px; color: #6B7280;">
                  If you did not sign up for CreatorsXchange, please ignore this email or <a href="mailto:partner@creatorsxchange.com" style="color: #2563EB; text-decoration: underline;">contact us</a>.
              </p>
          </div>
          <div style="text-align: center; margin-top: 16px; font-size: 14px; color: #6B7280;">
              <p>CreatorXChange Team | <a href="https://creatorsxchange.com" style="color: #2563EB; text-decoration: underline;">www.creatorxchange.com</a></p>
          </div>
      </div>
    </div>
  `;
  
  const requestBody = {
    sender: { name: "CreatorXChange", email: "creatorsxchange@gmail.com" },
    to: [{ email }],
    subject: "Email Verification - CreatorXChange",
    htmlContent: htmlContent,
  };

  try {
    const response = await fetch("https://api.sendinblue.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "api-key": key,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorResponse = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorResponse}`);
    }
    
    const data = await response.json();
    console.log('Verification email sent successfully', data);
  } catch (error) {
    console.error('Error sending verification email:', error);
  }
};

sendVerificationEmail("kunalbhadana15@gmail.com", "1234567890");