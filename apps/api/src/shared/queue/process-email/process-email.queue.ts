import './process-email.worker';
import { BaseQueue } from '../base-queue';
import { emailWorker } from './process-email.worker';
import { GLOBAL_CONSTANTS } from '../../global-constants';
import { readFileSync } from 'fs';
import handleBars from 'handlebars';
import path from 'path';

class ProcessEmailQueue extends BaseQueue {
  constructor() {
    super(GLOBAL_CONSTANTS.QUEUE_NAMES.processEmail, emailWorker);
  }
  async sendEmail(
    name: string,
    data: {
      to: string;
      subject: string;
      html: string;
    }
  ) {
    return this.add(name, data);
  }

  async sendEmailWithTemplate(
    name: string,
    {
      to,
      subject,
      templateFile,
      replacements,
    }: {
      to: string;
      subject: string;
      templateFile: string;
      replacements: Record<string, any> | any[];
    }
  ) {
    // TODO: find a way to get templated file in build automatically
    const html = readFileSync(
      path.join(__dirname, `../../../templates/${templateFile}`),
      { encoding: 'utf8' }
    );
    const template = handleBars.compile(html);
    const htmlToSend = template(replacements);
    await this.sendEmail(name, { to, subject, html: htmlToSend });
  }
}

export const processEmailQueue = new ProcessEmailQueue();
