import { useNavigate, useRoutes } from 'react-router-dom';
import routes from '../../../routes';
import Navbar from '../../components/navbar/Navbar';
import DrawerMenu from '../../components/drawer/DrawerMenu';
import { useContext, useEffect, useState } from 'react';
import { deleteToken, getUser } from '../../authentication/helpers';
import { AppContext } from '../../application/Provider';
import { UserServices } from '../../services/userService';

const LayoutView = () => {
	const service = UserServices;
	const navigate = useNavigate();
	const [user, setUser] = useState(null);
	const [state, setState] = useContext(AppContext);

	const getStatitcUser = async () => {
		if (state.user) {
			setUser(state.user);
			setState({ ...state, loading: false });
			return;
		}
		const { data } = await service.getUserData();

		setUser(data);
		setState({
			...state,
			user: data,
			loading: false,
		});
	};

	const verifyToken = async () => {
		setState({ ...state, loading: true });
		const user = getUser();
		if (user) {
			getStatitcUser();
		} else {
			deleteToken();
			navigate('/');
		}
	};

	useEffect(() => {
		verifyToken();
	}, []);

	const childRoutes = useRoutes(routes);
	return (
		<>
			<Navbar />
			{user && <DrawerMenu data-testid='drawer'> {childRoutes} </DrawerMenu>}
		</>
	);
};

export default LayoutView;
