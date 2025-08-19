export const DraggableNode = ({ type, label, icon: Icon }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType }
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className={`${type} cursor-grab min-w-[80px] sm:min-w-[100px] h-14 sm:h-[70px] flex items-center justify-center flex-col gap-1 sm:gap-1.5 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg transition-all duration-200 border-2 border-white/20 hover:scale-105 hover:shadow-xl touch-manipulation`}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      draggable
    >
      {Icon && <Icon size={16} className="text-white sm:w-5 sm:h-5" />}
      <span className="text-white text-[10px] sm:text-xs font-medium">{label}</span>
    </div>
  );
};