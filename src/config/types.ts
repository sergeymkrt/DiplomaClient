// import type { SnackbarProps } from 'notistack';
import { Snackbar } from '@mui/material';
import * as React from 'react';
import { SharedProps } from 'notistack';

// Snackbar;

type Notifications = {
  options: SharedProps;
  maxSnack: number;
};

export type { Notifications };
