import "./Loading.css";
import { MoonLoader } from "react-spinners";
export function Loading() {
    return (
        <>
            <div className="loading-container">
            <MoonLoader size={25} />
            </div>
        </>
    );
};