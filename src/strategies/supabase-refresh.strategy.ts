import { PassportStrategy } from '@nestjs/passport';
import { SupabaseAuthRefreshStrategy } from './supabase-auth-refresh.strategy';
import { Inject } from '@nestjs/common';
import { MODULE_OPTIONS_TOKEN } from '../config.module-configure';
import { SupabaseOptionDto } from '../dto/supabase-option.dto';
import { REFRESH_STRATEGY_NAME } from '../constantes';

export class PassportSupabaseRefreshStrategy extends PassportStrategy(
  SupabaseAuthRefreshStrategy,
  REFRESH_STRATEGY_NAME,
) {
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) private options: SupabaseOptionDto,
  ) {
    super(options);
  }

  async validate(payload: any): Promise<any> {
    return super.validate(payload);
  }
  authenticate(req: any) {
    super.authenticate(req);
  }
}
