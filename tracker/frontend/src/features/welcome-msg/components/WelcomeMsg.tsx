import Greeting from "./Greeting";
import StreakInfo from "./StreakInfo";

const WelcomeMsg = () => {
    return ( 
        <div className="flex gap-6 items-center">
            <Greeting />
            <StreakInfo />
        </div>
     );
}
 
export default WelcomeMsg;