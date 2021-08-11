import './App.css';
import {useState, useEffect, createRef} from 'react'
import { texts2 } from './mock'
import CanvasWithText from './components/CanvasWithText/CanvasWithText';
import imagesource from './assets/Best Butty_75.png' 
// import imagesource from './assets/Droompauw_75.png' 
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";


let renderCount = 0;

function Test() {
  const { register, control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      test: [
        {

          text:  "BEST BUTTY" ,
          fontSizeRatio:  22 ,
          fontFamily:  "Rounded Mplus" ,
          color:  "#030202" ,
          fontWeight:  "700" ,
          shiftHorizontal:  0 ,
          fixedStart:  true ,
          shiftVertical:  0 ,
          rotateDeg:  0 ,
          curvature:  0 ,
          maxLength:  8 ,
          letterSpacing:  10 ,
       }
      ]
    }
  });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "test"
    }
  );

  const onSubmit = (data) => console.log("data", data);

  // if you want to control your fields with watch
  // const watchResult = watch("test");
  // console.log(watchResult);

  // The following is useWatch example
  // console.log(useWatch({ name: "test", control }));

  renderCount++;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Field Array </h1>
      <p>The following demo allow you to delete, append, prepend items</p>
      <span className="counter">Render Count: {renderCount}</span>
      <ul>
        {fields.map((item, index) => {
          return (
            <li key={item.id}>
              <input
                defaultValue={`${item.text}`} // make sure to set up defaultValue
                {...register(`test.${index}.text`)}
              />
              <input
                defaultValue={`${item.text}`} // make sure to set up defaultValue
                {...register(`test.${index}.fontFamily`)}
              />
              <input
                defaultValue={`${item.text}`} // make sure to set up defaultValue
                {...register(`test.${index}.color`)}
              />


              <Controller
                render={({ field }) => <input {...field} />}
                name={`test.${index}.lastName`}
                control={control}
                defaultValue={item.lastName} // make sure to set up defaultValue
              />
              <button type="button" onClick={() => remove(index)}>
                Delete
              </button>
            </li>
          );
        })}
      </ul>
      <section>
        <button
          type="button"
          onClick={() => {
            append(
              {

                text:  "BEST BUTTY" ,
                fontSizeRatio:  22 ,
                fontFamily:  "Rounded Mplus" ,
                color:  "#030202" ,
                fontWeight:  "700" ,
                shiftHorizontal:  0 ,
                fixedStart:  true ,
                shiftVertical:  0 ,
                rotateDeg:  0 ,
                curvature:  0 ,
                maxLength:  8 ,
                letterSpacing:  10 ,
             }
            );
          }}
        >
          append
        </button>
        <button
          type="button"
          onClick={() =>
            prepend({
              firstName: "prependFirstName",
              lastName: "prependLastName"
            })
          }
        >
          prepend
        </button>
        
        <button type="button" onClick={() => swap(1, 2)}>
          swap
        </button>

        <button
          type="button"
          onClick={() =>
            reset({
              test: [{ firstName: "Bill", lastName: "Luo" }]
            })
          }
        >
          reset
        </button>
      </section>

      <input type="submit" />
    </form>
  );
}


