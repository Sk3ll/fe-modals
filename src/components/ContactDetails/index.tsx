import React, { FC } from 'react';
import { Box, Typography, Button, Input, Modal, FormControlLabel, Checkbox } from '@mui/material';
import MuiPhoneNumber from 'material-ui-phone-number';
import { Controller, useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast, ToastContent } from 'react-toastify';
import { styleModal, errorMessageStyle } from '../../styles';
import { Buttons, ContactDetails } from '../../utils/constants';
import { IContactDetails, DetailsProps, Phone } from '../../utils/types';
import HeaderComponent from '../Header';
import FooterComponent from '../Footer';
import ChildrenComponent from '../Children';
import useImageHandler from '../../hooks/useImageHandler';
import useModal from '../../hooks/useModal';
import { contactDetailsSchema } from '../../utils/validation';
import { contactDetailsAPI } from '../../api';

const defaultPhone: Phone = { phone: '' };

const DetailsComponent: FC<DetailsProps> = ({ handleClose }) => {
  const [createContactDetails, { isLoading }] = contactDetailsAPI.useCreateContactDetailsMutation();
  const { image, imageHandler } = useImageHandler();
  const { open, handleOpen: handleOpenChildren, handleClose: handleCloseChildren } = useModal();
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
    },
    resolver: yupResolver(contactDetailsSchema),
  });
  const { fields, append } = useFieldArray({ control, name: 'phones' });
  const submit: SubmitHandler<IContactDetails> = async data => {
    try {
      const contact = { ...data, photo: image };
      await createContactDetails(contact);
      toast.success('Contact details created successfully');
      handleOpenChildren();
    } catch ({ error }) {
      toast.error(error as unknown as ToastContent);
    }
  };

  return (
    <>
      <Box>
        <HeaderComponent handleClose={handleClose} />
        <Typography variant='h5' id='details__title'>
          {ContactDetails.Title}
        </Typography>
        <form onSubmit={handleSubmit(submit)}>
          <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
            <Box style={{ display: 'flex', flexDirection: 'column' }}>
              {fields.map((item, index) => (
                <Controller
                  key={item.id}
                  name={`phones.${index}.phone`}
                  control={control}
                  defaultValue=''
                  render={({ field: { onChange, value } }) => (
                    <>
                      <MuiPhoneNumber
                        name={ContactDetails.Phone}
                        label={ContactDetails.Phone}
                        fullWidth
                        defaultCountry='ee'
                        value={value}
                        onChange={onChange}
                        error={!!errors.phones?.[index]?.phone}
                      />
                      <Typography style={errorMessageStyle}>{errors.phones?.[index]?.phone?.message}</Typography>
                    </>
                  )}
                />
              ))}
            </Box>
            <Button
              style={{ marginLeft: '40px', height: '40px', justifyContent: 'flex-end' }}
              type='button'
              onClick={() => append(defaultPhone)}
            >
              {Buttons.AddMore}
            </Button>
          </Box>

          <Controller
            shouldUnregister
            name='email'
            control={control}
            defaultValue=''
            render={({ field: { onChange, value } }) => (
              <Input
                type='input'
                placeholder={ContactDetails.Email}
                aria-label={ContactDetails.Email}
                value={value}
                onChange={onChange}
                error={!!errors.email}
              />
            )}
          />
          <Typography style={errorMessageStyle}>{errors.email?.message}</Typography>

          <Typography variant='h5'>{ContactDetails.Bank}</Typography>

          <Controller
            shouldUnregister
            name='name'
            control={control}
            defaultValue=''
            render={({ field: { onChange, value } }) => (
              <Input
                type='input'
                placeholder={ContactDetails.Name}
                aria-label={ContactDetails.Name}
                value={value}
                onChange={onChange}
                error={!!errors.name}
              />
            )}
          />
          <Typography style={errorMessageStyle}>{errors.name?.message}</Typography>

          <Controller
            shouldUnregister
            name='accountNumber'
            control={control}
            defaultValue='0'
            render={({ field: { onChange, value } }) => (
              <Input
                type='input'
                placeholder={ContactDetails.AccountNumber}
                aria-label={ContactDetails.AccountNumber}
                value={value}
                onChange={onChange}
                error={!!errors.accountNumber}
              />
            )}
          />
          <Typography style={errorMessageStyle}>{errors.accountNumber?.message}</Typography>

          <Box>
            <Typography variant='h5'>{ContactDetails.Photo}</Typography>
            <Typography>{ContactDetails.PhotoDescription}</Typography>
            <img src={image} alt='' id='img' style={{ width: '150px' }} />

            <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Box>
                <Button>
                  <label htmlFor='files'>{Buttons.AddPicture}</label>
                  <input
                    {...register('photo')}
                    type='file'
                    id='files'
                    name='photo'
                    onChange={imageHandler}
                    style={{ visibility: 'hidden', width: '0px' }}
                  />
                </Button>
                <Typography style={errorMessageStyle}>{errors.photo?.message}</Typography>
              </Box>

              <Box>
                <Controller
                  name='isAgree'
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <FormControlLabel
                      control={<Checkbox {...field} />}
                      label={Buttons.AgreeCheckbox}
                    />
                  )}
                />
                <Typography style={errorMessageStyle}>{errors.isAgree?.message}</Typography>
              </Box>
            </Box>
          </Box>

          <FooterComponent isLoading={isLoading} onCancel={handleClose} onSave={handleSubmit(submit)} />
        </form>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={styleModal}>
          <ChildrenComponent handleClose={handleCloseChildren} />
        </Box>
      </Modal>
    </>
  );
};

export default DetailsComponent;
