import React, { useEffect, useState } from 'react';

const Canvas = React.forwardRef(({ texts, width, height }, canvasRef) => {
    const [renderCount, setRenderCount] = useState(0);

    useEffect(() => {
        CanvasRenderingContext2D.prototype.fillTextCircle = function(
            text,
            x,
            y,
            diameter,
            startAngle,
            inwardFacing,
            kerning = 0,
            textHeight = 10,
            align = 'center',
            textInside = true
        ) {
            // text:         The text to be displayed in circular fashion
            // diameter:     The diameter of the circle around which the text will
            //               be displayed (inside or outside)
            // startAngle:   In degrees, Where the text will be shown. 0 degrees
            //               if the top of the circle
            // align:        Positions text to left right or center of startAngle
            // textInside:   true to show inside the diameter. False to show outside
            // inwardFacing: true for base of text facing inward. false for outward
            // kearning:     0 for normal gap between letters. positive or
            //               negative number to expand/compact gap in pixels
            //------------------------------------------------------------------------

            this.translate(x, y);

            // declare and intialize canvas, reference, and useful variables

            let clockwise = align === 'right' ? 1 : -1; // draw clockwise for aligned right. Else Anticlockwise
            startAngle *= Math.PI / 180; // convert to radians

            // in cases where we are drawing outside diameter,
            // expand diameter to handle it
            if (!textInside) diameter += textHeight * 2;

            // Reverse letters for align Left inward, align right outward
            // and align center inward.
            if (
                (['left', 'center'].indexOf(align) > -1 && inwardFacing) ||
                (align === 'right' && !inwardFacing)
            )
                text = text
                    .split('')
                    .reverse()
                    .join('');

            // Setup letters and positioning
            this.translate(diameter / 2, diameter / 2); // Move to center
            startAngle += Math.PI * !inwardFacing; // Rotate 180 if outward
            this.textBaseline = 'middle'; // Ensure we draw in exact center
            this.textAlign = 'center'; // Ensure we draw in exact center
            let charWid;
            // rotate 50% of total angle for center alignment
            if (align === 'center') {
                for (let j = 0; j < text.length; j++) {
                    //fix issue with letter 'i' width is so small somehow. just calculate 1's width
                    charWid =
                        this.measureText(text[j]).width <
                        this.measureText('1').width
                            ? this.measureText('1').width
                            : this.measureText(text[j]).width;
                    startAngle +=
                        ((charWid + (j === text.length - 1 ? 0 : kerning)) /
                            (diameter / 2 - textHeight) /
                            2) *
                        -clockwise;
                }
            }

            // Phew... now rotate into final start position
            this.rotate(startAngle);

            // Now for the fun bit: draw, rotate, and repeat
            for (let j = 0; j < text.length; j++) {
                //fix issue with letter 'i' width is so small somehow. just calculate 1's width
                let charWid2 =
                    this.measureText(text[j]).width <
                    this.measureText('1').width
                        ? this.measureText('1').width
                        : this.measureText(text[j]).width; // half letter
                // rotate half letter
                this.rotate(
                    (charWid2 / 2 / (diameter / 2 - textHeight)) * clockwise
                );
                // draw the character at "top" or "bottom"
                // depending on inward or outward facing
                this.fillText(
                    text[j],
                    0,
                    (inwardFacing ? 1 : -1) *
                        (0 - diameter / 2 + textHeight / 2)
                );
                this.rotate(
                    ((charWid2 / 2 + kerning) / (diameter / 2 - textHeight)) *
                        clockwise
                ); // rotate half letter
                this.restore();
            }
        };
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        //Our first draw
        context.fillStyle = '#00000000';
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    }, [canvasRef]);

    useEffect(() => {
        const context = canvasRef.current.getContext('2d');
        context.resetTransform();
        context.clearRect(0, 0, width, height);

        texts.map(async item => {
            //when first page loads there are no fonts. we should wait for them
            await document.fonts.ready;

            //text specs
            context.fillStyle = item.color;
            context.font = `${item.fontWeight || ''} ${(width *
                item.fontSizeRatio) /
                100}px ${item.fontFamily}`;
            /* console.log(
        `${item.fontWeight || ""} ${(width * item.fontSizeRatio) / 100}px ${
          item.fontFamily
        }`
      ); */
            let textString = item.text;

            /* Calculate text position */
            let fromLeft = 0;
            let fromTop = 0;
            //get metrics about text from context
            let metrics = context.measureText(textString);
            //let textWidth = metrics.width;
            let textHeight = context.measureText('M').width

            fromLeft = width / 2 + (width * item.shiftHorizontal) / 100;

            fromTop = height / 2 + (height * item.shiftVertical) / 100;
            context.resetTransform();
            context.translate(fromLeft, fromTop);
            // context.fillRect(0, 0, 3, 3);

            const rotationAngle =
                item.curvature >= 0 ? item.rotateDeg : item.rotateDeg + 180;
            context.rotate((rotationAngle * Math.PI) / 180);
            context.translate(-fromLeft, -fromTop);

            const resDiameter = (width / (Math.abs(item.curvature) || 1)) * 100;
            const resInward = item.curvature >= 0;

            let itemFixed;
            if(Number(item.fixedStart) === 0) itemFixed = 'center'
            if(Number(item.fixedStart) === 1) itemFixed = 'right'
            if(Number(item.fixedStart) === 2) itemFixed = 'left'
            //first render places text in the wrong place
            if (width !== 0 && renderCount !== 0) {
                context.fillTextCircle(
                    textString,
                    fromLeft - resDiameter / 2,
                    fromTop,
                    resDiameter,
                    0,
                    resInward,
                    item.letterSpacing,
                    textHeight,
                    itemFixed
                );
            }
            if (renderCount === 0) {
                setRenderCount(1);
            }
        });
    }, [texts, width, height, canvasRef, renderCount]);

    return (
        <>
            {/* get font family at first time */
            texts.map((t, i) => {
                return (
                    <div
                        style={{
                            fontFamily: t.fontFamily,
                            position: 'absolute',
                            visibility: 'hidden'
                        }}
                        key={`${t}-${Math.abs(i)}`}
                    >
                        .
                    </div>
                );
            })}
            <canvas ref={canvasRef} width={width} height={height} />
        </>
    );
});

export default Canvas;