import { darkModeVar, isLoggedInVar } from "../apollo";
import styled from "styled-components";
import {
    faFacebook,
    faFacebookF,
    faFacebookSquare,
    faInstagram,
  } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import Separator from "../components/auth/Separator";
import routes from "../routes";
import PageTitle from "../components/PageTitle";

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const Login = () => {
    const { register, watch, handleSubmit } = useForm();  
    const onSubmitVaild = (data) => {  // 유효할 때 실행될 함수
        console.log(data);
    }
    const onSubmitInVaild = (data) => {  // 유효하지 않을 때 실행될 함수
        alert(data);
    }
    return (    
        <>
            <AuthLayout>
                <PageTitle title="Login" />
                <FormBox>
                    <div>
                        <FontAwesomeIcon icon={faInstagram} size="3x" />
                    </div>
                    <form onSubmit={handleSubmit(onSubmitVaild,onSubmitInVaild)}>
                        <Input ref={register({
                            required: "유저 이름은 필수입니다.",
                            minLength: 5,
                            pattern: "",
                            validate: (current) => currentValue.includes("inch"),
                        })} 
                         name="username" type="text" placeholder="Username" />
                        <Input  ref={register({
                            required: "해당 패스워드는 필수입니다.",
                            minLength: 5,
                        })} 
                         name="password" type="password" placeholder="Password" />
                        <Button type="submit" value="Log in" />
                    </form>
                    <Separator />
                    <FacebookLogin>
                        <FontAwesomeIcon icon={faFacebookSquare} />
                        <span>Log in with Facebook</span>
                    </FacebookLogin>
                </FormBox>
                <BottomBox
                    cta="Don't have an account?"
                    linkText="Sign up"
                    link={routes.signUp}
                />
            </AuthLayout>
        </>
    )
    
}

export default Login;