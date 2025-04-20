'use client'

import { ThemeProvider, createTheme } from "@mui/material"
import '../assets/fonts/fonts.css'

type Props = {
  children: React.ReactNode
}

const MUIThemeProvider  = ({children} : Props) =>{

  
  const theme = createTheme({
    typography: {
      fontFamily: '"Abel", Arial, sans-serif',
      h1: {
        fontFamily: '"Abel", Arial, sans-serif',
      },
      h2: {
        fontFamily: '"Abel", Arial, sans-serif',
      },
      caption: {
        fontFamily: '"Abel", Arial, sans-serif',
      },
      // You can customize other typography variants similarly
    },
    palette: {
      primary: {
        main: '#002a4e',
      },
      secondary: {
        main: '#aa985d',
      },
      info: {
        main: '#3a86ff',
      },
      warning: {
        main: '#e9c46a',
      },
      error: {
        main: '#e76f51',
      },
      background:{
        default: ''
      }
    },
    components: {
      MuiCard: {
        styleOverrides: {
          // Name of the slot
          root: {
            border: 'none',
            boxShadow: 'rgba(17, 17, 26, 0.1) 0px 0px 16px'
          },
        },
      },
    },
  });
  

  return(
    <ThemeProvider {...{theme}}>
      {children}
    </ThemeProvider>
  )



}

export default MUIThemeProvider;
