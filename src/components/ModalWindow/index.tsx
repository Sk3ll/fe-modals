import React from 'react';
import { Modal, Box, Button } from '@mui/material';
import { toast, ToastContainer, ToastContent } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { styleModal } from '../../styles';
import DetailsFormComponent from './ContactDetailsForm';
import RelativeFormComponent from './RelativesForm';
import ChildrenFormComponent from './ChildrenForm';
import useModal from '../../hooks/useModal';
import HeaderComponent from './ModalWindowHeader';
import FooterComponent from './ModalWindowFooter';
import { contactDetailsAPI } from '../../api';
import useImageHandler from '../../hooks/useImageHandler';
import { IContactDetails, IRelative, Phone, TypeRelatives } from '../../utils/types';
import { contactDetailsSchema } from '../../utils/validation';

const defaultPhone: Phone = { phone: '' };
const defaultRelative: IRelative = {
  type: TypeRelatives.Spouse,
  fullName: '',
  identifyCode: '',
  phone: '',
  email: '',
  isEmergency: false,
};

const ModalWindow = () => {
  const { open, handleOpen, handleClose } = useModal();
  const [createContactDetails] = contactDetailsAPI.useCreateContactDetailsMutation();
  const { image, imageHandler } = useImageHandler();
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<IContactDetails>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      name: '',
      accountNumber: '',
      phones: [defaultPhone, defaultPhone],
      children: [
        {
          fullName: '',
          dob: new Date('1970-01-01'),
          age: 0,
        },
      ],
      relatives: [defaultRelative],
    },
    resolver: yupResolver(contactDetailsSchema),
  });
  const { fields: fieldsPhones, append: appendPhones } = useFieldArray({ control, name: 'phones' });
  const {
    fields: fieldsChildren,
    append: appendChildren,
    remove: removeChildren,
  } = useFieldArray({ control, name: 'children' });
  const {
    fields: fieldsRelatives,
    append: appendRelatives,
    remove: removeRelatives,
  } = useFieldArray({ control, name: 'relatives' });
  const submitHandler: SubmitHandler<IContactDetails> = async data => {
    try {
      const contact = { ...data, photo: image };
      await createContactDetails(contact).unwrap();
      toast.success('Contact details created successfully');
      handleClose();
    } catch ({ error }) {
      toast.error(error as unknown as ToastContent);
    }
  };

  return (
    <Box>
      <ToastContainer />
      <Box
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Button variant='outlined' onClick={handleOpen}>
          Click me
        </Button>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={styleModal} style={{ display: 'flex', flexDirection: 'column' }}>
          <HeaderComponent handleClose={handleClose} />
          <form style={{ overflow: 'auto' }} onSubmit={handleSubmit(submitHandler)}>
            <DetailsFormComponent
              fields={fieldsPhones}
              append={appendPhones}
              register={register}
              control={control}
              errors={errors}
              imageHandler={imageHandler}
              image={image}
            />
            <ChildrenFormComponent
              fields={fieldsChildren}
              append={appendChildren}
              register={register}
              control={control}
              errors={errors}
              remove={removeChildren}
              imageHandler={imageHandler}
            />
            <RelativeFormComponent
              fields={fieldsRelatives}
              append={appendRelatives}
              register={register}
              control={control}
              remove={removeRelatives}
              errors={errors}
            />
          </form>
          <FooterComponent onCancel={handleClose} onSave={handleSubmit(submitHandler)} />
        </Box>
      </Modal>
    </Box>
  );
};

export default ModalWindow;
