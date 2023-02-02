import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import routes from '../../../routes';
import { useNavigate } from 'react-router-dom';
import { Link } from '@mui/material';
import styles from './drawerMenu.module.scss';
import PropTypes from 'prop-types';

const drawerWidth = 240;

const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	position: 'fixed',
	overflowX: 'hidden',
	top: '65px !important',
});

const closedMixin = (theme) => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	top: '65px !important',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: 'nowrap',
	boxSizing: 'border-box',
	...(open && {
		...openedMixin(theme),
		'& .MuiDrawer-paper': openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		'& .MuiDrawer-paper': closedMixin(theme),
	}),
}));

const DrawerMenu = ({ children }) => {
	const navigate = useNavigate();
	const [open, setOpen] = React.useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const onChangePage = (path) => {
		navigate(path);
	};

	return (
		<>
			<Box component='main' className={styles.contentMain}>
				<Drawer
					variant={'permanent'}
					role='presentation'
					open={open}
					sx={{ top: 'auto !important', display: { xs: 'none', md: 'flex' } }}
					className={open && styles.drawer}
				>
					<Box sx={{ overflow: 'auto' }}>
						<List
							onMouseOver={handleDrawerOpen}
							onMouseLeave={handleDrawerClose}
						>
							{routes
								.filter((e) => e.name !== 'Detalle' && e.name !== undefined)
								.map(({ path, name, layout, icon }, index) => (
									<Link
										key={index}
										onClick={() => onChangePage(`${layout}${path}`)}
										underline='none'
										color='#000'
									>
										<ListItem disablePadding sx={{ display: 'block' }}>
											<ListItemButton
												sx={{
													minHeight: 48,
													justifyContent: open ? 'initial' : 'center',
													px: 2.5,
												}}
											>
												<ListItemIcon
													sx={{
														minWidth: 0,
														mr: open ? 3 : 'auto',
														justifyContent: 'center',
													}}
												>
													{icon}
												</ListItemIcon>
												<ListItemText
													primary={name}
													sx={{ opacity: open ? 1 : 0 }}
												/>
											</ListItemButton>
										</ListItem>
									</Link>
								))}
						</List>
					</Box>
				</Drawer>
				<Box
					sx={{
						flexGrow: 1,
						p: {
							xs: '50px 0',
							md: '84px 1rem',
						},
						position: 'relative',
						zIndex: open && '-1',
					}}
				>
					{children}
				</Box>
			</Box>
		</>
	);
};

DrawerMenu.propTypes = {
	children: PropTypes.node,
};

export default DrawerMenu;
