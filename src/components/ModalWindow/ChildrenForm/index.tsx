import React, { FC } from 'react';
import { Box, Typography, Button, Input, TextField, Divider } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Controller, useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { errorMessageStyle } from '../../../styles';
import { Buttons, Child } from '../../../utils/constants';
import { ChildrenProps } from '../../../utils/types';

const ChildrenFormComponent: FC<ChildrenProps> = ({
  remove,
  fields,
  append,
  register,
  control,
  imageHandler,
  errors,
}) => (
  <>
    <Box style={{ display: 'flex', flexDirection: 'column' }}>
      {fields.map((item, index) => (
        <Box key={item.id} style={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='h4' id='children__title'>
            {`${Child.Title} ${index + 1}`}
          </Typography>

          <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={() => remove(index)}>{Buttons.Remove}</Button>
          </Box>

          <Box style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
            <Box>
              <Controller
                name={`children.${index}.fullName`}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    variant='standard'
                    placeholder={Child.FullName}
                    label={Child.FullName}
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
                  <TextField
                    variant='standard'
                    placeholder={Child.Age}
                    label={Child.Age}
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
    <Button
      type='button'
      onClick={() =>
        append({
          fullName: '',
          dob: new Date('1970-01-01'),
          age: 0,
        })
      }
    >
      {Buttons.AddChild}
    </Button>
  </>
);

export default ChildrenFormComponent;
