import React, { useRef, useEffect, useCallback } from "react";
import AImage from "../assets/a.jpg";
import { letters } from "./mock/mock";
const Canvas = React.forwardRef((props, canvasRef) => {
  const draw = (canvas, ctx, letter, bigWidth, index) => {
    const offsettop = (props.height * props.textoffsettop) / 100;
    const newimage = new Image();
    newimage.onload = function () {
      let width = props.width;
      ctx.drawImage(
        newimage,
        width / 2 - bigWidth / 2 + letter.width * index,
        offsettop,
        50,
        38
      );
    };
    newimage.src = letter.source;
  };

  useEffect(() => {
    console.log("stop working");
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    //Our first draw
    context.fillStyle = "#00000000";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  }, []);

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    console.log(props.width);
    const offsettop = (props.height * props.textoffsettop) / 100;
    console.log(props.height, props.textoffsettop, offsettop);
    // Run! Like go get some data from an API.

    const newimage = new Image();
    newimage.src = AImage;
    newimage.onload = () => {
      /* context.drawImage(newimage, 20, 20, canvasRef.current.width, canvasRef.current.height); */
      /* context.drawImage(newimage, props.width / 2 - 40, offsettop, 50, 38); */

      let bigWidth = letters.reduce((a, b) => a + (b["width"] || 0), 0);
/* 
      letters.map((letter, index) => {
        draw(canvasRef.current, context, letter, bigWidth, index);
      });
 */ 
      const x = props.width / 2;

      context.clearRect(0, 0, props.width, props.height);

      context.fillStyle = "#003300";
      context.font = '40px sans-serif';
      

      let textString = props.text
      let textWidth = context.measureText(textString).width
      context.fillText(textString , (props.width/2) - (textWidth / 2), offsettop);
    };
  }, [props.text, props.width]);

  return <canvas ref={canvasRef} width={props.width} height={props.height} />;
});

export default Canvas;
