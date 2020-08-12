import React from "react";
import { shallow } from "enzyme";
import Message from "./Message";

import { checkProps, findByTestAttr } from "../../../testing-utils";

const setUp = (props={}) => {
    const componentWrapper = shallow(<Message {...props} />);
    return componentWrapper;
}

describe("Message Component", () => {
    describe("Checking PropTypes", () => {
        it("Should not throw a warning", () => {
            const expectedProps = {
                sender: "bitboy",
                time: "05/02/2020 12:15 PM",
                text: "Hey how are you"
            };
            const propsErr = checkProps(Message, expectedProps);
            expect(propsErr).toBeUndefined();
        });
    });
    describe("With props", () => {
        let wrapper;
        beforeEach(() => {
            const props = {
                sender: "bitboy",
                time: "05/02/2020 12:15 PM",
                text: "Hey how are you"
            };
            wrapper = setUp(props);
        });

        it("Should render without errors", () => {
            const mainDiv = findByTestAttr(wrapper, "MessageComponent");
            expect(mainDiv.length).toBe(1);
        });
    });
});