import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../application/Provider';
import Information from '../../components/profile/information/Information';

const ProfileView = () => {
	const [user, setUser] = useState(null);
	const [state, setState] = useContext(AppContext);

	const setDataUser = () => {
		setState({ ...state, loading: true });
		setUser(state.user);
		setState({ ...state, loading: false });
	};

	useEffect(() => {
		setDataUser();
	}, []);

	return <>{user && <Information user={user} />}</>;
};

export default ProfileView;
