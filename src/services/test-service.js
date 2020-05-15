let value = 5;

export const getValue = () => {
    console.log("test-service: getValue() called")
    return value;
}

export const setValue = newValue => {
    console.log("test-service: setValue() called")
    value = newValue;
}

export const increment = () => {
    console.log("test-service: increment() called")
    value += 1;
}

