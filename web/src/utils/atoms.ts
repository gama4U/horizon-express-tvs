import { atom } from "recoil";



export const transactionAtom = atom({
  key: 'textState',
  default: {
    leadFirstName: "",
    leadLastName: "",
    transactionNumber: "",
    salesAgreementNumber: " ",
    suppliersInvolveNumber: " ",
  },
}
);
