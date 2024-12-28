import React from 'react';

const highlightText = (text, highlight) => {
  if (!highlight.trim()) {
    return text;
  }
  const index = text.toLowerCase().indexOf(highlight.toLowerCase());
  if (index === -1) {
    return text;
  }
  const beforeHighlight = text.slice(0, index);
  const highlightedText = text.slice(index, index + highlight.length);
  const afterHighlight = text.slice(index + highlight.length);
  
  return (
    <>
      {beforeHighlight}
      <span className='text-green-800 bg-green-100'>{highlightedText}</span>
      {afterHighlight}
    </>
  );
};

export default highlightText;
