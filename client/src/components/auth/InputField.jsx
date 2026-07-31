import React from 'react';

export default function InputField({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  icon: Icon,
  endAction,
  required = false
}) {
  return (
    <div>
      {label && <label className="block text-xs font-medium text-slate-300 mb-1.5">{label}</label>}
      <div className="relative">
        {Icon && <Icon className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5 pointer-events-none" />}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full bg-slate-950/70 border border-slate-800 rounded-xl ${
            Icon ? 'pl-10' : 'pl-3.5'
          } ${endAction ? 'pr-10' : 'pr-4'} py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/40 transition-colors`}
        />
        {endAction && (
          <div className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-200">
            {endAction}
          </div>
        )}
      </div>
    </div>
  );
}
