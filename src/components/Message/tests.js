import React from "react";
import { shallow } from "enzyme";
import Message from "./Message";
import { checkProps, isElemRendered } from "../../../testing-utils";

const setUpComponent = (props={}) => {
    const componentWrapper = shallow(<Message {...props} />);
    return componentWrapper;    
}

const checkPropTypes = {
    testDesc: "Checking PropTypes",
    caseDesc: "%s",
    cases: [
        [
            "Correct prop types --> No error", 
            {sender: "bitboy", time: "05/02/2020 12:15 PM", text: "Hey how are you"}, true
        ],
        [
            "One incorrect prop type --> Error", 
            {sender: "bitboy", time: "05/02/2020 12:15 PM", text: 5}, false
        ],
    ],
    func: (caseDesc, props, expectedIsPropsValid) => {
        const propsErr = checkProps(Message, props);
        const isPropsValid = propsErr === undefined;
        expect(isPropsValid).toBe(expectedIsPropsValid);
    },
};

const checkRender = {
    testDesc: "Checking component render",
    caseDesc: "%s",
    cases: [
        [
            "All props present --> Successful render",
            {sender: "bitboy", time: "05/02/2020 12:15 PM", text: "Hey how are you"}, true 
        ]
    ],
    func: (caseDesc, props, expectedIsRendered) => {
        const componentWrapper = setUpComponent(props);
        const isMainRendered = isElemRendered(componentWrapper, "MessageComponent");
        const isSenderRendered = isElemRendered(componentWrapper, "sender", props.sender);
        const isDTRendered = isElemRendered(componentWrapper, "dt", props.time);
        const isMessageRendered = isElemRendered(componentWrapper, "message", props.message);
        expect(isMainRendered).toBe(expectedIsRendered);
        expect(isSenderRendered).toBe(expectedIsRendered);
        expect(isDTRendered).toBe(expectedIsRendered);
        expect(isMessageRendered).toBe(expectedIsRendered);
    },
}

export default {checkPropTypes, checkRender};