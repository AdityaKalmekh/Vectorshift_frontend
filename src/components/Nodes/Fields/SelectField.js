export const SelectField = ({ value, onChange, label, options }) => (
  <div className="mb-2 text-xs">
    <div className="font-medium mb-1 text-gray-600 text-[10px] sm:text-xs">{label}:</div>
    <select 
      value={value} 
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-1 sm:p-2 border border-gray-300 rounded text-[10px] sm:text-xs outline-none focus:border-indigo-500 bg-white cursor-pointer"
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);