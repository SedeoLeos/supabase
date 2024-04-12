import { Module } from '@nestjs/common';
import { ConfigurableModuleClass } from './config.module-configure';
import { PassportSupabaseJwtStrategy } from './strategies/supabase-jwt.strategy';
import { PassportSupabaseRefreshStrategy } from './strategies/supabase-refresh.strategy';

@Module({
  providers: [PassportSupabaseJwtStrategy, PassportSupabaseRefreshStrategy],
})
export class SupabaseAuthModule extends ConfigurableModuleClass {}
