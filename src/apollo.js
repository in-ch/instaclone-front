import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
const DARK_MODE = "DARK_MODE";

////////////////////////////////////////////////////////////

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem("incheolisbest")));
export const logUserIn = (token) => {
    localStorage.setItem("incheolisbest",token);
    isLoggedInVar(true);
};
export const logUserOut = (history) => {
    localStorage.removeItem("incheolisbest");
    history.replace();
    window.location.reload();
};

////////////////////////////////////////////////////////////

export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE)));

export const enableDarkMode = () => {
    localStorage.setItem(DARK_MODE, "enabled");
    darkModeVar(true);
};

export const disableDarkMode = () => {
    localStorage.removeItem(DARK_MODE);
    darkModeVar(false);
};

////////////////////////////////////////////////////////////


export const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache,
});
