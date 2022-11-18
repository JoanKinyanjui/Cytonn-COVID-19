import React,{useEffect, useState} from 'react';
import axios from 'axios';
import Statistics from './Statistics';
import Graph from './Graph';
import GraphData from './GraphData';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
// import SearchIcon from '@mui/icons-material/Search';
import { Typography } from '@mui/material';
import '../global.css'

function Home() {
    const [countries,setCountries] = React.useState([]);
    const [statistics,setStatistics] =React.useState([]);
    const [history,setHistory]= React.useState([]);

useEffect(()=>{

		getStatistics()
  

 //get statistics from the api...
  async function getStatistics(){
    const options = {
        method: 'GET',
        url: 'https://covid-193.p.rapidapi.com/statistics',
        headers: {
          'X-RapidAPI-Key': '84643cdb07msh65e2fb64ae26e4bp1578aajsnd39f17190429',
          'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
        }
      };
      
     const response = await axios.request(options)
     setStatistics(response.data.response)
    await setData(response.data.response)

 }

//  getStatistics();

 //get history from the api...
 async function getHistory(){
    const options = {
        method: 'GET',
        url: 'https://covid-193.p.rapidapi.com/history',
        params: {country: 'usa', day: '2020-06-02'},
        headers: {
          'X-RapidAPI-Key': '84643cdb07msh65e2fb64ae26e4bp1578aajsnd39f17190429',
          'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
        }
      };
      
      
     const response = await axios.request(options)
     await setHistory(response.data.response)
     console.log((response.data.response))
     console.log(history)

 }

 getHistory();
},[])    

// Search Logic 
const [searchValue,setSearchValue] =useState('');
const [data,setData] = useState([]);
const onHandleChange = async(e)=>{
  setSearchValue(e.target.value)
if(searchValue == ''){
  return data
}else{
  const filteredResult = await  statistics.filter(item=> item.country.toLowerCase().includes(e.target.value.toLowerCase()))
  await setData(filteredResult)
}

}
  

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

  return (
    <div >
  <p className=' text-black grid justify-center text-bold text-3xl py-4 '>CORONA VIRUS STATISTICS</p>
    <div>
        </div>
<div className='grid justify-items-end py-4'>
<form >
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
        <GraphData history={history} />
        <Graph  history={history} />
    </div>
  )
}

export default Home;