import { Strategy } from 'passport-strategy';
import { AuthUser, SupabaseClient } from '@supabase/supabase-js';
import { SupabaseOptionDto } from '../dto/supabase-option.dto';
import { JwtFromRequestFunction } from 'passport-jwt';
import { SUPABASE_AUTH, UNAUTHORIZED } from '../constantes';

export class SupabaseAuthJwtStrategy extends Strategy {
  readonly name = SUPABASE_AUTH;

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
    this.extractor = options.extractor;
  }

  async validate(payload: AuthUser): Promise<AuthUser> {
    return payload;
  }
  authenticate(req: Request): void {
    const access_token = this.extractor(req);

    if (!access_token) {
      this.fail(UNAUTHORIZED, 401);
      return;
    }

    this.supabase.auth
      .getUser(access_token)
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
