'use Client'

import React, { useEffect, useRef, useState } from 'react';

import { useTheme } from '@mui/material';

import c from './D3Wrapper.module.css';


interface Props {
  uniq: any;
  chart: {
    plot: (p:any, data: any, option: any) => any;
    update: (ref: any, data: any, option: any) => void;
  };
  data: any;
  option: any;
}

const D3Wrapper: React.FC<Props> = ({ uniq, chart, data, option }) => {
  const chartArea = useRef<HTMLDivElement>(null);
  const propRef = useRef<any>({});
  const d3PhaseRef = useRef(0);
  const theme = useTheme();

  const [isResized, setIsResized] = useState(0)
  const handleResize = () => setIsResized(prev => prev + 1)
  
  useEffect(() => {

    const p = {
      uniq,
      root: chartArea.current,
      theme
    };

    let timeout:any = false;

    window.addEventListener("resize", () =>{
      clearTimeout(timeout)
      timeout = setTimeout(handleResize, 200)
    } )

    if(d3PhaseRef.current === 0){
      propRef.current =  chart.plot(p, data, option);
      d3PhaseRef.current = 1
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
 

  useEffect(() => {
    
    if (d3PhaseRef.current > 0) {
      propRef.current.transitionTime = 1000
      chart.update(propRef.current, data, option);
      d3PhaseRef.current = 2
    } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chart.update, data, option]);


  useEffect(() => {
    
    if (d3PhaseRef.current === 2) {
      propRef.current.transitionTime = 0
      chart.update(propRef.current, data, option);
    } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isResized]);

  return (
    <div className={c['d3-anchor']}>
      <div className={c['d3-chart']} ref={chartArea} />
    </div>
  );
};

export default D3Wrapper;
