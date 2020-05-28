import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import configureServices from "./services";
import configureModules from "./modules";
import configureStore from "./store";

const loadRoot = async () => {
  const rootModule = await import("./components/Root");
  return rootModule.default;
}

const render = async (store) => {
  const target = document.getElementById("root");
  const Root = await loadRoot();

  ReactDOM.render(<Root store={store} />, target);
};

(async function init() {
  const services = await configureServices();
  const { actions, reducers } = await configureModules(services);

  // TODO register services
  // TODO register actions

  render(configureStore(reducers));
})();


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
