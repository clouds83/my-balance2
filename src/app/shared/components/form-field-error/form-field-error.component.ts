import { Component, OnInit, Input } from "@angular/core";
import { UntypedFormControl } from "@angular/forms";

@Component({
  selector: "app-form-field-error",
  template: `
    <p class="text-danger">
      {{ errorMessage }}
    </p>
  `,
  styleUrls: ["./form-field-error.component.css"],
})
export class FormFieldErrorComponent implements OnInit {
  @Input("form-control") formControl: UntypedFormControl;

  constructor() {}

  ngOnInit() {}

  public get errorMessage(): string | null {
    if (this.mustShowErrorMessage()) return this.getErrorMessage();
    else return null;
  }

  private mustShowErrorMessage(): boolean {
    return this.formControl.invalid && this.formControl.touched;
  }

  private getErrorMessage(): string | null {
    if (this.formControl.errors.required) return "Required";
    else if (this.formControl.errors.email) return "It is not a valid e-mail";
    else if (this.formControl.errors.minlength) {
      const requiredLength = this.formControl.errors.minlength.requiredLength;
      return `Minimum of ${requiredLength} characters`;
    } else if (this.formControl.errors.maxlength) {
      const requiredLength = this.formControl.errors.maxlength.requiredLength;
      return `Maximum of ${requiredLength} characters`;
    }
  }
}
