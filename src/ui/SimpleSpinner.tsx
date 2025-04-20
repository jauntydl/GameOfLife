'use client'
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Box, useTheme } from '@mui/material';

const SimpleSpinner = () => {
  
  const theme = useTheme();
  
  return(
  <Box
    sx={{
      width: 1,
      height: '100px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Box
      sx={{
        display: 'inline-block',
        position: 'relative',
        width: '80px',
        height: '80px',
        '& div': {
          boxSizing: 'border-box',
          position: 'absolute',
          width: '100%',
          height: '100%',
          animation: 'lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite',
          transformOrigin: '40px 40px',
          '&:after': {
            content: '""',
            display: 'block',
            position: 'absolute',
            width: '7.2px',
            height: '7.2px',
            borderRadius: '50%',
            backgroundColor: theme.palette.primary.main,
            margin: '-3.6px 0 0 -3.6px',
          },
        },
        '& div:nth-of-type(1)': {
          animationDelay: '-0.036s',
          '&:after': {
            top: '62.62742px',
            left: '62.62742px',
          },
        },
        '& div:nth-of-type(2)': {
          animationDelay: '-0.072s',
          '&:after': {
            top: '67.71281px',
            left: '56px',
          },
        },
        '& div:nth-of-type(3)': {
          animationDelay: '-0.108s',
          '&:after': {
            top: '70.90963px',
            left: '48.28221px',
          },
        },
        '& div:nth-of-type(4)': {
          animationDelay: '-0.144s',
          '&:after': {
            top: '72px',
            left: '40px',
          },
        },
        '& div:nth-of-type(5)': {
          animationDelay: '-0.18s',
          '&:after': {
            top: '70.90963px',
            left: '31.71779px',
          },
        },
        '& div:nth-of-type(6)': {
          animationDelay: '-0.216s',
          '&:after': {
            top: '67.71281px',
            left: '24px',
          },
        },
        '& div:nth-of-type(7)': {
          animationDelay: '-0.252s',
          '&:after': {
            top: '62.62742px',
            left: '17.37258px',
          },
        },
        '& div:nth-of-type(8)': {
          animationDelay: '-0.288s',
          '&:after': {
            top: '56px',
            left: '12.28719px',
          },
        },
        '@keyframes lds-roller': {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(360deg)',
          },
        },
      }}
    >
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </Box>
  </Box>
)};

export default SimpleSpinner;
