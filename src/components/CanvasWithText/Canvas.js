import React, { useEffect } from "react";

const Canvas = React.forwardRef(({texts, width, height, ...props}, canvasRef) => {

  useEffect(() => {
    /* console.log("stop working"); */
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    //Our first draw
    context.fillStyle = "#00000000";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  }, []);
  
  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    context.clearRect(0, 0, width, height);

    texts.map(async (item) => {
        
        //when first page loads there are no fonts. we should wait for them
        await document.fonts.ready
        
        //text specs
        context.fillStyle = item.color;
        context.font = `${width * item.fontSizeRatio / 100}px ${item.fontFamily}`
        let textString = item.text
        if(item.isUpperCase){ textString = textString.toUpperCase() }
        if(item.isLowerCase){ textString = textString.toLowerCase() }
        
        /* Calculate text position */
        let fromLeft = 0, fromTop = 0, offsettop = 0;
        //get metrics about text from context
        let metrics = context.measureText(textString)
        let textWidth = metrics.width
        let textHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
        //horizontal
        switch (item.horizontalPosition) {
          case 'center':
            fromLeft =  (width/2) - (textWidth / 2)
            break;
          default:
            fromLeft = item.distanceFromLeftPercentage
            break;
        }
        //vertical
        switch (item.vertocalPosition) {
          case 'center':
            fromTop =  (width/2) - (textWidth / 2)
            break;
          default:
            offsettop = (height * item.distanceFromTopPercentage) / 100;
            fromTop = offsettop+textHeight
            break;
        }

        //add text on canvas
        context.fillText(textString , fromLeft, fromTop);
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
