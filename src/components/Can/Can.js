import { useDispatch } from "react-redux";
import { actions } from "../../context";

const check = (permissions, resource, action) => {    
    for (const permission of permissions) {
        if (permission.resource === resource && permission.action === action) {
            return true;
        }
    }
    return false;
}

const Can = props => {
    const dispatch = useDispatch(); 
    const permissions = dispatch(actions.permission.getPermissions());
    return check(permissions, props.resource, props.action) ? props.yes() : props.no();
}

Can.defaultProps = {
    yes: () => null,
    no: () => null
};

export default Can;

