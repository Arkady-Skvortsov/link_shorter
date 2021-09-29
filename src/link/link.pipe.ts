import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import * as valid_url from 'valid-url';

@Injectable()
export class LinkPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return value;
  }
}
