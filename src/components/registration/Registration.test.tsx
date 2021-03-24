import React from 'react';
import { render, screen } from '@testing-library/react';
import Registration from './Registration';

describe("testing <Registration> component", () => {
  beforeEach(() => {
   render(<Registration />);
  });

  test("renders <Registration> component on the DOM", () => {
    const linkElement = screen.getByText('Register');
    expect(linkElement).toBeInTheDocument();
  });

  test("check rendering FORM in DOM", () => {
    const formElement = screen.getByTestId('registration-form');
    expect(formElement).toBeInTheDocument();
  });

  test("check FORM tag existence", () => {
    const formContainer = screen.getByTestId('registration-form');
    expect(formContainer.nodeName).toEqual('FORM');
  });

  test("checking the existence of button in DOM", () => {
    const signUpBtn = screen.getByText('Sign Up');
    expect(signUpBtn.nodeName).toEqual('BUTTON');
  });
});
