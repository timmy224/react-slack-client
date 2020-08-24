import checkPropTypes from "check-prop-types";

export const findByTestAttr = (wrapper, attr) => {
    const element = wrapper.find(`[data-test='${attr}']`);
    return element;
}

export const isElemRendered = (wrapper, attr, value=undefined) => {
    const elemWrapper = findByTestAttr(wrapper, attr);
    let isRendered = elemWrapper.length === 1;
    if (value) {
        isRendered = isRendered && value === elemWrapper.first().text();
    }
    return isRendered;
}

export const checkProps = (component, props) => {
    const propsErr = checkPropTypes(component.propTypes, props, "props", component.name);
    return propsErr;
}