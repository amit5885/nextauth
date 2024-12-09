import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bycryptjs from "bcryptjs";

export const sendEmail = async ({
  email,
  emailType,
  userId,
}: {
  email: string;
  emailType: string;
  userId: string;
}) => {
  try {
    const hashedToken = await bycryptjs.hash(userId.toString(), 10);
    const randomString = hashedToken.replace(/\//g, "_").replace(/\+/g, "-");

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: randomString,
          verifyTokenExpiry: Date.now() + 3600000,
        },
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: randomString,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    // Looking to send emails in production? Check out our Email API/SMTP product!
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "e892e94718a88b",
        pass: "fda5b65b5cf6f8",
      },
    });

    const verifyEmailHtml = (randomString: string) => {
      return `
    <p>
      Click <a href="${process.env.Domain}/verifyemail?token=${randomString}">here</a> to verify your email 
      or copy and paste the link below in your browser. <br> 
      ${process.env.Domain}/verifyemail?token=${randomString}
    </p>
  `;
    };

    const resetPasswordHtml = (randomString: string) => {
      return `
    <p>
      Click <a href="${process.env.Domain}/resetpassword?token=${hashedToken}">here</a> to reset your password 
      or copy and paste the link below in your browser. <br> 
      ${process.env.Domain}/resetpassword?token=${randomString}
    </p>
  `;
    };

    const mailOptions = {
      from: "lalaboom07@gmail.com", // sender address
      to: email, // list of receivers
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password", // Subject line
      html:
        emailType === "VERIFY"
          ? verifyEmailHtml(randomString)
          : resetPasswordHtml(hashedToken),
    };

    const mailResponse = await transport.sendMail(mailOptions);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(mailResponse));
    return mailResponse;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
