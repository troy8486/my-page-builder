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
  // elements -> store elements on the Canvas, either localStorage or Empty
  const [elements, setElements] = useState(
    loadFromLocalStorage("myElements", [])
  );

  //selectedElement -> stores the currently selected element on the canvas
  const [selectedElement, setSelectedElement] = useState(null);

  //currentElement -> stores the currently configured element
  const [currentElement, setCurrentElement] = useState(null);

  useEffect(() => {

    // Whenver element changes, save it in local storage
    saveToLocalStorage("myElements", elements);
  }, [elements]);


  // handles the drop event of elements
  const handleDrop = (event) => {
    console.log(event.detail);
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

    // Adding an custom event listener
    // handledrop is called when "elementDrop event occurs"
    document.addEventListener("elementDrop", handleDrop);

    // removing "elementDrop" from document object 
    return () => document.removeEventListener("elementDrop", handleDrop);
  }, [elements]);

  // handles drag events
  const handleDrag = (el, dx, dy) => {
    // Assuming fixed dimensions for elements, replace these with actual or dynamically calculated values
    const elementWidth = 100; // Replace with actual width of the element
    const elementHeight = 50; // Replace with actual height of the element
    const sidebarWidth = 240; // Sidebar width

    const newX = el.x + dx;
    const newY = el.y + dy;
    const canvas = document.querySelector(".canvas-area");
    const canvasRect = canvas.getBoundingClientRect();

    // Adjust the boundary checks to account for the sidebar
    if (
      newX >= 0 &&
      newX + elementWidth <= canvasRect.width - 2*sidebarWidth &&
      newY >= 0 &&
      newY + elementHeight <= canvasRect.height
    ) {
      setElements((prevElements) =>
        prevElements.map((item) =>
          item.id === el.id ? { ...item, x: newX, y: newY } : item
        )
      );
    }
};


  // handle Click -> el (label, button etc)
  // e -> event object
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
        // filteration of elements 
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
