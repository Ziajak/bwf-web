import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { amber } from '@mui/material/colors';

export const CssTextField = styled(TextField)({
  /* LABEL */
  '& label': {
    color: amber[500],
  },
  '& label.Mui-focused': {
    color: amber[500],
  },

  /* TEKST W INPUT */
  '& .MuiOutlinedInput-input': {
    color: '#FFFFFF',
  },

  /* PLACEHOLDER */
  '& .MuiOutlinedInput-input::placeholder': {
    color: amber[300],
    opacity: 1,
  },

  /* OBRAMÓWKA */
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: amber[500],
    },
    '&:hover fieldset': {
      borderColor: amber[400],
    },
    '&.Mui-focused fieldset': {
      borderColor: amber[700],
    },
  },
});