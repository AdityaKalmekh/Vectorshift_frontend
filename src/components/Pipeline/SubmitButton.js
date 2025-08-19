// submit.js

import { useStore } from "../../store/store";
import { useState } from "react";
import { 
  Send,
  CheckCircle,
  AlertCircle
} from "lucide-react";

export const SubmitButton = () => {
  const { nodes, edges } = useStore(state => ({
    nodes: state.nodes,
    edges: state.edges
  }));
  
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState(null);
  const [alertType, setAlertType] = useState('success');
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  const handleSubmit = async () => {
    setIsLoading(true);
    
    try {
      const pipelineData = {
        nodes: nodes.map(node => ({
          id: node.id,
          type: node.type,
          position: node.position,
          data: node.data || {}
        })),
        edges: edges.map(edge => ({
          id: edge.id,
          source: edge.source,
          target: edge.target,
          sourceHandle: edge.sourceHandle || null,
          targetHandle: edge.targetHandle || null
        }))
      };
      
      const response = await fetch(`${API_URL}/pipelines/parse`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pipelineData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setAlertData(result);
      setAlertType('success');
      setShowAlert(true);
      
    } catch (error) {
      console.error('Error submitting pipeline:', error);
      setAlertData({ 
        message: error.message.includes('Failed to fetch') 
          ? 'Could not connect to the backend server. Please make sure the backend is running on http://localhost:8000' 
          : error.message 
      });
      setAlertType('error');
      setShowAlert(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center p-3 sm:p-5 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200">
        <button 
          onClick={handleSubmit}
          disabled={isLoading}
          className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg text-sm sm:text-base font-medium shadow-lg transition-all duration-200 ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:-translate-y-0.5 hover:shadow-xl'}`}
        >
          {isLoading ? (
            <>
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              Processing...
            </>
          ) : (
            <>
              <Send size={16} className="sm:w-5 sm:h-5" />
              Submit Pipeline
            </>
          )}
        </button>
      </div>

      {/* Alert Modal */}
      {showAlert && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4" onClick={() => setShowAlert(false)}>
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-2xl max-w-sm sm:max-w-md w-full animate-[slideIn_0.3s_ease-out]" onClick={(e) => e.stopPropagation()}>
            {alertType === 'success' ? (
              <>
                <div className="flex items-center mb-4 pb-4 border-b">
                  <CheckCircle className="text-green-500 mr-3" size={24} />
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">Pipeline Analysis Complete</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg px-3 py-2 mr-3 font-medium min-w-[80px] text-center text-sm">
                      Nodes
                    </div>
                    <span className="text-xl sm:text-2xl font-bold text-gray-600">{alertData?.num_nodes}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-lg px-3 py-2 mr-3 font-medium min-w-[80px] text-center text-sm">
                      Edges
                    </div>
                    <span className="text-xl sm:text-2xl font-bold text-gray-600">{alertData?.num_edges}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <div className={`${alertData?.is_dag ? 'bg-gradient-to-r from-green-400 to-green-600' : 'bg-gradient-to-r from-red-400 to-red-600'} text-white rounded-lg px-3 py-2 mr-3 font-medium min-w-[80px] text-center text-sm`}>
                      DAG Status
                    </div>
                    <span className={`text-base sm:text-lg font-bold ${alertData?.is_dag ? 'text-green-600' : 'text-red-600'}`}>
                      {alertData?.is_dag ? '✓ Valid DAG' : '✗ Not a DAG'}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center mb-4">
                  <AlertCircle className="text-red-500 mr-3" size={24} />
                  <h3 className="text-base sm:text-lg font-semibold text-red-600">Error</h3>
                </div>
                <p className="text-gray-600 mb-4 text-sm sm:text-base">{alertData?.message}</p>
              </>
            )}
            
            <button
              onClick={() => setShowAlert(false)}
              className={`mt-5 w-full px-4 py-2 ${alertType === 'success' ? 'bg-gradient-to-r from-indigo-500 to-purple-600' : 'bg-red-500'} text-white rounded-lg font-medium hover:opacity-90 transition-opacity text-sm sm:text-base`}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};