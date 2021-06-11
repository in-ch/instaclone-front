import { gql, useMutation } from "@apollo/client";
import { darkModeVar, isLoggedInVar, logUserIn } from "../apollo";
import styled from "styled-components";
import {
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

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(userName: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

const Login = () => {
    const { register, handleSubmit, errors, formState, getValues, setError, clearErrors } = useForm({
        mode: "onChange",
    });  

    const onCompleted = (data) => {
        const {
          login: { ok, error, token },
        } = data;
        if (!ok) {
          return setError("result", {
            message: error,
          });
        } 
        if(token){
            logUserIn(token);
        }
    };

    const [mutationLogin, { loading }] = useMutation(LOGIN_MUTATION, {
        onCompleted,
    });

    const onSubmitVaild = (data) => {  // 유효할 때 실행될 함수
        if(loading){  // double click 방지
            return ; 
        }
        const {username, password} = getValues();

        mutationLogin({
            variables: {
                username,
                password
            },
        });
    };

    const onSubmitInVaild = (data) => {  // 유효하지 않을 때 실행될 함수
        console.log(data);
    };
    const clearLoginError = () => {
        clearErrors("result");
    };
    return (    
        <>
            <AuthLayout>
                <PageTitle title="Login" />
                <FormBox>
                    <div>
                        <FontAwesomeIcon icon={faInstagram} size="3x" />
                    </div>
                    <form onSubmit={handleSubmit(onSubmitVaild,onSubmitInVaild)}>

                    <Input
                        ref={register({
                        required: "아이디는 필수입니다.",
                        minLength: {
                            value: 4,
                            message: "아이디는 5글자 이상이여야 합니다.",
                        },
                        })}
                        name="username"
                        type="text"
                        placeholder="Username"
                        onChange={clearLoginError}
                    />
                     <Input
                        ref={register({
                        required: "비밀번호는 필수입니다.",
                        })}
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={clearLoginError}
                    />

                        <Button type="submit" value={loading ? 'Loading...' : 'Log In'} disabled={!formState.isValid||loading}/>
                        <FormError message={errors?.username?.message ? errors?.username?.message : errors?.password?.message}/>

                        <FormError message={errors?.result?.message}/>
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