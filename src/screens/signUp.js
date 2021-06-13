import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import { FatLink } from "../components/shared";
import routes from "../routes";
import PageTitle from "../components/PageTitle";

import { useForm } from "react-hook-form";
import FormError from "../components/auth/FormError";
import { gql, useMutation } from "@apollo/client";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Subtitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`;

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount($firstName: String!, $lastName: String, $userName: String!, $email: String!, $password: String!) 
  {
     createAccount(
       firstName: $firstName
       lastName : $lastName
       userName : $userName 
       email : $email
       password : $password
     ) {
       ok
       error 
     }

  }
`;


const  SignUp = () => {
  const { register, handleSubmit, formState, errors, getValues } = useForm({
    mode:"onChange",
  });

  const [createAccount, {loading}] = useMutation(CREATE_ACCOUNT_MUTATION);
  const onSubmitEvent = (data) => {
    console.log(data);

    if(loading) {
      return;
    }
    const {firstName, lastName, email, userName,password } = getValues();
    createAccount({
      variables:{
        firstName,
        lastName,
        email,
        userName,
        password,
      }
    })
  };

  return (
    <AuthLayout>
      <PageTitle title="Sign Up" />
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
          <Subtitle>
            Sign up to see photos and videos from your friends.
          </Subtitle>
        </HeaderContainer>

        <form onSubmit={handleSubmit(onSubmitEvent)}>  
            <Input ref={register({
              required:"첫번째 이름은 필수입니다.",
            })} name="firstName" type="text" placeholder="First Name" />
            <Input name="lastName" type="text" placeholder="Last Name" />
            <Input ref={register({
              required:"이메일은 필수입니다.",
            })} name="email" type="text" placeholder="Email" />
            <Input ref={register({
              required:"유저이름은 필수입니다.",
            })} name="userName" type="text" placeholder="Username" />
            <Input ref={register({
              required:"비밀번호는 필수입니다.",
            })} name="password" type="password" placeholder="Password" />

            <Button type="submit" value={loading ? 'Loading...' : 'Sign Up'} disabled={!formState.isValid||loading}/>
            <FormError message={errors?.username?.message ? errors?.username?.message : errors?.password?.message}/>
        </form>
      </FormBox>

      <BottomBox cta="Have an account?" linkText="Log in" link={routes.home} />
    </AuthLayout>
  );
}

export default SignUp;