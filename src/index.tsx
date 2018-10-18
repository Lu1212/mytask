import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './components/store';
import './reset.less';

import MainBody from './components/MainBody/MainBody';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider store={store}>
        <MainBody />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
