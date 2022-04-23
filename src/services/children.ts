import { toast, ToastContent } from 'react-toastify';
import { IChild } from '../utils/types';
import { childrenAPI } from '../api';

export default async (data: IChild) => {
  const [createChild] = childrenAPI.useCreateChildMutation();
  try {
    await createChild(data).unwrap();
    toast.success('Contact details created successfully');
  } catch ({ error }) {
    toast.error(error as unknown as ToastContent);
  }
};
