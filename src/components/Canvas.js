import React from 'react';
import { Button } from "@mui/material";
import "./Home.css";

const Canvas = ({ elements, onElementClick, onElementDrag, selectedElement }) => {
  return (
    <div className="canvas-area noselect">
      {elements.map((el) => (
        <div
          key={el.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: "absolute",
            left: `${el.x}px`,
            top: `${el.y}px`,
            cursor: "move",
            width: '30%', 
            height: '3%', 
            padding: '2px',
            border: selectedElement && selectedElement.id === el.id ? "2px solid red" : "none",
          }}
          onClick={(e) => onElementClick(el, e)}
          onMouseMove={(e) => {
            if (e.buttons === 1) {
              onElementDrag(el, e.movementX, e.movementY);
            }
          }}
        >
          {el.type === "Label" && (
            <span
              style={{
                fontSize: `${el.fontSize}px`,
                fontWeight: el.fontWeight,
              }}
            >
              {el.title}
            </span>
          )}

          {el.type === "Input" && <input type="text" />}
          {el.type === "Button" && (
            <Button variant="contained">Button</Button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Canvas;
