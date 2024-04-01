import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import filterSearch from "../../utils/filterSearch";
import TextField from '@mui/material/TextField';
import { actionCreators, State } from '../../global/store'
import {useDispatch, useSelector} from 'react-redux'
import { bindActionCreators } from 'redux';

export const Filter = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const { searchingFilter } = bindActionCreators(actionCreators, dispatch)

  const searcher = useSelector((state: State) => state.filter.search)
  const category = useSelector((state: State) => state.filter.category)
  const page = useSelector((state: State) => state.filter.page)
  const sort = useSelector((state: State) => state.filter.sort)

  useEffect(() => {
    filterSearch({ navigate, location, search: searcher ? searcher.toLowerCase() : "all", category, page, sort });
  }, [searcher]);
  
  return (
    <div className="input-group">
          <TextField fullWidth 
          size="small"
          id="outlined-basic" 
          color="primary" 
          label="Buscar..." 
          margin="dense" 
          variant="outlined" 
          value={searcher.toLowerCase()} 
          onChange={(e) => searchingFilter(e.target.value)}
          />
    </div>
  );
};
