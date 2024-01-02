import React from 'react';

const Toolbar = () => {
  return (
    <div className='toolbar'>
      <button draggable={true} onDragStart={(e) => e.dataTransfer.setData('text', 'text')}>
        Text
      </button>
      <button draggable={true} onDragStart={(e) => e.dataTransfer.setData('text', 'image')}>
        Image
      </button>
    </div>
  );
};

export default Toolbar;
