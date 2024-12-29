// Modal.tsx
import React from 'react';
import { X } from 'lucide-react';
import { ModalProps } from './types';

export const Modal: React.FC<ModalProps> = ({ show, onClose, title, children }) => {
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-sm sm:max-w-md md:max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-3 sm:p-4 border-b dark:border-gray-700">
          <h2 className="text-lg sm:text-xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>
        <div className="p-3 sm:p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export const Alert: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 ${className}`}>
      {children}
    </div>
  );
};

export const AlertDescription: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="text-sm sm:text-base">{children}</div>
  );
};