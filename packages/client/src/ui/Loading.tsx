import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const LoadingOverlay: React.FC = () => {
  return (
    <div className="absolute loadingOverlay inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center opacity-40 h-screen">
      <FontAwesomeIcon icon={faSpinner} spin size="3x" />
    </div>
  );
};

export default LoadingOverlay;
