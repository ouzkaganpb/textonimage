import React, { useRef } from "react";

export default function ImageInstance({ onImageResize }) {
  const image = useRef();

  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  React.useEffect(() => {
    /* console.log(image.current.height); */
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }
    onImageResize(image.current.width, image.current.height);

    window.addEventListener("resize", handleResize);

    return (_) => {
      window.removeEventListener("resize", handleResize);
    };
  },[dimensions]);

  return (
    <div>
      <img
        src="https://www.ajax.nl/media/whol2f3d/75608_26861__20072020_1621.png"
        ref={image}
        alt="shirt"
        className="shirt-canvas_image"
      />
    </div>
  );
}
