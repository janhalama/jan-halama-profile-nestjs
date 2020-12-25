import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';
import { AxiosInstance } from 'axios';
import { SendGridConfig } from 'config/sendGridConfig';
import { CreateMessageResult } from './create-message-result';
import { CreateMessageDto } from './create-message.dto';
const axios = require('axios').default;

@Injectable()
export class MessagesService {
  private readonly logger = new Logger(MessagesService.name);
  private readonly axiosInstance: AxiosInstance;
  constructor(private configService: ConfigService) {
    const sendGridConfig = this.configService.get<SendGridConfig>('sendGridConfig');
    const axiosConfig = {
      baseURL: sendGridConfig.baseUrl,
      timeout: 10000,
      headers: {
        Authorization: `Bearer ${sendGridConfig.apiKey}`,
        'Content-Type': 'application/json',
      }
    }

    this.axiosInstance = axios.create(axiosConfig);
  }
  async create(createMessageDto: CreateMessageDto): Promise<CreateMessageResult> {
    this.logger.log('Sending message', JSON.stringify(createMessageDto));
    try {
      const response = await this.axiosInstance.post('/v3/mail/send', {
        personalizations: [
          {
            to: [
              {
                email: 'mail@janhalama.cz'
              }
            ],
            subject: 'My public profile message'
          }
        ],
        from: {
          email: 'profile@janhalama.cz'
        },
        content: [
          {
            type: 'text/html',
            value: `<p>Name: ${createMessageDto.name}</p>
          <p>E-Mail: ${createMessageDto.email}</p>
          <p>Message: ${createMessageDto.message}</p>`
          }
        ]
      });
      if (response.status === 202) {
        return {
          success: true
        }
      } else {
        this.logger.error(`Failed to send e-mail, expected status code 202, received status code ${response.status}`);
        return {
          success: true,
          errorMessage: '¯\_(ツ)_/¯ Failed to send your message.',
        }
      }
    }
    catch (error) {
      this.logger.error(`Failed to send e-mail with error: ${error.message}`);
      return {
        success: false,
        errorMessage: '¯\_(ツ)_/¯ Failed to send your message.',
      }
    }
  }
}
