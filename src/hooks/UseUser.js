import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "../apollo";

const ME_QUERY = gql`
  query me {
    me {
      userName
      avatar
    }
  }
`;

function useUser() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data, error } = useQuery(ME_QUERY, {
    skip: !isLoggedIn,
  });
  console.log('이거 에러임...', error);
  return;
}
export default useUser;