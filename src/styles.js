import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const lightTheme= {
    fontColor : "#2c2c2c",
    bgColor: "RGB(245,245,245)",
    accent: "#fafafa",
    borderColor: "RGB(219,219,219)"
  };
  
export const darkTheme = {
    fontColor : "lightgray",
    bgColor: "#2c2c2c",
    accent: "#fafafa",
    borderColor: "RGB(219,219,219)"
};

export const GlobalStyles = createGlobalStyle`
    ${reset}
    input{
        all:unset;
    }
    *{
        box-sizing:border-box;
    }
    body{
        background-color: ${(props) => props.theme.bgColor};
        color:${(props) => props.theme.fontColor};
        font-size:14px;
        color:RGB(24,24,24);
    }
`;