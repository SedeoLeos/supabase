import { Module, DynamicModule } from '@nestjs/common';
import { SupabaseStrategy } from './supabase.strategy';
import { Supabase } from './supabase';
import { SupabaseOptionDto } from './dto/supabase-option.dto';

@Module({})
export class SupabaseAuthModule {
  static register(options: SupabaseOptionDto): DynamicModule {
    return {
      module: SupabaseAuthModule,
      providers: [
        {
          provide: 'SUPABASE_OPTIONS',
          useValue: options,
        },
        Supabase,
        SupabaseStrategy,
      ],
      exports: [Supabase],
    };
  }
}
