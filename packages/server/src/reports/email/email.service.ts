import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'risingm117@gmail.com',
        pass: 'ytfx fniv nrll qrcm',
      },
    });
  }

  async sendEmail(from: string, subject: string, text: string) {
    const mailOptions = {
      from: from,
      to: 'cheolyeing@naver.com',
      subject: subject,
      text: text,
    };
    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending email:', error.message);
      throw new InternalServerErrorException('Failed to send email');
    }
  }
}
