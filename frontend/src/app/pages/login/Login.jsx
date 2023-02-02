import { Box, Button, FormControl, Snackbar, TextField } from '@mui/material';
import { forwardRef, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { getToken, setToken } from '../../authentication/helpers';
import { LoginServices } from '../../services/loginService';
import styles from './login.module.scss';
import MuiAlert from '@mui/material/Alert';
import { AppContext } from '../../application/Provider';

const Alert = forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const LoginView = () => {
	const navigate = useNavigate();
	const [openAlert, setOpenAlert] = useState(false);
	const [serverError, setServerError] = useState(null);
	const { register, handleSubmit } = useForm();
	const [state, setState] = useContext(AppContext);

	const onSubmit = async (e) => {
		setState({ ...state, loading: true });
		const service = LoginServices;
		const data = await service.signIn(e);
		if (data && data.tokenSession) {
			setToken(data.tokenSession);
			navigate('/layout');
		} else {
			if (data) {
				handleOpenAlert(
					data.error || 'Hubo un problema al intentar iniciar sesión'
				);
			}
		}
		setState({ ...state, loading: false });
	};

	const verifyLogin = () => {
		getToken() && navigate('/layout/profile');
	};

	const handleOpenAlert = (error) => {
		setServerError(error);
		setOpenAlert(true);
	};

	const handleCloseAlert = (event, reason) => {
		setOpenAlert(false);
		setServerError(null);
	};

	useEffect(() => {
		verifyLogin();
	}, []);
	return (
		<>
			<Box className={styles.boxLogin}>
				<Alert variant='filled' severity='warning'>
					Usa la cuenta admin@admin.com y password admin para continuar.
				</Alert>
				<Box className={styles.contentForm}>
					<Box className={styles.loginSideL}>
						<Box
							id='formLogin'
							component='form'
							onSubmit={handleSubmit(onSubmit)}
							className={styles.boxForm}
						>
							<FormControl
								variant='standard'
								fullWidth
								className={styles.formControl}
							>
								<TextField
									id='email'
									label='Email'
									variant='outlined'
									size='small'
									color='success'
									{...register('email', {
										required: true,
										pattern: '/^S+@S+$/i})',
									})}
								/>
							</FormControl>
							<FormControl
								variant='filled'
								fullWidth
								className={styles.formControl}
							>
								<TextField
									id='password'
									label='Password'
									variant='outlined'
									size='small'
									type='password'
									{...register('password', { required: true })}
								/>
							</FormControl>
							<Button
								type='submit'
								variant='contained'
								fullWidth
								className={styles.submit}
								data-testid='loginSubmit'
							>
								Iniciar sesión
							</Button>
						</Box>
					</Box>
					<Box className={styles.loginSideR}></Box>
				</Box>
			</Box>
			{serverError && (
				<Snackbar
					open={openAlert}
					autoHideDuration={6000}
					onClose={handleCloseAlert}
				>
					<Alert
						onClose={handleCloseAlert}
						severity='error'
						sx={{ width: '100%' }}
					>
						{serverError}
					</Alert>
				</Snackbar>
			)}
		</>
	);
};

export default LoginView;
