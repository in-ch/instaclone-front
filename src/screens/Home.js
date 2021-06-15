import { gql, useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import Photo from "../components/feed/Photo";
import PageTitle from "../components/PageTitle";

const FEED_QUERY = gql`
    query seeFeed {
        seeFeed{
            id
            user {
                userName
                avatar
            }
            file
            caption
            likes
            comments
            createAt
            isMine
            isLiked
        }
    }
`;

const Home = () => {
    const history = useHistory();
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