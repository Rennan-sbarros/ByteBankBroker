import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { merge } from 'rxjs';
import { tap, switchMap, filter, debounceTime } from 'rxjs/operators';

import { AcoesService } from './acoes.service';

const ESPERA_DIGITACAO = 300;

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css'],
})
export class AcoesComponent {
  acoesInput = new FormControl();
  todaAcoes$ = this.acoesService.getAcoes().pipe();

  filtroPorInput$ = this.acoesInput.valueChanges.pipe(
    debounceTime(ESPERA_DIGITACAO),
    filter((valorDigitado) => valorDigitado.length >= 3 || !valorDigitado.length),
    switchMap((valorDigitado) => this.acoesService.getAcoes(valorDigitado))
  );

  acoes$ = merge(this.todaAcoes$, this.filtroPorInput$);

  constructor(private acoesService: AcoesService) {}
}
