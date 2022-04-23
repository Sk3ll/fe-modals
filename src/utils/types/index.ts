import {
  Control,
  FieldArrayWithId,
  FieldErrors,
  UseFieldArrayAppend,
  UseFormRegister,
  UseFieldArrayRemove
} from 'react-hook-form';
import { ChangeEvent } from 'react';

export interface Phone {
  phone: string;
}

export interface IChild {
  fullName: string;
  dob: Date;
  age: number;
  copyCertificate: string;
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

export interface IContactDetails {
  email: string;
  name: string;
  accountNumber: string;
  photo: string;
  isAgree: boolean;
  phones: Phone[];
  children: IChild[];
  relatives: IRelative[];
}

export interface HeaderProps {
  handleClose: () => void;
}

export interface FooterProps {
  onCancel: () => void;
  onSave: () => void;
}

export interface FormProps<FieldArray> {
  fields: FieldArrayWithId<FieldArray & Record<'id', string>>[];
  control: Control<IContactDetails>;
  errors: FieldErrors<IContactDetails>;
  register: UseFormRegister<IContactDetails>;
}

export interface ContactDetailsProps extends FormProps<Phone> {
  image: string;
  imageHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  append: UseFieldArrayAppend<IContactDetails, 'phones'>;
}

export interface ChildrenProps extends FormProps<IChild> {
  remove: UseFieldArrayRemove;
  imageHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  append: UseFieldArrayAppend<IContactDetails, 'children'>;
}

export interface RelativesProps extends FormProps<IRelative> {
  remove: UseFieldArrayRemove;
  append: UseFieldArrayAppend<IContactDetails, 'relatives'>;
}
