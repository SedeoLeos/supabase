import { JwtFromRequestFunction } from 'passport-jwt';

export interface SupabaseOptionDto {
  extractor: JwtFromRequestFunction;
  supabase_url: string;
  supabase_key: string;
}
