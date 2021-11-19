import React, { useState } from 'react';

import Pin from '../../assets/img/spin.png'

const NoteBox = (props) => {

  const { item, index, del, change, color } = props;
  const [oldX, setOldX] = useState(0);
  const [oldY, setOldY] = useState(0);

  const getMousePoint = (e) => {
    return { x: oldX - e.clientX, y: oldY - e.clientY };
  }

  const handleDragEnd = (e) => {

    const actualMousePoint = getMousePoint(e)

    e.target.style.left = `${e.target.offsetLeft - actualMousePoint.x}px`;
    e.target.style.top = `${e.target.offsetTop - actualMousePoint.y}px`;
  }

  const handleDragStart = (e) => {
    setOldX(e.clientX);
    setOldY(e.clientY);
  } 

  const handleDelete = () => {
    del(item);
  }

  const handleColorChange = (color, e) => {
    change(index, color);
  }

  return (
    <div key={index}>
      <div
        className={`noteBox ${item.type}`}
        style={{ display: `${!item.isView ? 'none' : 'block'}`, transform: `rotate(${item.rotationDeg}deg)` }}
        draggable="true"
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
      >
        <div className="optionArea">
          {color.map((item, i) =>
            <div key={i.toString()} onClick={handleColorChange.bind(this, color[i])}>{item}</div>)
          }
          <div onClick={handleDelete}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <img src={Pin} className="pin" alt="#"/>
        <textarea
          className="noteText" defaultValue={item.detail} />
      </div>
    </div>
  );
}

export default NoteBox;
