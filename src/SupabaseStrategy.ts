import { PassportStrategy } from '@nestjs/passport';
import { SupabaseAuthStrategy } from './supabase-auth.strategy';
import { Inject, Injectable } from '@nestjs/common';
import { SupabaseOptionDto } from './dto/supabase-option.dto';
import { SupabaseAuth } from './supabase.auth';
import { MODULE_OPTIONS_TOKEN } from './config.module-definition';
@Injectable()
export class SupabaseStrategy extends PassportStrategy(
  SupabaseAuthStrategy,
  'supabase',
) {
  constructor(
    supabase: SupabaseAuth,
    @Inject(MODULE_OPTIONS_TOKEN) option: SupabaseOptionDto,
  ) {
    super(supabase, option);
  }
  async validate(payload: any): Promise<any> {
    super.validate(payload);
  }

  authenticate(req) {
    super.authenticate(req);
  }
}
