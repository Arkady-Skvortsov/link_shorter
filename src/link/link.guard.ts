import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { isUri } from 'valid-url';

@Injectable()
export class LinkGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    try {
      const { url } = req.body;

      if (isUri(url)) return true;
    } catch (e) {
      throw new HttpException('Не валидный URL', HttpStatus.BAD_REQUEST);
    }
  }
}
