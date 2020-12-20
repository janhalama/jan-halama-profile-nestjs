import { Body, Controller, Post, Response } from '@nestjs/common';
import { CreateMessageDto } from './create-message.dto';
import { MessagesService } from './messages.service';
import * as express from 'express';

@Controller('messages')
export class MessagesController {
  constructor(private messageService: MessagesService) { }
  @Post()
  async create(@Body() createMessageDto: CreateMessageDto, @Response() response: express.Response) {
    const createMessageResult = this.messageService.create(createMessageDto);
    response.redirect(303, `/?success=${createMessageResult.success}` + (createMessageResult.errorMessage ? `&message=${createMessageResult.errorMessage}` : '') + '#contact');
  }
}
