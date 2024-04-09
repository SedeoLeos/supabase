import { Module } from '@nestjs/common';
import { SupabaseAuth } from './supabase.auth';
import { ConfigurableModuleClass } from './config.module-definition';

@Module({
  providers: [SupabaseAuth],
  exports: [SupabaseAuth],
})
export class SupabaseAuthModule extends ConfigurableModuleClass {}
