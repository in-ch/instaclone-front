import styled from "styled-components";

const Container = styled.div`
    width:100px;height:100px;position:relative;background:RGB(240,240,240);border-radius:50%;
    background: yellow;
    text-align: center;
    line-height: 100px;
    background: linear-gradient(to right, orange 50%, rgba(255, 255, 255, 0) 100%), linear-gradient(blue 50%, rgba(255, 255, 255, 0) 0%), linear-gradient(to right, green 50%, rgba(255, 255, 255, 0) 0%), linear-gradient(red 50%, rgba(255, 255, 255, 0) 0%);
    background-position: top, right, bottom, left;
    background-repeat: repeat-x, repeat-y;
    background-size: 10px 10px, 10px 10px;
`;


const donutG = () => {
    
    return (
        <>
            <Container>
            </Container>
        </>
    )

};

export default donutG;