import { useLocation } from "react-router-dom";
import { CssTextField} from "../layout/elements";

export function EventForm(){

    const { state } = useLocation();
    const group = state?.group;

    return (
        <div>

        <h1>New Event for group {group.id}</h1>
            <CssTextField label="Team 1"/>

        </div>
    )
}