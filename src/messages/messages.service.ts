import { Injectable, Logger } from '@nestjs/common';
import { CreateMessageResult } from './create-message-result';
import { CreateMessageDto } from './create-message.dto';

@Injectable()
export class MessagesService {
  private readonly logger = new Logger(MessagesService.name);
  create(createMessageDto: CreateMessageDto): CreateMessageResult {
    this.logger.log('Sending message', JSON.stringify(createMessageDto));
    return {
      success: true
    }
  }
}
