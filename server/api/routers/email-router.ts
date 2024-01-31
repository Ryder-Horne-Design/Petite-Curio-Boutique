import { createTransport } from "nodemailer";
import { createTRPCRouter, publicProcedure } from "../trpc";
import z from "zod";

const transporter = createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "oauth2",
    user: "petitecurioboutique@gmail.com",
    clientId: process.env.CLIENT_ID!,
    clientSecret: process.env.CLIENT_SECRET!,
    refreshToken: process.env.REFRESH_TOKEN!,
    accessToken: process.env.ACCESS_TOKEN!,
  },
});
export const emailRouter = createTRPCRouter({
  sendEmail: publicProcedure.input(z.object({
    email: z.string().email(),
    subject: z.string(),
    message: z.string(),
  })).query(async function({ input: { email, subject, message } }): Promise<{
    success: boolean;
  }> {
    try {
      const isVerified = await transporter.verify();
      if (!isVerified) {
        return { success: false };
      };
      await transporter.sendMail({
        from: "petitecurioboutique@gmail.com",
        to: "petitecurioboutique@gmail.com",
        subject: `[Contact Form]: ${subject}`,
        text: message,
        replyTo: email,
      });
      return { success: true };
    } catch(err) {
      console.warn(err);
      return { success: false };
    };
  }),
});