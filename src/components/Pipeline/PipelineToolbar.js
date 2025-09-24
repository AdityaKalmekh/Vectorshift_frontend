import { useState } from 'react';
import { DraggableNode } from '../Nodes/draggableNode';
import { 
  FileInput, 
  Bot, 
  FileOutput, 
  Type, 
  Calculator, 
  Filter, 
  Shuffle, 
  FileCode, 
  Globe,
  X, 
  Menu    
} from 'lucide-react';

export const PipelineToolbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="p-3 sm:p-5 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 shadow-sm">
      {/* Mobile menu button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden mb-3 p-2 bg-white rounded-lg shadow-md"
      >
        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <div className={`${mobileMenuOpen ? 'grid' : 'hidden'} md:flex grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 md:flex-wrap`}>
        <DraggableNode type='customInput' label='Input' icon={FileInput} />
        <DraggableNode type='llm' label='LLM' icon={Bot} />
        <DraggableNode type='customOutput' label='Output' icon={FileOutput} />
        <DraggableNode type='text' label='Text' icon={Type} />
        <DraggableNode type='mathOperation' label='Math' icon={Calculator} />
        <DraggableNode type='filterCondition' label='Filter' icon={Filter} />
        <DraggableNode type='dataTransform' label='Transform' icon={Shuffle} />
        <DraggableNode type='fileProcessor' label='File Process' icon={FileCode} />
        <DraggableNode type='apiRequest' label='API Request' icon={Globe} />
      </div>
    </div>
  );
};