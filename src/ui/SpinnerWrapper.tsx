import { Box, Typography, alpha } from '@mui/material';
import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import SimpleSpinner from './SimpleSpinner';

type Props = {
	isLoading: boolean;
	children: React.ReactNode;
	isReady: boolean;
	error?: string;
}

const SpinnerWrapper = ({ children, isLoading, isReady, error }: Props) => {
	const spinnerRef = useRef(null)
	const errorRef = useRef(null)
	const readyRef = useRef(null)

	return (
		<Box sx={{ width: 1, height: '100%', position: 'relative' }}>
			<CSSTransition
				mountOnEnter
				unmountOnExit
				appear
				in={isLoading}
				timeout={700}
				classNames={{
					enter: 'fadeIn',
					appear: 'fadeIn',
					exit: 'fadeOut',
				}}
				nodeRef={spinnerRef}
			>
				<Box
					ref = {spinnerRef}
					sx={{
						position: 'absolute',
						top: 0,
						left: 0,
						height: '100%',
						width: 1,
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<SimpleSpinner />
				</Box>
			</CSSTransition>

			{error && (
				<CSSTransition
					mountOnEnter
					unmountOnExit
					appear
					in={!isLoading && !isReady}
					timeout={700}
					classNames={{
						enter: 'fadeIn',
						appear: 'fadeIn',
						exit: 'fadeOut',
					}}
					nodeRef={errorRef}
				>
					<Box
						ref = {errorRef}
						sx={{
							position: 'absolute',
							top: 0,
							left: 0,
							height: '100%',
							width: 1,
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
            <Box sx = {{px: 3, py: 2, bgcolor: alpha('#222', 0.02), borderRadius: 2}}>
              <Typography>
                Could not load Data : {error}
              </Typography>
            </Box>
					</Box>
				</CSSTransition>
			)}

			{isReady && (
				<CSSTransition
					mountOnEnter
					unmountOnExit
					appear
					in={!isLoading && isReady}
					timeout={700}
					classNames={{
						enter: 'fadeIn',
						appear: 'fadeIn',
						exit: 'fadeOut',
					}}
					nodeRef={readyRef}
				>
					<Box
						ref = {readyRef}
						sx={{
							position: 'absolute',
							top: 0,
							left: 0,
							height: '100%',
							width: 1,
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						{children}
					</Box>
				</CSSTransition>
			)}
		</Box>
	)
}

export default SpinnerWrapper
