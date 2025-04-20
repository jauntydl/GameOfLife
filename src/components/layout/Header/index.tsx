'use client'

import logo from '@/assets/GeorgiaTech_TechGoldandWhite.png'
import { headerHeight } from '@/styles'
import { Box, Button, Stack, Typography, useTheme } from '@mui/material'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

const Header = () => {
	const theme = useTheme()
	const router = useRouter()

	const pathName = usePathname()

	const pages = [
		{ name: 'Game of Life', route: '/' },
	]

	const pageButtons = pages.map((d) => {
		const selected = pathName === d.route

		return (
			<Button onClick={() => router.push(d.route)} key={d.name}>
				<Typography
					sx={{
						color: selected
							? theme.palette.secondary.light
							: theme.palette.common.white,
						fontSize: selected ? '22px' : '18px',
            fontWeight: selected
            ? 700
            : 400,
					}}
				>
					{d.name}
				</Typography>
			</Button>
		)
	})

	return (
		<Stack
			sx={{
				position: 'fixed',
				top: 0,
				left: 0,
				height: headerHeight, // Keep fixed height
				bgcolor: theme.palette.primary.dark,
				width: '100vw',
				minWidth: '1100px',
				px: 2,
				py: 1,
				display: 'grid',
				gridTemplateRows: '1fr',
				gridTemplateColumns: '2fr 5fr', 
				alignItems: 'center',
				color: '#fff',
				zIndex: 1000, 
				whiteSpace: 'nowrap', 
				overflowX: 'auto', 
			}}
		>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					width: 1,
					height: '100%',
				}}
			>
				<Image alt='Georgia Tech' height={50} src={logo} priority />

				<Typography variant='h5' sx={{ fontWeight: 700, mx : 2 }}>
					ISYE6644 Simulation
				</Typography>

				<Typography variant='h5'>Group 277</Typography>
			</Box>

			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'flex-end',
					width: 1,
					height: '100%',
				}}
			>
				<Box
					sx={{
						width: '80%',
						display: 'flex',
						justifyContent: 'space-evenly',
						alignItems: 'center',
						flexDirection: 'row',
					}}
				>
					{pageButtons}
				</Box>
			</Box>
		</Stack>
	)
}

export default Header
