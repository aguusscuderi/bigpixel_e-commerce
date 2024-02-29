// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
// import { useState } from 'react';

// const FilterOrder = () => {
//     const [order, setOrder] = useState('');

//     const handleChange = (event: SelectChangeEvent) => {
//         setOrder(event.target.value as string);
//     };    

//     return (
//     <div>
//         <FormControl fullWidth margin="dense" size="small">
//         <InputLabel id="demo-simple-select-label">Ordenar por</InputLabel>
//         <Select
//             labelId="demo-simple-select-label"
//             id="demo-simple-select"
//             value={order}
//             label="Ordenar por"
//             onChange={handleChange}
//         >
//             <MenuItem value={10}>Los mas vendidos</MenuItem>
//             <MenuItem value={20}>Precio mas bajo</MenuItem>
//             <MenuItem value={30}>Precio mas alto</MenuItem>
//             <MenuItem value={30}>A - Z</MenuItem>
//             <MenuItem value={30}>Z - A</MenuItem>
//             <MenuItem value={30}>Novedades</MenuItem>
//         </Select>
//         </FormControl>
//     </div>
//     )
// }

// export default FilterOrder