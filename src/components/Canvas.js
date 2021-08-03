import React, { useRef, useEffect } from 'react'

const Canvas = React.forwardRef((props,canvasRef) => {
  
  
  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    console.log('what')
    //Our first draw
    context.fillStyle = '#00000000'
    context.fillRect(0, 0, context.canvas.width, context.canvas.height)
  }, [props.width])
  
  return <canvas ref={canvasRef} {...props}/>
})

export default Canvas