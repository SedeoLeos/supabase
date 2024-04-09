import { Strategy } from 'passport-strategy';
import { SupabaseAuth } from './supabase.auth';
import { AuthUser } from '@supabase/supabase-js';
import { SupabaseOptionDto } from './dto/supabase-option.dto';
import { Inject, Injectable } from '@nestjs/common';
import { MODULE_OPTIONS_TOKEN } from './config.module-definition';
const UNAUTHORIZED = 'Unauthorized';
const SUPABASE_AUTH = 'SUPABASE_AUTH';

export { UNAUTHORIZED, SUPABASE_AUTH };
@Injectable()
export class SupabaseAuthStrategy extends Strategy {
  readonly name = SUPABASE_AUTH;

  success: (user: any, info: any) => void;
  fail: Strategy['fail'];
  constructor(
    private readonly supabase: SupabaseAuth,
    @Inject(MODULE_OPTIONS_TOKEN) private options: SupabaseOptionDto,
  ) {
    super();

    if (!this.options.extractor) {
      throw new Error(
        '\n Extractor is not a function. You should provide an extractor. \n Read the docs: https://github.com/tfarras/nestjs-firebase-auth#readme',
      );
    }
  }

  async validate(payload: AuthUser): Promise<AuthUser> {
    return payload;
  }
  authenticate(req: Request): void {
    const idToken = this.options.extractor(req);

    if (!idToken) {
      this.fail(UNAUTHORIZED, 401);
      return;
    }

    this.supabase
      .getClient()
      .auth.getUser(idToken)
      .then((res) => this.validateSupabaseResponse(res))
      .catch((err) => {
        this.fail(err.message, 401);
      });
  }
  private async validateSupabaseResponse({ data }: any) {
    const result = await this.validate(data);
    if (result) {
      this.success(result, {});
      return;
    }
    this.fail(UNAUTHORIZED, 401);
    return;
  }
}
