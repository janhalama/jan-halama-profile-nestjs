import { HttpServerConfig } from './httpServerConfig'
import { SendGridConfig } from './sendGridConfig'

export interface Configuration {
  httpServerConfig: HttpServerConfig;
  sendGridConfig: SendGridConfig;
}

export default (): Configuration => ({
  httpServerConfig: {
    port: parseInt(process.env.PORT, 10) || 3000,
  },
  sendGridConfig: {
    baseUrl: 'https://api.sendgrid.com/',
    apiKey: process.env.SENDGRID_API_KEY,
  }
});
