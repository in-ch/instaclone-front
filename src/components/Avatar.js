import styled from "styled-components";

const SAvatar = styled.div`
    width:18px;height:18px;border-radius:15px;background-color:white;
    overflow:hidden;
`;

const Img = styled.img`
    max-width:100%;
`;


const Avatar = ({url = ""}) => {
    return <SAvatar>
        {url !== "" ? <Img src={url} /> : null}
    </SAvatar>
};

export default Avatar;