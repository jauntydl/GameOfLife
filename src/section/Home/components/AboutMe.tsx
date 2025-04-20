'use client'

import DavisPhoto from '@/assets/profile/DavisLee.jpeg'
import { Box, Stack, Typography, useTheme } from '@mui/material'
import Image from 'next/image'

const AboutMe = () => {
	const theme = useTheme()

	const myinfo = {
		name: 'Davis Lee',
		photo: DavisPhoto,
		description:
			'Frontend Engineer/Data Analyst with a passion for Data Visualization, using tools like D3.js and React.js to turn complex data into clear, engaging visuals. My goal is to create user-friendly experiences where data is both functional and visually appealing, blending creativity with technical skills to make data accessible and enjoyable.',
		gatechId: 'dlee863',
	}

	return (
		<Stack
			direction='row'
			spacing={2}
			alignItems='center'
			sx={{
				width: '80%',
				borderBottom: '1px solid',
				borderColor: theme.palette.divider,
				pb: 2,
				pt: 2,
			}}
		>
			<Image
				src={myinfo.photo}
				alt={`${myinfo.name}'s profile`}
				width={130}
				height={130}
				style={{ borderRadius: '50%' }}
			/>
			<Box
				sx={{
					display: 'grid',
					gridTemplateColumns: '1fr',
					gridTemplateRows: '40px 1fr 40px',
					height: '160px',
				}}
			>
				<Typography sx={{ fontWeight: 700, fontSize: '26px' }}>
					{myinfo.name}
				</Typography>

    
				<Typography>{myinfo.description}</Typography>
				<Typography sx={{ pt: 1.5, fontWeight: 700 }}>
					Georgia Tech ID : {myinfo.gatechId}
				</Typography>
			</Box>
		</Stack>
	)
}

export default AboutMe
