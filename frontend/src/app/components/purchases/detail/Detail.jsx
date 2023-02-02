import React from 'react';
import {
	Box,
	Card,
	CardContent,
	Divider,
	Link,
	Typography,
} from '@mui/material';
import TimeLine from '../../timeline/TimeLine';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const Detail = ({
	id_compra,
	fecha,
	imagen,
	titulo,
	cantidad,
	vendedor,
	payment,
	showLink = true,
}) => {
	const navigate = useNavigate();
	const onDetailPage = (path) => {
		navigate(`/layout/detailPurchase/${path}`);
	};

	const verifyState = (payment) => {
		switch (true) {
			case payment.estado === 'rechazada' || payment.estado === 'cancelada':
				return { estado: payment.estado, step: 1, color: 'red' };
			default:
				return { estado: 'completed', step: 4, color: '#00a650' };
		}
	};

	return (
		<>
			<Card sx={{ mb: '1rem' }}>
				<CardContent
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'start',
					}}
				>
					<Box display='flex' width='100%' alignItems='center' p='.25rem'>
						<Typography fontWeight='bold' component='h6' variant='body2'>
							{moment(fecha).format('DD/MM/YYYY')} | #{id_compra}
						</Typography>

						{showLink && (
							<Link
								component='button'
								variant='outlined'
								sx={{ ml: 'auto' }}
								onClick={() => onDetailPage(id_compra)}
							>
								Ver detalle
							</Link>
						)}
					</Box>
					<Divider sx={{ width: '100%' }} />
					<Box display='flex' gap='1rem' pt='1rem'>
						<img src={imagen} alt={titulo} width='40' height='40' />
						<Box display='flex' flexDirection='column' textAlign='left'>
							<Typography component='h6' variant='body2'>
								{titulo}
							</Typography>
							{cantidad > 1 && (
								<Typography component='h6' sx={{ fontSize: '.75rem' }}>
									Cantidad: {cantidad}
								</Typography>
							)}
							{vendedor && (
								<Typography component='h6' variant='body2'>
									Vendido por:
									<Link
										href='#'
										underline='none'
										sx={{ fontSize: '.75rem', pl: '.25rem' }}
									>
										{vendedor.nickname}
									</Link>
								</Typography>
							)}
						</Box>
					</Box>
					{payment && <TimeLine transaction={verifyState(payment)} />}
				</CardContent>
			</Card>
		</>
	);
};

Detail.propTypes = {
	id_compra: PropTypes.number.isRequired,
	fecha: PropTypes.string.isRequired,
	imagen: PropTypes.string.isRequired,
	titulo: PropTypes.string.isRequired,
	cantidad: PropTypes.number.isRequired,
	vendedor: PropTypes.object.isRequired,
	payment: PropTypes.object.isRequired,
	showLink: PropTypes.bool,
};

export default Detail;
