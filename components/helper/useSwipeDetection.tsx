import React, { useState, useEffect } from 'react'

const distance_init = (startX: number | null, endX: number | null) => {
    if(startX === null || endX === null) return 0;
    let init = 0
    if (startX - endX < 0) {
      init = (startX - endX) * (-1)
    } else {
      init = startX - endX
    }
    return init
}

export default function useSwipeDetection(left: Function, right: Function, animation: Function) {

  const [startX, setStartX] = useState<number | null>(null);
  const [endX, setEndX] = useState<number | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [triggerDistance, setTriggerdistance] = useState<number>(150);
  // const [maxDuration, setMaxDuration] = useState<number>(1000);

  useEffect(() => {
    const handleTouchStart = (event: TouchEvent) => {
      setStartX(event.changedTouches[0].clientX);
      setStartTime(Date.now());
    };

    const handleTouchMove = (event: TouchEvent) => {
      setEndX( event.changedTouches[0].clientX );
      if ( startX === null || endX === null ) return;

      const distance = distance_init(startX, endX);
      const delta = startX > endX ? Math.round( startX-endX ) : Math.round( endX-startX )
    
      // console.log("DELTA", delta)
        
      if (startX > endX+10) {
        animation({
            direction: "right",
            delta: delta
        })
      }
      if (startX < endX-10) {
        animation({
            direction: "left",
            delta: delta
        })
      }
      if (distance > triggerDistance){
        return handleTouchEnd(event)
      }
    };

    const handleTouchEnd = (event: TouchEvent) => {

      const distance = distance_init(startX, endX);
      const delta = startX > endX ? Math.round( startX-endX ) : Math.round( endX-startX )

      if(startX === null || endX === null) return;
      

      

      if (distance > triggerDistance && startX < endX) {
        console.log("Right swipe")
        right();
        animation( { direction: "", delta: 0 } )
      }
      if (distance > triggerDistance && startX > endX) {
        console.log("Left swipe")
        left();
        animation( { direction: "", delta: 0 } )
      }

      
      setStartX(null);
      setEndX(null);
      setStartTime(null);
      setEndTime(null);
    };

    window.addEventListener('touchstart', handleTouchStart, false);
    window.addEventListener('touchmove', handleTouchMove, false);
    window.addEventListener('touchend', handleTouchEnd, false);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart, false);
      window.removeEventListener('touchmove', handleTouchMove, false);
      window.removeEventListener('touchend', handleTouchEnd, false);
    };
  // }, [startX, endX, startTime, endTime, minDistance, maxDuration, left, right]);
  }, [startX, endX, triggerDistance, left, right]);
}
