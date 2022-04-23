import React, { FC } from 'react';
import { Box, Typography, Button, FormControlLabel, Checkbox, TextField } from '@mui/material';
import MuiPhoneNumber from 'material-ui-phone-number';
import { Controller } from 'react-hook-form';
import { errorMessageStyle } from '../../../styles';
import { Buttons, ContactDetails } from '../../../utils/constants';
import { ContactDetailsProps } from '../../../utils/types';

const DetailsFormComponent: FC<ContactDetailsProps> = ({
  fields,
  control,
  errors,
  append,
  register,
  image,
  imageHandler,
}) => (
  <Box style={{ display: 'flex', flexDirection: 'column', rowGap: '10px' }}>
    <Typography variant='h5' id='details__title'>
      {ContactDetails.Title}
    </Typography>
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
                  style={{ width: '85%', margin: '5px 0' }}
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
        onClick={() => append({ phone: '' })}
      >
        {Buttons.AddMore}
      </Button>
    </Box>

    <Box style={{ width: '45  %' }}>
      <Controller
        shouldUnregister
        name='email'
        control={control}
        defaultValue=''
        render={({ field: { onChange, value } }) => (
          <TextField
            variant='standard'
            placeholder={ContactDetails.Email}
            label={ContactDetails.Email}
            value={value}
            onChange={onChange}
            error={!!errors.email}
          />
        )}
      />
      <Typography style={errorMessageStyle}>{errors.email?.message}</Typography>
    </Box>

    <Typography variant='h5'>{ContactDetails.Bank}</Typography>

    <Box style={{ display: 'flex', flexDirection: 'row', gap: '30px' }}>
      <Box>
        <Controller
          shouldUnregister
          name='name'
          control={control}
          defaultValue=''
          render={({ field: { onChange, value } }) => (
            <TextField
              variant='standard'
              placeholder={ContactDetails.Name}
              label={ContactDetails.Name}
              value={value}
              onChange={onChange}
              error={!!errors.name}
            />
          )}
        />
        <Typography style={errorMessageStyle}>{errors.name?.message}</Typography>
      </Box>

      <Box>
        <Controller
          shouldUnregister
          name='accountNumber'
          control={control}
          defaultValue='0'
          render={({ field: { onChange, value } }) => (
            <TextField
              variant='standard'
              placeholder={ContactDetails.AccountNumber}
              label={ContactDetails.AccountNumber}
              value={value}
              onChange={onChange}
              error={!!errors.accountNumber}
            />
          )}
        />
        <Typography style={errorMessageStyle}>{errors.accountNumber?.message}</Typography>
      </Box>
    </Box>

    <Box style={{ display: 'flex', flexDirection: 'column', rowGap: '10px' }}>
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
            render={({ field }) => <FormControlLabel control={<Checkbox {...field} />} label={Buttons.AgreeCheckbox} />}
          />
          <Typography style={errorMessageStyle}>{errors.isAgree?.message}</Typography>
        </Box>
      </Box>
    </Box>
  </Box>
);

export default DetailsFormComponent;
