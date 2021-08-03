import React, { useRef, useEffect, useCallback } from "react";

const Canvas = React.forwardRef(({texts, ...props}, canvasRef) => {

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
    context.clearRect(0, 0, props.width, props.height);

    texts.map(item => {
        /* console.log(props.width); */
        const offsettop = (props.height * item.distanceFromTopPercentage) / 100;
        /* console.log(props.height, props.textoffsettop, offsettop); */
        

        context.fillStyle = "#E3B000";
        context.font = `${item.fontSize}px ${item.fontFamily}`
        

        let textString = item.text
        if(item.isUpperCase){textString = textString.toUpperCase() }


        let metrics = context.measureText(textString)
        let textWidth = metrics.width
        let fontHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;

        let fromLeft =  (props.width/2) - (textWidth / 2)
        let fromTop = offsettop
        console.log(fromTop)
        context.fillText(textString , fromLeft, fromTop);
    })
  }, [texts, props.width]);

  return <canvas ref={canvasRef} width={props.width} height={props.height} />;
});

export default Canvas;
