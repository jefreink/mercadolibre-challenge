import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import './index.css';
import { AxiosInterceptor } from './app/authentication/useAxiosInterceptor';

AxiosInterceptor();

ReactDOM.createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		{/* <React.StrictMode> */}
		<Routes>
			<Route path='*' element={<App />} />
		</Routes>
		{/* </React.StrictMode> */}
	</BrowserRouter>
);
