import { isLoggedInVar } from "../apollo";

const Login = () => {

    return (
        <>
            <h1>로그인</h1>
            <button onClick={()=>{isLoggedInVar(true)}}>로그인 하기</button>
        </>
    )
    
}

export default Login;