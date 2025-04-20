'use client'

import { Container, Stack, Typography, useTheme } from '@mui/material';
import AboutMe from './components/AboutMe';
import GameOfLife from './components/GameOfLife';

const Home = () => {

	const theme = useTheme();


	return (
		<Container
			maxWidth='lg'
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Stack sx={{ m: 3 }}>
				<Typography
					variant='h3'
					sx={{ fontSize: '50px', fontWeight: 900 }}
				>
					Conway's Game of Life
				</Typography>
			</Stack>



			<GameOfLife />
			<AboutMe />

		</Container>
	)
}

export default Home
