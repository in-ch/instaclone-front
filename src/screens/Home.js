import { gql, useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import Photo from "../components/feed/Photo";
import PageTitle from "../components/PageTitle";
import { PHOTO_FRAGMENT, COMMENT_FRAGMENT} from "../fragments";

const FEED_QUERY = gql`
    query seeFeed {
        ...PhotoFragment
        seeFeed{
            user {
                userName
                avatar
            }
            caption
            comments{
                ...COMMENT_FRAGMENT
            }
            createAt
            isMine
        }
    }
    ${PHOTO_FRAGMENT}
    ${COMMENT_FRAGMENT}
`;

const Home = () => {
    const {data} = useQuery(FEED_QUERY);
    console.log(data);

    return (
        <>
            <PageTitle title="Home" />
            {data?.seeFeed?.map((photo) => (
                <Photo key={photo.id} {...photo}/>
            ))}
        </>
    )
    
}

export default Home;