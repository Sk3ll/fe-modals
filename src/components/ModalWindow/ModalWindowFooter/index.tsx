import React, { FC } from 'react';
import { Box, Button } from '@mui/material';
import { Buttons } from '../../../utils/constants';
import { FooterProps } from '../../../utils/types';

const FooterComponent: FC<FooterProps> = ({ onSave, onCancel }) => (
  <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
    <Button id='footer__cancel-button' onClick={() => onCancel()}>
      {Buttons.Cancel}
    </Button>
    <Button type='submit' id='footer__save-button' onClick={() => onSave()}>
      {Buttons.Save}
    </Button>
  </Box>
);

export default FooterComponent;
