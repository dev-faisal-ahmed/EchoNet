import { rootEmailTemplate } from './templates';
import { transporter } from './email.config';
import { GMAIL_ID } from '@/config';

interface IArgs {
  email: string;
  subject: string;
  messageInText: string;
  messageInHTML: string;
}

export const sendEmail = async ({
  email,
  subject,
  messageInText,
  messageInHTML,
}: IArgs) => {
  const emailResponse = await transporter.sendMail({
    from: GMAIL_ID,
    to: email,
    subject,
    text: messageInText,
    html: rootEmailTemplate(messageInHTML),
  });

  if (!emailResponse.accepted) return { error: 'Failed to send email' };
  return { success: 'Email sent!' };
};
