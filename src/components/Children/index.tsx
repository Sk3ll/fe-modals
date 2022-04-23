import React, { FC } from 'react';
import { Box, Typography, Button, Input, Modal, TextField, Divider } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Controller, useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast, ToastContent } from 'react-toastify';
import { styleModal, errorMessageStyle } from '../../styles';
import { Buttons, Child } from '../../utils/constants';
import { IChildren, ChildrenProps } from '../../utils/types';
import HeaderComponent from '../Header';
import FooterComponent from '../Footer';
import RelativeComponent from '../Relatives';
import useImageHandler from '../../hooks/useImageHandler';
import useModal from '../../hooks/useModal';
import { childrenSchema } from '../../utils/validation';
import { childrenAPI } from '../../api';

const ChildrenComponent: FC<ChildrenProps> = ({ handleClose }) => {
  const [createChild, { isLoading }] = childrenAPI.useCreateChildMutation();
  const { imageHandler } = useImageHandler();
  const { open, handleOpen: handleOpenRelative, handleClose: handleCloseRelative } = useModal();
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<IChildren>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      children: [{
        fullName: '',
        dob: new Date('1970-01-01'),
        age: 0,
      }],
    },
    resolver: yupResolver(childrenSchema),
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'children' });
  const submit: SubmitHandler<IChildren> = async ({ children }) => {
    try {
      const createdMany = children.map(child => createChild(child).unwrap());
      await Promise.all(createdMany);
      toast.success('Children created successfully');
      handleOpenRelative();
    } catch ({ error }) {
      toast.error(error as unknown as ToastContent);
    }
  };

  return (
    <>
      <HeaderComponent handleClose={handleClose} />
      <form onSubmit={handleSubmit(submit)}>
        <Box style={{ display: 'flex', flexDirection: 'column' }}>
          {fields.map((item, index) => (
            <Box key={item.id} style={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant='h4' id='children__title'>
                {`${Child.Title} ${index + 1}`}
              </Typography>

              <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={() => remove(index)}>{Buttons.Remove}</Button>
              </Box>

              <Box style={{ display: 'flex', flexDirection: 'row' }}>
                <Box>
                  <Controller
                    name={`children.${index}.fullName`}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Input
                        type='input'
                        placeholder={Child.FullName}
                        aria-label={Child.FullName}
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                  <Typography style={errorMessageStyle}>{errors.children?.[index]?.fullName?.message}</Typography>
                </Box>

                <Box>
                  <Controller
                    name={`children.${index}.dob`}
                    control={control}
                    defaultValue={new Date('1970-01-01')}
                    render={({ field: { onChange, value } }) => (
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          label={Child.DateOfBirth}
                          value={value}
                          onChange={onChange}
                          renderInput={params => <TextField variant='standard' {...params} />}
                        />
                      </LocalizationProvider>
                    )}
                  />
                  <Typography style={errorMessageStyle}>{errors.children?.[index]?.dob?.message}</Typography>
                </Box>

                <Box>
                  <Controller
                    name={`children.${index}.age`}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Input
                        type='input'
                        placeholder={Child.Age}
                        aria-label={Child.Age}
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                  <Typography style={errorMessageStyle}>{errors.children?.[index]?.age?.message}</Typography>
                </Box>
              </Box>
              <Box>
                <Button>
                  <label htmlFor='files'>{Buttons.AddFile}</label>
                  <input
                    {...register(`children.${index}.copyCertificate`)}
                    type='file'
                    id='files'
                    name='copyCertificate'
                    onChange={imageHandler}
                    style={{ visibility: 'hidden', width: '0px' }}
                  />
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
        <Divider />
        <Button type='button' onClick={() => append({
          fullName: '',
          dob: new Date('1970-01-01'),
          age: 0,
        })}>
          {Buttons.AddChild}
        </Button>

        <FooterComponent isLoading={isLoading} onCancel={handleClose} onSave={handleSubmit(submit)} />
      </form>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={styleModal}>
          <RelativeComponent handleClose={handleCloseRelative} />
        </Box>
      </Modal>
    </>
  );
};

export default ChildrenComponent;
