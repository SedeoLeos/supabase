import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { SupabaseAuthJwtStrategy } from './supabase-auth-jwt.strategy';
import { User } from '@supabase/supabase-js';
import { MODULE_OPTIONS_TOKEN } from '../config.module-configure';
import { SupabaseOptionDto } from '../dto/supabase-option.dto';
import { Request } from 'express';
import { AUTH_STRATEGY_NAME } from '../constantes';

@Injectable()
export class PassportSupabaseJwtStrategy extends PassportStrategy(
  SupabaseAuthJwtStrategy,
  AUTH_STRATEGY_NAME,
) {
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) private options: SupabaseOptionDto,
  ) {
    super(options);
  }
  async validate(payload: any): Promise<any> {
    super.validate(payload);
  }
  authenticate(req: any) {
    super.authenticate(req);
  }
}
