import { gql, useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import Photo from "../components/feed/Photo";
import PageTitle from "../components/PageTitle";
import { PHOTO_FRAGMENT, COMMENT_FRAGMENT} from "../fragments";

const FEED_QUERY = gql`
        query seeFeed {
            seeFeed {
            ...PhotoFragment
            user {
                userName
                avatar
            }
            caption
            comments {
                ...CommentFragment
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