import SecondaryWrapper from "@/components/SecondaryWrapper";

const user = {
    location: "Victoria"
};

const Location = () => {
    return ( 
        <SecondaryWrapper className="bg-secondary text-secondary-foreground">
            <p>
                <span>Your Community: </span>
                <span>{user.location}</span>
            </p>
        </SecondaryWrapper>
     );
}
 
export default Location;