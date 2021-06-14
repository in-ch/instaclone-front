import styled from "styled-components";

const SAvatar = styled.div`
    border-radius:50%;background-color:white;
    width:${(props)=>(props.large ? '35px' : '25px')};
    height:${(props)=>(props.large ? '35px' : '25px')};
    overflow:hidden;
`;

const Img = styled.img`
    max-width:100%;
`;


const Avatar = ({url = "",large = false}) => {
    return <SAvatar large={large}>
        {url !== "" ? <Img src={url} /> : null}
    </SAvatar>
};

export default Avatar;