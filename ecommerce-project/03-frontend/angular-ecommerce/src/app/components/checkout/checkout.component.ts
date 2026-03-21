import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  // declare form group == collection of form controls or other groups
  checkoutFormGroup!: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  // inject form builder
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    // build the form
    this.checkoutFormGroup = this.formBuilder.group({
      // customer group form
      customer: this.formBuilder.group ({
        firstName: [''],
        lastName: [''],
        email: ['']
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
        expirationYear: ['']
      })
    });
  }
  
    copyShippingAddressToBillingAddress(event) {

      if(event.target.checked) {
        // copy data from shipping to billing
        this.checkoutFormGroup.controls['billingAddress'].setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
      } else {
        // clears all fields form billing address
        this.checkoutFormGroup.controls['billingAddress'].reset();
      }
    }
  
  onSubmit() {
    console.log("Handling the submit button");
    console.log(this.checkoutFormGroup.get('customer').value);
    console.log("The email address is " + this.checkoutFormGroup.get('customer').value.email);

  }
  


}
