import React, { FC } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Header, Buttons } from '../../utils/constants';
import { HeaderProps } from '../../utils/types';

const HeaderComponent: FC<HeaderProps> = ({ handleClose }) => (
  <>
    <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button id='header__close-button' onClick={() => handleClose()}>
        {Buttons.Close}
      </Button>
    </Box>

    <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography id='header__title'>{Header.Title}</Typography>
      <Typography id='header__status'>{Header.Status}</Typography>
    </Box>
  </>
);

export default HeaderComponent;
