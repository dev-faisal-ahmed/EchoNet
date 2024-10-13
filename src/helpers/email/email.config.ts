import { GMAIL_ID, GMAIL_PASS } from '@/config';
import NodeMailer from 'nodemailer';

export const transporter = NodeMailer.createTransport({
  service: 'gmail',
  auth: { user: GMAIL_ID, pass: GMAIL_PASS },
});
