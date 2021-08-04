import React, { useRef, useEffect, useCallback } from "react";

const Canvas = React.forwardRef(({texts, width, height, ...props}, canvasRef) => {

  useEffect(() => {
    /* console.log("stop working"); */
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    //Our first draw
    context.fillStyle = "#00000000";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  }, []);
  console.log(props)
  const handleCanvasLoad = (e) =>{
  }

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    context.clearRect(0, 0, width, height);
    /* console.log("I worked") */
    console.log(document.fonts)

    
    texts.map(async (item) => {
        /* console.log(props.width); */
        const offsettop = (height * item.distanceFromTopPercentage) / 100;
        /* console.log(props.height, props.textoffsettop, offsettop); */
        
        //when first page loads there are no fonts. we should wait for them
        const isready = await document.fonts.ready
        console.log(document.fonts.status === "loading")
        context.fillStyle = item.color;
        context.font = `${width * item.fontSizeRatio / 100}px ${item.fontFamily}`

        let textString = item.text
        if(item.isUpperCase){textString = textString.toUpperCase() }


        let metrics = context.measureText(textString)
        let textWidth = metrics.width
        let fontHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;

        let fromLeft =  (width/2) - (textWidth / 2)
        let fromTop = offsettop+fontHeight
        /* console.log(fromTop) */
        context.fillText(textString , fromLeft, fromTop);
        /* console.log("drawing the text done") */
    })
  }, [texts, width, height]);

  return (
    <>
    {
    /* get font family at first time */
    texts.map(t => {
    return (
    <div style={{fontFamily:t.fontFamily, position: "absolute", visibility:"hidden"}}>.</div>)

    } )}
    <canvas ref={canvasRef} width={width} height={height} onLoad={handleCanvasLoad} />
    </>
  )
});

export default Canvas;
