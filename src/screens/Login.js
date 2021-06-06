import { darkModeVar, isLoggedInVar } from "../apollo";
import styled from "styled-components";

const Title = styled.h1`
    color: ${(props) => props.theme.fontColor};
`;


const Login = () => {
    
    return (
        <>
            <Title>로그인</Title>
            <button onClick={()=>{isLoggedInVar(true)}}>로그인 하기</button>
            <button onClick={()=>{darkModeVar(true)}} value="다크 모드"/>
            <button onClick={()=>{darkModeVar(false)}} value="라이트 모드"/>
        </>
    )
    
}

export default Login;