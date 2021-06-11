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
import { useForm } from "react-hook-form";
import FormError from "../components/auth/FormError";

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const Login = () => {
    const { register, watch, handleSubmit, errors, formState } = useForm({
        mode: "onChange",
    });  
    const onSubmitVaild = (data) => {  // 유효할 때 실행될 함수
    }
    const onSubmitInVaild = (data) => {  // 유효하지 않을 때 실행될 함수
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
                        <Input {...register('username', { required:'아이디는 필수입니다.', minLength:{value:5,message:"유저 아이디는 최소 5글자 이상입니다."}, maxLength:{value:13,message:"유저 아이디는 최대 15글자 입니다."}})} 
                            name="username" type="text" placeholder="Username" />
                            
                        <Input {...register('password',{required:"비밀번호는 필수입니다.", minLength:{value:5,message:"비밀번호는 최소 5글자 이상입니다."}, maxLength:{value:13,message:"유저 비밀번호는 최대 15글자 입니다."}})} 
                            name="password" type="password" placeholder="Password" />
                        <Button type="submit" value="Log in" disabled={!formState.isValid}/>
                        <FormError message={errors?.password?.message}/>
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