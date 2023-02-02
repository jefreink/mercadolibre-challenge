import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import styles from './loadingMin.module.scss';
import PropTypes from 'prop-types';

const LoadingMin = ({ text = '' }) => {
	return (
		<Box display='flex' flexDirection='column'>
			<Box className={styles.loadingMin}></Box>
			<Typography>{text ? text : 'Cargardon información...'}</Typography>
		</Box>
	);
};

LoadingMin.propTypes = {
	text: PropTypes.string,
};

export default LoadingMin;
