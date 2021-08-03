import './App.css';
import {useState, useEffect, createRef} from 'react'
import { texts } from './mock'
import CanvasWithText from './components/CanvasWithText/CanvasWithText';
function App() {
  
  const [textOnImage, setTextOnImage] = useState('')
  const [textsOnImage, setTextsOnImage] = useState([...texts])

  const [imageDimensions,setImageDimensions] = useState({x:0,y:0})
  const canvasRef = createRef(null);
  
  function onImageResize(x,y){ 
    setImageDimensions({x,y})
    console.log(canvasRef.current)
  }
  const handleChange = (text) => {
    let newtexts = [...texts]
    newtexts[0].text=text 
    setTextsOnImage([...newtexts])
  }
  const handleChange2 = (text) => {
    let newtexts = [...texts]
    newtexts[1].text=text
    setTextsOnImage([...newtexts])
  }

  return (
    <div className="App">
      <header className="App-header">
        <form>
          <div><input type="text" onChange={(e)=>handleChange(e.target.value)}/></div>
          <div><input type="text" onChange={(e)=>handleChange2(e.target.value)}/></div>


        </form>
        <div className="shirt-configurator">
          <CanvasWithText texts={textsOnImage} text={textOnImage}/>

        </div>
      </header>
   
    </div>
  );
}

export default App;
