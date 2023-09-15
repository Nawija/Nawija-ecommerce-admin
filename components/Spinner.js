import { ImSpinner2 } from "react-icons/im";

const Spinner = () => {
    return (
        <div className="spinner anim-opacity">
            <ImSpinner2 className="icon" />
            <span className="animate-pulse font-semibold">Ładowanie...</span>
        </div>
    );
};

export default Spinner;
