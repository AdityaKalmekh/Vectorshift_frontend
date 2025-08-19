export const extractVariables = (text) => {
    const regex = /\{\{\s*(\w+)\s*\}\}/g;
    const variables = [];
    let match;

    while ((match = regex.exec(text)) !== null) {
        if (!variables.includes(match[1])) {
            variables.push(match[1]);
        }
    }

    return variables;
};

export const getInitNodeData = (nodeID, type) => {
    return { id: nodeID, nodeType: `${type}` };
}