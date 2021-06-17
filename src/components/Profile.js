import { gql,useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { PHOTO_FRAGMENT } from "../fragments";

const SEE_PROFIE_QUERY = gql`
    query seeProfile($userName: String!) {
        seeProfile(userName:$userName){
            id 
            firstName 
            lastName 
            userName 
            bio 
            avatar 
            photos {
                ...PhotoFragment
            } 
            totalFollowers 
            totalFollowing 
            isMe 
            isFollowing 
        }
        ${PHOTO_FRAGMENT}
    }
`;

const Profile = () => {
    const {userName} = useParams();
    const {data} = useQuery(SEE_PROFIE_QUERY, {
        variables: {
            userName,
        }
    });
    return (
        <>
            {userName}
            <h1>Heeeeelo</h1>
        </>
    )
};

export default Profile;