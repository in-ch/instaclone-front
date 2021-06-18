import { gql,useMutation,useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { FatText } from "../components/shared";
import PageTitle from "../components/PageTitle";
import useUser from "../hooks/UseUser";

const Header = styled.div`
  display: flex;
`;
const Avatar = styled.img`
  margin-left: 50px;
  height: 160px;
  width: 160px;
  border-radius: 50%;
  margin-right: 150px;
  background-color: #2c2c2c;
`;
const Column = styled.div``;
const Username = styled.h3`
  font-size: 28px;
  font-weight: 400;
`;
const Row = styled.div`
  display:flex;
  margin-bottom: 20px;
  font-size: 16px;
`;
const List = styled.ul`
  display: flex;
`;
const Item = styled.li`
  margin-right: 20px;
`;
const Value = styled(FatText)`
  font-size: 18px;
`;
const Name = styled(FatText)`
  font-size: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-auto-rows: 290px;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 50px;
`;

const Photo = styled.div`
  background-image: url(${(props) => props.bg});
  background-size: cover;
  position: relative;
`;

const Icons = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`;

const Icon = styled.span`
  font-size: 18px;
  display: flex;
  align-items: center;
  margin: 0px 5px;
  svg {
    font-size: 14px;
    margin-right: 5px;
  }
`;

const Button = styled.button`
  width:85px;height:25px;background:${(props)=>props.theme.accent};border:0;margin-left:20px;color:white;cursor:pointer;
`;

const SEE_PROFIE_QUERY = gql`
    query seeProfile($userName: String!) {
        seeProfile(userName:$userName){
            id 
            firstName 
            lastName 
            userName 
            bio 
            avatar
            totalFollowers 
            totalFollowing 
            isMe 
            isFollowing 
            photos{
              id
              file
              likes
              commentNumber
              isLiked
            }
        }
    }
`;

const FOLLOW_USER_MUTATION = gql`
  mutation followUser($userName: String!) {
    followUser(userName:$userName) {
      ok
    }
  }
`;

const UNFOLLOW_USER_MUTATION = gql`
  mutation unFollowUser($userName: String!) {
    unFollowUser(userName:$userName) {
      ok
    }
  }
`;

const Profile = () => {
    const {userName} = useParams();
    const {data:userData} = useUser();
    const {data, loading} = useQuery(SEE_PROFIE_QUERY, {
        variables: {
            userName,
        }
    });
    const unfollowUserUpdate = (cache, result) => {
      const {
        data: {
          unFollowUser: { ok },
        },
      } = result;

      if(!ok){
        return;
      }
      cache.modify({
        id: `User:${userName}`,
        fields: {
          isFollowing(prev){
            return false;
          },
          totalFollowers(prev) {
            return prev -1;
          }
        }
      });
      const {
        me: {userNameFromUseUser},
      } = userData;
      cache.modify({
        id: `User:${userNameFromUseUser}`,
        fields: {
          totalFollowing(prev){
            return prev -1;
          }
        }
      });
    };


    const [unfollowUser] = useMutation(UNFOLLOW_USER_MUTATION, {
      variables: {
        userName,
      },
      update:unfollowUserUpdate
      // refetchQueries: [{ query: SEE_PROFIE_QUERY, variables: { userName } }, {query: SEE_PROFIE_QUERY, variables: {userName: userData?.me?.userName}}],
    });
    const [followUser] = useMutation(FOLLOW_USER_MUTATION, {
      variables: {
        userName,
      },
      refetchQueries: [{ query: SEE_PROFIE_QUERY, variables: { userName } }, {query: SEE_PROFIE_QUERY, variables: {userName: userData?.me?.userName}}],
    });



    const getButton = (seeProfile) => {
      const {isMe, isFollowing} = seeProfile;
      if(isMe){
        return <Button>Edit Profile</Button>
      }
      if(isFollowing) {
        return <Button onClick={unfollowUser}>UnFollow</Button>
      } else {
        return <Button onClick={followUser}>Follow</Button>
      }
    }

    return (
        <>
          <PageTitle title={loading ? "Loading" : `${data?.seeProfile?.userName}'s Profile` } />
          <Header>
              <Avatar src={data?.seeProfile?.avatar} />
              <Column>
                <Row>
                  <Username>{data?.seeProfile?.userName}</Username>
                  {data?.seeProfile ? getButton(data.seeProfile) : null}
                </Row>
                <Row>
                  <List>
                    <Item>
                      <span>
                        <Value>{data?.seeProfile?.totalFollowers}</Value> followers
                      </span>
                    </Item>
                    <Item>
                      <span>
                        <Value>{data?.seeProfile?.totalFollowing}</Value> following
                      </span>
                    </Item>
                  </List>
                </Row>
                <Row>
                  <Name>
                    {data?.seeProfile?.firstName}
                    {"  "}
                    {data?.seeProfile?.lastName}
                  </Name>
                </Row>
                <Row>{data?.seeProfile?.bio}</Row>
              </Column>
            </Header>
            <Grid>
              {data?.seeProfile?.photos.map((photo) => (
                <Photo key={photo.id} bg={photo.file}>
                  <Icons>
                    <Icon>
                      <FontAwesomeIcon icon={faHeart} />
                      {photo.likes}
                    </Icon>
                    <Icon>
                      <FontAwesomeIcon icon={faComment} />
                      {photo.commentNumber}
                    </Icon>
                  </Icons>
                </Photo>
              ))}
            </Grid>
          </>
        );
};

export default Profile;