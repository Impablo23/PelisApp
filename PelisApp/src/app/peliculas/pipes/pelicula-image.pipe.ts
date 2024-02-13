import { Pipe, PipeTransform } from '@angular/core';
import { Result } from 'src/app/interfaces/result.interface';


@Pipe({
  name: 'PeliImage'
})
export class PeliPipe implements PipeTransform {

  transform(peli: Result): string {

    if (!peli.poster_path){
      return 'assets/logo.png';
    }

    if (peli.poster_path){
      return peli.poster_path;
    }

    return 'assets/logo.png';

  }

}
