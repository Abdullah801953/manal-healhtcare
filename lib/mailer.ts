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
    to: toEmail,
    replyTo: data.email || undefined,
    subject: `New Inquiry from ${data.name} — ${data.medicalCondition}`,
    html,
  });
}
