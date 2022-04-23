import { toast, ToastContent } from 'react-toastify';
import { IContactDetails } from '../utils/types';
import { contactDetailsAPI } from '../api';

export default async (data: IContactDetails) => {
  const [createContactDetails] = contactDetailsAPI.useCreateContactDetailsMutation();
  try {
    await createContactDetails(data).unwrap();
    toast.success('Contact details created successfully');
  } catch ({ error }) {
    toast.error(error as unknown as ToastContent);
  }
};
