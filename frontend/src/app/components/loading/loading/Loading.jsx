import { Box } from '@mui/system';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../application/Provider';
import styles from './loading.module.scss';

const Loading = () => {
	const [state] = useContext(AppContext);
	const [load, setLoad] = useState(false);

	const showHideLoading = () => {
		setLoad(state.loading);
	};

	useEffect(() => {
		showHideLoading();
	}, [state]);

	return (
		<>
			{load && (
				<Box className={styles.loadingContent}>
					<Box className={styles.loading}></Box>
				</Box>
			)}
		</>
	);
};

export default Loading;
