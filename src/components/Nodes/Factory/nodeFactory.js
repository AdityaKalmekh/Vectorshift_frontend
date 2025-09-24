import { BaseNode } from '../Base/baseNode';
import { nodeConfigs } from '../Config/nodeConfigs';

const createNodeComponent = (configKey) => {
  return ({ id, data }) => {
    const config = nodeConfigs[configKey];
    const processedConfig = {
      ...config,
      fields: config.fields?.map(field => ({
        ...field,
        defaultValue: typeof field.defaultValue === 'function'
          ? field.defaultValue(id)
          : field.defaultValue
      }))
    };

    return <BaseNode id={id} data={data} config={processedConfig} />;
  };
};

export const nodeTypes = {
  customInput: createNodeComponent('customInput'),
  llm: createNodeComponent('llm'),
  customOutput: createNodeComponent('customOutput'),
  text: createNodeComponent('text'),
  mathOperation: createNodeComponent('mathOperation'),
  filterCondition: createNodeComponent('filterCondition'),
  dataTransform: createNodeComponent('dataTransform'),
  fileProcessor: createNodeComponent('fileProcessor'),
  apiRequest: createNodeComponent('apiRequest')
};