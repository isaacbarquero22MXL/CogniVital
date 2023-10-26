import React, { useEffect, useState } from "react";

const DraggableDiv = ({
  initialPosition,
  figureIcon,
  parentContainer,
  id,
  handleDrop,
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isPlaced, setIsPlaced] = useState(false);

  // handle on drag
  const handleMouseDown = (event) => {
    setIsDragging(true);
    const offsetX = event.clientX - position.x;
    const offsetY = event.clientY - position.y;
    setDragOffset({ x: offsetX, y: offsetY });
  };

  // handle on finish drag
  const handleMouseUp = (event) => {
    setIsDragging(false);
    handleOnDrop(event);
  };

  // handle on while dragging
  useEffect(() => {
    const handleMouseMove = (event) => {
      event.preventDefault(); // Prevent default scrolling behavior
      if (isDragging && !isPlaced) {
        const newX = event.clientX - dragOffset.x;
        const newY = event.clientY - dragOffset.y;
        setPosition({ x: newX, y: newY });
      }
    };

    if (isDragging && !isPlaced) {
      document.addEventListener("mousemove", handleMouseMove);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDragging, dragOffset]);

  // handle on drop
  const handleOnDrop = (event) => {
    // this central div is the container where this draggable div or 
    // "figure" belongs
    const centralDiv = document.querySelector(parentContainer);
    if (centralDiv) {
      const centralRect = centralDiv.getBoundingClientRect();
      const dropX = position.x + dragOffset.x;
      const dropY = position.y + dragOffset.y;

      // if div or "figure" is placed inside its parent
      // disable it
      if (
        dropX >= centralRect.left &&
        dropX <= centralRect.right &&
        dropY >= centralRect.top &&
        dropY <= centralRect.bottom
      ) {
        document.getElementById(id).classList.add("figure-placed");
        setIsPlaced(true);
        handleDrop(id);
      } else {
        // ...
      }
    }
  };

  return (
    <div
      id={id}
      className="draggable"
      style={{
        position: "absolute",
        left: position.x + "px",
        top: position.y + "px",
        cursor: isDragging ? "grabbing" : "grab",
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {figureIcon}
    </div>
  );
};

export default DraggableDiv;
