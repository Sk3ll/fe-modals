import React, { FC } from 'react';
import {
  Box,
  Typography,
  Button,
  Input,
  FormControlLabel,
  Checkbox,
  Divider,
  InputLabel,
  NativeSelect,
  FormControl,
} from '@mui/material';
import MuiPhoneNumber from 'material-ui-phone-number';
import { Controller, useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast, ToastContent } from 'react-toastify';
import { errorMessageStyle } from '../../styles';
import { Buttons, Relative } from '../../utils/constants';
import { IRelative, TypeRelatives, IRelatives, RelativesProps } from '../../utils/types';
import HeaderComponent from '../Header';
import FooterComponent from '../Footer';
import { relativesSchema } from '../../utils/validation';
import { relativeAPI } from '../../api';

const defaultRelative: IRelative = {
  type: TypeRelatives.Spouse,
  fullName: '',
  identifyCode: '',
  phone: '',
  email: '',
  isEmergency: false,
};

const RelativeComponent: FC<RelativesProps> = ({ handleClose }) => {
  const [createRelative, { isLoading }] = relativeAPI.useCreateRelativeMutation();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IRelatives>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: { relatives: [defaultRelative] },
    resolver: yupResolver(relativesSchema),
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'relatives' });
  const submit: SubmitHandler<IRelatives> = async ({ relatives }) => {
    try {
      const createdMany = relatives.map(relative => createRelative(relative).unwrap());
      await Promise.all(createdMany);
      toast.success('Relatives created successfully');
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
              <Typography variant='h4' id='relative__title'>
                {`${Relative.Title} ${index + 1}`}
              </Typography>

              <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={() => remove(index)}>{Buttons.Remove}</Button>
              </Box>

              <Box style={{ display: 'flex', flexDirection: 'row' }}>
                <Box>
                  <FormControl>
                    <Controller
                      name={`relatives.${index}.type`}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <>
                          <InputLabel variant='standard' htmlFor='uncontrolled-native'>
                            {Relative.Type}
                          </InputLabel>
                          <NativeSelect onChange={onChange} value={value} error={!!errors.relatives?.[index]?.type}>
                            {Object.values(TypeRelatives).map(type => (
                              <option key={type} value={type}>
                                {type}
                              </option>
                            ))}
                          </NativeSelect>
                        </>
                      )}
                    />
                  </FormControl>
                  <Typography style={errorMessageStyle}>{errors.relatives?.[index]?.type?.message}</Typography>
                </Box>

                <Box>
                  <Controller
                    name={`relatives.${index}.fullName`}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Input
                        type='input'
                        placeholder={Relative.FullName}
                        aria-label={Relative.FullName}
                        value={value}
                        onChange={onChange}
                        error={!!errors.relatives?.[index]?.fullName}
                      />
                    )}
                  />
                  <Typography style={errorMessageStyle}>{errors.relatives?.[index]?.fullName?.message}</Typography>
                </Box>

                <Box>
                  <Controller
                    name={`relatives.${index}.identifyCode`}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Input
                        type='input'
                        placeholder={Relative.CodeOrDob}
                        aria-label={Relative.CodeOrDob}
                        value={value}
                        onChange={onChange}
                        error={!!errors.relatives?.[index]?.identifyCode}
                      />
                    )}
                  />
                </Box>
                <Typography style={errorMessageStyle}>{errors.relatives?.[index]?.identifyCode?.message}</Typography>
              </Box>

              <Box style={{ display: 'flex', flexDirection: 'row' }}>
                <Box>
                  <Controller
                    name={`relatives.${index}.phone`}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <MuiPhoneNumber
                        name={Relative.Phone}
                        label={Relative.Phone}
                        fullWidth
                        defaultCountry='ee'
                        value={value}
                        onChange={onChange}
                        error={!!errors.relatives?.[index]?.phone}
                      />
                    )}
                  />
                  <Typography style={errorMessageStyle}>{errors.relatives?.[index]?.phone?.message}</Typography>
                </Box>

                <Box>
                  <Controller
                    name={`relatives.${index}.email`}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Input
                        type='input'
                        placeholder={Relative.Email}
                        aria-label={Relative.Email}
                        value={value}
                        onChange={onChange}
                        error={!!errors.relatives?.[index]?.email}
                      />
                    )}
                  />
                  <Typography style={errorMessageStyle}>{errors.relatives?.[index]?.email?.message}</Typography>
                </Box>
              </Box>

              <Box>
                <Controller
                  name={`relatives.${index}.isEmergency`}
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <FormControlLabel control={<Checkbox {...field} />} label={Buttons.EmergencyCheckbox} />
                  )}
                />
                <Typography style={errorMessageStyle}>{errors.relatives?.[index]?.isEmergency?.message}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
        <Divider />
        <Button type='button' onClick={() => append(defaultRelative)}>
          {Buttons.AddLoved}
        </Button>

        <FooterComponent isLoading={isLoading} onCancel={handleClose} onSave={handleSubmit(submit)} />
      </form>
    </>
  );
};

export default RelativeComponent;
