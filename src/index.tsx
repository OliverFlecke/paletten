import React from 'react';
import { render, hydrate } from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const rootElement = document.getElementById('root');
const Application = (
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

if (rootElement?.hasChildNodes()) {
	hydrate(Application, rootElement);
} else {
	render(Application, rootElement);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
