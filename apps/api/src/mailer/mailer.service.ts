import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'code.with.muyiwa@gmail.com',
        pass: 'wkgh qisj kzlx xapd'
      }
    })
  }

  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: 'code.with.muyiwa@gmail.com',
        to,
        subject,
        text,
      })
      console.log('Email sent successfully')
    } catch (error) {
      throw error
    }
  }
}