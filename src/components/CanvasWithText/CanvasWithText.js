import React, {useState, useEffect, createRef} from "react";
import Canvas from './Canvas';
import ImageInstance from './ImageInstance'

function CanvasWithText({text,texts }) {
 const [imageDimensions,setImageDimensions] = useState({x:0,y:0})
 const canvasRef = createRef(null);

 function onImageResize(x,y){ 
  setImageDimensions({x,y})
  console.log(canvasRef.current)
}

  return (
    <>
      <ImageInstance
        onImageResize={onImageResize}
        imageSource={
          "https://www.ajax.nl/media/whol2f3d/75608_26861__20072020_1621.png"
        }
      />

      <Canvas
        texts={texts}
        text={text}
        ref={canvasRef}
        width={imageDimensions.x}
        height={imageDimensions.y}
        textoffsettop={34}
      />
    </>
  );
}

export default CanvasWithText;
