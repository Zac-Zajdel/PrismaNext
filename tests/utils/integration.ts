import { HttpClient } from '@/tests/utils/http';
import { PrismaNextTestContext } from '@/tests/utils/setup';

export class HttpSetup {
  private readonly ctx?: PrismaNextTestContext;
  public http: HttpClient;

  constructor(ctx?: PrismaNextTestContext, testFailure: boolean = false) {
    if (ctx && !testFailure) {
      ctx.apiToken = global.apiToken;
    }

    this.ctx = ctx;
    this.http = new HttpClient({
      baseUrl: `http://localhost:3000/api`,
      headers: this.ctx?.apiToken
        ? {
            Authorization: `Bearer ${this.ctx?.apiToken}`,
          }
        : {},
    });
  }

  async init() {
    return { http: this.http };
  }
}
