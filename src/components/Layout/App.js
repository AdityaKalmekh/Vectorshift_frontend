import { PipelineUI } from "../Pipeline/PipelineUI";
import { PipelineToolbar } from "../Pipeline/PipelineToolbar";
import { SubmitButton } from "../Pipeline/SubmitButton";

function App() {
  return (
    <div className='h-screen flex flex-col'>
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />

      {/* Add animation styles */}
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default App;