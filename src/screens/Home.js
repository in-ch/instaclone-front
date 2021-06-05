const Home = ({setIsLoggedIn}) => {

    return (
        <>
            <h1>홈</h1>
            <button onClick={()=>{setIsLoggedIn(false)}}>로그아웃 하기</button>

        </>
    )
    
}

export default Home;