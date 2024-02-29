import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect } from "react";
import filterSearch from "./filterSearch";
import { actionCreators, State } from '../../global/store'
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { useNavigate } from 'react-router-dom';

const FilterCategory = () => {
//   const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categoryFilter } = bindActionCreators(actionCreators, dispatch);
  const category = useSelector((state: State) => state.filter.category);

  const categories = ["Perro", "Gato"];
//   const router = {query: '1', path: '/'}

  useEffect(() => {
    filterSearch({ category });
  }, [category]);

  return (
    <div>
      <FormControl fullWidth margin="dense" size="small">
        <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="Categoria"
          onChange={(e) => categoryFilter(e.target.value)}
        >
          <MenuItem value="all">Todos los productos</MenuItem>
          {categories.map((item, index) => (
            <MenuItem value={item} key={index}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default FilterCategory;
