import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem("token")));
export const logUserIn = (token) => {
    localStorage.setItem("token",token);
    isLoggedInVar(true);
};
export const logUserOut = () => {
    localStorage.removeItem("token");
    isLoggedInVar(false);
};


export const darkModeVar = makeVar(false);

export const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache,
});
