import './App.css';
import {useState, useEffect, createRef} from 'react'
import { texts,texts2,texts3,texts4,texts5, texts6 } from './mock'
import CanvasWithText from './components/CanvasWithText/CanvasWithText';
import imagesource from './assets/Best Butty_Lang.jpg' 
import imagesource2 from './assets/Paw to my Hart_75.png' 
import imagesource3 from './assets/Droompauw_gepers._75.png' 
import imagesource4 from './assets/Butterfly_gepers._75.png' 
import imagesource5 from './assets/Happy Unicorn_75.png' 



function App() {
  
  const [textOnImage, setTextOnImage] = useState('')
  const [textsOnImage, setTextsOnImage] = useState([...texts5])

  const [imageDimensions,setImageDimensions] = useState({x:0,y:0})
  const canvasRef = createRef(null);
  
  const handleChange = (text) => {
    let newtexts = [...texts5]
    newtexts[0].text=text 
    setTextsOnImage([...newtexts])
  }
  const handleChange2 = (text) => {
    let newtexts = [...texts5]
    newtexts[1].text=text
    setTextsOnImage([...newtexts])
  }
  const handleChange3 = (text) => {
    let newtexts = [...texts5]
    newtexts[0].text=text
    setTextsOnImage([...newtexts])
  }

  return (
    <div className="App">
      <header className="App-header">
        
        {/* <div className="shirt-configurator">
          
          <CanvasWithText texts={textsOnImage} text={textOnImage} imageSource={"https://www.ajax.nl/media/whol2f3d/75608_26861__20072020_1621.png"}/>

        </div> */}
        {/* <div className="shirt-configurator">
          
          <CanvasWithText texts={textsOnImage} text={textOnImage} imageSource={imagesource}/>

        </div> */}
        {/* <div className="shirt-configurator">
          
          <CanvasWithText texts={textsOnImage} text={textOnImage} imageSource={imagesource3}/>

        </div> */}
       {/*  <div className="shirt-configurator">
          
          <CanvasWithText texts={textsOnImage} text={textOnImage} imageSource={imagesource2}/>

        </div> */}
        {/* <div className="shirt-configurator">
          
          <CanvasWithText texts={textsOnImage} text={textOnImage} imageSource={imagesource4}/>

        </div> */}
        <div className="shirt-configurator">
          
          <CanvasWithText texts={textsOnImage} text={textOnImage} imageSource={imagesource4}/>

        </div>
      </header>
      <form>
          <div><input type="text" onChange={(e)=>handleChange2(e.target.value)}/></div>
          <div><input type="text" onChange={(e)=>handleChange3(e.target.value)}/></div>
        </form>
    </div>
  );
}

export default App;
