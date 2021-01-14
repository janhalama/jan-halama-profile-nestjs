import { Controller, Get, Logger, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { CreateMessageResult } from './messages/create-message-result';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  root(@Query() messageSendingResult: CreateMessageResult, @Res() res: Response) {
    const profileImagesCount = 2;
    return res.render(
      this.appService.getViewName(),
      {
        version: this.appService.getAppVersion(),
        profileId: ((Math.round(Math.random() * 10)) % profileImagesCount) + 1,
        messageSendingResult: (messageSendingResult.success === undefined) ? undefined : messageSendingResult
      }
    );
  }
}
