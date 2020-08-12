import React from "react";
import { shallow } from "enzyme";
import Message from "./Message";

import { checkProps } from "../../../testing-utils";

const setUp = (props={}) => {
    const component = shallow(<Message {...props} />);
    return component;
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
});