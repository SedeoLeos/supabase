import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { REFRESH_STRATEGY_NAME } from '../constantes';

@Injectable()
export class NanoSupaRefreshGuard extends AuthGuard(REFRESH_STRATEGY_NAME) {}
