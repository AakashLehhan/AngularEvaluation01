import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, NgForm, FormBuilder } from '@angular/forms';
import { CardDetailsCrudService } from '../card-details-crud.service';
import { ActivatedRoute } from '@angular/router';
import { VirtualTimeScheduler } from 'rxjs';

@Component({
  selector: 'app-payment-details-form',
  templateUrl: './payment-details-form.component.html',
  styleUrls: ['./payment-details-form.component.css'],
})
export class PaymentDetailsFormComponent implements OnInit {
  alert: boolean = false;
  myReactiveForm: any;

  id: any;

  constructor(
    private router: ActivatedRoute,
    private cardService: CardDetailsCrudService
  ) {}

  ngOnInit(): void {
    this.cardService.updateID.subscribe(id => this.id = id);
    console.log(this.id);
    if (this.id != 0) {
      this.cardService.getDetails(this.id).subscribe((result: any) => {
          console.warn('result', result);
          this.myReactiveForm = new FormGroup({
            cardHoldersName: new FormControl(result['cardHoldersName'], [
            Validators.required,
            Validators.pattern('^((?:[A-Za-z]+ ?){1,2})$'),
          ]),
            cardNumber: new FormControl(result['cardNumber'], [
              Validators.required,
              Validators.pattern('^(?:[1-9][0-9]{15})$'),
            ]),
            expirationDate: new FormControl(result['expirationDate'], [
              Validators.required,
              Validators.pattern('^(0[1-9]|1[0-2])/?([0-9]{2})$'),
            ]),
            securityCode: new FormControl(result['securityCode'], [
              Validators.required,
              Validators.pattern('^[0-9]{3}$'),
            ]),
          });
      });
    } else {
      this.myReactiveForm = new FormGroup({
        cardHoldersName: new FormControl(null, [
          Validators.required,
          Validators.pattern('^((?:[A-Za-z]+ ?){1,2})$'),
        ]),
        cardNumber: new FormControl(null, [
          Validators.required,
          Validators.pattern('^(?:[1-9][0-9]{15})$'),
        ]),
        expirationDate: new FormControl(null, [
          Validators.required,
          Validators.pattern('^(0[1-9]|1[0-2])/?([0-9]{2})$'),
        ]),
        securityCode: new FormControl(null, [
          Validators.required,
          Validators.pattern('^[0-9]{3}$'),
        ]),
      });
    }
  }
  onSubmit() {
    if(this.id != 0) {
      this.cardService.updateDetails(this.id, this.myReactiveForm.value).subscribe((result) => {
        //this.cardService.resetId(0);
        console.log(result);
      })
    } else {
    this.cardService
      .postDetails(this.myReactiveForm.value)
      .subscribe((result) => {
        console.log(result);
      });
    }
    this.alert = true;
    // this.myReactiveForm.reset({});
    window.location.reload();
  }
  closeAlert() {
    this.alert = false;
  }
}
