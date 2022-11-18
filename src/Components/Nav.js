import { AppBar } from '@mui/material'
import React from 'react';
import '../global.css';

function Nav() {
  return (
    <div className='pb-12 text-white py-4'>
        
         <AppBar style={{backgroundColor:"black",color:"white"}}>
         <p className='grid justify-center text-bold text-xl md:text-3xl py-4 '>CORONA VIRUS STATISTICS</p>
         </AppBar>
    </div>
  )
}

export default Nav