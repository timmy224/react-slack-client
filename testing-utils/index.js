import checkPropTypes from "check-prop-types";

export const findByTestAttr = (wrapper, attr) => {
    const element = wrapper.find(`[data-test='${attr}']`);
    return element;
}

export const checkProps = (component, props) => {
    const propsErr = checkPropTypes(component.propTypes, props, "props", component.name);
    return propsErr;
}