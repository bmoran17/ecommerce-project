import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ShopFormService } from 'src/app/services/shop-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  // declare form group == collection of form controls or other groups
  checkoutFormGroup!: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  // inject form builder & form service
  constructor(
    private formBuilder: FormBuilder,
    private shopFormService: ShopFormService,
  ) {}

  ngOnInit(): void {
    // build the form
    this.checkoutFormGroup = this.formBuilder.group({
      // customer group form
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: [''],
      }),
      // shipping address group form
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      // billing address group form
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      // credit card group form
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: [''],
      }),
    });

    // populate credit card months
    // get current month & add 1 due to 0 based
    const startMonth: number = new Date().getMonth() + 1;
    console.log('startMonth:' + startMonth);

    // use Shop Form Service to get credit card months & pass startMonth to subscribe
    this.shopFormService.getCreditCardMonths(startMonth).subscribe((data) => {
      console.log('Retrieved credit card months: ' + JSON.stringify(data));
      this.creditCardMonths = data;
    });

    // populate credit card years
    // use Shop Form Service to get credit card years & subscribe
    this.shopFormService.getCreditCardYears().subscribe((data) => {
      console.log('Retrieved credit card years: ' + JSON.stringify(data));
      this.creditCardYears = data;
    });
  }

  copyShippingAddressToBillingAddress(event) {
    if (event.target.checked) {
      // copy data from shipping to billing
      this.checkoutFormGroup.controls['billingAddress'].setValue(
        this.checkoutFormGroup.controls['shippingAddress'].value,
      );
    } else {
      // clears all fields form billing address
      this.checkoutFormGroup.controls['billingAddress'].reset();
    }
  }

  onSubmit() {
    console.log('Handling the submit button');
    console.log(this.checkoutFormGroup.get('customer').value);
    console.log(
      'The email address is ' +
        this.checkoutFormGroup.get('customer').value.email,
    );
  }

  handleMonthsAndYears() {

    // get handle to credit card form group
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
    const currentYear: number = new Date().getFullYear();
    // read selected year from form
    const selectedYear: number = Number(creditCardFormGroup.value.expirationYear);

    // if current year equals selected year, then start with current month
    let startMonth: number;
    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }

    this.shopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log('Retrieved credit card months: ' + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    )
  }
}
