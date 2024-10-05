import { atom } from "recoil";

export const transactionAtom = atom({
  key: 'textState',
  default: {
    transactionNumber: "",
    horizonOnly: {
      leadFirstName: "",
      leadLastName: "",
      salesAgreementNumber: " ",
      suppliersInvolveNumber: " ",
    },
    travelItinerary: {
      travelType: "",
      airline: {
        name: "",
        code: "",
        etd: "",
        eta: "",
        origin: "",
        destination: ""
      },
      shipping: {
        name: "",
        voyageNumber: "",
        dateOfTravel: "",
        origin: "",
        destination: ""
      },
    }
  },
}
);
