
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { bindActionCreators } from "redux";

import getStore from 'app/config/store';
import { registerLocale } from 'app/config/translation';
import AppComponent from "app/app";

const store = getStore();
registerLocale(store);

const actions = bindActionCreators({}, store.dispatch);

const rootEl = document.getElementById("root");
const root = createRoot(rootEl);

const render = (Component) =>
    root.render(
        <Provider store={store}>
            <div>
                <Component />
            </div>
        </Provider>
    );

render(AppComponent);