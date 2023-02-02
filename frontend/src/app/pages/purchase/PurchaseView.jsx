import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../application/Provider';
import Purchases from '../../components/purchases/Purchases';

const PurchaseView = () => {
	const [user, setUser] = useState(null);
	const [state] = useContext(AppContext);

	const setDataUser = () => {
		setUser(state.user);
	};

	useEffect(() => {
		setDataUser();
	}, []);

	return (
		<>
			<Purchases user={user} />
		</>
	);
};

export default PurchaseView;
