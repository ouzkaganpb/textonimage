import React, { useEffect } from "react";

const Canvas = React.forwardRef(
  ({ texts, width, height, ...props }, canvasRef) => {
    useEffect(() => {
      CanvasRenderingContext2D.prototype.fillTextCircleStretch = function (
        text,
        x,
        y,
        radius,
        startRotation
      ) {
        var numRadsPerLetter = (2 * Math.PI) / text.length;
        this.save();
        this.translate(x, y);
        this.rotate(startRotation);
        for (var i = 0; i < text.length; i++) {
          this.save();
          this.rotate(i * numRadsPerLetter);

          this.fillText(text[i], 0, -radius);
          this.restore();
        }
        this.restore();
      };

      CanvasRenderingContext2D.prototype.fillTextCircle = function (
        text,
        x,
        y,
        diameter,
        startAngle,
        inwardFacing,
        kerning = 0,
        textHeight = 10,
        align = "center",
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

        var clockwise = align == "right" ? 1 : -1; // draw clockwise for aligned right. Else Anticlockwise
        startAngle = startAngle * (Math.PI / 180); // convert to radians

        // in cases where we are drawing outside diameter,
        // expand diameter to handle it
        if (!textInside) diameter += textHeight * 2;

        // Reverse letters for align Left inward, align right outward
        // and align center inward.
        if (
          (["left", "center"].indexOf(align) > -1 && inwardFacing) ||
          (align == "right" && !inwardFacing)
        )
          text = text.split("").reverse().join("");

        // Setup letters and positioning
        this.translate(diameter / 2, diameter / 2); // Move to center
        startAngle += Math.PI * !inwardFacing; // Rotate 180 if outward
        this.textBaseline = "middle"; // Ensure we draw in exact center
        this.textAlign = "center"; // Ensure we draw in exact center

        // rotate 50% of total angle for center alignment
        if (align == "center") {
          for (var j = 0; j < text.length; j++) {
            var charWid = this.measureText(text[j]).width;
            startAngle +=
              ((charWid + (j == text.length - 1 ? 0 : kerning)) /
                (diameter / 2 - textHeight) /
                2) *
              -clockwise;
          }
        }

        // Phew... now rotate into final start position
        this.rotate(startAngle);

        // Now for the fun bit: draw, rotate, and repeat
        for (var j = 0; j < text.length; j++) {
          var charWid = this.measureText(text[j]).width; // half letter
          // rotate half letter
          this.rotate((charWid / 2 / (diameter / 2 - textHeight)) * clockwise);
          // draw the character at "top" or "bottom"
          // depending on inward or outward facing
          this.fillText(
            text[j],
            0,
            (inwardFacing ? 1 : -1) * (0 - diameter / 2 + textHeight / 2)
          );

          this.rotate(
            ((charWid / 2 + kerning) / (diameter / 2 - textHeight)) * clockwise
          ); // rotate half letter
        }
      };
      console.log("stop working");
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      //Our first draw
      context.fillStyle = "#00000000";
      context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    }, []);

    useEffect(() => {
      const context = canvasRef.current.getContext("2d");
      context.clearRect(0, 0, width, height);

      texts.map(async (item, i) => {
        //when first page loads there are no fonts. we should wait for them
        await document.fonts.ready;

        //text specs
        context.fillStyle = item.color;
        context.font = `${item.fontWeight || ""} ${
          (width * item.fontSizeRatio) / 100
        }px ${item.fontFamily}`;
        console.log(
          `${item.fontWeight || ""} ${(width * item.fontSizeRatio) / 100}px ${
            item.fontFamily
          }`
        );
        let textString = item.text;
        if (item.isUpperCase) {
          textString = textString.toUpperCase();
        }
        if (item.isLowerCase) {
          textString = textString.toLowerCase();
        }

        /* Calculate text position */
        let fromLeft = 0,
          fromTop = 0,
          offsettop = 0;
        //get metrics about text from context
        let metrics = context.measureText(textString);
        let textWidth = metrics.width;
        let textHeight =
          metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
        //horizontal position
        switch (item.horizontalPosition) {
          case "center":
            fromLeft = width / 2 - textWidth / 2;
            //Vertical images
            if (item.style === "vertical") {
              fromLeft = height / 2 - textWidth / 2;
            }
            break;
          default:
            fromLeft = (width * item.distanceFromLeftPercentage) / 100;
            //Vertical images
            if (item.style === "vertical") {
              fromLeft = (height * item.distanceFromLeftPercentage) / 100;
            }
            break;
        }
        //vertical position
        switch (item.verticalPosition) {
          case "center":
            fromTop = width / 2 - textWidth / 2;

            break;
          case null:
          case "":
            offsettop = (height * item.distanceFromTopPercentage) / 100;
            fromTop = offsettop;
            //Circle Text
            if (item.style !== "circlestretch") {
              fromTop = offsettop + textHeight;
            }
            //Vertical images
            if (item.style === "vertical") {
              offsettop = (width * item.distanceFromTopPercentage) / 100;
              fromTop = offsettop;
            }
            break;
          default:
            console.log("not do anything");
            break;
        }

        //add text on canvas
        console.log(textString, width, height, fromLeft, fromTop);
        switch (item.style) {
          case "horizontal":
            console.log("its straight");
            context.fillText(textString, fromLeft, fromTop);
            break;
          case "circlestretch":
            context.fillTextCircleStretch(
              textString,
              fromLeft,
              fromTop,
              (width * item.radiusRaito) / 100,
              Math.PI / 2
            );
            break;
          case "circle":
            console.log("its circle");
            context.fillTextCircle(textString, 10, 10, 250, 0, true);
            
            break;
          case "vertical":
            if(width!==0){
              context.save();
              context.translate(0, height);
              context.rotate(-Math.PI / 2);
              context.textBaseline = "bottom";
              context.textAlign = "left";
              console.log("text filled");

              context.fillText(textString, fromLeft, fromTop);
              context.restore();
            }
            break;
          default:
            console.log("hangi style?");
            break;
        }
      });
    }, [texts, width, height, canvasRef]);

    return (
      <>
        {
          /* get font family at first time */
          texts.map((t, i) => {
            return (
              <div
                style={{
                  fontFamily: t.fontFamily,
                  position: "absolute",
                  visibility: "hidden",
                }}
                key={i}
              >
                .
              </div>
            );
          })
        }
        <canvas ref={canvasRef} width={width} height={height} />
      </>
    );
  }
);

export default Canvas;
