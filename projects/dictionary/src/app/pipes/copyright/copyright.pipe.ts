import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'copyright'
})
export class CopyrightPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
