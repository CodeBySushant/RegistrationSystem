// src/components/MunicipalityHeaderEn.jsx
import { useAuth } from "../context/AuthContext";
import { MUNICIPALITY } from "../config/municipalityConfig";

/* ─────────────────────────────────────────────────────────────────────────────
   Inline styles — no external CSS dependency, no class collisions.
   English counterpart of MunicipalityHeader.jsx (same visual pattern).
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  .mh-en-header {
    text-align: center;
    margin-bottom: 28px;
    position: relative;
    min-height: 90px;
  }

  .mh-en-logo img {
    position: absolute;
    left: 0;
    top: 0;
    width: 80px;
    height: auto;
  }

  .mh-en-text {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .mh-en-municipality-name {
    color: #e74c3c;
    font-size: 2.2rem;
    margin: 0;
    font-weight: bold;
    line-height: 1.2;
  }

  .mh-en-ward-title {
    color: #e74c3c;
    font-size: 1.7rem;
    margin: 4px 0;
    font-weight: bold;
  }

  .mh-en-address-text,
  .mh-en-province-text {
    color: #e74c3c;
    margin: 0;
    font-size: 1rem;
  }

  .mh-en-form-title {
    margin-top: 10px;
    font-size: 1.4rem;
    font-weight: bold;
    color: #e74c3c;
  }

  @media print {
    .mh-en-municipality-name,
    .mh-en-ward-title,
    .mh-en-address-text,
    .mh-en-province-text,
    .mh-en-form-title {
      color: #e74c3c !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
  }
`;

/**
 * MunicipalityHeaderEn
 *
 * English-language header. Mirrors MunicipalityHeader.jsx but renders the
 * englishMunicipality / englishDistrict / englishProvince config fields.
 *
 * Props:
 *   showLogo   {boolean}  — show the Nepal emblem logo (default: true)
 *   formTitle  {string}   — optional English form title rendered below address
 *                           e.g. "Leave Application" (default: none)
 *
 * Usage:
 *   <MunicipalityHeaderEn />
 *   <MunicipalityHeaderEn showLogo={false} />
 *   <MunicipalityHeaderEn formTitle="Ethnicity Identity Recommendation" />
 */
const MunicipalityHeaderEn = ({ showLogo = true, formTitle = "" }) => {
  const { user } = useAuth();

  const wardLine =
    user?.role === "SUPERADMIN"
      ? "All Ward Offices"
      : user?.ward
        ? `Ward No. ${user.ward} Ward Office`
        : MUNICIPALITY.wardNumber
          ? `Ward No. ${MUNICIPALITY.wardNumber} Ward Office`
          : "Ward Office";

  const officeLineEn = `Office of the Village Executive, ${MUNICIPALITY.englishDistrict}`;

  return (
    <>
      <style>{STYLES}</style>

      <div className="mh-en-header">
        {showLogo && (
          <div className="mh-en-logo">
            <img src={MUNICIPALITY.logoSrc} alt="Nepal Emblem" />
          </div>
        )}

        <div className="mh-en-text">
          <h1 className="mh-en-municipality-name">
            {MUNICIPALITY.englishMunicipality}
          </h1>
          <h2 className="mh-en-ward-title">{wardLine}</h2>
          <p className="mh-en-address-text">{officeLineEn}</p>
          <p className="mh-en-province-text">{MUNICIPALITY.englishProvince}</p>
          {formTitle && <h3 className="mh-en-form-title">{formTitle}</h3>}
        </div>
      </div>
    </>
  );
};

export default MunicipalityHeaderEn;