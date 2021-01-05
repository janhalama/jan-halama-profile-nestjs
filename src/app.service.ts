import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class AppService {
  getViewName(): string {
    return 'index';
  }
  getAppVersion(): string {
    try {
      const packageJson = fs.readFileSync('./package.json');
      return JSON.parse(packageJson.toString()).version || '<unknown>';
    }
    catch(error) {
      console.debug(error);
      return '<unknown>';
    } 
  }
}
