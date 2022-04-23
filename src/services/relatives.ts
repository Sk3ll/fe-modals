import { toast, ToastContent } from 'react-toastify';
import { IRelative } from '../utils/types';
import { relativeAPI } from '../api';

export default async (data: IRelative) => {
  const [createRelative] = relativeAPI.useCreateRelativeMutation();
  try {
    await createRelative(data).unwrap();
    toast.success('Contact details created successfully');
  } catch ({ error }) {
    toast.error(error as unknown as ToastContent);
  }
};
