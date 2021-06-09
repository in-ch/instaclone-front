import { darkModeVar, isLoggedInVar } from "../apollo";
import styled from "styled-components";
import {
    faFacebook,
    faFacebookF,
    faFacebookSquare,
    faInstagram,
  } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";


const Container = styled.div`
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const Wrapper = styled.div`
    max-width:350px;width:100%;
`;

const WhiteBox = styled.div`
        background-color: white;
        border: 1px solid ${(props)=> props.theme.borderColor};
        width: 100%;
`;

const TopBox = styled(WhiteBox)`
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 35px 40px 25px 40px;
        margin-bottom: 10px;
        form {
            margin-top: 35px;
            width: 100%;
            display: flex;
            justify-items: center;
            flex-direction: column;
            align-items: center;
        }
`;

const Input = styled.input`
    width: 100%;
    border-radius: 3px;
    padding: 7px;
    background-color: ${(props)=>props.theme.accent};
    border: 0.5px solid rgb(219, 219, 219);
    margin-top: 5px;
    box-sizing: border-box;
    &::placeholder {
        font-size: 12px;
    }
`;

const Button = styled.input`
    width:100%;
    border: none;
    margin-top: 12px;
    background-color: #0095f6;
    color: white;
    text-align: center;
    padding: 8px 0px;
    font-weight: 600;
`;

const BottomBox = styled(WhiteBox)`
        padding: 25px 40px 25px 40px;
        text-align: center;
        a {
            font-weight: 600;
            color: #0095f6;
            margin-left:5px;
        }
        input{
            margin: 5px 0px 0px 10px ;background:white;border:1px solid RGB(200,200,200);
            width:80px;height:30px;border-radius:10px;
        }
`;

const Separator = styled.div`
        margin: 20px 0px 30px 0px;
        text-transform: uppercase;
        display: flex;
        justify-content: center;
        width: 100%;
        align-items: center;
        div {
            width: 100%;
            height: 1px;
            background-color: rgb(219, 219, 219);
        }
        span {
            margin: 0px 10px;
            font-weight: 600;
            font-size:12px;
            color: #8e8e8e;
  }
`;

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const Login = () => {
    return (    
        <>
            <Container>
                <Wrapper>
                    <TopBox>
                        <div>
                            <FontAwesomeIcon icon={faInstagram} size="3x" />
                        </div>
                        <form>
                            <Input type="text" placeholder="Username" />
                            <Input type="text" placeholder="Password" />
                            <Button type="submit" placeholder="Log In" />
                        </form>
                        <Separator>
                            <div></div>
                            <span>Or</span>
                            <div></div>
                        </Separator>
                        <FacebookLogin>
                            <FontAwesomeIcon icon={faFacebookSquare} />
                            <span>Log in with Facebook</span>
                        </FacebookLogin>
                    </TopBox>
                    <BottomBox>
                        <span>Don't have an account?</span> <Link to="/sign-up">Sign up</Link> <br/><br/>
                        <input onClick={()=>darkModeVar(true)}type="button" value="다크 모드"/>
                        <input onClick={()=>darkModeVar(false)} type="button" value="라이트 모드"/>
                    </BottomBox>
                </Wrapper>
            </Container>
        </>
    )
    
}

export default Login;