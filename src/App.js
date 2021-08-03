import './App.css';
import Canvas from './components/Canvas';
import ImageInstance from './components/ImageInstance'
import {useState, useEffect, createRef} from 'react'
import AImage from './assets/a.jpg'
function App() {
  const [imageDimensions,setImageDimensions] = useState({x:0,y:0})
  const canvasRef = createRef();
  
  function onImageResize(x,y){
    setImageDimensions({x,y})
    console.log(canvasRef.current)
  }
  useEffect(() => {
    console.log("image add runned")
    const context = canvasRef.current.getContext('2d');
    // Run! Like go get some data from an API.
    const newimage = new Image();
    newimage.src = AImage;
    newimage.onload = () => {
    context.drawImage(newimage, 0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <form>
          <input type="text" onChange={(e)=>console.log(e)}/>
        </form>
        <div className="shirt-configurator">
          <ImageInstance onImageResize={onImageResize} />
          
          <Canvas text="Something" ref={canvasRef} width={imageDimensions.x} height={imageDimensions.y} />
        </div>
      </header>
   
    </div>
  );
}

export default App;
