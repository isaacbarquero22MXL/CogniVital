import React, { useEffect, useState } from "react";

const DraggableMoney = ({
  initialPosition,
  money,
  parentContainer,
  id,
  handleDrop,
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isPlaced, setIsPlaced] = useState(false);

  const handleMouseDown = (event) => {
    setIsDragging(true);
    const offsetX = event.clientX - position.x;
    const offsetY = event.clientY - position.y;
    setDragOffset({ x: offsetX, y: offsetY });
  };

  const handleMouseUp = (event) => {
    setIsDragging(false);
    handleOnDrop(event);
  };

  // dragg container effect
  useEffect(() => {
    // handle on mouse move (Drag)
    const handleMouseMove = (event) => {
      event.preventDefault(); // Prevent default scrolling behavior
      if (isDragging) {
        const newX = event.clientX - dragOffset.x;
        const newY = event.clientY - dragOffset.y;
        setPosition({ x: newX, y: newY });
      }
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDragging, dragOffset]);

  // Handle on delete
  const handleOnDrop = (event) => {
    const centralDiv = document.querySelector(".money-item-trash");
    if (centralDiv) {
      const centralRect = centralDiv.getBoundingClientRect();
      const dropX = position.x + dragOffset.x;
      const dropY = position.y + dragOffset.y;

      if (
        dropX >= centralRect.left &&
        dropX <= centralRect.right &&
        dropY >= centralRect.top &&
        dropY <= centralRect.bottom
      ) {
        document.getElementById(id).classList.add("money-deleted");
        setTimeout(() => {
          money.id = id;
          handleDrop(money);
        }, 500);
      } else {
        // ...
      }
    }
  };

  return (
    <div
      id={id}
      className=""
      style={{
        position: "absolute",
        left: position.x + "px",
        top: position.y + "px",
        cursor: isDragging ? "grabbing" : "grab",
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div key={money.name} className="">
        <img
          src={money.img}
          alt={money.name}
          className={`${money.isCoin ? "coin" : "bill"}`}
        />
      </div>
    </div>
  );
};

export default DraggableMoney;
