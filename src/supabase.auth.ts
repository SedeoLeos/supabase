import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { SupabaseOptionDto } from './dto/supabase-option.dto';
import { MODULE_OPTIONS_TOKEN } from './config.module-definition';

@Injectable({ scope: Scope.REQUEST })
export class SupabaseAuth {
  private readonly logger = new Logger(SupabaseAuth.name);
  private clientInstance: SupabaseClient;

  constructor(
    @Inject(REQUEST) private readonly request: Request,
    @Inject(MODULE_OPTIONS_TOKEN) private readonly option: SupabaseOptionDto,
  ) {}

  getClient() {
    this.logger.log('getting supabase client...');
    if (this.clientInstance) {
      this.logger.log('client exists - returning for current Scope.REQUEST');
      return this.clientInstance;
    }

    this.logger.log('initialising new supabase client for new Scope.REQUEST');

    this.clientInstance = createClient(
      this.option.supabaseKey,
      this.option.supabaseUrl,
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
