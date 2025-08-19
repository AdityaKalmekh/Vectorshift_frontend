// /nodes/base/baseNode.js

import { useState, useMemo, useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { TextField } from '../Fields/TextField';
import { SelectField } from '../Fields/SelectField';
import { StaticField } from '../Fields/StaticField';
import { extractVariables } from '../../../utils/nodeHelpers';

const FieldComponents = {
  text: TextField,
  select: SelectField,
  static: StaticField
};

// Base Node Component
export const BaseNode = ({ id, data, config }) => {
  const [fieldValues, setFieldValues] = useState(() => {
    const initialValues = {};
    config.fields?.forEach(field => {
      initialValues[field.name] = data?.[field.name] || field.defaultValue;
    });
    return initialValues;
  });

  // Initialize with config dimensions or defaults
  const [nodeSize, setNodeSize] = useState({
    width: config.dimensions?.width || 200,
    height: config.dimensions?.minHeight || 120
  });
  
  const variableHandles = useMemo(() => {
    if (data?.nodeType === 'text' && fieldValues.text) {
      return extractVariables(fieldValues.text);
    }
    return [];
  }, [data?.nodeType, fieldValues.text]);

  const handleResize = useCallback((newSize) => {
    // Only allow resize if dynamicResize is enabled in config
    if (config.dimensions?.dynamicResize) {
      setNodeSize(prevSize => {
        if (prevSize.width !== newSize.width || prevSize.height !== newSize.height) {
          return newSize;
        }
        return prevSize;
      });
    }
  }, [config.dimensions?.dynamicResize]);
  
  // Compute actual node dimensions
  const nodeDimensions = useMemo(() => {
    if (config.dimensions?.dynamicResize && data?.nodeType === 'text') {
      // For text nodes with dynamic resize, use current nodeSize
      return {
        width: nodeSize.width,
        minHeight: nodeSize.height
      };
    }
    // For other nodes, use fixed dimensions from config
    return {
      width: config.dimensions?.width || 200,
      minHeight: config.dimensions?.minHeight || 120
    };
  }, [config.dimensions, data?.nodeType, nodeSize]);
  
  const updateField = useCallback((fieldName, value) => {
    setFieldValues(prev => ({
      ...prev,
      [fieldName]: value
    }));
  }, []);

  const Icon = config.icon;

  return (
    <div 
      className={`${config.style} overflow-visible relative flex flex-col`}
      style={{
        width: `${nodeDimensions.width}px`,
        minHeight: `${nodeDimensions.minHeight}px`,
      }}
    >
      {/* Regular handles */}
      {config.handles?.map((handle) => (
        <Handle
          key={`${id}-${handle.id}`}
          type={handle.type}
          position={handle.position}
          id={`${id}-${handle.id}`}
          className={`${handle.type === 'source' ? 'bg-indigo-500' : 'bg-pink-500'} w-3 h-3 border-2 border-white shadow-md z-10`}
          style={handle.style}
        />
      ))}

      {/* Variable handles for text nodes */}
      {data?.nodeType === 'text' && variableHandles.map((variable, index) => (
        <Handle
          key={`${id}-var-${variable}`}
          type="target"
          position={Position.Left}
          id={`${id}-${variable}`}
          className="bg-emerald-500 w-3 h-3 border-2 border-white shadow-md z-10"
          style={{ top: `${45 + (index * 30)}px` }}
        />
      ))}

      {/* Variable labels */}
      {data?.nodeType === 'text' && variableHandles.map((variable, index) => (
        <div
          key={`label-${variable}`}
          className="absolute left-4 sm:left-5 text-[9px] sm:text-[10px] text-emerald-600 bg-white/95 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded border border-emerald-500 font-semibold z-5"
          style={{ top: `${40 + (index * 30)}px` }}
        >
          {variable}
        </div>
      ))}

      <div className={config.titleStyle}>
        {Icon && <Icon size={14} className="sm:w-4 sm:h-4" />}
        <span>{config.title}</span>
      </div>

      <div className="flex-1 flex flex-col gap-0.5">
        {config.fields?.map(field => {
          const FieldComponent = FieldComponents[field.type];
          if (!FieldComponent) return null;
          
          return (
            <FieldComponent
              key={field.name}
              value={fieldValues[field.name]}
              onChange={(value) => updateField(field.name, value)}
              onResize={data?.nodeType === 'text' ? handleResize : undefined}
              nodeType={data?.nodeType}
              {...field}
            />
          );
        })}
      </div>
    </div>
  );
};