// components/Shoutout.tsx

import React from "react";

const Shoutout: React.FC = () => {
  return (
    <div className="container mx-auto px-4 lg:px-8 xl:px-16">
      <h3 className="text-2xl font-bold text-gray-800">Award Winner!</h3>
      <p className="mt-2 text-sm text-gray-700">
        This book won the prestigious Mystery Novel of the Year award in 1955.
      </p>
    </div>
  );
};

export default Shoutout;
