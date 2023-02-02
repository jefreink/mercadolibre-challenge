import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const Provider = ({ children }) => {
	const [state, setState] = useState({
		user: null,
		totalCompras: 0,
		loading: false,
	});

	return (
		<AppContext.Provider value={[state, setState]}>
			{children}
		</AppContext.Provider>
	);
};

Provider.propTypes = {
	children: PropTypes.node,
};

export default Provider;
export const AppContext = createContext();
