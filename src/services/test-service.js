import { BehaviorSubject } from "rxjs";

let value = 5;

export const getValue = () => {
    console.log("test-service: getValue() called")
    return value;
}

export const setValue = newValue => {
    console.log("test-service: setValue() called")
    value = newValue;
    updateValueSubject(newValue);
}

export const increment = () => {
    console.log("test-service: increment() called")
    value += 1;
    updateValueSubject(value);
}

///////* ADDITIONAL OBSERVABLE CODE *///////

// Create a subject - the thing that will be watched by the observable. Set the initial value to 5 to match above
let valueSubject = new BehaviorSubject(5);

/* Create an observable to watch (observe) the subject and send out a stream of updates (you will subscribe
 to this stream in a component to receive the updates) */
let value$ = valueSubject.asObservable();

/* Internal function that we'll call whenever setValue() or increment() is called for the normal value 
variable so that our valueSubject matches up with value. 

To update the subject being watched by the observable, we call the next method on the subject. 

Then, because we have an observable watching the valueSubject, a new value will appear in the value$ 
observable stream, and any component that subscribes to it will automatically receive the new value */
const updateValueSubject = newValue => valueSubject.next(newValue);

// Getter to expose the value stream to components
export const getValue$ = () => value$;
