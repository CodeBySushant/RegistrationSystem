// src/components/MunicipalityHeader.jsx
import { useAuth } from "../context/AuthContext";
import { MUNICIPALITY } from "../config/municipalityConfig";

/* ─────────────────────────────────────────────────────────────────────────────
   Inline styles — no external CSS dependency, no class collisions.
   Matches the header pattern used across all merged forms.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  .mh-header {
    text-align: center;
    margin-bottom: 28px;
    position: relative;
    min-height: 90px;
  }

  .mh-logo img {
    position: absolute;
    left: 0;
    top: 0;
    width: 80px;
    height: auto;
  }

  .mh-text {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .mh-municipality-name {
    color: #e74c3c;
    font-size: 2.2rem;
    margin: 0;
    font-weight: bold;
    line-height: 1.2;
  }

  .mh-ward-title {
    color: #e74c3c;
    font-size: 1.7rem;
    margin: 4px 0;
    font-weight: bold;
  }

  .mh-address-text,
  .mh-province-text {
    color: #e74c3c;
    margin: 0;
    font-size: 1rem;
  }

  .mh-form-title {
    margin-top: 10px;
    font-size: 1.4rem;
    font-weight: bold;
    color: #e74c3c;
  }

  @media print {
    .mh-municipality-name,
    .mh-ward-title,
    .mh-address-text,
    .mh-province-text,
    .mh-form-title {
      color: #e74c3c !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
  }
`;

/**
 * MunicipalityHeader
 *
 * Props:
 *   showLogo   {boolean}  — show the Nepal emblem logo (default: true)
 *   formTitle  {string}   — optional Nepali form title rendered below address
 *                           e.g. "बिदाको निवेदन" (default: none)
 *
 * Usage:
 *   <MunicipalityHeader />
 *   <MunicipalityHeader showLogo={false} />
 *   <MunicipalityHeader formTitle="जातीय पहिचान सिफारिस" />
 */
const MunicipalityHeader = ({ showLogo = true, formTitle = "" }) => {
  const { user } = useAuth();

  const wardLine =
    user?.role === "SUPERADMIN"
      ? "सबै वडा कार्यालय"
      : user?.ward
        ? `वडा नं. ${user.ward} वडा कार्यालय`
        : MUNICIPALITY.wardNumber
          ? `${MUNICIPALITY.wardNumber} नं. वडा कार्यालय`
          : "वडा कार्यालय";

  return (
    <>
      <style>{STYLES}</style>

      <div className="mh-header">
        {showLogo && (
          <div className="mh-logo">
            <img src={MUNICIPALITY.logoSrc} alt="Nepal Emblem" />
          </div>
        )}

        <div className="mh-text">
          <h1 className="mh-municipality-name">{MUNICIPALITY.name}</h1>
          <h2 className="mh-ward-title">{wardLine}</h2>
          <p className="mh-address-text">{MUNICIPALITY.officeLine}</p>
          <p className="mh-province-text">{MUNICIPALITY.provinceLine}</p>
          {formTitle && (
            <h3 className="mh-form-title">{formTitle}</h3>
          )}
        </div>
      </div>
    </>
  );
};

export default MunicipalityHeader;