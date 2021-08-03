import './App.css';
import Canvas from './components/Canvas';
import ImageInstance from './components/ImageInstance'
import {useState, useEffect, createRef} from 'react'
import AImage from './assets/a.jpg'
function App() {
  const [textOnImage, setTextOnImage] = useState('')
  const [imageDimensions,setImageDimensions] = useState({x:0,y:0})
  const canvasRef = createRef(null);
  
  function onImageResize(x,y){ 
    setImageDimensions({x,y})
    console.log(canvasRef.current)
  }

  return (
    <div className="App">
      <header className="App-header">
        <form>
          <input type="text" onChange={(e)=>setTextOnImage(e.target.value)}/>
        </form>
        <div className="shirt-configurator">
          <ImageInstance onImageResize={onImageResize} />
          
          <Canvas text={textOnImage} ref={canvasRef} width={imageDimensions.x} height={imageDimensions.y} textoffsettop={34}/>
        </div>
      </header>
   
    </div>
  );
}

export default App;
