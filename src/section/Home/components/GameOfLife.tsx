import { Clear, Pause, PlayArrow, SkipNext } from '@mui/icons-material'
import { Box, Button, Slider, TextField, Typography } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'

const GRID_SIZE = 32
const CELL_SIZE = 16
const SPEEDS = {
	instant: 0,
	fast: 250,
	slow: 500
}

type GridType = number[][]

const GameOfLife: React.FC = () => {
	const [grid, setGrid] = useState<GridType>(() => initializeGrid())
	const [isRunning, setIsRunning] = useState<boolean>(false)
	const [generation, setGeneration] = useState<number>(0)
	const [speed, setSpeed] = useState<number>(SPEEDS.fast)
	const [maxGeneration, setMaxGeneration] = useState<number>(0)

	function initializeGrid(): GridType {
		return Array(GRID_SIZE)
			.fill(0)
			.map(() => Array(GRID_SIZE).fill(0))
	}

	const toggleCell = useCallback((row: number, col: number) => {
		setGrid((prevGrid) => {
			const newGrid = prevGrid.map((rowArr) => [...rowArr])
			newGrid[row][col] = prevGrid[row][col] ? 0 : 1
			return newGrid
		})
	}, [])

	function countNeighbors(grid: GridType, row: number, col: number): number {
		let count = 0
		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
				if (i === 0 && j === 0) continue
				const newRow = row + i
				const newCol = col + j
				if (
					newRow >= 0 &&
					newRow < GRID_SIZE &&
					newCol >= 0 &&
					newCol < GRID_SIZE
				) {
					count += grid[newRow][newCol]
				}
			}
		}
		return count
	}

	const computeNextGeneration = useCallback((inputGrid: GridType): GridType => {
		const newGrid = initializeGrid()

		for (let i = 0; i < GRID_SIZE; i++) {
			for (let j = 0; j < GRID_SIZE; j++) {
				const neighbors = countNeighbors(inputGrid, i, j)
				if (inputGrid[i][j] === 1) {
					newGrid[i][j] = neighbors === 2 || neighbors === 3 ? 1 : 0
				} else {
					newGrid[i][j] = neighbors === 3 ? 1 : 0
				}
			}
		}
		return newGrid
	}, [])

	const clearGrid = useCallback(() => {
		setGrid(initializeGrid())
		setGeneration(0)
		setIsRunning(false)
	}, [])

	const randomizeGrid = useCallback(() => {
		setGrid(
			Array(GRID_SIZE)
				.fill(0)
				.map(() =>
					Array(GRID_SIZE)
						.fill(0)
						.map(() => (Math.random() > 0.7 ? 1 : 0))
				)
		)
		setGeneration(0)
	}, [])

	useEffect(() => {
		if (!isRunning || speed === SPEEDS.instant || maxGeneration > 0) return

		const timerId = setInterval(() => {
			setGrid((prevGrid) => computeNextGeneration(prevGrid))
			setGeneration((prev) => prev + 1)
		}, speed)

		return () => clearInterval(timerId)
	}, [isRunning, computeNextGeneration, speed, maxGeneration])

	const handleStart = () => {
		if (speed === SPEEDS.instant && maxGeneration > 0) {
			let current = grid
			for (let i = 0; i < maxGeneration; i++) {
				current = computeNextGeneration(current)
			}
			setGrid(current)
			setGeneration((prev) => prev + maxGeneration)
		} else {
			setIsRunning(true)
		}
	}

	const population = grid.flat().reduce((sum, cell) => sum + cell, 0)

	return (
		<Box
			sx={{
				width: 1,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
			}}
		>
			{/* Top stats */}
			<Box sx={{ display: 'flex', gap: 4, alignItems: 'center', mb: 1 }}>
				<Typography variant="h6">Generation: {generation}</Typography>
				<Typography variant="h6">Population: {population}</Typography>
			</Box>

			{/* Grid */}
			<Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
						gap: '3px',
					}}
				>
					{grid.map((row, rowIdx) =>
						row.map((cell, colIdx) => (
							<Box
								key={`${rowIdx}-${colIdx}`}
								onClick={() => toggleCell(rowIdx, colIdx)}
								sx={{
									width: CELL_SIZE,
									height: CELL_SIZE,
									bgcolor: cell
										? 'info.main'
										: 'background.paper',
									border: '1px solid #ddd',
									'&:hover': {
										bgcolor: cell
											? 'primary.dark'
											: 'action.hover',
									},
									cursor: 'pointer',
									borderRadius: 1,
								}}
							/>
						))
					)}
				</Box>
			</Box>


			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					gap: 2,
					alignItems: 'center',
					flexWrap: 'wrap',
				}}
			>
        				<TextField
                sx = {{width: 100}}
					type="number"
					label="Max Generation"
					variant="outlined"
					size="small"
					value={maxGeneration}
					onChange={(e) => setMaxGeneration(Number(e.target.value))}
				/>
        				<Box sx={{ width: 150, mx : 3 }}>
					<Typography variant='caption'>Speed</Typography>
					<Slider
						value={speed}
						onChange={(e, val) => setSpeed(val as number)}
						min={SPEEDS.instant}
						max={SPEEDS.slow}
						step={null}
						marks={[
							{ value: SPEEDS.instant, label: 'Instant' },
							{ value: SPEEDS.fast, label: 'Fast' },
							{ value: SPEEDS.slow, label: 'Slow' },
						]}
					/>
				</Box>


				<Button
					variant='contained'
					color='primary'
					startIcon={isRunning ? <Pause /> : <PlayArrow />}
					onClick={() => {
						if (isRunning) setIsRunning(false)
						else handleStart()
					}}
				>
					{isRunning ? 'Pause' : 'Start'}
				</Button>

				<Button
					variant='outlined'
					startIcon={<SkipNext />}
					onClick={() => {
						setGrid((prev) => computeNextGeneration(prev))
						setGeneration((prev) => prev + 1)
					}}
					disabled={isRunning}
				>
					Next
				</Button>

				<Button
					variant='outlined'
					startIcon={<Clear />}
					onClick={clearGrid}
					disabled={isRunning}
				>
					Clear
				</Button>

				<Button
					variant='outlined'
					onClick={randomizeGrid}
					disabled={isRunning}
				>
					Randomize
				</Button>




			</Box>
		</Box>
	)
}

export default GameOfLife
