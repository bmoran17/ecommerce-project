import { FormControl, ValidationErrors } from '@angular/forms';

export class ShopValidators {

  // whitespace validation
  // pass form control which is what we are validating against
  // returns validations errors
  static notOnlyWhitespace(control: FormControl): ValidationErrors {

    // check if string only contains whitespace
    // check string is not null & trim(removes whitespace) string to check length
    if ((control.value != null) && (control.value.trim().length === 0)) {

      // invalid, return error object
      return { notOnlyWhitespace: true };
    } else {

      // valid, return null
      return null;
    }

  }
}
