import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { SupabaseOptionDto } from './dto/supabase-option.dto';

@Injectable({ scope: Scope.REQUEST })
export class Supabase {
  private readonly logger = new Logger(Supabase.name);
  private clientInstance: SupabaseClient;

  constructor(
    @Inject(REQUEST) private readonly request: Request,
    @Inject('SUPABASE_OPTION') private readonly option: SupabaseOptionDto,
  ) {}

  getClient() {
    this.logger.log('getting supabase client...');
    if (this.clientInstance) {
      this.logger.log('client exists - returning for current Scope.REQUEST');
      return this.clientInstance;
    }

    this.logger.log('initialising new supabase client for new Scope.REQUEST');

    this.clientInstance = createClient(
      this.option.supabase_url,
      this.option.supabase_key,
      {
        // autoRefreshToken: true,
        //detectSessionInUrl: false,
        global: {
          headers: {
            //  Authorization: ExtractJwt.fromAuthHeaderAsBearerToken()(this.request),
          },
        },
      },
    );

    this.logger.log('auth has been set!');

    return this.clientInstance;
  }
}
