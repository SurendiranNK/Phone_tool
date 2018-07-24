import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectValues'
})

export class ObjectValuesPipe implements PipeTransform {
  transform(obj: string) {
    return JSON.parse(obj);
  }
}