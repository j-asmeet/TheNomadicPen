import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#655DBB",
    },
    secondary: {
      main: "#3E54AC",
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

export default theme;
