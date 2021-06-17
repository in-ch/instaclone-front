import { useParams } from "react-router-dom";


const Profile = () => {
    const {username} = useParams();

    return (
        <>
            {username}
            <h1>Heeeeelo</h1>
        </>
    )
};

export default Profile;