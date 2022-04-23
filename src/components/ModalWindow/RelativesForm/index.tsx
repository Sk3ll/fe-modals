import React, { FC } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Divider,
  InputLabel,
  NativeSelect,
  FormControl,
} from '@mui/material';
import MuiPhoneNumber from 'material-ui-phone-number';
import { Controller } from 'react-hook-form';
import { errorMessageStyle } from '../../../styles';
import { Buttons, Relative } from '../../../utils/constants';
import { TypeRelatives, RelativesProps, IRelative } from '../../../utils/types';

const defaultRelative: IRelative = {
  type: TypeRelatives.Spouse,
  fullName: '',
  identifyCode: '',
  phone: '',
  email: '',
  isEmergency: false,
};

const RelativeFormComponent: FC<RelativesProps> = ({ remove, fields, append, control, errors }) => (
  <>
    <Box style={{ display: 'flex', flexDirection: 'column',  }} >
      {fields.map((item, index) => (
        <Box key={item.id} style={{ display: 'flex', flexDirection: 'column', rowGap: '5px' }}>
          <Typography variant='h4' id='relative__title'>
            {`${Relative.Title} ${index + 1}`}
          </Typography>

          <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={() => remove(index)}>{Buttons.Remove}</Button>
          </Box>

          <Box style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
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
                  <TextField
                    variant='standard'
                    placeholder={Relative.FullName}
                    label={Relative.FullName}
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
                  <TextField
                    variant='standard'
                    placeholder={Relative.CodeOrDob}
                    label={Relative.CodeOrDob}
                    value={value}
                    onChange={onChange}
                    error={!!errors.relatives?.[index]?.identifyCode}
                  />
                )}
              />
            </Box>
            <Typography style={errorMessageStyle}>{errors.relatives?.[index]?.identifyCode?.message}</Typography>
          </Box>

          <Box style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
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
                  <TextField
                    variant='standard'
                    placeholder={Relative.Email}
                    label={Relative.Email}
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
  </>
);

export default RelativeFormComponent;
