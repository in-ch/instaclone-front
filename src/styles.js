import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const lightTheme= {
    fontColor : "#2c2c2c",
    bgColor: "#FAFAFA",
    fontColor: "rgb(38, 38, 38)",
    borderColor: "rgb(219, 219, 219)",
    accent: "#0095f6",
  };
  
export const darkTheme = {
    fontColor : "lightgray",
    bgColor: "#2c2c2c",
    fontColor: "white",
    accent: "#0095f6",
    borderColor: "rgb(219, 219, 219)",
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