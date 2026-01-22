import SecondaryCardWrapper from "./SecondaryCardWrapper";

type SmallScreenMsgProps = {
    className?: string;
}

const SmallScreenMsg = ({ className }: SmallScreenMsgProps) => {
    return ( 
        <SecondaryCardWrapper>
            <p className="text-center">
                This application is not optimised for small screens. Please access it on a device with a larger screen for the best experience.
            </p>
        </SecondaryCardWrapper>
     );
}
 
export default SmallScreenMsg;