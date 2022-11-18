import {useEffect, useState} from 'react';
import { Line } from 'react-chartjs-2';
import {Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler} from 'chart.js';
ChartJS.register(
  Title, Tooltip, LineElement, Legend,
  CategoryScale, LinearScale, PointElement, Filler
)

function Graph({history}) {
  const [cases,setCases]= useState([]);
  const [deaths,setDeaths]= useState([]);
  const [tests,setTests]= useState([]);
  const [time,setTime]= useState([]);

  useEffect(()=>{
    //get Cases Array
    async function getCasesArr(arr){
    const casesArr=[]
     await arr.forEach((item)=>{
    casesArr.unshift(item.cases.total)
    })
    
    await setCases(casesArr)
    // console.log(cases)
    return casesArr;
        }
        getCasesArr(history)
    
    
            //get Deaths Array
  
    async function getDeathsArr(arr){
        const casesArr=[]
         await arr.forEach((item)=>{
        casesArr.unshift(item.deaths.total)
        })
        
        await setDeaths(casesArr)
        // console.log(deaths)
        return casesArr;
            }
        getDeathsArr(history)
    
    
            //get Tests Array
 
    async function getTestsArr(arr){
        const casesArr=[]
         await arr.forEach((item)=>{
        casesArr.unshift(item.tests.total)
        })
        
        await setTests(casesArr)
        // console.log(tests)
        return casesArr;
            }
        getTestsArr(history)
    
    
        console.log(tests,cases,deaths)
    
    //Get Labels Array(Time)
 
    async function getTime(arr){
        const casesArr=[]
         await arr.forEach((item)=>{
            // const date =new Date(item.time).slice(11,14)
            
        casesArr.unshift((item.time).slice(11,13))
        })
        
        await setTime(casesArr)
        console.log(time)
        return casesArr;
            }
            getTime(history)
  },[])

    // getTime(history)

    // console.log(history)

const casesData = {
    labels: time,
    datasets:[
      {
        label:"total cases",
        data:cases,
        // backgroundColor:'yellow',
        borderColor:'green',
        tension:0.4,
        fill:true,
        pointStyle:'rect',
        pointBorderColor:'blue',
        pointBackgroundColor:'#fff',
        showLine:true,
      },
   
    ]
  }
  const testsData = {
    labels: time,
    datasets:[
           {
        label:"total tests",
        data:tests,
        // backgroundColor:'yellow',
        borderColor:'blue',
        tension:0.4,
        fill:true,
        pointStyle:'rect',
        pointBorderColor:'blue',
        pointBackgroundColor:'#fff',
        showLine:true
      }]}
      const deathsData = {
        labels: time,
        datasets:[
          {
        label:"total deaths",
        data: deaths,
        // backgroundColor:'yellow',
        borderColor:'red',
        tension:0.4,
        fill:true,
        pointStyle:'rect',
        pointBorderColor:'blue',
        pointBackgroundColor:'#fff',
        showLine:true
          }]}
  console.log(deaths)
return (
    <div className="App" style={{width:'800px', height:'800px'}}>
      <Line data={casesData}>Hello</Line>
      <Line data={testsData}>Hello</Line>
      <Line data={deathsData}>Hello</Line>
    </div>
  );
}

export default Graph;