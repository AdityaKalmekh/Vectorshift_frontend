// /nodes/config/nodeConfigs.js

import { Position } from 'reactflow';
import { 
  FileInput, 
  Bot, 
  FileOutput, 
  Type, 
  Calculator, 
  Filter, 
  Shuffle, 
  FileCode, 
  Globe     
} from 'lucide-react';

export const nodeConfigs = {
  customInput: {
    title: 'Input',
    icon: FileInput,
    style: 'bg-blue-50 border-2 border-blue-500 p-3 sm:p-4 rounded-lg shadow-lg',
    dimensions: {
      width: 200,
      minHeight: 140
    },
    titleStyle: 'flex items-center gap-2 font-semibold mb-3 text-blue-900 text-xs sm:text-sm',
    fields: [
      {
        name: 'inputName',
        type: 'text',
        label: 'Name',
        defaultValue: (id) => id.replace('customInput-', 'input_'),
        placeholder: 'Enter input name'
      },
      {
        name: 'inputType',
        type: 'select',
        label: 'Type',
        defaultValue: 'Text',
        options: [
          { value: 'Text', label: 'Text' },
          { value: 'File', label: 'File' }
        ]
      }
    ],
    handles: [
      { type: 'source', position: Position.Right, id: 'value' }
    ]
  },
  llm: {
    title: 'LLM',
    icon: Bot,
    style: 'bg-purple-50 border-2 border-purple-500 p-3 sm:p-4 rounded-lg shadow-lg',
    dimensions: {
      width: 200,
      minHeight: 120
    },
    titleStyle: 'flex items-center gap-2 font-semibold mb-3 text-purple-900 text-xs sm:text-sm',
    fields: [
      { type: 'static', content: 'This is a LLM node' }
    ],
    handles: [
      { type: 'target', position: Position.Left, id: 'system', style: { top: '33.33%' } },
      { type: 'target', position: Position.Left, id: 'prompt', style: { top: '66.66%' } },
      { type: 'source', position: Position.Right, id: 'response' }
    ]
  },
  customOutput: {
    title: 'Output',
    icon: FileOutput,
    style: 'bg-green-50 border-2 border-green-500 p-3 sm:p-4 rounded-lg shadow-lg',
    dimensions: {
      width: 200,
      minHeight: 140
    },
    titleStyle: 'flex items-center gap-2 font-semibold mb-3 text-green-900 text-xs sm:text-sm',
    fields: [
      {
        name: 'outputName',
        type: 'text',
        label: 'Name',
        defaultValue: (id) => id.replace('customOutput-', 'output_'),
        placeholder: 'Enter output name'
      },
      {
        name: 'outputType',
        type: 'select',
        label: 'Type',
        defaultValue: 'Text',
        options: [
          { value: 'Text', label: 'Text' },
          { value: 'File', label: 'Image' }
        ]
      }
    ],
    handles: [
      { type: 'target', position: Position.Left, id: 'value' }
    ]
  },
  text: {
    title: 'Text',
    icon: Type,
    style: 'bg-amber-50 border-2 border-amber-500 p-3 sm:p-4 rounded-lg shadow-lg',
    dimensions: {
      width: 200,
      minHeight: 100,
      dynamicResize: true  // Flag for dynamic resizing
    },
    titleStyle: 'flex items-center gap-2 font-semibold mb-3 text-amber-900 text-xs sm:text-sm',
    fields: [
      {
        name: 'text',
        type: 'text',
        label: 'Text',
        defaultValue: '{{input}}',
        placeholder: 'Enter text'
      }
    ],
    handles: [
      { type: 'source', position: Position.Right, id: 'output' }
    ]
  },
  mathOperation: {
    title: 'Math Operation',
    icon: Calculator,
    style: 'bg-sky-50 border-2 border-sky-500 p-3 sm:p-4 rounded-lg shadow-lg',
    dimensions: {
      width: 200,
      minHeight: 130
    },
    titleStyle: 'flex items-center gap-2 font-semibold mb-3 text-sky-900 text-xs sm:text-sm',
    fields: [
      {
        name: 'operation',
        type: 'select',
        label: 'Operation',
        defaultValue: 'add',
        options: [
          { value: 'add', label: 'Add (+)' },
          { value: 'subtract', label: 'Subtract (-)' },
          { value: 'multiply', label: 'Multiply (×)' },
          { value: 'divide', label: 'Divide (÷)' }
        ]
      }
    ],
    handles: [
      { type: 'target', position: Position.Left, id: 'a', style: { top: '30%' } },
      { type: 'target', position: Position.Left, id: 'b', style: { top: '70%' } },
      { type: 'source', position: Position.Right, id: 'result' }
    ]
  },
  filterCondition: {
    title: 'Filter',
    icon: Filter,
    style: 'bg-red-50 border-2 border-red-500 p-3 sm:p-4 rounded-lg shadow-lg',
    dimensions: {
      width: 200,
      minHeight: 140
    },
    titleStyle: 'flex items-center gap-2 font-semibold mb-3 text-red-900 text-xs sm:text-sm',
    fields: [
      {
        name: 'condition',
        type: 'select',
        label: 'Condition',
        defaultValue: 'equals',
        options: [
          { value: 'equals', label: 'Equals (==)' },
          { value: 'greater', label: 'Greater (>)' },
          { value: 'less', label: 'Less (<)' }
        ]
      },
      {
        name: 'value',
        type: 'text',
        label: 'Value',
        defaultValue: '',
        placeholder: 'Compare value'
      }
    ],
    handles: [
      { type: 'target', position: Position.Left, id: 'input' },
      { type: 'source', position: Position.Right, id: 'true', style: { top: '30%' } },
      { type: 'source', position: Position.Right, id: 'false', style: { top: '70%' } }
    ]
  },
  dataTransform: {
    title: 'Transform',
    icon: Shuffle,
    style: 'bg-violet-50 border-2 border-violet-500 p-3 sm:p-4 rounded-lg shadow-lg',
    dimensions: {
      width: 200,
      minHeight: 130
    },
    titleStyle: 'flex items-center gap-2 font-semibold mb-3 text-violet-900 text-xs sm:text-sm',
    fields: [
      {
        name: 'transformType',
        type: 'select',
        label: 'Type',
        defaultValue: 'uppercase',
        options: [
          { value: 'uppercase', label: 'To Uppercase' },
          { value: 'lowercase', label: 'To Lowercase' },
          { value: 'trim', label: 'Trim Spaces' }
        ]
      }
    ],
    handles: [
      { type: 'target', position: Position.Left, id: 'data' },
      { type: 'source', position: Position.Right, id: 'transformed' }
    ]
  },
  fileProcessor: {
    title: 'File Process',
    icon: FileCode,
    style: 'bg-emerald-50 border-2 border-emerald-500 p-3 sm:p-4 rounded-lg shadow-lg',
    dimensions: {
      width: 200,
      minHeight: 125
    },
    titleStyle: 'flex items-center gap-2 font-semibold mb-3 text-emerald-900 text-xs sm:text-sm',
    fields: [
      {
        name: 'fileType',
        type: 'select',
        label: 'File Type',
        defaultValue: 'csv',
        options: [
          { value: 'csv', label: 'CSV' },
          { value: 'json', label: 'JSON' },
          { value: 'txt', label: 'Text' }
        ]
      }
    ],
    handles: [
      { type: 'target', position: Position.Left, id: 'file' },
      { type: 'source', position: Position.Right, id: 'processed' }
    ]
  },
  apiRequest: {
    title: 'API Request',
    icon: Globe,
    style: 'bg-rose-50 border-2 border-rose-500 p-3 sm:p-4 rounded-lg shadow-lg',
    dimensions: {
      width: 200,
      minHeight: 150
    },
    titleStyle: 'flex items-center gap-2 font-semibold mb-3 text-rose-900 text-xs sm:text-sm',
    fields: [
      {
        name: 'method',
        type: 'select',
        label: 'Method',
        defaultValue: 'GET',
        options: [
          { value: 'GET', label: 'GET' },
          { value: 'POST', label: 'POST' }
        ]
      },
      {
        name: 'endpoint',
        type: 'text',
        label: 'URL',
        defaultValue: '',
        placeholder: 'https://api.example.com'
      }
    ],
    handles: [
      { type: 'target', position: Position.Left, id: 'body' },
      { type: 'source', position: Position.Right, id: 'response' }
    ]
  }
};