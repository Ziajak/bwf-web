import {createTheme} from "@mui/material/styles";
import { amber, lightBlue } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        primary: amber,
        secondary: lightBlue
    },
    colors: {
        bgColor: '#3e3e3e',
        bgLightColor: '#888',
        mainAccentColor: '#fecc01',
        bgLighterColor: '#DADADA'
}

});

export default theme;