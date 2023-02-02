import { useState, useEffect, useContext } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import styles from './navbar.module.scss';
import { AppContext } from '../../application/Provider';
import {
	WarningAmber as WarningAmberIcon,
	TaskAlt as TaskAltIcon,
} from '@mui/icons-material';
import { Avatar, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { deleteToken } from '../../authentication/helpers';

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(3),
		width: 'auto',
	},
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch',
		},
	},
}));

const Navbar = () => {
	const [state] = useContext(AppContext);
	const [notifications, setNotifications] = useState(null);
	const [user, setUser] = useState(null);
	const [anchorEl, setAnchorEl] = useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
	const navigate = useNavigate();

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = () => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const onChangePage = (page) => {
		navigate(page);
	};

	const logOut = () => {
		deleteToken();
		onChangePage('/login');
	};

	const menuId = 'primary-search-account-menu';
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			id={menuId}
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			open={isMenuOpen}
			onClose={handleMenuClose}
			sx={{ width: '100%', top: '36px' }}
		>
			<MenuItem onClick={handleMenuClose}>
				<Link
					onClick={() => onChangePage('/layout/profile')}
					underline='none'
					color='#000'
				>
					Profile
				</Link>
			</MenuItem>
			<MenuItem onClick={handleMenuClose}>
				<Link
					onClick={() => onChangePage('/layout/myPurchases')}
					underline='none'
					color='#000'
				>
					My purchases
				</Link>
			</MenuItem>
			<MenuItem onClick={handleMenuClose}>
				<Link onClick={() => logOut()} underline='none' color='#000'>
					Logout
				</Link>
			</MenuItem>
		</Menu>
	);

	const updateNotifications = () => {
		const user = state.user;
		setUser(user);

		if (user) {
			const { restrictions } = user;

			setNotifications(restrictions);
		}
	};

	useEffect(() => {
		updateNotifications();
	}, [state]);

	const mobileMenuId = 'primary-search-account-menu-mobile';
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
			sx={{ top: '36px' }}
		>
			{notifications && notifications.length > 0 ? (
				notifications.map(({ mensaje }, i) => (
					<MenuItem onClick={handleMenuClose} key={i}>
						<IconButton
							size='large'
							aria-label='show new notifications'
							color='inherit'
						>
							<WarningAmberIcon />
						</IconButton>
						<Typography>{mensaje}</Typography>
					</MenuItem>
				))
			) : (
				<MenuItem>
					<IconButton
						size='large'
						aria-label='show new notifications'
						color='inherit'
					>
						<TaskAltIcon />
					</IconButton>
					<Typography>Sin notificaciones</Typography>
				</MenuItem>
			)}
		</Menu>
	);

	return (
		<>
			<AppBar position='fixed' className={styles.navBarContent}>
				<Toolbar>
					<Typography
						variant='h6'
						component='div'
						sx={{
							fontSize: { xs: '1rem', sm: '1.25rem', paddingRight: '1rem' },
						}}
					>
						TESTML
					</Typography>
					<Search>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase />
					</Search>
					<Box sx={{ flexGrow: 1 }} />
					<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
						<IconButton
							size='large'
							aria-label='show 17 new notifications'
							color='inherit'
							onClick={handleMobileMenuOpen}
							className={styles.link}
						>
							<Badge
								badgeContent={notifications ? notifications.length : 0}
								color='error'
								className={
									notifications &&
									notifications.length > 0 &&
									`${styles.animation}  ${styles.pulseAnimation}`
								}
							>
								<NotificationsIcon />
							</Badge>
						</IconButton>
						<IconButton
							className={styles.link}
							size='large'
							edge='end'
							aria-label='account of current user'
							aria-controls={menuId}
							aria-haspopup='true'
							onClick={handleProfileMenuOpen}
							color='inherit'
						>
							{user && (
								<Avatar
									alt={`${user.nombre} ${user.apellido}`}
									src={user && user.imagen}
								/>
							)}
						</IconButton>
					</Box>
					<Box sx={{ display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							className={styles.link}
							size='large'
							aria-label='show more'
							aria-controls={mobileMenuId}
							aria-haspopup='true'
							onClick={handleProfileMenuOpen}
							color='inherit'
						>
							<MenuIcon />
						</IconButton>
					</Box>
				</Toolbar>
			</AppBar>
			{renderMobileMenu}
			{renderMenu}
		</>
	);
};

export default Navbar;