function App() {
  
  const [textsOnImage, setTextsOnImage] = useState({...texts2[0]})
  const [textsOnImage2, setTextsOnImage2] = useState({...texts2[1]})

  const canvasRef = createRef(null);
  
  const handleChange = (event) => {
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setTextsOnImage({
      ...textsOnImage,
      [event.target.name]: event.target.type === 'number' || event.target.type === 'range' ? parseInt(value) : value
    });
  }
  const handleChange2 = (event) => {
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setTextsOnImage2({
      ...textsOnImage2,
      [event.target.name]: event.target.type === 'number' || event.target.type === 'range' ? parseInt(value) : value
    });
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
      
      </header>
      
        <div className="row">
        
          <div className="column">
            {/* <Test /> */}
            <form>
              <h4>First Text</h4>
              <div>First text: <input type="text" name="text" value={textsOnImage.text} onChange={(e)=>handleChange(e)}/></div>
              <div>Shift from top <input type="range" min="-50" max="50" name="shiftVertical" value={textsOnImage.shiftVertical} onChange={(e)=>handleChange(e)}/></div>
              <div>Shift from left <input type="range" min="-50" max="50" name="shiftHorizontal" value={textsOnImage.shiftHorizontal} onChange={(e)=>handleChange(e)}/></div>
              <div>Font Family<input type="text" value={textsOnImage.fontFamily} name="fontFamily" onChange={(e)=>handleChange(e)}/></div>
              <div>Color<input type="text" value={textsOnImage.color} name="color" onChange={(e)=>handleChange(e)}/></div>
              <div>Font Size %<input type="number" value={textsOnImage.fontSizeRatio} name="fontSizeRatio" onChange={(e)=>handleChange(e)}/></div>
              <div>Font Weight %<input type="number" value={textsOnImage.fontWeight} name="fontWeight" onChange={(e)=>handleChange(e)}/></div>
              <div>fixedStart<input type="checkbox" checked={textsOnImage.fixedStart} name="fixedStart" onChange={(e)=>handleChange(e)}/></div>
              <div>Rotation<input type="range" min="-360" max="360" value={textsOnImage.rotateDeg} name="rotateDeg" onChange={(e)=>handleChange(e)}/></div>
              <div>Curvature<input type="range" min="-360" max="360" value={textsOnImage.curvature} name="curvature" onChange={(e)=>handleChange(e)}/></div>
              <div>Max Length<input type="number" value={textsOnImage.maxLength} name="maxLength" onChange={(e)=>handleChange(e)}/></div>
              <div>Letter Spacing<input type="number" value={textsOnImage.letterSpacing} name="letterSpacing" onChange={(e)=>handleChange(e)}/></div>
            </form>
            <form>
              <h4>Second Text</h4>
              <div>First text: <input type="text" name="text" value={textsOnImage2.text} onChange={(e)=>handleChange2(e)}/></div>
              <div>Shift from top <input type="range" min="-50" max="50" name="shiftVertical" value={textsOnImage2.shiftVertical} onChange={(e)=>handleChange2(e)}/></div>
              <div>Shift from left <input type="range" min="-50" max="50" name="shiftHorizontal" value={textsOnImage2.shiftHorizontal} onChange={(e)=>handleChange2(e)}/></div>
              <div>Font Family<input type="text" value={textsOnImage2.fontFamily} name="fontFamily" onChange={(e)=>handleChange2(e)}/></div>
              <div>Font Size %<input type="number" value={textsOnImage2.fontSizeRatio} name="fontSizeRatio" onChange={(e)=>handleChange2(e)}/></div>
              <div>Font Weight %<input type="number" value={textsOnImage2.fontWeight} name="fontWeight" onChange={(e)=>handleChange2(e)}/></div>
              <div>fixedStart<input type="checkbox" checked={textsOnImage2.fixedStart} name="fixedStart" onChange={(e)=>handleChange2(e)}/></div>
              <div>Rotation<input type="range" min="-360" max="360" value={textsOnImage2.rotateDeg} name="rotateDeg" onChange={(e)=>handleChange2(e)}/></div>
              <div>Curvature<input type="range" min="0" max="200" value={textsOnImage2.curvature} name="curvature" onChange={(e)=>handleChange2(e)}/></div>
              <div>Max Length<input type="number" value={textsOnImage2.maxLength} name="maxLength" onChange={(e)=>handleChange2(e)}/></div>
            </form>
          </div>
          <div className="column">
        <div className="shirt-configurator">
          
          <CanvasWithText texts={[{...textsOnImage}/* ,{...textsOnImage2} */]} imageSource={imagesource}/>

        </div>
        </div>
          <div className="column" style={{maxWidth: '32%'}}>
            <pre>
            <p>{"{"}</p>
            {
            Object.keys(textsOnImage).map(item=>{
              return (<>
                <div key={item}><span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span>
                {item}: {` ${typeof textsOnImage[item] == 'string' ? '"'+textsOnImage[item]+'"' : textsOnImage[item]} `},
                </div>
              </>)
            })
          }
          <p>{"}"}</p>
            </pre>
          </div>
        </div>
        
    </div>
  );
}

export default App;
