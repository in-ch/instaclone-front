import { gql, useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { isLoggedInVar, logUserOut } from "../apollo";
import { FatText } from "../components/shared";
import styled from "styled-components";
import Avatar from "../components/Avatar";

const PhotoContainer = styled.div`
  background-color: white;
  border: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: 20px;
`;
const PhotoHeader = styled.div`
  padding: 5px 10px;
  display: flex;
  align-items: center;
`;

const Username = styled(FatText)`
  margin-left: 10px;
`;

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
        }
    }
`;

const Home = () => {
    const history = useHistory();
    const {data} = useQuery(FEED_QUERY);
    console.log(data);

    return (
        <>
            {data?.seeFeed?.map((photo) => (
                <PhotoContainer key={photo.id}>
                <PhotoHeader>
                    <Avatar url={photo.user.avatar} />
                    <Username>{photo.user.userName}</Username>
                </PhotoHeader>
                </PhotoContainer>
            ))}
        </>
    )
    
}

export default Home;