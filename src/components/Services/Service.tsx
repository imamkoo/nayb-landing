import React from "react";
import { type Service } from "../../utils/contentTypes";

interface ServiceProps {
  service: Service;
}

const Service: React.FC<ServiceProps> = ({ service }) => {
  return (
    <li className="flex flex-1 flex-col items-center gap-6 py-8 text-center sm:py-12 sm:px-8">
      <div className="text-primary-700">
        <service.Icon className="h-14 w-14" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-primary-800 mb-2 whitespace-nowrap">
          {service.heading}
        </h3>
        <p className="text-sm text-slate-500 font-light leading-relaxed max-w-xs">
          {service.description}
        </p>
      </div>
    </li>
  );
};

export default Service;
