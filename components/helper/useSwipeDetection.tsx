import React, { useState, useEffect } from 'react'

const distance_initX = (startX: number | null, endX: number | null) => {
  if( startX === null || endX === null ) return 0;
  let init = 0
  if ( startX - endX < 0 ) {
    init = ( startX - endX ) * ( -1 )
  } else {
    init = startX - endX
  }
  return init
}
const distance_initY = ( startY: number | null, endY: number | null ) => {
    if( startY === null || endY === null ) return 0;
    let init = 0
    if ( startY - endY < 0 ) {
      init = ( startY - endY ) * ( -1 )
    } else {
      init = startY - endY
    }
    return init
}

export default function useSwipeDetection( 
  left: Function, 
  right: Function, 
  up: Function, 
  down: Function, 
  triggerDistance: number,
  setTriggerdistance: Function
   ) {

  const [ startX, setStartX ]                     = useState<number | null>(  null );
  const [ endX, setEndX ]                         = useState<number | null>( null );
  const [ startY, setStartY ]                     = useState<number | null>( null );
  const [ endY, setEndY ]                         = useState<number | null>( null );

  useEffect(( ) => {
    const handleTouchStart = ( event: TouchEvent ) => {
      setStartX( event.changedTouches[ 0 ].clientX );
      setStartY( event.changedTouches[ 0 ].clientY );
    };

    const handleTouchMove = ( event: TouchEvent ) => {
      setEndX( event.changedTouches[ 0 ].clientX );
      setEndY( event.changedTouches[ 0 ].clientY );
      if ( startX === null || endX === null ) return;
      if ( startY === null || endY === null ) return;

      const distanceX = distance_initX( startX, endX );
      const deltaX = startX > endX ? Math.round( startX-endX ) : Math.round( endX-startX )
      
      const distanceY = distance_initY(startY, endY);
      const deltaY = startY > endY ? Math.round( startY-endY ) : Math.round( endY-startY )

      if ( distanceX > triggerDistance ) {
        return handleTouchEnd( event )
      }
      if ( distanceY > triggerDistance ) {
        return handleTouchEnd( event )
      }
    };

    const handleTouchEnd = ( event: TouchEvent ) => {

      const distanceX = distance_initX( startX, endX );
      // const deltaX = startX > endX ? Math.round( startX-endX ) : Math.round( endX-startX )
      
      const distanceY = distance_initY( startY, endY );
      // const deltaY = startY > endY ? Math.round( startY-endY ) : Math.round( endY-startY )

      if ( startX === null || endX === null ) return;
      if ( startY === null || endY === null ) return;

      if ( distanceX > triggerDistance && startX < endX ) {
        right( );
      }
      if ( distanceX > triggerDistance && startX > endX ) {
        left( );
      }
      if ( distanceY > triggerDistance && startY < endY ) {
        down( );
      }
      if ( distanceY > triggerDistance && startY > endY ) {
        setTriggerdistance(150)
        up( );
      }

      setStartX( null );
      setEndX( null );
      setStartY( null );
      setEndY( null );
      setStartX( null )
      setEndX( null )
      setStartY( null )
      setEndY( null )
    };

    window.addEventListener( 'touchstart', handleTouchStart, false );
    window.addEventListener( 'touchmove', handleTouchMove, false );
    window.addEventListener( 'touchend', handleTouchEnd, false );

    return ( ) => {
      window.removeEventListener( 'touchstart', handleTouchStart, false );
      window.removeEventListener( 'touchmove', handleTouchMove, false );
      window.removeEventListener( 'touchend', handleTouchEnd, false );
    };
  }, [ startX, endX, triggerDistance, left, right, up, down ] );
}