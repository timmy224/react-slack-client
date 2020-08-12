import checkPropTypes from "check-prop-types";

export const checkProps = (component, props) => {
    const propsErr = checkPropTypes(component.propTypes, props, "props", component.name);
    return propsErr;
}