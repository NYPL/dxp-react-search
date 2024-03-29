import React, { createContext, useContext, useReducer } from "react";
import { FormState } from "./../components/locations/RequestVisitForm/types";

export enum FormContextActionType {
  SET_FORM_STATE = "SET_FORM_STATE",
}

export interface FormContextAction {
  type: FormContextActionType;
  payload: FormState;
}

type FormContextType = [FormState, React.Dispatch<FormContextAction>];

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
    notHoom: false,
  },
  errors: {},
  touched: {},
  isValid: false,
  isSubmitted: false,
  serverError: false,
};

function reducer(state: FormState, action: FormContextAction) {
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
const FormContext = createContext<FormContextType>([initialState, () => null]);

function useFormContext() {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error("useFormContext must be used within a FormContextProvider");
  }

  return context;
}

function FormContextProvider(props: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <FormContext.Provider value={[state, dispatch]}>
      {props.children}
    </FormContext.Provider>
  );
}

export { FormContext, FormContextProvider, useFormContext };
