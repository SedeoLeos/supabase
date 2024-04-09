import { JwtFromRequestFunction } from 'passport-jwt';

export interface SupabaseOptionDto {
  extractor: JwtFromRequestFunction;
  supabaseUrl: string;
  supabaseKey: string;
}
