import { Injectable } from '@nestjs/common';

@Injectable()
export class MailerService {
  private transporter
  constructor() {
    this.transporter = nodemail
  }
}
