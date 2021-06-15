import PropTypes from "prop-types";
import styled from "styled-components";
import { FatText } from "../shared";
import sanitizeHtml from "sanitize-html";
import React from "react";
import { Link } from "react-router-dom";

const CommentContainer = styled.div`
    margin-top:5px;    
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

function Comment({ author, payload }) {

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
    </CommentContainer>
  );
}

Comment.propTypes = {
  author: PropTypes.string.isRequired,
  payload: PropTypes.string.isRequired,
};

export default Comment;