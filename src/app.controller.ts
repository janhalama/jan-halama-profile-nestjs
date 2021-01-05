import { Controller, Get, Logger, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { CreateMessageResult } from './messages/create-message-result';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  root(@Query() messageSendingResult: CreateMessageResult, @Res() res: Response) {
    
    return res.render(
      this.appService.getViewName(),
      {
        version: this.appService.getAppVersion(),
        messageSendingResult: (messageSendingResult.success === undefined) ? undefined : messageSendingResult
      }
    );
  }
}
