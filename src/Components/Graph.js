import {useEffect, useState} from 'react';
import { Line } from 'react-chartjs-2';
import {Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler} from 'chart.js';
import * as React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import '../global.css'

ChartJS.register(
  Title, Tooltip, LineElement, Legend,
  CategoryScale, LinearScale, PointElement, Filler
);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}


function Graph({history}) {

  //Tabs implementation
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const [cases,setCases]= useState([]);
  const [deaths,setDeaths]= useState([]);
  const [tests,setTests]= useState([]);
  const [time,setTime]= useState([]);

  useEffect(()=>{
// get Cases Array
async function getCasesArr(arr){
    const casesArr=[]
    await arr.forEach((item)=>{
      console.log(item.cases.total)
    casesArr.unshift(item.cases.total)
    })
setCases(casesArr)
    console.log(cases)
return casesArr;
}
        getCasesArr(history)

 //Get Tests
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

//Get Time
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

//Get Labels Array(Time)
    async function getTime(arr){
        const casesArr=[]
         await arr.forEach((item)=>{          
        casesArr.unshift((item.time).slice(11,13))
        })
        
        await setTime(casesArr)
        console.log(time)
        return casesArr;
            }
            getTime(history)
      },[])
    


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
      }]
    }
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


//combined data
const combined = {
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
    },
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
    }],


  }          
  
          
return (
  <>
      <Box className='w-screen '>
      <AppBar position="static" style={{backgroundColor:"black",paddingTop:"2rem",paddingBottom:"1rem"}} >
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="red"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Total Cases"  {...a11yProps(0)} />
          <Tab label="Total Tests " {...a11yProps(1)}  />
          <Tab label="Total Deaths " {...a11yProps(2)} />
          <Tab label="Combined results" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
        <Line data={casesData}></Line>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
        <Line data={testsData}></Line>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
        <Line data={deathsData}></Line>
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
        <Line data={combined}></Line>
        </TabPanel>
      </SwipeableViews>
    </Box>

  
    </>
  );
}

export default Graph;