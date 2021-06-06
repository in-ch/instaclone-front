import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const lightTheme= {
    fontColor : "#2c2c2c",
    bgColor: "RGB(245,245,245)"
  };
  
export const darkTheme = {
    fontColor : "lightgray",
    bgColor: "#2c2c2c"
};

export const GlobalStyles = createGlobalStyle`
    ${reset}
    body{
        background-color: ${(props) => props.theme.bgColor};
    }
`;