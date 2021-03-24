export interface IRestrationState {
  registrationForm: any;
  requiredFormField: any;
  showSuccessAlert:boolean;
}

export interface ICountryList {
  value: string;
  label:string;
}

export const COUNTRY_LIST: ICountryList[] = [
  { value: "australia", label: "Australia" },
  { value: "in", label: "India" },
  { value: "ksa", label: "Saudi Arabia" },
  { value: "uae", label: "United Arab Emirites" },
  { value: "us", label: "United States of America" }
];
export const INITIAL_FORM_VALUES = {
  registrationForm: {
    firstName: "",
    lastName: "",
    emailId: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
    gender: null,
    addressLine1: "",
    addressLine2: "",
    city: "",
    country: null,
    zipCode: "",
  },
  requiredFormField: {
    lastName: null,
    emailId: null,
    mobileNumber: null,
    password: null,
    confirmPassword: null,
    gender: null,
    country: null,
    city: null,
  },
  showSuccessAlert:false
};
