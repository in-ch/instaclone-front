import { useHistory } from "react-router-dom";
import { isLoggedInVar, logUserOut } from "../apollo";

const Home = () => {
    const history = useHistory();

    return (
        <>
            <h1>홈</h1>
            <button onClick={()=>{logUserOut(history)}}>로그아웃 하기</button>
        </>
    )
    
}

export default Home;