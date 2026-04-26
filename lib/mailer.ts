import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Log SMTP config at startup (without password)
console.log('[Mailer] SMTP config:', {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || '587',
  secure: process.env.SMTP_SECURE === 'true',
  user: process.env.SMTP_USER || '(not set)',
});

export interface InquiryEmailData {
  name: string;
  email: string;
  phone: string;
  country: string;
  medicalCondition: string;
  medicalReport?: string;
}

export async function sendInquiryEmail(data: InquiryEmailData) {
  const toEmail = process.env.INQUIRY_RECIPIENT_EMAIL || 'support@manalhealthcare.com';
  const ccEmail = process.env.INQUIRY_CC_EMAIL || '';
  const recipients = ccEmail ? `${toEmail}, ${ccEmail}` : toEmail;

  const reportLine = data.medicalReport
    ? `<tr><td style="padding:8px 0;color:#555;font-weight:600;width:160px">Medical Report:</td><td style="padding:8px 0"><a href="${data.medicalReport}" style="color:#209f00">${data.medicalReport}</a></td></tr>`
    : '';

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
</head>
<body style="margin:0;padding:0;background:#f4f7f6;font-family:Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7f6;padding:32px 0">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08)">
          <!-- Header -->
          <tr>
            <td style="background:#209f00;padding:24px 32px">
              <h1 style="margin:0;color:#ffffff;font-size:22px">New Patient Inquiry</h1>
              <p style="margin:4px 0 0;color:#d4f5c4;font-size:14px">Manal Healthcare — support@manalhealthcare.com</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:32px">
              <p style="margin:0 0 20px;color:#333;font-size:15px">A new inquiry has been submitted through the website. Details are below:</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #eee">
                <tr>
                  <td style="padding:10px 0;color:#555;font-weight:600;width:160px;border-bottom:1px solid #eee">Name:</td>
                  <td style="padding:10px 0;color:#222;border-bottom:1px solid #eee">${data.name}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;color:#555;font-weight:600;border-bottom:1px solid #eee">Email:</td>
                  <td style="padding:10px 0;color:#222;border-bottom:1px solid #eee">${data.email || '—'}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;color:#555;font-weight:600;border-bottom:1px solid #eee">Phone:</td>
                  <td style="padding:10px 0;color:#222;border-bottom:1px solid #eee">${data.phone || '—'}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;color:#555;font-weight:600;border-bottom:1px solid #eee">Country:</td>
                  <td style="padding:10px 0;color:#222;border-bottom:1px solid #eee">${data.country || '—'}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;color:#555;font-weight:600;border-bottom:1px solid #eee;vertical-align:top">Medical Condition:</td>
                  <td style="padding:10px 0;color:#222;border-bottom:1px solid #eee">${data.medicalCondition}</td>
                </tr>
                ${reportLine}
              </table>
              <p style="margin:24px 0 0;color:#888;font-size:13px">This email was sent automatically from the Manal Healthcare website contact form.</p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:#f9f9f9;padding:16px 32px;border-top:1px solid #eee;text-align:center">
              <p style="margin:0;color:#aaa;font-size:12px">© ${new Date().getFullYear()} Manal Healthcare. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  await transporter.sendMail({
    from: `"Manal Healthcare Website" <${process.env.SMTP_USER}>`,
    to: recipients,
    replyTo: data.email || undefined,
    subject: `New Inquiry from ${data.name} — ${data.medicalCondition}`,
    html,
  });
}

export async function sendUserConfirmationEmail(data: InquiryEmailData) {
  if (!data.email) return; // No email provided — skip

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
</head>
<body style="margin:0;padding:0;background:#f4f7f6;font-family:Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7f6;padding:32px 0">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08)">
          <!-- Header -->
          <tr>
            <td style="background:#209f00;padding:24px 32px">
              <h1 style="margin:0;color:#ffffff;font-size:22px">Thank You for Your Inquiry</h1>
              <p style="margin:4px 0 0;color:#d4f5c4;font-size:14px">Manal Healthcare — Your Trusted Medical Partner</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:32px">
              <p style="margin:0 0 16px;color:#333;font-size:15px">Dear <strong>${data.name}</strong>,</p>
              <p style="margin:0 0 16px;color:#333;font-size:15px">Thank you for reaching out to Manal Healthcare. We have received your inquiry and our medical team will review it shortly.</p>
              <p style="margin:0 0 20px;color:#333;font-size:15px">Here is a summary of your inquiry:</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #eee">
                <tr>
                  <td style="padding:10px 0;color:#555;font-weight:600;width:160px;border-bottom:1px solid #eee">Name:</td>
                  <td style="padding:10px 0;color:#222;border-bottom:1px solid #eee">${data.name}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;color:#555;font-weight:600;border-bottom:1px solid #eee">Phone:</td>
                  <td style="padding:10px 0;color:#222;border-bottom:1px solid #eee">${data.phone || '—'}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;color:#555;font-weight:600;border-bottom:1px solid #eee">Country:</td>
                  <td style="padding:10px 0;color:#222;border-bottom:1px solid #eee">${data.country || '—'}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;color:#555;font-weight:600;border-bottom:1px solid #eee;vertical-align:top">Medical Condition:</td>
                  <td style="padding:10px 0;color:#222;border-bottom:1px solid #eee">${data.medicalCondition}</td>
                </tr>
              </table>
              <p style="margin:24px 0 16px;color:#333;font-size:15px"><strong>What happens next?</strong></p>
              <ul style="margin:0 0 20px;padding:0 0 0 20px;color:#333;font-size:14px;line-height:1.8">
                <li>Our medical coordinator will review your inquiry within 24 hours.</li>
                <li>You will receive a detailed response with treatment options and cost estimates.</li>
                <li>For urgent queries, you can reach us on WhatsApp at <strong>+91-9990633299</strong>.</li>
              </ul>
              <p style="margin:0;color:#888;font-size:13px">If you did not submit this inquiry, please disregard this email.</p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:#f9f9f9;padding:16px 32px;border-top:1px solid #eee;text-align:center">
              <p style="margin:0 0 4px;color:#209f00;font-size:14px;font-weight:600">Manal Healthcare</p>
              <p style="margin:0;color:#aaa;font-size:12px">© ${new Date().getFullYear()} Manal Healthcare. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  await transporter.sendMail({
    from: `"Manal Healthcare" <${process.env.SMTP_USER}>`,
    to: data.email,
    subject: `We've Received Your Inquiry — Manal Healthcare`,
    html,
  });
}
