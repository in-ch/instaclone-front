import {gql, useMutation} from "@apollo/client";

import PropTypes from "prop-types";
import styled from "styled-components";
import { FatText } from "../shared";
import sanitizeHtml from "sanitize-html";
import React from "react";
import { Link } from "react-router-dom";

const CommentContainer = styled.div`
    margin-top:5px;    
    button{
      background:white;margin-left:50px;border:1px solid RGB(200,200,200);font-size:10px;
    }
`;
const CommentCaption = styled.span`
  margin-left: 10px;
  a {
    background-color: inherit;
    color: ${(props) => props.theme.accent};
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }  
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      ok
    }
  }
`;

function Comment({ id, author, payload, isMine, photoId }) {
  const updateDeleteComment = (cache, result) => {
    const {data:{deleteComment: {ok}}} = result;
    if(ok) {
      cache.evict({
        id: `Comment:${id}`
      });
      cache.modify({
        id:`Photo:${photoId}`,
        fields: {
          commentNumber(prev) {
            return prev -1;
          }
        }
      });
    }
  }
  const [deleteCommentMutation] = useMutation(DELETE_COMMENT_MUTATION,{
    variables: {
      id,
    },
    update:updateDeleteComment
  });

  const onClickDelete = () => {
    deleteCommentMutation();
  }
    // const cleanedPayload = sanitizeHtml(
    //     payload.replace(/#[\w]+/g, "<mark>$&</mark>"),
    //     {
    //         allowedTags: ["mark"],
    //     }
    // );
    
  return (
    <CommentContainer>
      <FatText>{author}</FatText>
      <CommentCaption>
        {/* dangerouslySetInnerHTML={{ */}
        {/* __html: cleanedPayload, */}
        {/* }} */}
        {payload.split(" ").map((word, index) =>
          /#[\w]+/.test(word) ? (
            <React.Fragment key={index}>
              <Link to={`/hashtags/${word}`}>{word}</Link>{" "}
            </React.Fragment>
          ) : (
            <React.Fragment key={index}>{word} </React.Fragment>
          )
        )}
      </CommentCaption>
      {isMine ? <button onClick={onClickDelete}>[삭제]</button> : null}
    </CommentContainer>
  );
}

Comment.propTypes = {
  id: PropTypes.number,
  author: PropTypes.string.isRequired,
  payload: PropTypes.string.isRequired,
  isMine: PropTypes.bool,
  photoId: PropTypes.number.isRequired,
};

export default Comment;