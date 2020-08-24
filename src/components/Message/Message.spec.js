import each from "jest-each";
import tests from "./test-cases";

// const setUp = (props={}) => {
//     const componentWrapper = shallow(<Message {...props} />);
//     return componentWrapper;
// }

describe("Message Component", () => {
    describe(tests.checkPropTypes.testDesc, () => {
        each(tests.checkPropTypes.cases).it(tests.checkPropTypes.caseDesc, tests.checkPropTypes.func);
    });
    
    describe(tests.checkRender.testDesc, () => {
        each(tests.checkRender.cases).it(tests.checkRender.caseDesc, tests.checkRender.func);
    });

    // describe("With props", () => {
    //     let wrapper;
    //     beforeEach(() => {
    //         const props = {
    //             sender: "bitboy",
    //             time: "05/02/2020 12:15 PM",
    //             text: "Hey how are you"
    //         };
    //         wrapper = setUp(props);
    //     });
    // });
});