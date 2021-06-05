import { isLoggedInVar } from "../apollo";

const Home = () => {

    return (
        <>
            <h1>홈</h1>
            <button onClick={()=>{isLoggedInVar(false)}}>로그아웃 하기</button>

        </>
    )
    
}

export default Home;