import React,{useEffect, useState} from 'react';
import axios from 'axios';
import Statistics from './Statistics';
import Graph from './Graph';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Container, Typography } from '@mui/material';
import '../global.css'
import Nav from './Nav';

function Home({data,searchValue,onHandleChange}) {


  return (
    < >
    <Container maxWidth="xxl">
       
<div className='w-screen grid justify-items-center md:justify-items-end pt-8 md:pt-16 h-max pb-4 md:pb-8'>
<form className=' md:w-96 lg:w-84 flex'>
  <label><SearchIcon /></label>
<input 
className='px-3'
style={{backgroundColor:"whiteSmoke",color:"black", borderRadius:"3px"}}
          type='text'
          placeholder='country..'
          onChange={onHandleChange}
          value={searchValue}
          
          />
</form>
</div>
        <Statistics  data={data}/>
        </Container>
    </>
  )
}

export default Home;