// src/components/MunicipalityHeader.jsx
// Can be used in forms to change nagarpalika name
import React from "react";
import { MUNICIPALITY } from "../config/municipalityConfig";

const MunicipalityHeader = ({ showLogo = false }) => {
  return (
    <div className="text-center mb-4">
      {showLogo && (
        <img
          src={MUNICIPALITY.logoSrc}
          alt={MUNICIPALITY.name}
          className="w-16 h-16 mx-auto mb-2 object-contain"
        />
      )}
      <h1 className="text-base font-semibold">
        {MUNICIPALITY.name}
      </h1>
      <p className="text-sm">{MUNICIPALITY.officeLine}</p>
      {MUNICIPALITY.provinceLine && (
        <p className="text-xs">{MUNICIPALITY.provinceLine}</p>
      )}
    </div>
  );
};

export default MunicipalityHeader;
