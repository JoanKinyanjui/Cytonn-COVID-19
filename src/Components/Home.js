import React,{useEffect, useState} from 'react';
import axios from 'axios';
import Statistics from './Statistics';
import Graph from './Graph';

function Home() {
    const [countries,setCountries] = React.useState([]);
    const [statistics,setStatistics] =React.useState([]);
    const [history,setHistory]= React.useState([]);

useEffect(()=>{
    //getCountries from the api
async function getCountries(){
    const options = {
        method: 'GET',
        url: 'https://covid-193.p.rapidapi.com/countries',
        headers: {
          'X-RapidAPI-Key': '84643cdb07msh65e2fb64ae26e4bp1578aajsnd39f17190429',
          'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
        }
      };
      
     const response = await axios.request(options)
     console.log(response.data.response)
     setCountries(response.data.response)

 }

 getCountries();

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

 getStatistics();

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
  


  return (
    <div>
        <p>covid 19 statistics</p>
        <div>
        <form>
<input 
          type='text'
          placeholder='search...'
          onChange={onHandleChange}
          value={searchValue}
          
          />
</form>
        </div>
        <Statistics  data={data}/>
        <Graph  history={history}/>
    </div>
  )
}

export default Home;