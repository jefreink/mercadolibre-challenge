import { Box, Card, CardContent, Paper, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import CustomPagination from '../pagination/Pagination';
import { AppContext } from '../../application/Provider';
import { motion } from 'framer-motion';
import Detail from './detail/Detail';
import LoadingMin from '../loading/loadingMin/LoadingMin';
import { PurchasesServices } from '../../services/purchasesService';

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

const Purchases = () => {
	const [state, setState] = useContext(AppContext);
	const service = PurchasesServices;
	const [page, setPage] = useState(0);
	const [itemsPerPage] = useState(5);
	const [maxReg, setMaxReg] = useState(0);
	const [purchases, setPurchases] = useState([]);
	const [load, setLoading] = useState(true);

	const getPurchases = async () => {
		setLoading(true);
		const resp = await service.getUserPurchases({
			limit: itemsPerPage,
			offset: page * itemsPerPage,
		});
		const { total, data } = resp.data;
		setPurchases(data);
		setMaxReg(total);
		setState({
			...state,
			totalCompras: total,
		});
		setLoading(false);
	};

	const handleChange = (e, p) => {
		setPage(p - 1);
	};

	useEffect(() => {
		getPurchases();
	}, [page]);

	return (
		<>
			<Card sx={{ p: '1rem' }}>
				<Paper
					elevation={3}
					sx={{
						background: '#d7a649',
						borderRadius: '10px',
						p: '1rem',
						m: '1rem',
						display: 'flex',
						alignItems: 'center',
					}}
				>
					<Box
						component='img'
						src='/packages.png'
						alt='avatar'
						sx={{
							boxShadow: '0 10px 10px #cc9d43',
							borderRadius: '11px',
							order: '1',
							width: '100%',
							maxWidth: '120px',
						}}
					/>
					<Typography
						component='h2'
						sx={{
							width: '100%',
							textAlign: 'center',
							fontWeight: 'bold',
							color: '#fff',
							textShadow: '1px 1px 1px #000',
							fontSize: { xs: '1rem', md: '2rem' },
						}}
					>
						Mis compras
					</Typography>
				</Paper>
				<CardContent>
					{load ? (
						<Box my='3rem' textAlign='center'>
							<LoadingMin text='Cargando tus compras...' />
						</Box>
					) : (
						<>
							<Box
								component={motion.div}
								variants={containerMotion}
								initial='hidden'
								animate='show'
							>
								{purchases.length > 0 ? (
									purchases.map((resp, i) => (
										<Box
											key={resp.id_compra}
											component={motion.div}
											variants={itemMotion}
											custom={i}
										>
											<Detail {...resp} />
										</Box>
									))
								) : (
									<Typography component='h5'>
										Todavia no tienes un historial de compras
									</Typography>
								)}
							</Box>
							<Box display='flex' justifyContent='center' p='1rem'>
								<CustomPagination
									maxReg={maxReg}
									rowsPerPage={itemsPerPage}
									page={page + 1}
									onPageChange={handleChange}
								/>
							</Box>
						</>
					)}
				</CardContent>
			</Card>
		</>
	);
};

export default Purchases;
