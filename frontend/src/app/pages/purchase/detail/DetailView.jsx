import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Typography,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../../application/Provider';
import Detail from '../../../components/purchases/detail/Detail';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { motion } from 'framer-motion';
import { PurchasesServices } from '../../../services/purchasesService';

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
	show: () => ({
		opacity: 1,
		x: 0,
	}),
	hidden: { opacity: 0, x: '100%' },
};

const DetailView = () => {
	const service = PurchasesServices;
	const [state, setState] = useContext(AppContext);
	const [user, setUser] = useState(null);
	const [details, setDetails] = useState(null);
	const { id } = useParams();

	const getDetail = async () => {
		if (user) {
			const { data } = await service.getDetailPurchase(id);
			setDetails(data);
			setState({ ...state, loading: false });
		}
	};

	const getUser = async () => {
		setState({ ...state, loading: true });
		if (state.user) {
			setUser(state.user);
		}
	};

	useEffect(() => {
		getDetail();
	}, [user]);

	useEffect(() => {
		getUser();
	}, []);

	return (
		<>
			{details && (
				<Box
					maxWidth='900px'
					mx='auto'
					component={motion.div}
					variants={containerMotion}
					initial='hidden'
					animate='show'
					p='1rem'
				>
					<Box component={motion.div} variants={itemMotion}>
						<Detail {...details} showLink={false} />
						{details.payment && (
							<Accordion>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
									aria-controls='panel1a-content'
									id='panel1a-header'
								>
									<Typography component='h2' variant='h5'>
										Detalle de pago:
									</Typography>
								</AccordionSummary>
								<AccordionDetails sx={{ textAlign: 'left' }}>
									<Typography sx={{ textTransform: 'capitalize' }}>
										Estado: {details.payment.estado}
									</Typography>
									<Typography sx={{ display: 'flex', gap: '.25rem' }}>
										<Box component='span'>Pago:</Box>
										{details.precio.total.toLocaleString('es-Es')}
										<Box component='span' sx={{ textTransform: 'lowercase' }}>
											{details.precio.moneda}
										</Box>
									</Typography>
								</AccordionDetails>
							</Accordion>
						)}
						{details.shipment && (
							<Accordion>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
									aria-controls='panel2a-content'
									id='panel2a-header'
								>
									<Typography component='h2' variant='h5'>
										Detalle de envio:
									</Typography>
								</AccordionSummary>
								<AccordionDetails sx={{ textAlign: 'left' }}>
									<Typography sx={{ textTransform: 'capitalize' }}>
										Estado: {details.shipment.estado}
									</Typography>
								</AccordionDetails>
							</Accordion>
						)}
					</Box>
				</Box>
			)}
		</>
	);
};

export default DetailView;
