import "./App.css";
import { useState, useEffect, useCallback, createRef } from "react";
import { texts2 } from "./mock";
import CanvasWithText from "./components/CanvasWithText/CanvasWithText";
import imagesource from "./assets/Best Butty_75.png";
// import imagesource from './assets/Droompauw_75.png'
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import { createGlobalStyle } from "styled-components";

let renderCount = 0;
function Test({ getData, avaliableData }) {
  const [state, setState] = useState(0);
  const { register, control, getValues, handleSubmit, reset, watch, setValue } =
    useForm({
      defaultValues: {
        test: [...avaliableData],
      },
    });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "test",
    }
  );
  // const watcher = watch()
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      getData(getValues());
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch]);

  useEffect(() => {
    setValue("test", [...avaliableData]);
    return;
  }, [avaliableData]);

  const onSubmit = (data) => getData(data);

  // if you want to control your fields with watch
  /* const watchResult = watch("test");
  console.log(watchResult); */
  renderCount++;
  // The following is useWatch example
  // console.log(useWatch({ name: "test", control }));
  return (
    <form onSubmit={handleSubmit(onSubmit)} key={state}>
      {renderCount}
      <ul>
        {fields.map((item, index) => {
          return (
            <li key={item.id}>
              <label htmlFor={`test.${index}.text`}>Text</label>
              <input
                defaultValue={`${item.text}`} // make sure to set up defaultValue
                {...register(`test.${index}.text`)}
              />
              <label htmlFor={`test.${index}.fontSizeRatio`}>
                fontSizeRatio
              </label>
              <input
                defaultValue={`${item.text}`} // make sure to set up defaultValue
                {...register(`test.${index}.fontSizeRatio`)}
                type="number"
              />
              <label htmlFor={`test.${index}.fontFamily`}>fontFamily</label>
              <input
                defaultValue={`${item.text}`} // make sure to set up defaultValue
                {...register(`test.${index}.fontFamily`)}
              />
              <label htmlFor={`test.${index}.color`}>color</label>
              <input
                defaultValue={`${item.text}`} // make sure to set up defaultValue
                {...register(`test.${index}.color`)}
              />
              {/* <label htmlFor={`test.${index}.fontWeight`}>fontWeight</label>
              <input
                defaultValue={`${item.text}`} // make sure to set up defaultValue
                {...register(`test.${index}.fontWeight`)}
              /> */}

              <label htmlFor={`test.${index}.fontWeight`}>
                Choose a flavor:
              </label>
              <input
                defaultValue={`${item.text}`}
                {...register(`test.${index}.fontWeight`)}
              />

              <datalist id={`test.${index}.fontWeight`}>
                <option value="400" />
                <option value="500" />
                <option value="600" />
                <option value="700" />
                <option value="800" />
              </datalist>

              <label htmlFor={`test.${index}.shiftHorizontal`}>
                shiftHorizontal
              </label>
              <input
                defaultValue={`${item.text}`} // make sure to set up defaultValue
                {...register(`test.${index}.shiftHorizontal`)}
              />
              <input
                type="range"
                min="-50"
                max="50"
                name="shiftHorizontal"
                defaultValue={`${item.text}`}
                {...register(`test.${index}.shiftHorizontal`)}
              />
              <label htmlFor={`test.${index}.shiftVertical`}>
                shiftVertical
              </label>
              <input
                defaultValue={`${item.text}`} // make sure to set up defaultValue
                {...register(`test.${index}.shiftVertical`)}
              />
              <input
                type="range"
                min="-50"
                max="50"
                name="shiftVertical"
                defaultValue={`${item.text}`}
                {...register(`test.${index}.shiftVertical`)}
              />
              <label htmlFor={`test.${index}.fixedStart`}>
                fixedStart: 0 (center), 1 (left), 2 (right)
              </label>
              <input
                defaultValue={`${item.text}`} // make sure to set up defaultValue
                {...register(`test.${index}.fixedStart`)}
              />
              <label htmlFor={`test.${index}.rotateDeg`}>rotateDeg</label>
              <input
                defaultValue={`${item.text}`} // make sure to set up defaultValue
                {...register(`test.${index}.rotateDeg`)}
              />
              <input
                type="range"
                min="-50"
                max="50"
                name="rotateDeg"
                defaultValue={`${item.text}`}
                {...register(`test.${index}.rotateDeg`)}
              />
              <label htmlFor={`test.${index}.curvature`}>curvature</label>
              <input
                defaultValue={`${item.text}`} // make sure to set up defaultValue
                {...register(`test.${index}.curvature`)}
              />
              <div>
                Curvature
                <input
                  type="range"
                  min="-360"
                  max="360"
                  defaultValue={`${item.text}`}
                  {...register(`test.${index}.curvature`)}
                />
              </div>

              <label htmlFor={`test.${index}.maxLength`}>maxLength</label>
              <input
                defaultValue={`${item.text}`} // make sure to set up defaultValue
                {...register(`test.${index}.maxLength`)}
                type="number"
              />
              <label htmlFor={`test.${index}.letterSpacing`}>
                letterSpacing
              </label>
              <input
                defaultValue={`${item.text}`} // make sure to set up defaultValue
                {...register(`test.${index}.letterSpacing`)}
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
            append({"text":"Text Here","fontSizeRatio":"8","fontFamily":"Rounded Mplus","color":"#fff","fontWeight":"700","shiftHorizontal":"0","fixedStart":"0","shiftVertical":0,"rotateDeg":"0","curvature":0,"maxLength":8,"letterSpacing":"0"});
          }}
        >
          append
        </button>
      </section>

      <input type="submit"/>
    </form>
  );
}

function App() {
  const [activeImage, setActiveImage] = useState(null);
  const [formValues, setFormValues] = useState([]);
  const [avaliableData, setAvaliableData] = useState([
    {"text":"Text Here","fontSizeRatio":"8","fontFamily":"Rounded Mplus","color":"#fff","fontWeight":"700","shiftHorizontal":"0","fixedStart":"0","shiftVertical":0,"rotateDeg":"0","curvature":0,"maxLength":8,"letterSpacing":"0"}
  ]);
  const [dynamicFont, setDynamicFont] = useState({ fontName: "", fontUrl: "" });

  const GlobalStyle = createGlobalStyle`
  body{
    font-family: ${(props) => props.font.fontName};;
  }
  @font-face {
      font-family:${(props) => props.font.fontName};
      src: ${(props) => `url(${props.font.fontURL}) format('woff')`};
      font-weight: 300;
      font-style: normal;
  }
`;
  const uploadImage = (e) => {
    if (e.target.files?.[0] !== undefined) {
      setActiveImage(URL.createObjectURL(e.target.files[0]));
    }
  };
  const uploadFont = (e) => {
    if (e.target.files?.[0] !== undefined) {
      setDynamicFont({
        ...{
          fontName: e.target.files[0].name.split(".")[0],
          fontUrl: URL.createObjectURL(e.target.files[0]),
        },
      });
      console.log(dynamicFont);
      console.log(GlobalStyle);
    }
  };
  const getDataFromForm = (data) => {
    setFormValues(data);
  };

  const handleTextArea = (e) => {
    try {
      setAvaliableData(JSON.parse(e.target.value));
    } catch (error) {
      alert("please add data with correct format");
    }
  };
  return (
    <div className="App">
      <GlobalStyle font={dynamicFont} />
      <header className="App-header"></header>

      <div className="row">
        <div className="column">
          <Test
            getData={(d) => {
              getDataFromForm(d.test);
            }}
            avaliableData={avaliableData}
          />
        </div>
        <div className="column">
          <div className="canvas-container">
            <div className="canvas-entity">
              <div className="shirt-configurator">
                <CanvasWithText
                  texts={[...formValues]}
                  imageSource={activeImage || imagesource}
                />
              </div>
              <div>
                Change image:{" "}
                <input
                  accept="image/*"
                  type="file"
                  id="imgInp"
                  onChange={(e) => uploadImage(e)}
                />
              </div>
              {/* <div>Add new Font: <input accept="*" type='file' id="imgInp" onChange={(e)=>uploadFont(e)}  /></div> */}
            </div>
          </div>
        </div>
        <div className="column" style={{ maxWidth: "32%" }}>
          {/*  <pre>
            <span>{"###["}</span>

            <span>{"{"}</span>
            {
            Object.keys(textsOnImage).map((item,index)=>{
              return (<>
                "{item}":{`${typeof textsOnImage[item] == 'string' ? '"'+textsOnImage[item]+'"' : textsOnImage[item]}${index !== Object.keys(textsOnImage).length - 1 ? ',' : ''}` }
              </>)
            })
          }
          <span>{"}"}</span>

          {textsOnImage2['text'] && <Text2Code texts={textsOnImage2} />}
          <span>{"]"}</span>

            </pre> */}
          <div className="column">
            <div className="canvas-container">
              <div className="canvas-entity">
              <label htmlFor="textValue">Paste existing data here </label>

<textarea
  name="textValue"
  onChange={handleTextArea}
  rows={5}
  cols={5}
/>
{/* <pre>
    {JSON.stringify(formValues)}
  </pre> */}
<label htmlFor="textValue">RESULT: </label>

<textarea
  value={JSON.stringify(formValues)}
  rows={10}
  style={{ height: "500px" }}
  disabled
/>

              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default App;
