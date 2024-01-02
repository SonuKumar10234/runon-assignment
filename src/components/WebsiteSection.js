import React, { useEffect, useState } from 'react';

const WebsiteSection = () => {
  const [content, setContent] = useState('');
  const [websiteSections, setWebsiteSections] = useState([]);

  const handleDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text');

    // Handle dropped content (text or image)
    if (data === 'text') {
      setContent('Editable Text');
    } else if (data === 'image') {
      setContent('Image URL');
    }
  };

  const handleTextChange = (e) => {
    setContent(e.target.innerText);
  };

  const handleImageChange = () => {
    const imageUrl = prompt('Enter Image URL:');
    setContent(`<img src="${imageUrl}" alt="user-added-image" />`);
  };

  const handleSave = () => {
    // Save the section data to local storage
    const updatedSections = [...websiteSections, { content }];
    setWebsiteSections(updatedSections);
    localStorage.setItem('websiteSections', JSON.stringify(updatedSections));
    setContent(''); 
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', ''); 
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    // Load saved sections from local storage on component mount
    const savedSections = JSON.parse(localStorage.getItem('websiteSections')) || [];
    setWebsiteSections(savedSections);
  }, []);

  return (
    <div
      draggable
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragStart={handleDragStart}
      className='website-section'
    >
     
      <div
        contentEditable
        dangerouslySetInnerHTML={{ __html: content }}
        onBlur={handleTextChange}
        style={{border:'1px solid #ddd', borderRadius:'6px', height:'40px', padding:'10px', color:'#fff'}}
      />
      <div style={{display:'flex', justifyContent:'space-between', marginTop:'20px'}}>
      <button onClick={handleImageChange}>Change Image</button>
      <button onClick={handleSave}>Save</button>
      </div>

      <ul className='website-content'>
        {websiteSections.map((section, index) => (
          <li key={index}>{section.content}</li>
        ))}
      </ul>

      
    </div>
  );
};

export default WebsiteSection;



