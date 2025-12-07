import React from "react";
import { MUNICIPALITY } from "../config/municipalityConfig";

const MunicipalityHeader = ({ showLogo = false, english = false }) => {
  return (
    <div className="text-center mb-4 leading-tight">
      {/* Logo */}
      {showLogo && MUNICIPALITY.logoSrc && (
        <img
          src={MUNICIPALITY.logoSrc}
          alt={MUNICIPALITY.name}
          className="w-16 h-16 mx-auto mb-2 object-contain"
        />
      )}

      {/* Nepali Version */}
      {!english && (
        <>
          <h1 className="text-base font-semibold">{MUNICIPALITY.name}</h1>

          {MUNICIPALITY.wardNumber && (
            <h2 className="text-sm font-semibold">
              वडा नं. {MUNICIPALITY.wardNumber} वडा कार्यालय
            </h2>
          )}

          {MUNICIPALITY.officeLine && (
            <p className="text-sm">{MUNICIPALITY.officeLine}</p>
          )}

          {MUNICIPALITY.provinceLine && (
            <p className="text-xs">{MUNICIPALITY.provinceLine}</p>
          )}
        </>
      )}

      {/* English Version */}
      {english && (
        <>
          <h1 className="text-base font-semibold">
            {MUNICIPALITY.englishMunicipality}
          </h1>

          {MUNICIPALITY.wardNumber && (
            <h2 className="text-sm font-semibold">
              {MUNICIPALITY.wardNumber} No. Ward Office
            </h2>
          )}

          <p className="text-sm">
            {MUNICIPALITY.englishDistrict}, {MUNICIPALITY.englishDistrict}
          </p>

          <p className="text-xs">
            {MUNICIPALITY.englishProvince}, Nepal
          </p>
        </>
      )}
    </div>
  );
};

export default MunicipalityHeader;
