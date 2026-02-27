import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

/**
 * 可选认证守卫
 * - 如果请求携带有效 JWT，则解析用户信息
 * - 如果没有 JWT 或 JWT 无效，不阻止请求，但 req.user 为 undefined
 * 用于第一版本地部署场景，无需强制登录
 */
@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 尝试验证 JWT，但不强制要求
    try {
      await super.canActivate(context);
    } catch (error) {
      // JWT 验证失败，允许请求继续，但不会有用户信息
    }
    return true;
  }
}
