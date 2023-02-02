import { useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import StepConnector, {
	stepConnectorClasses,
} from '@mui/material/StepConnector';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { Box, Divider, Popover, Typography } from '@mui/material';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
	[`&.${stepConnectorClasses.alternativeLabel}`]: {
		top: 22,
	},
	[`&.${stepConnectorClasses.active}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			backgroundImage:
				'linear-gradient(109.6deg, rgb(9, 154, 151) 11.2%, rgb(21, 205, 168) 91.1%)',
		},
	},
	[`&.${stepConnectorClasses.completed}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			backgroundImage:
				'linear-gradient(109.6deg, rgb(9, 154, 151) 11.2%, rgb(21, 205, 168) 91.1%)',
		},
	},
	[`& .${stepConnectorClasses.line}`]: {
		height: 3,
		border: 0,
		backgroundColor:
			theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
		borderRadius: 1,
	},
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
	backgroundColor:
		theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
	zIndex: 1,
	color: '#fff',
	width: 25,
	height: 25,
	display: 'flex',
	borderRadius: '50%',
	justifyContent: 'center',
	alignItems: 'center',
	marginTop: '10px',
	...(ownerState.active && {
		backgroundImage:
			'linear-gradient(112.1deg, rgb(32, 38, 57) 11.4%, rgb(63, 76, 119) 70.2%)',
		boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
	}),
	...(ownerState.completed && {
		backgroundImage:
			'linear-gradient(109.6deg, rgb(9, 154, 151) 11.2%, rgb(21, 205, 168) 91.1%)',
	}),
}));

function ColorlibStepIcon(props) {
	const { active, completed, className } = props;
	const icons = {
		1: <StorefrontIcon sx={{ fontSize: '15px' }} />,
		2: <PointOfSaleIcon sx={{ fontSize: '15px' }} />,
		3: <LocalShippingIcon sx={{ fontSize: '15px' }} />,
		4: <Check sx={{ fontSize: '15px' }} />,
	};

	return (
		<ColorlibStepIconRoot
			ownerState={{ completed, active }}
			className={className}
		>
			{icons[String(props.icon)]}
		</ColorlibStepIconRoot>
	);
}

ColorlibStepIcon.propTypes = {
	active: PropTypes.bool,
	className: PropTypes.string,
	completed: PropTypes.bool,
	icon: PropTypes.node,
};

const steps = ['Solicitud', 'Pago', 'Envio', 'Entregado'];

const TimeLine = ({ transaction }) => {
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);

	return (
		<Stack sx={{ width: '100%' }} spacing={4}>
			<Stepper
				alternativeLabel
				activeStep={transaction.step}
				connector={<ColorlibConnector />}
			>
				{steps.map((label, i) => (
					<Step key={label}>
						<StepLabel StepIconComponent={ColorlibStepIcon}>
							<Box display='flex' gap='.25rem' justifyContent='center'>
								<Typography
									component='h6'
									fontSize='0.625rem'
									sx={{
										fontWeight:
											i === transaction.step ||
											(transaction.step === 4 && i === 3)
												? 'bold'
												: '',
										color:
											i === transaction.step ||
											(transaction.step === 4 && i === 3)
												? transaction.color
												: '',
									}}
								>
									{label}
								</Typography>
								{transaction.step !== 4 && i <= transaction.step && i > 0 && (
									<InfoOutlinedIcon
										onClick={handleClick}
										aria-describedby={`pop${i}`}
										sx={{
											fontSize: '15px',
											color: '#ff5959',
											cursor: 'pointer',
										}}
									/>
								)}
							</Box>
							<Popover
								id={`pop${i}`}
								open={open}
								anchorEl={anchorEl}
								onClose={handleClose}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'center',
								}}
							>
								<Box
									display='flex'
									flexDirection='column'
									sx={{
										minWidth: '150px',
									}}
								>
									<Typography p='.25rem'>Motivo: </Typography>
									<Divider />
									<Typography p='.25rem' textTransform='capitalize'>
										{transaction.estado}
									</Typography>
								</Box>
							</Popover>
						</StepLabel>
					</Step>
				))}
			</Stepper>
		</Stack>
	);
};

TimeLine.propTypes = {
	transaction: PropTypes.object.isRequired,
};

export default TimeLine;
