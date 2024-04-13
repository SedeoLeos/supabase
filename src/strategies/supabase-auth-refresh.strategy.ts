import { Strategy } from 'passport-strategy';
import { AuthUser, createClient, SupabaseClient } from '@supabase/supabase-js';
import { SupabaseOptionDto } from '../dto/supabase-option.dto';
import { JwtFromRequestFunction } from 'passport-jwt';
import { SUPABASE_AUTH_REFRESH, UNAUTHORIZED } from '../constantes';

export class SupabaseAuthRefreshStrategy extends Strategy {
  readonly name = SUPABASE_AUTH_REFRESH;

  success: (user: any, info: any) => void;
  fail: Strategy['fail'];
  supabase: SupabaseClient;
  extractor: JwtFromRequestFunction;
  constructor(options: SupabaseOptionDto) {
    super();
    if (!options.extractor) {
      throw new Error(
        '\n Extractor is not a function. You should provide an extractor. \n Read the docs: https://github.com/tfarras/nestjs-firebase-auth#readme',
      );
    }
    this.supabase = new SupabaseClient(
      options.supabase_url,
      options.supabase_key,
    );
    this.extractor = options;
  }

  async validate(payload: AuthUser): Promise<AuthUser> {
    return payload;
  }
  authenticate(req: Request): void {
    const refresh_token = this.extractor(req);

    if (!refresh_token) {
      this.fail(UNAUTHORIZED, 401);
      return;
    }

    this.supabase.auth
      .refreshSession({ refresh_token })
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
