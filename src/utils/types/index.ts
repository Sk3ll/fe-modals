export interface Phone {
  phone: string
}

export interface IContactDetails {
  phones: Phone[];
  email: string;
  name: string;
  accountNumber: string;
  photo: string;
  isAgree: boolean;
}

export interface IChild {
  fullName: string;
  dob: Date;
  age: number;
  copyCertificate: string;
}

export interface IChildren {
  children: IChild[];
}

export enum TypeRelatives {
  Spouse = 'Spouse',
  Other = 'Other',
}

export interface IRelative {
  type: TypeRelatives;
  fullName: string;
  identifyCode: string;
  phone: string;
  email: string;
  isEmergency: boolean;
}

export interface IRelatives {
  relatives: IRelative[]
}

interface CloseProps { handleClose: () => void; }
export interface ChildrenProps extends CloseProps {}
export interface DetailsProps extends CloseProps {}
export interface RelativesProps extends CloseProps {}
export interface HeaderProps extends CloseProps {}

export interface FooterProps {
  onCancel: () => void;
  onSave: () => void;
  isLoading: boolean;
}