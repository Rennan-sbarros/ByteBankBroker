import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { merge } from 'rxjs';
import { tap, switchMap, filter } from 'rxjs/operators';

import { AcoesService } from './acoes.service';

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css'],
})
export class AcoesComponent {
  acoesInput = new FormControl();
  todaAcoes$ = this.acoesService.getAcoes().pipe();

  filtroPorInput$ = this.acoesInput.valueChanges.pipe(
    filter((valorDigitado) => valorDigitado.length >= 3 || !valorDigitado.length),
    switchMap((valorDigitado) => this.acoesService.getAcoes(valorDigitado))
  );

  acoes$ = merge(this.todaAcoes$, this.filtroPorInput$);

  constructor(private acoesService: AcoesService) {}
}
