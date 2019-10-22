import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

import * as CodiceFiscale from '@marketto/codice-fiscale-utils';

@Component({
  selector: 'app-codice-fiscale',
  templateUrl: './codice-fiscale.component.html',
  styleUrls: ['./codice-fiscale.component.scss']
})
export class CodiceFiscaleComponent implements OnInit {

  constructor() { }

  public personForm: FormGroup;
  private data = {
    cf: ''
  };
  public get cf(): AbstractControl {
    return this.personForm.get('cf');
  }

  getErrorMessage(field: AbstractControl): string {
    console.log(field.errors);
    const check = [
      {errorId: 'minlength', message: (error) => `Should be at last ${error.requiredLength} characters`},
      {errorId: 'cf-surname', message: () => 'Surname part is not valid'},
      {errorId: 'cf-name', message: () => 'Name part is not valid'},
      {errorId: 'cf-date', message: () => 'Date part is not valid'},
      {errorId: 'cf-place', message: () => 'Place part is not a valid belfiore code'},
      {errorId: 'cf-placeDate', message: () => 'Birth place and birth date don\'t match'},
      {errorId: 'cf-checkDigit', message: () => 'Check digit doesn\'t match the rest of CF'},
    ]
    .find(({errorId}) => field.hasError(errorId));
    if (check) {
      return check.message(field.errors[check.errorId]);
    }
    return null;
  }

  ngOnInit() {
    this.personForm = new FormGroup({
      cf: new FormControl(this.data.cf, [
        Validators.required,
        Validators.minLength(16),
        ({value}) => {
          if (CodiceFiscale.Validator.isValid(value)) {
            return null;
          }
          const analysis = CodiceFiscale.Validator.analyze(value);
          const validation = {};
          Object.entries(analysis).forEach(([criteria, result]) => {
            if (!result) {
              validation[`cf-${criteria}`] = true;
            }
          });
          return validation;
        }
      ])
    });
  }

}
