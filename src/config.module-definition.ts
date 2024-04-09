import { ConfigurableModuleBuilder } from '@nestjs/common';
import { SupabaseOptionDto } from './dto/supabase-option.dto';
export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<SupabaseOptionDto>()
    .setClassMethodName('forRoot')
    .build();
