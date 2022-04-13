import React from 'react';
import { createTheme, ThemeProvider } from "@mui/material";
import { createContext, useMemo, useState } from "react";


// Creating this for dark feature
export const ColorModeContext = createContext ({
  toggleMode: () => {},
   mode: "light",
});
export const ColorContextProvider = ({ children }) => {
  const [mode, setMode] = useState("light");
  const colorMode = useMemo (
   () => ({
      toggleMode: () =>
         setMode((prevMode) => (prevMode === "light" ? "dark" : "light")),
      mode,
    }),
    [mode]
  );
  const theme = createTheme({
    palette: {
      mode: mode, 
      primary: {
        main: "#fff",
      },
      secondary: {
        main: "#EA0029",
      },
    },
  });
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};