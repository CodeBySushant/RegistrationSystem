import React, { useRef } from "react";
import { MUNICIPALITY } from "../config/municipalityConfig";
import { useAuth } from "../context/AuthContext";
import "./PrintPreviewModal.css";

const PrintPreviewModal = ({ row, onClose }) => {
  const { user } = useAuth();
  const printRef = useRef();

  if (!row) return null;

  const handlePrint = () => {
    const content = printRef.current.innerHTML;
    const printWindow = window.open("", "_blank", "width=900,height=700");
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>सहकारी संस्था दर्ता सिफारिस</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;600;700&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body {
              font-family: 'Kalimati', 'Noto Sans Devanagari', 'Mangal', sans-serif;
              color: #000;
              background: white;
              padding: 14mm 16mm;
            }
            .print-header { text-align: center; margin-bottom: 16px; position: relative; }
            .print-logo { position: absolute; left: 0; top: 0; width: 70px; }
            .municipality-name { color: #c0392b; font-size: 2rem; font-weight: 700; line-height: 1.2; }
            .ward-title { color: #c0392b; font-size: 2.2rem; font-weight: 700; margin: 4px 0; }
            .address-line { color: #c0392b; font-size: 0.95rem; margin: 2px 0; }
            .sub-header { text-align: center; border-top: 1px solid #bbb; padding-top: 12px; margin-top: 14px; font-size: 16px; line-height: 24px; }
            .top-info { margin: 16px 0; font-size: 0.95rem; line-height: 2; }
            .dotted-line { border-bottom: 1px dotted #555; display: inline-block; min-width: 180px; padding: 0 4px; }
            .subject { font-size: 1rem; margin: 16px 0 8px; }
            .paragraph { font-size: 0.95rem; line-height: 2; margin-bottom: 16px; }
            .section-title { font-weight: 700; font-size: 1rem; margin: 18px 0 10px; }
            .field-row { display: flex; align-items: flex-start; margin-bottom: 10px; gap: 8px; font-size: 0.95rem; }
            .field-label { min-width: 220px; font-weight: 600; }
            .field-value { border-bottom: 1px solid #999; flex: 1; padding-bottom: 2px; }
            .inline-row { display: flex; gap: 24px; }
            .applicant-box { border: 1px solid #ccc; padding: 16px; border-radius: 4px; margin-top: 20px; }
            .applicant-title { font-weight: 700; font-size: 1rem; border-bottom: 1px solid #eee; padding-bottom: 8px; margin-bottom: 12px; color: #555; }
          </style>
        </head>
        <body>${content}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 400);
  };

  return (
    <div className="pp-overlay" onClick={onClose}>
      <div className="pp-modal" onClick={(e) => e.stopPropagation()}>

        {/* Modal top bar */}
        <div className="pp-topbar">
          <span>सहकारी संस्था दर्ता — प्रिन्ट पूर्वावलोकन</span>
          <div className="pp-topbar-actions">
            <button className="pp-print-btn" onClick={handlePrint}>🖨 प्रिन्ट गर्नुहोस्</button>
            <button className="pp-close-btn" onClick={onClose}>✕</button>
          </div>
        </div>

        {/* Printable content */}
        <div className="pp-scroll">
          <div className="pp-paper" ref={printRef}>

            {/* Letterhead */}
            <div className="print-header">
              <img className="print-logo" src="/nepallogo.svg" alt="Nepal Emblem" />
              <div className="municipality-name">{MUNICIPALITY.name}</div>
              <div className="ward-title">
                {user?.role === "SUPERADMIN"
                  ? "सबै वडा कार्यालय"
                  : `${user?.ward || MUNICIPALITY.wardNumber} नं. वडा कार्यालय`}
              </div>
              <div className="address-line">{MUNICIPALITY.officeLine}</div>
              <div className="address-line">{MUNICIPALITY.provinceLine}</div>
            </div>

            {/* Sub header */}
            <div className="sub-header">
              <div>अनुसूची २</div>
              <div>दर्ता दरखास्तको नमुना</div>
            </div>

            {/* Addressee */}
            <div className="top-info">
              श्री दर्ता गर्ने अधिकारी{" "}
              <span className="dotted-line">{row.officerName || ""}</span>{" "}
              ज्यू,
              <br />
              <span className="dotted-line">{row.municipalityName || ""}</span>{" "}
              , नगर कार्यपालिकाको कार्यालय
              <br />
              <span className="dotted-line">{row.letterNo || ""}</span>{" "}
              &nbsp;&nbsp;
              <span className="dotted-line">{row.refNo || ""}</span> ।
            </div>

            {/* Subject */}
            <div className="subject">विषय : सहकारी संस्था दर्ता ।</div>

            {/* Body paragraph */}
            <div className="paragraph">
              महोदय,
              <br /><br />
              हामी देहायका व्यक्तिगत दर्ता भएको सहकारी संस्था दर्ता गरी पाउन निवेदन
              गर्दछौं। उद्देश्यअनुसार संस्थाले संचालन गर्न कार्यक्रमको योजना र
              प्रस्तावित संस्थाका विभिन्न विवरण सहित यसै साथ संलग्न राखी पेश गरेको छ।
            </div>

            {/* Institution details */}
            <div className="section-title">संस्थासम्बन्धी विवरण</div>

            <div className="field-row">
              <span className="field-label">(क) प्रस्तावित संस्था नामः</span>
              <span className="field-value">{row.proposalName || ""}</span>
            </div>
            <div className="field-row">
              <span className="field-label">(ख) ठेगाना: वडा नं.</span>
              <span className="field-value">{row.wardNo || ""}</span>
            </div>
            <div className="field-row">
              <span className="field-label">(ग) उद्देश्य:</span>
              <span className="field-value">{row.purpose || ""}</span>
            </div>
            <div className="field-row">
              <span className="field-label">(घ) गतिविधि:</span>
              <span className="field-value">{row.activities || ""}</span>
            </div>
            <div className="field-row">
              <span className="field-label">(ङ) मुख्य कार्यालय:</span>
              <span className="field-value">{row.headOffice || ""}</span>
            </div>
            <div className="field-row">
              <span className="field-label">(च) शाखा कार्यालय:</span>
              <span className="field-value">{row.branchOffice || ""}</span>
            </div>
            <div className="field-row">
              <span className="field-label">(छ) दायित्व:</span>
              <span className="field-value">{row.liability || ""}</span>
            </div>
            <div className="field-row">
              <span className="field-label">(ज) सदस्य संख्या:</span>
              <span className="field-value">
                <span className="inline-row">
                  <span>महिला: {row.femaleMembers || "—"} जना</span>
                  <span>पुरुष: {row.maleMembers || "—"} जना</span>
                </span>
              </span>
            </div>
            <div className="field-row">
              <span className="field-label">(झ) कुल शेयर पूँजीको रकमः</span>
              <span className="field-value">{row.totalShareCapital || ""}</span>
            </div>
            <div className="field-row">
              <span className="field-label">(ञ) प्राप्त प्रवेश शुल्कको रकमः</span>
              <span className="field-value">{row.entranceFee || ""}</span>
            </div>

            {/* Applicant details */}
            <div className="applicant-box">
              <div className="applicant-title">निवेदकको विवरण</div>
              <div className="field-row">
                <span className="field-label">नाम:</span>
                <span className="field-value">{row.applicantName || ""}</span>
              </div>
              <div className="field-row">
                <span className="field-label">ठेगाना:</span>
                <span className="field-value">{row.applicantAddress || ""}</span>
              </div>
              <div className="field-row">
                <span className="field-label">नागरिकता नं.:</span>
                <span className="field-value">{row.applicantCitizenship || ""}</span>
              </div>
              <div className="field-row">
                <span className="field-label">फोन:</span>
                <span className="field-value">{row.applicantPhone || ""}</span>
              </div>
            </div>

            {/* Recommendation note if present */}
            {row.recommendation_note && (
              <div className="applicant-box" style={{ marginTop: 16 }}>
                <div className="applicant-title">सिफारिस टिप्पणी</div>
                <div style={{ fontSize: "0.95rem", lineHeight: 1.8 }}>
                  {row.recommendation_note}
                </div>
              </div>
            )}

            {/* Signature area */}
            <div style={{ marginTop: 48, display: "flex", justifyContent: "flex-end" }}>
              <div style={{ textAlign: "center", minWidth: 180 }}>
                <div style={{ borderTop: "1px solid #000", paddingTop: 6, fontSize: "0.9rem" }}>
                  दस्तखत / छाप
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintPreviewModal;