import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'status'
})
export class StatusPipe implements PipeTransform{

    transform(value:number): string{
        if(value === 1) return 'Activo';
        return 'Inactivo';
    }
}