import React, { useState, useEffect } from "react";
import ConfigModal from "./ConfigModal";
import Sidebar from "./SideBar";
import Canvas from "./Canvas";
import {
  saveToLocalStorage,
  loadFromLocalStorage,
} from "../utils/localStorage"; 
import "./Home.css";

const HomePage = () => {
  const [elements, setElements] = useState(
    loadFromLocalStorage("myElements", [])
  );
  const [selectedElement, setSelectedElement] = useState(null);
  const [currentElement, setCurrentElement] = useState(null);

  useEffect(() => {
    saveToLocalStorage("myElements", elements);
  }, [elements]);

  const handleDrop = (event) => {
    const { type, x, y } = event.detail;
    const canvas = document.querySelector(".canvas-area");
    const canvasRect = canvas.getBoundingClientRect();

    if (
      x > canvasRect.left &&
      x < canvasRect.right &&
      y > canvasRect.top &&
      y < canvasRect.bottom
    ) {
      const relativeX = x - canvasRect.left;
      const relativeY = y - canvasRect.top;
      const newElement = {
        type,
        id: new Date().getTime(),
        x: relativeX,
        y: relativeY,
        title: type === "Label" ? "Default Label Text" : "",
      };
      setElements((prevElements) => [...prevElements, newElement]);
      setCurrentElement(newElement);
    }
  };

  useEffect(() => {
    document.addEventListener("elementDrop", handleDrop);
    return () => document.removeEventListener("elementDrop", handleDrop);
  }, [elements]);

  const handleDrag = (el, dx, dy) => {
    const newX = el.x + dx;
    const newY = el.y + dy;
    const canvas = document.querySelector(".canvas-area");
    const canvasRect = canvas.getBoundingClientRect();

    if (
      newX >= 0 &&
      newX <= canvasRect.width &&
      newY >= 0 &&
      newY <= canvasRect.height
    ) {
      setElements((prevElements) =>
        prevElements.map((item) =>
          item.id === el.id ? { ...item, x: newX, y: newY } : item
        )
      );
    }
  };

  const handleElementClick = (el, e) => {
    e.stopPropagation();
    setSelectedElement(el);
  };

  const handleSave = (config) => {
    setElements((prevElements) =>
      prevElements.map((el) =>
        el.id === currentElement.id ? { ...el, ...config } : el
      )
    );
    setCurrentElement(null);
    setSelectedElement(null);
  };

  const selectedElementConfig = selectedElement
    ? {
        title: selectedElement.title,
        fontSize: selectedElement.fontSize,
        fontWeight: selectedElement.fontWeight,
      }
    : {};

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter" && selectedElement) {
        setCurrentElement(selectedElement);
      } else if (e.key === "Delete" && selectedElement) {
        setElements(elements.filter((el) => el.id !== selectedElement.id));
        setSelectedElement(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedElement, elements]);

  return (
    <div className="container">
      <Sidebar 
      elements={elements}
      />
      <Canvas
        elements={elements}
        onElementClick={handleElementClick}
        onElementDrag={handleDrag}
        selectedElement={selectedElement}
      />
      {currentElement && (
        <ConfigModal
          type={currentElement.type}
          currentConfig={selectedElementConfig}
          initialX={currentElement.x}
          initialY={currentElement.y}
          onSave={handleSave}
          onClose={() => setCurrentElement(null)}
        />
      )}
    </div>
  );
};

export default HomePage;
