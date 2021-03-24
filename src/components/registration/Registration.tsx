import React, { Component } from "react";
import Select from "react-select";

// importing constants and styles
import {
  ICountryList,
  IRestrationState,
  COUNTRY_LIST,
  INITIAL_FORM_VALUES,
} from "../../models/registration.model";
import "./Registration.scss";

class Registration extends Component<{}, IRestrationState> {
  countriesList: ICountryList[] = COUNTRY_LIST;
  isFormValid: boolean = false;
  readonly EMAIL_REGEX = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  readonly NUMBERS_REGEX = /^[0-9\b]+$/;
  readonly selectInputRef: any;
  constructor(props: any) {
    super(props);
    this.selectInputRef = React.createRef();
    this.state = INITIAL_FORM_VALUES;
  }

  /**
   * @method handleValueChange
   * @param event<any>
   * @returns none
   * @description It's called on each input value changes and updates form state
   */
  handleValueChange(event: any): void {
    const { name, value } = event.target;
    const { registrationForm, requiredFormField } = this.state;
    let formObj = {};
    formObj = {
      ...registrationForm,
      [name]: value,
    };

    // allow only numbers in mobile number field
    if (name === "mobileNumber" && value !== "") {
      if (!this.NUMBERS_REGEX.test(value)) {
        event.preventDefault();
        return;
      }
    }
    // update the state and validate the other fields
    this.setState({ registrationForm: formObj }, () => {
      // if it's optional field not reqired check validation
      if (!Object.keys(requiredFormField).includes(name)) return;
      let errorsObj: any = {};
      if (name === "password" || name === "confirmPassword") {
        let refValue = this.state.registrationForm[
          name === "password" ? "confirmPassword" : "password"
        ];
        const errorMsg = this.validateField(name, value, refValue);
        errorsObj = { ...requiredFormField, [name]: errorMsg };
        if (!errorMsg && refValue) {
          errorsObj.confirmPassword = "valid";
          errorsObj.password = "valid";
        }
      } else {
        const errorMsg = this.validateField(name, value);
        errorsObj = { ...requiredFormField, [name]: errorMsg };
      }
      // enable submit button if all fields are valid
      this.isFormValid = Object.values(errorsObj).every(
        (item) => item === "valid"
      );
      this.setState({ requiredFormField: errorsObj });
    });
  }

  /**
   * @method validateField
   * @param name<string>, value<string>, refValue<string>}
   * @returns string
   * @description It's used for validate the form field and return appropriate message
   */
  validateField(name: string, value: string, refValue?: string): string {
    let errorMsg = "valid";
    switch (name) {
      case "lastName":
        if (!value) errorMsg = "Last Name is required.";
        break;
      case "emailId":
        if (!value) errorMsg = "Email Id is required.";
        else if (!this.EMAIL_REGEX.test(value))
          errorMsg = "Please enter valid Email.";
        break;
      case "mobileNumber":
        if (!value) errorMsg = "Mobile Number is required.";
        break;
      case "country":
        if (!value) errorMsg = "Please select Country.";
        break;
      case "city":
        if (!value) errorMsg = "City is required.";
        break;
      case "password":
        // refValue is the value of Confirm Password field
        if (!value) errorMsg = "Password is required.";
        else if (refValue && value !== refValue)
          errorMsg = "Password and Confirm Password does not match.";
        break;
      case "confirmPassword":
        // refValue is the value of Password field
        if (!value) errorMsg = "Confirm Password is required.";
        else if (refValue && value !== refValue)
          errorMsg = "Password and Confirm Password does not match.";
        break;
    }
    return errorMsg;
  }

  /**
   * @method submitFormData
   * @param none
   * @returns none
   * @description It's used for submit the form data and re-set form fileds after submission
   */
  submitFormData(): void {
    console.log(this.state.registrationForm);
    this.isFormValid = false;
    this.selectInputRef.current.select.clearValue();
    INITIAL_FORM_VALUES.showSuccessAlert = true;
    this.setState(INITIAL_FORM_VALUES, () => {
      this.setState({
        requiredFormField: INITIAL_FORM_VALUES.requiredFormField,
      });
    });
  }

