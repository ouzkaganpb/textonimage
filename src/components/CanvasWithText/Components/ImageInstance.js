import React, { useRef, useEffect } from 'react';

function ImageInstance({ imageSource, onImageResize }) {
    const image = useRef();

    const [dimensions, setDimensions] = React.useState({
        height: window.innerHeight,
        width: window.innerWidth
    });

    //to get image proportions onload
    const handleImageLoad = event => {
        const imageWidth = event.target.width;
        const imageHeight = event.target.clientHeight;
        onImageResize(imageWidth, imageHeight);
    };

    //to get image size if window resize
    useEffect(() => {
        function handleResize() {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth
            });
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }

        onImageResize(image.current.width, image.current.height);

        window.addEventListener('resize', handleResize);

        return _ => {
            window.removeEventListener('resize', handleResize);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dimensions]);

    return (
        <div>
            <img
                src={imageSource}
                ref={image}
                alt="shirt"
                className="shirt-canvas_image"
                onLoad={handleImageLoad}
            />
        </div>
    );
}
//prevents unnecessary rerender
export default React.memo(
    ImageInstance,
    (prevProps, nextProps) => prevProps.imageSource === nextProps.imageSource
);
