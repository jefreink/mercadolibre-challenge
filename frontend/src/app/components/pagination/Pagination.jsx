import { Box, Pagination, PaginationItem, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import './pagination.scss';

const CustomPagination = ({ maxReg, rowsPerPage, page, onPageChange }) => {
	const count = Math.ceil(maxReg / rowsPerPage);
	return (
		<>
			<Pagination
				count={count}
				size='large'
				page={page}
				variant='outlined'
				shape='rounded'
				defaultPage={3}
				onChange={onPageChange}
				color='primary'
				renderItem={(item) => (
					<PaginationItem
						components={{
							next: (props) => (
								<Box {...props} px='.65rem'>
									<Typography
										component='h5'
										variant='body2'
										fontWeight='bold'
										sx={{ color: '#233247' }}
									>
										Next
									</Typography>
								</Box>
							),
							previous: (props) => (
								<Box {...props} px='.65rem' sx={{ color: '#233247' }}>
									<Typography
										component='h5'
										variant='body2'
										fontWeight='bold'
										sx={{ color: '#233247' }}
									>
										Previous
									</Typography>
								</Box>
							),
						}}
						{...item}
					/>
				)}
			/>
		</>
	);
};

CustomPagination.propTypes = {
	maxReg: PropTypes.number.isRequired,
	rowsPerPage: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired,
	page: PropTypes.number.isRequired,
};

export default CustomPagination;