  /**
   * @method closeSuccessAlert
   * @param none
   * @returns none
   * @description It's used to close the success alert
   */
  closeSuccessAlert(): void {
    this.setState({ showSuccessAlert: false });
  }
  render() {
    const { registrationForm, requiredFormField } = this.state;
    return (
      <form autoComplete="off" data-testid="registration-form">
        <div className="registration-component row">
          <div className="col-md-12 registration-component__wrapper">
            {this.state.showSuccessAlert && (
              <div className="alert alert-success show" role="alert">
                Your form has been submitted successfully..!!
                <button
                  type="button"
                  className="close"
                  data-dismiss="alert"
                  aria-label="Close"
                  onClick={this.closeSuccessAlert.bind(this)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            )}
            <h2>Register</h2>
            <div className="form-group col-md-6">
              <label>First Name:</label>
              <input
                className="form-control"
                type="text"
                name="firstName"
                value={registrationForm.firstName}
                onChange={this.handleValueChange.bind(this)}
                onBlur={this.handleValueChange.bind(this)}
              />
            </div>
            <div className="form-group col-md-6">
              <label>
                Last Name:<span className="asterisk">*</span>
              </label>
              <input
                className="form-control"
                type="text"
                name="lastName"
                value={registrationForm.lastName}
                onChange={this.handleValueChange.bind(this)}
                onBlur={this.handleValueChange.bind(this)}
              />
              {requiredFormField.lastName &&
                requiredFormField.lastName !== "valid" && (
                  <span className="error">{requiredFormField.lastName}</span>
                )}
            </div>
            <div className="form-group col-md-6">
              <label>
                Email:<span className="asterisk">*</span>
              </label>
              <input
                className="form-control"
                type="text"
                name="emailId"
                value={registrationForm.emailId}
                onChange={this.handleValueChange.bind(this)}
                onBlur={this.handleValueChange.bind(this)}
              />
              {requiredFormField.emailId &&
                requiredFormField.emailId !== "valid" && (
                  <span className="error">{requiredFormField.emailId}</span>
                )}
            </div>
            <div className="form-group col-md-6">
              <label>
                Password:<span className="asterisk">*</span>
              </label>
              <input
                className="form-control"
                type="password"
                name="password"
                value={registrationForm.password}
                onChange={this.handleValueChange.bind(this)}
                onBlur={this.handleValueChange.bind(this)}
              />
              {requiredFormField.password &&
                requiredFormField.password !== "valid" && (
                  <span className="error">{requiredFormField.password}</span>
                )}
            </div>
            <div className="form-group col-md-6">
              <label>
                Confirm Password:<span className="asterisk">*</span>
              </label>
              <input
                className="form-control"
                type="password"
                name="confirmPassword"
                value={registrationForm.confirmPassword}
                onChange={this.handleValueChange.bind(this)}
                onBlur={this.handleValueChange.bind(this)}
              />
              {requiredFormField.confirmPassword &&
                requiredFormField.confirmPassword !== "valid" && (
                  <span className="error">
                    {requiredFormField.confirmPassword}
                  </span>
                )}
            </div>
            <div className="form-group col-md-6">
              <label>
                Mobile Number:<span className="asterisk">*</span>
              </label>
              <input
                className="form-control"
                type="text"
                name="mobileNumber"
                value={registrationForm.mobileNumber}
                onBlur={this.handleValueChange.bind(this)}
                onChange={this.handleValueChange.bind(this)}
              />
              {requiredFormField.mobileNumber &&
                requiredFormField.mobileNumber !== "valid" && (
                  <span className="error">
                    {requiredFormField.mobileNumber}
                  </span>
                )}
            </div>
            <div className="form-group col-md-6">
              <label className="mr-3">
                Gender:<span className="asterisk">*</span>
              </label>
              <div className="p-0 pt-1">
                <label className="mr-2">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={registrationForm.gender === "male"}
                    onChange={this.handleValueChange.bind(this)}
                  />{" "}
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={registrationForm.gender === "female"}
                    onChange={this.handleValueChange.bind(this)}
                  />{" "}
                  Female
                </label>
              </div>
            </div>
            <div className="form-group col-md-6">
              <label>Address Line1:</label>
              <input
                className="form-control"
                type="text"
                name="addressLine1"
                value={registrationForm.addressLine1}
                onChange={this.handleValueChange.bind(this)}
                onBlur={this.handleValueChange.bind(this)}
              />
            </div>
            <div className="form-group col-md-6">
              <label>Address Line2:</label>
              <input
                className="form-control"
                type="text"
                name="addressLine2"
                value={registrationForm.addressLine2}
                onChange={this.handleValueChange.bind(this)}
                onBlur={this.handleValueChange.bind(this)}
              />
            </div>
            <div className="form-group col-md-6">
              <label>
                City:<span className="asterisk">*</span>
              </label>
              <input
                className="form-control"
                type="text"
                name="city"
                value={registrationForm.city}
                onChange={this.handleValueChange.bind(this)}
                onBlur={this.handleValueChange.bind(this)}
              />
              {requiredFormField.city && requiredFormField.city !== "valid" && (
                <span className="error">{requiredFormField.city}</span>
              )}
            </div>
            <div className="form-group col-md-6">
              <label>
                Country:<span className="asterisk">*</span>
              </label>
              <Select
                name="country"
                options={this.countriesList}
                ref={this.selectInputRef}
                value={this.countriesList.find(
                  (element) => element.value === registrationForm.country
                )}
                onChange={(item) =>
                  this.handleValueChange({
                    target: {
                      name: "country",
                      value: item?.value,
                    },
                  })
                }
              />
              {requiredFormField.country &&
                requiredFormField.country !== "valid" && (
                  <span className="error">{requiredFormField.country}</span>
                )}
            </div>
            <div className="form-group col-md-6">
              <label>Zip Code:</label>
              <input
                className="form-control"
                type="text"
                name="zipCode"
                value={registrationForm.zipCode}
                onChange={this.handleValueChange.bind(this)}
              />
            </div>
            <button
              type="button"
              className="btn submit-btn"
              onClick={this.submitFormData.bind(this)}
              disabled={!this.isFormValid}
            >
              Sign Up
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default Registration;
