import React, { createRef, useState } from 'react';
import Canvas from './Components/Canvas.js';
import ImageInstance from './Components/ImageInstance.js';
import * as S from './CanvasWithTextStyled.js';

const CanvasWithText = ({ texts, imageSource }) => {
    const [imageDimensions, setImageDimensions] = useState({ x: 0, y: 0 });
    const canvasRef = createRef(null);
    function onImageResize(x, y) {
        setImageDimensions({ x, y });
    }

    return (
        <>
            <S.ShirtConfigurator>
                <ImageInstance
                    onImageResize={onImageResize}
                    imageSource={imageSource}
                    style={{
                        width: '100%',
                        maxHeight: '360px',
                        objectFit: 'contain'
                    }}
                />

                <Canvas
                    texts={texts}
                    ref={canvasRef}
                    width={imageDimensions.x}
                    height={imageDimensions.y}
                />
            </S.ShirtConfigurator>
        </>
    );
};

export default CanvasWithText