import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "../apollo";


const ME_QUERY = gql`
    query me {
        me {
            id
            userName 
            error 
        }
    }
`;

const UseUser = () => {
    const isLoggedIn = useReactiveVar(isLoggedInVar);
    const {data, error} = useQuery(ME_QUERY, {
        skip:!isLoggedIn,
    });
    

    return;
};

export default UseUser;