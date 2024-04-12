import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AUTH_STRATEGY_NAME } from '../constantes';

@Injectable()
export class NanoSupaJwtGuard extends AuthGuard(AUTH_STRATEGY_NAME) {}
