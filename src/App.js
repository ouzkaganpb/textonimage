import './App.css';
import {useState, useEffect, createRef} from 'react'
import { texts,texts2 } from './mock'
import CanvasWithText from './components/CanvasWithText/CanvasWithText';
import imagesource from './assets/Best Butty_Lang.jpg' 

function App() {
  
  const [textOnImage, setTextOnImage] = useState('')
  const [textsOnImage, setTextsOnImage] = useState([...texts2])

  const [imageDimensions,setImageDimensions] = useState({x:0,y:0})
  const canvasRef = createRef(null);
  
  function onImageResize(x,y){ 
    setImageDimensions({x,y})
    console.log(canvasRef.current)
  }
  const handleChange = (text) => {
    let newtexts = [...texts2]
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
        
        {/* <div className="shirt-configurator">
          
          <CanvasWithText texts={textsOnImage} text={textOnImage} imageSource={"https://www.ajax.nl/media/whol2f3d/75608_26861__20072020_1621.png"}/>

        </div> */}
        <div className="shirt-configurator">
          
          <CanvasWithText texts={textsOnImage} text={textOnImage} imageSource={imagesource}/>

        </div>
      </header>
      <form>
          <div><input type="text" onChange={(e)=>handleChange(e.target.value)}/></div>
          {/* <div><input type="text" onChange={(e)=>handleChange2(e.target.value)}/></div> */}


        </form>
    </div>
  );
}

export default App;
