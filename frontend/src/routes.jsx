import { Navigate } from 'react-router-dom';
import ProfileView from './app/pages/profile/ProfileView';
import DetailView from './app/pages/purchase/detail/DetailView';
import PurchaseView from './app/pages/purchase/PurchaseView';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

const routes = [
	{
		name: 'Perfil',
		layout: '/layout',
		path: '/profile',
		icon: <AccountCircleIcon />,
		element: <ProfileView />,
	},
	{
		name: 'Detalle',
		layout: '/layout',
		path: '/detailPurchase/:id',
		icon: <ShoppingBagIcon />,
		element: <DetailView />,
	},
	{
		name: 'Mis compras',
		layout: '/layout',
		path: '/myPurchases',
		icon: <ShoppingBagIcon />,
		element: <PurchaseView />,
	},
	{
		path: '*',
		element: <Navigate to='/layout/profile' />,
	},
];

export default routes;
