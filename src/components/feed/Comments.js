import PropTypes from "prop-types";
import styled from "styled-components";
import Comment from "./Comment";
import {useForm} from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import useUser from "../../hooks/UseUser";

const CommentsContainer = styled.div`
  margin-top: 20px;
  form{
    margin-top:20px;
  }
`;
const CommentCount = styled.span`
  opacity: 0.7;
  margin: 10px 0px;
  display: block;
  font-weight: 600;
  font-size: 10px;
`;

const CommentInput = styled.input`
  width:100%;margin:10px 0px;border-bottom:0.1px solid RGB(180,180,180);padding:5px;padding-left:0px;
`;

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($photoId:Int!, $payload: String!){
    createComment(photoId: $photoId, payload: $payload) {
      ok 
      error
      id
    }
  }
`;

const Comments = ({ photoId, author, caption, commentNumber, comments }) => {
  const createCommentUpdate = (cache, result) => {
    const {payload} = getValues();
    setValue("payload","");
    const {data:{createComment: {ok, id}}} = result; 
    
    if(ok && userData?.me){
      const newComment = {
        __typename: "Comment",
        createAt: Date.now() + "",
        id,
        isMine: true, 
        payload,
        user: {
          ...userData.me,
        }
      };
      const newCacheComment = cache.writeFragment({
        data: newComment,
        fragment: gql`
          fragment BSName on Comment {
            id 
            createAt
            isMine
            payload 
            user {
              userName 
              avatar
            }
          }
        `
      });
      cache.modify({
        id:`Photo:${photoId}`,
        fields: {
          comments(prev){
            return [...prev, newCacheComment];
          },
          comments(prev){
            return prev + 1;
          }
        }
      })
    }
  };
  
  const {data : userData} = useUser();
  const [createCommentMutation,{loading}] = useMutation(CREATE_COMMENT_MUTATION, {
    update: createCommentUpdate, 
  });

  const {register, handleSubmit, setValue, getValues} = useForm();


  const onValide = (data) => {
    const {payload} = data;
    if(loading){
      return;
    }
    createCommentMutation({
      variables: {
        photoId,
        payload,
      }
    });
  };



  return (
    <CommentsContainer>
      <Comment author={author} payload={caption} />
      <CommentCount>
        {commentNumber === 1 ? "1 comment" : `${commentNumber} comments`}
      </CommentCount>
      {comments?.map((comment) => (
        <Comment
          id={comment.id}
          key={comment.id}
          author={comment.user.userName}
          payload={comment.payload}
          isMine={comment.isMine}
        />
      ))}
      <div>
        <form onSubmit={handleSubmit(onValide)}>
            <CommentInput name="payload" ref={register({required:true})} type="text" placeholder="Write a comment......" />
        </form>
      </div>
    </CommentsContainer>
  );
}

Comments.propTypes = {
  photoId: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  caption: PropTypes.string,
  commentNumber: PropTypes.number.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      user: PropTypes.shape({
        avatar: PropTypes.string,
        userName: PropTypes.string.isRequired,
      }),
      payload: PropTypes.string.isRequired,
      isMine: PropTypes.bool.isRequired,
      createAt: PropTypes.string.isRequired,
    })
  ),
};

export default Comments;