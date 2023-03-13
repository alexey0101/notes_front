import Landing from "../Landing/Landing";
import Notes from "../Notes/Notes";

const Main = ({notes}) => {
    const isAuthorized = notes != null;
    console.log(isAuthorized)
    return (
        <div>
            {!isAuthorized && <Landing />}
            {isAuthorized && <Notes notes={notes} />}
        </div>
    );
};

export default Main;