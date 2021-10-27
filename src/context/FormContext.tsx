import React, { createContext, useContext, useReducer } from "react";
import { FormState as InitialStateType } from "./../components/locations/RequestVisitForm/types";

const initialState = {
  values: {
    library: "",
    visitType: "",
    virtualVisitServices: [],
    virtualVisitServicesOther: "",
    inPersonServices: "",
    inPersonServicesOther: "",
    contactName: "",
    contactEmail: "",
    organization: "",
    noSchoolOrOrg: false,
    ageGroup: [],
  },
  errors: {},
  touched: {},
  isValid: false,
  isSubmitted: false,
};

function reducer(state: InitialStateType, action: any) {
  switch (action.type) {
    case "SET_FORM_STATE": {
      return {
        ...state,
        ...action.payload,
      };
    }

    default: {
      throw new Error(`Unsupported action type: ${action.type}`);
    }
  }
}

// @ts-ignore
const FormContext = createContext();

function useFormContext() {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error(`useFormContext must be used within a FormContextProvider`);
  }

  return context;
}

function FormContextProvider(props: any) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <FormContext.Provider value={[state, dispatch]}>
      {props.children}
    </FormContext.Provider>
  );
}

export { FormContext, FormContextProvider, useFormContext };
