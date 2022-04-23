import * as yup from 'yup';
import { IContactDetails, Phone, IChild, IRelative, TypeRelatives } from './types';

// @ts-ignore regression bug in 0.32.9 https://github.com/jquense/yup/issues/1389
export const contactDetailsSchema: yup.SchemaOf<IContactDetails> = yup.object().shape({
  phones: yup.array().of<yup.SchemaOf<Phone>>(yup.object({ phone: yup.string().required('Phone is required') })),
  name: yup.string().required('Name is required').max(24, 'Name must be between 1 and 24 characters long'),
  email: yup.string().email().required(),
  accountNumber: yup.number().positive().required(),
  photo: yup.string().required('Photo is required'),
  isAgree: yup.boolean().isTrue('You must agree').required(),
  children: yup.array().of<yup.SchemaOf<IChild>>(
    yup.object({
      fullName: yup.string().required('Name is required').max(24, 'Name must be between 1 and 24 characters long'),
      age: yup.number().positive('Age should be positive number').required(),
      dob: yup.date().required('Date of birth is required'),
      copyCertificate: yup.string().required('Copy of certificate is required'),
    })
  ),
  relatives: yup.array().of<yup.SchemaOf<IRelative>>(
    yup.object({
      fullName: yup.string().required('Name is required').max(24, 'Name must be between 1 and 24 characters long'),
      type: yup.mixed().oneOf(Object.values(TypeRelatives)).required('Relative type is required'),
      identifyCode: yup.string().required('Identify code is required'),
      phone: yup.string().required('Phone is required'),
      email: yup.string().email().required(),
      isEmergency: yup.boolean().required(),
    })
  ),
});
