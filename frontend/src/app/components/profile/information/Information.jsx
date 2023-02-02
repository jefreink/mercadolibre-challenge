import { Box, Card, CardContent, Paper, Typography } from '@mui/material';
import style from './Information.module.scss';
import { useContext, useEffect, useState } from 'react';
import Purchases from '../../purchases/Purchases';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import { AppContext } from '../../../application/Provider';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const containerMotion = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
};

const itemMotion = {
	show: (i) => ({
		opacity: 1,

		y: 0,
		transition: {
			delay: i * 0.1,
		},
	}),
	hidden: { opacity: 0, y: '100%' },
};

const Information = ({ user }) => {
	const [state] = useContext(AppContext);
	const [totalPurchases, setTotalPurchases] = useState(0);

	const setTotalCompras = () => {
		const { totalCompras } = state;
		setTotalPurchases(totalCompras);
	};

	const tareas = [
		{
			tarea: 'Nombre de tarea 1',
			descripcion: 'Sin información',
			avance: '25',
		},
		{
			tarea: 'Nombre de tarea 2',
			descripcion: 'Sin información',
			avance: '50',
		},
		{
			tarea: 'Nombre de tarea 3',
			descripcion: 'Sin información',
			avance: '65',
		},
	];

	useEffect(() => {
		setTotalCompras();
	}, [state]);

	return (
		<Box
			className={style.boxUserInformation}
			sx={{
				flexDirection: { xs: 'column', md: 'row' },
				p: '1rem',
			}}
		>
			<Card
				className={style.cardUserInformation}
				sx={{
					flexBasis: { xs: '100%', md: '50%' },
					p: { xs: 0, sm: '1rem' },
					width: { xs: '100%', sm: 'auto' },
					order: { xs: 1, sm: 0 },
				}}
			>
				<Box display='flex' alignItems='center' gap='1rem'>
					<Box
						component='span'
						sx={{
							background: '#fff',
							borderRadius: '5px',
							p: '1rem',
							boxShadow: '0px 20px 20px -17px rgb(34 34 34 / 53%)',
						}}
					>
						<WorkspacePremiumOutlinedIcon
							sx={{ color: '0px 20px 20px -17px rgb(34 34 34 / 53%)' }}
						/>
					</Box>
					<Typography component='h2' variant='h6'>
						Nivel de Mercado Puntos
					</Typography>
				</Box>
				<CardContent className={style.userInformationContent}>
					<Box className={style.imageSidePuntos}>
						{user && (
							<Box mb='2rem' display='flex' flexDirection='column'>
								<img
									src={`/${user.nivel.id_nivel}.png`}
									alt='medal'
									className={style.medal}
								/>
							</Box>
						)}
						<Box display='flex' justifyContent='center'>
							<Typography>Tu nivel actual es:</Typography>
							<Typography
								sx={{
									color: '#d7a649',
									fontWeight: 'bold',
									textShadow: '1px 1px 1px #000',
									pl: '5px',
									mb: '1rem',
									justifyContent: 'center',
								}}
							>
								{user.nivel.id_nivel}
							</Typography>
						</Box>
						<Paper
							elevation={3}
							className={style.blockDiamond}
							sx={{ mb: '1rem' }}
						>
							<Box
								className={style.background}
								component={motion.div}
								initial={{ width: '0' }}
								animate={{ width: '35%' }}
								transition={{ delay: 0.5 }}
							/>
							<Box className={style.diamond}>
								<Box component='img' src='/diamond.png' alt='diamon' />
							</Box>
							<Box className={style.boxTextDiamond} flexGrow='1'>
								<Typography component='h6' className={style.title}>
									Progreso para subir de nivel
								</Typography>
								<Typography
									component='h6'
									variant='body2'
									sx={{ color: '#aaa' }}
								>
									Tareas 3
								</Typography>
							</Box>
							<Typography component='h6' variant='body1'>
								35%
							</Typography>
						</Paper>
						<Box display='flex' justifyContent='space-between' mb='1rem'>
							<Typography>Proximo rango</Typography>
							<Typography
								sx={{
									fontWeight: 'bold',
									color: '#00abe9',
								}}
							>
								Diamante
							</Typography>
						</Box>
						<Box
							component={motion.div}
							variants={containerMotion}
							initial='hidden'
							animate='show'
						>
							{tareas.map(({ tarea, descripcion, avance }, i) => (
								<Paper
									key={i}
									elevation={3}
									className={style.blockDiamond}
									sx={{ mb: '1rem' }}
									data-avance={`${avance}%`}
									component={motion.div}
									variants={itemMotion}
									custom={i}
								>
									<Box
										component={motion.div}
										initial={{ width: '0' }}
										animate={{ width: `${avance}%` }}
										transition={{ delay: i * 0.1 }}
										className={style.background}
									/>
									<Box className={style.diamond}>
										<Box component='img' src='/diamond.png' alt='diamon' />
									</Box>
									<Box className={style.boxTextDiamond} flexGrow='1'>
										<Typography
											component='h6'
											variant='body2'
											className={style.title}
										>
											{tarea}
										</Typography>
										<Typography
											component='h6'
											variant='body2'
											sx={{ color: '#aaa' }}
										>
											{descripcion}
										</Typography>
									</Box>
									<Typography component='h6' variant='body1'>
										{avance}%
									</Typography>
								</Paper>
							))}
						</Box>
					</Box>
				</CardContent>
			</Card>

			<Box
				display='flex'
				flexDirection='column'
				flexGrow='1'
				gap='1rem'
				width='100%'
				sx={{ order: { xs: 0, sm: 1 } }}
			>
				<Box
					display='flex'
					gap='1rem'
					sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
				>
					<Card
						className={style.cardUserInformation}
						sx={{ width: { xs: '100%', sm: 'auto' } }}
					>
						<Box
							display='flex'
							flexDirection='flex-start'
							alignItems='center'
							gap='1rem'
						>
							<Box
								component='span'
								sx={{
									background: '#fff',
									borderRadius: '5px',
									p: '1rem',
									boxShadow: '0px 20px 20px -17px rgb(34 34 34 / 53%)',
								}}
							>
								<WorkspacePremiumOutlinedIcon
									sx={{ color: '0px 20px 20px -17px rgb(34 34 34 / 53%)' }}
								/>
							</Box>
							<Typography component='h2' variant='h6'>
								Información general
							</Typography>
						</Box>
						<CardContent className={style.userInformationContent}>
							<Box className={style.imageSide}>
								{user && (
									<Box className={style.imgRadious}>
										<Box component='img' src={user.imagen} alt='avatar' />
									</Box>
								)}
							</Box>
							<Box display='flex' flexDirection='column' textAlign='left'>
								<Typography component='h1' variant='body1'>
									{user?.nombre} {user?.apellido}
								</Typography>
								<Typography component='h5'>
									Nivel:
									<Box
										component='span'
										sx={{ textTransform: 'lowercase', pl: '.5rem' }}
									>
										{user?.nivel?.id_nivel}
									</Box>
								</Typography>
							</Box>
						</CardContent>
					</Card>
					<Card
						className={style.cardUserInformation}
						sx={{ width: { xs: '100%', sm: 'auto' } }}
					>
						<Box
							display='flex'
							flexDirection='flex-start'
							alignItems='center'
							gap='1rem'
						>
							<Box
								component='span'
								sx={{
									background: '#fff',
									borderRadius: '5px',
									p: '1rem',
									boxShadow: '0px 20px 20px -17px rgb(34 34 34 / 53%)',
								}}
							>
								<WorkspacePremiumOutlinedIcon
									sx={{ color: '0px 20px 20px -17px rgb(34 34 34 / 53%)' }}
								/>
							</Box>
							<Typography component='h2' variant='h6'>
								Información de compras
							</Typography>
						</Box>
						<CardContent className={style.userInformationContent}>
							<Box className={style.imageSide}>
								{user && (
									<Box className={style.imgRadious}>
										<Box component='img' src='/packages.png' alt='avatar' />
									</Box>
								)}
							</Box>
							<Box display='flex' flexDirection='column' textAlign='left'>
								<Typography component='h1' variant='body1'>
									Total de compras
								</Typography>
								<Typography component='h6'>{totalPurchases}</Typography>
							</Box>
						</CardContent>
					</Card>
				</Box>
				<Purchases user={user} />
			</Box>
		</Box>
	);
};

Information.propTypes = {
	user: PropTypes.object.isRequired,
};

export default Information;
