import { Box, FormControl, MenuItem, Select, SelectChangeEvent, Typography, useTheme } from '@mui/material';

type Props = {
	name: string;
	idx : number;
	setState: (i:number) => void;
  options: any[];
}

const DropDown = ({ name, idx, setState,  options }: Props) => {

	const theme = useTheme();

  const MenuItems = options.map(d => <MenuItem key = {d.idx} value = {d.idx}>{d.label}</MenuItem>)

	const onChangeHandler =(e : SelectChangeEvent<string>) =>{
		setState(parseInt(e.target.value, 0))
	}

	return (
		<FormControl sx = {{width: ' 28%', border:'1px solid', borderColor:theme.palette.divider, borderRadius: 2, position:'relative'}}>
			<Box sx = {{position:'absolute', left: 5, top: -25}}>
				<Typography>{name}</Typography>
			</Box>
			<Select
				value={options[idx].idx}
				label= {options[idx].label}
				onChange={onChangeHandler}
				inputProps={{
					sx: {
							textAlign: 'center', // Center the text
					},
			}}
				sx={{
					opacity: options[idx].idx === 0? 0.3: 1,
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none', // Inherit from parent to remove gap
          },}}
			>
        {MenuItems}
			</Select>
		</FormControl>
	)
}

export default DropDown;
