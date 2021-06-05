const Login = ({setIsLoggedIn}) => {

    return (
        <>
            <h1>로그인</h1>
            <button onClick={()=>{setIsLoggedIn(true)}}>로그인 하기</button>
        </>
    )
    
}

export default Login;