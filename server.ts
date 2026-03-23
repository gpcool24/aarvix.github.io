import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.post("/api/contact", async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    console.log("Received enquiry:", { name, email, subject, message });

    // Email configuration
    const host = process.env.EMAIL_HOST;
    const port = parseInt(process.env.EMAIL_PORT || "587");
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;
    const to = process.env.EMAIL_TO || "Support@aarvix.co.in";

    if (host && user && pass) {
      try {
        const transporter = nodemailer.createTransport({
          host,
          port,
          secure: port === 465,
          auth: { user, pass },
        });

        await transporter.sendMail({
          from: `"${name}" <${user}>`,
          to,
          replyTo: email,
          subject: `New Enquiry: ${subject}`,
          text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
          html: `
            <h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, "<br>")}</p>
          `,
        });

        console.log("Email sent successfully to", to);
        return res.json({ success: true, message: "Enquiry sent successfully!" });
      } catch (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ error: "Failed to send email. Please try again later." });
      }
    } else {
      // Mock success if no credentials provided
      console.log("Mocking email send (no credentials provided in .env)");
      return res.json({ 
        success: true, 
        message: "Enquiry received (Mock)! Configure EMAIL_HOST, EMAIL_USER, and EMAIL_PASS in settings to send real emails.",
        data: { name, email, subject, message }
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
