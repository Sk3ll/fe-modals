import React, { FC } from 'react';
import { Box, Typography, Button, Stepper, Step, StepLabel } from '@mui/material';
import {Header, Buttons, HeaderStepper} from '../../../utils/constants';
import { HeaderProps } from '../../../utils/types';

const HeaderComponent: FC<HeaderProps> = ({ handleClose }) => (
  <>
    <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button id='header__close-button' onClick={() => handleClose()}>
        {Buttons.Close}
      </Button>
    </Box>

    <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography id='header__title'>{Header.Title}</Typography>
      <Button disabled variant='contained' id='header__status'>{Header.Status}</Button>
    </Box>

    <Stepper style={{ margin: '10px 0' }} activeStep={0}>
      {
        Object.values(HeaderStepper).map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
    </Stepper>
  </>
);

export default HeaderComponent;
