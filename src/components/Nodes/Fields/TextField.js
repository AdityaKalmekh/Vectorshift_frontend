import { useRef, useEffect } from 'react';

export const TextField = ({ value, onChange, label, placeholder, onResize, nodeType }) => {
  const textAreaRef = useRef(null);
  const previousSizeRef = useRef({ width: 200, height: 100 });
  
  useEffect(() => {
    if (textAreaRef.current && nodeType === 'text' && onResize) {
      const textarea = textAreaRef.current;
      textarea.style.height = 'auto';
      const newHeight = Math.max(20, textarea.scrollHeight);
      textarea.style.height = `${newHeight}px`;
      
      const lines = (value || '').split('\n');
      let maxWidth = 200;
      
      lines.forEach(line => {
        const estimatedWidth = line.length * 7 + 20;  
        maxWidth = Math.max(maxWidth, estimatedWidth);
      });
      
      const newWidth = Math.min(400, Math.max(200, maxWidth));
      const totalHeight = newHeight + 80;
      
      if (previousSizeRef.current.width !== newWidth || 
          previousSizeRef.current.height !== totalHeight) {
        previousSizeRef.current = { width: newWidth, height: totalHeight };
        onResize({ width: newWidth, height: totalHeight });
      }
    }
  }, [value, nodeType, onResize]);
  
  if (nodeType === 'text') {
    return (
      <div className="mb-2 text-xs">
        <div className="font-medium mb-1 text-gray-600 text-[10px] sm:text-xs">{label}:</div>
        <textarea
          ref={textAreaRef}
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || "Try typing: Hello {{name}}"}
          className="w-full p-1 sm:p-2 border border-gray-300 rounded text-[10px] sm:text-xs outline-none focus:border-indigo-500 bg-white resize-none min-h-[40px] leading-relaxed overflow-hidden"
        />
      </div>
    );
  }
  
  return (
    <div className="mb-2 text-xs">
      <div className="font-medium mb-1 text-gray-600 text-[10px] sm:text-xs">{label}:</div>
      <input 
        type="text" 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-1 sm:p-2 border border-gray-300 rounded text-[10px] sm:text-xs outline-none focus:border-indigo-500 bg-white"
      />
    </div>
  );
};