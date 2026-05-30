import React, { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import { MUNICIPALITY } from "../../config/municipalityConfig";
import { useAuth } from "../../context/AuthContext";

/* ─────────────────────────────────────────────────────────────────────────────
   Styles
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Page ── */
  .gorr-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    font-family: "Mangal", "Roboto", "Segoe UI", sans-serif;
    background: #d6d7da;
  }
  .gorr-page *, .gorr-page *::before, .gorr-page *::after {
    box-sizing: border-box;
    font-family: inherit;
  }

  /* ── Filter bar ── */
  .gorr-filter-bar {
    background-color: #171f33;
    display: flex;
    align-items: flex-end;
    padding: 12px 24px;
    gap: 16px;
    flex-wrap: wrap;
  }
  .gorr-filters {
    display: flex;
    flex: 1;
    align-items: flex-end;
    gap: 24px;
    flex-wrap: wrap;
  }
  .gorr-filter-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .gorr-filter-group label {
    color: #ffffff;
    font-size: 12px;
  }
  .gorr-filter-group input {
    width: 180px;
    padding: 7px 8px;
    border-radius: 3px;
    border: 1px solid #d0d4da;
    font-size: 13px;
    font-family: inherit;
  }
  .gorr-filter-group.wide input { width: 220px; }
  .gorr-search-btn {
    border: none;
    background-color: #007bff;
    color: #ffffff;
    font-size: 16px;
    padding: 8px 14px;
    border-radius: 3px;
    cursor: pointer;
    flex-shrink: 0;
    transition: background 0.15s;
  }
  .gorr-search-btn:hover { background-color: #0062cc; }

  /* ── Table wrapper ── */
  .gorr-table-wrapper {
    margin: 10px 24px 0;
    flex: 1;
  }
  .gorr-scroll {
    width: 100%;
    overflow-x: auto;
  }
  .gorr-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
    min-width: 1040px;
  }
  .gorr-table thead {
    background-color: #192236;
    color: #ffffff;
  }
  .gorr-table th,
  .gorr-table td {
    padding: 10px 8px;
    border-bottom: 1px solid #d5d5d5;
    text-align: left;
    vertical-align: middle;
  }
  .gorr-table th:first-child,
  .gorr-table td:first-child {
    text-align: center;
    width: 48px;
  }
  .gorr-even { background-color: #f3f3f3; }
  .gorr-odd  { background-color: #dcdcdc; }
  .gorr-center { text-align: center !important; }
  .gorr-ellipsis {
    max-width: 110px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* ── Status icon (pending) ── */
  .gorr-status-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background-color: #fff3cd;
    color: #856404;
    font-size: 14px;
    border: 1px solid #ffe69c;
  }

  /* ── Action cell — one row of evenly-spaced buttons ── */
  .gorr-action-cell {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    flex-wrap: nowrap;
  }
  .gorr-act-btn {
    width: 30px;
    height: 30px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    font-size: 15px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: #fff;
    transition: filter 0.15s, opacity 0.15s;
  }
  .gorr-act-btn:hover:not(:disabled) { filter: brightness(0.9); }
  .gorr-act-btn:disabled { opacity: 0.5; cursor: not-allowed; }
  .gorr-act-btn.view   { background-color: #6f42c1; }
  .gorr-act-btn.print  { background-color: #0a7d5a; }
  .gorr-act-btn.ok     { background-color: #1fa34a; }
  .gorr-act-btn.cancel { background-color: #c82333; }
  .gorr-act-btn.edit   { background-color: #005f9e; }

  /* ── State messages ── */
  .gorr-state-msg {
    padding: 24px;
    color: #555;
    font-size: 14px;
  }
  .gorr-error { color: crimson; }

  /* ── Bottom bar ── */
  .gorr-bottom-bar {
    display: flex;
    gap: 10px;
    padding: 12px 24px;
    flex-wrap: wrap;
  }
  .gorr-export-btn {
    padding: 7px 16px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    font-size: 13px;
    font-family: inherit;
    transition: background 0.15s;
    background-color: #28a745;
    color: #fff;
  }
  .gorr-export-btn:hover { background-color: #218838; }

  /* ── Footer ── */
  .gorr-footer {
    margin-top: 8px;
    margin-bottom: 16px;
    font-size: 12px;
    text-align: right;
    padding-right: 24px;
    color: #666;
  }

  /* ── Modal ── */
  .gorr-modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.55);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  .gorr-modal {
    background: #fff;
    border-radius: 6px;
    padding: 28px 32px;
    width: 560px;
    max-width: 95vw;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.22);
  }
  .gorr-modal h3 {
    margin: 0 0 18px 0;
    font-size: 1.1rem;
    color: #192236;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
  }
  .gorr-modal-grid {
    display: grid;
    grid-template-columns: 160px 1fr;
    gap: 10px 12px;
    align-items: center;
  }
  .gorr-modal-grid label {
    font-size: 0.88rem;
    font-weight: 600;
    color: #333;
  }
  .gorr-modal-grid input,
  .gorr-modal-grid select,
  .gorr-modal-grid textarea {
    width: 100%;
    padding: 7px 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 0.9rem;
    font-family: inherit;
  }
  .gorr-modal-grid textarea {
    resize: vertical;
    min-height: 56px;
  }
  .gorr-modal-actions { margin-top: 12px; display: flex; gap: 8px; }
  .gorr-modal-save {
    padding: 8px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    font-family: inherit;
    background-color: #192236;
    color: #fff;
  }
  .gorr-modal-save:hover:not(:disabled) { background-color: #0f1520; }
  .gorr-modal-save:disabled { opacity: 0.5; cursor: not-allowed; }
  .gorr-modal-cancel {
    padding: 8px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    font-family: inherit;
    background-color: #e0e0e0;
    color: #333;
  }
  .gorr-modal-cancel:hover { background-color: #c8c8c8; }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .gorr-filter-bar {
      flex-direction: column;
      align-items: stretch;
      padding: 12px;
    }
    .gorr-filters { flex-direction: column; gap: 10px; }
    .gorr-filter-group input,
    .gorr-filter-group.wide input { width: 100%; }
    .gorr-search-btn { width: 100%; padding: 10px; }
    .gorr-table-wrapper { margin: 10px 8px 0; }

    .gorr-table,
    .gorr-table thead,
    .gorr-table tbody,
    .gorr-table th,
    .gorr-table td,
    .gorr-table tr { display: block; }
    .gorr-table thead tr { display: none; }
    .gorr-table tbody tr {
      border: 1px solid #ccc;
      margin-bottom: 12px;
      border-radius: 4px;
      padding: 8px;
      background: #fff;
    }
    .gorr-table td {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 6px 8px;
      border-bottom: 1px solid #eee;
      font-size: 13px;
      text-align: right;
    }
    .gorr-table td::before {
      content: attr(data-label);
      font-weight: 600;
      text-align: left;
      flex: 1;
      color: #333;
      margin-right: 8px;
    }
    .gorr-ellipsis { max-width: none; white-space: normal; }
    .gorr-action-cell { justify-content: flex-end; }
    .gorr-modal-grid { grid-template-columns: 1fr; }
    .gorr-modal { padding: 20px 16px; }
    .gorr-bottom-bar { padding: 12px 8px; }
  }

  /* ── Print (per-row print opens its own window) ── */
  @media print {
    .gorr-filter-bar,
    .gorr-bottom-bar,
    .gorr-action-cell,
    .gorr-footer { display: none !important; }
    .gorr-table { font-size: 11px; min-width: unset; }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Constants
───────────────────────────────────────────────────────────────────────────── */
const STATUS = {
  PENDING:  "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
};

const EDITABLE_FIELDS = [
  "date",
  "proposalName",
  "headOffice",
  "wardNo",
  "purpose",
  "activities",
  "totalShareCapital",
  "entranceFee",
  "applicantName",
  "applicantAddress",
  "applicantCitizenship",
  "applicantPhone",
  "status",
  "recommendation_note",
];

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
const GovOrganizationRegRecommendation = () => {
  const { user } = useAuth();

  const [rows, setRows]               = useState([]);
  const [filtered, setFiltered]       = useState([]);
  const [loading, setLoading]         = useState(false);
  const [fromDate, setFromDate]       = useState("");
  const [toDate, setToDate]           = useState("");
  const [searchName, setSearchName]   = useState("");
  const [error, setError]             = useState("");
  const [processingId, setProcessingId] = useState(null);

  // Edit modal
  const [editing, setEditing]   = useState(false);
  const [editRow, setEditRow]   = useState(null);
  const [saving, setSaving]     = useState(false);

  /* ── Fetch pending rows only ── */
  const fetchRows = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("/api/forms/gov-organization-registration");
      const all = Array.isArray(res.data) ? res.data : [];
      const pending = all.filter((r) => r.status === STATUS.PENDING || !r.status);
      setRows(pending);
      setFiltered(pending);
    } catch (err) {
      console.error(err);
      setError("Failed to load data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRows(); }, []);

  /* ── Client-side filters ── */
  useEffect(() => {
    let out = [...rows];
    if (searchName.trim()) {
      const q = searchName.trim().toLowerCase();
      out = out.filter(
        (r) =>
          (r.proposalName && r.proposalName.toLowerCase().includes(q)) ||
          (r.applicantName && r.applicantName.toLowerCase().includes(q)) ||
          (r.headOffice    && r.headOffice.toLowerCase().includes(q))
      );
    }
    if (fromDate) out = out.filter((r) => (r.date ? r.date.slice(0, 10) >= fromDate : false));
    if (toDate)   out = out.filter((r) => (r.date ? r.date.slice(0, 10) <= toDate   : false));
    setFiltered(out);
  }, [rows, fromDate, toDate, searchName]);

  /* ── Edit modal handlers ── */
  const openEdit = (row) => {
    const copy = { id: row.id };
    EDITABLE_FIELDS.forEach((k) => { copy[k] = row[k] ?? ""; });
    setEditRow(copy);
    setEditing(true);
  };

  const closeEdit = () => { setEditing(false); setEditRow(null); };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditRow((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = async () => {
    if (!editRow?.id) return;
    if (!editRow.proposalName || editRow.proposalName.trim() === "") {
      alert("Organization name is required.");
      return;
    }
    setSaving(true);
    try {
      const payload = {};
      EDITABLE_FIELDS.forEach((k) => { payload[k] = editRow[k] === "" ? null : editRow[k]; });

      await axios.put(
        `/api/forms/gov-organization-registration/${editRow.id}`,
        payload
      );

      const updater = (prev) =>
        prev.map((r) => (r.id === editRow.id ? { ...r, ...payload } : r));
      setRows(updater);
      setFiltered(updater);

      alert("Saved successfully.");
      closeEdit();
    } catch (err) {
      console.error("Save error:", err);
      alert("Failed to save: " + (err.response?.data?.message || err.message || ""));
    } finally {
      setSaving(false);
    }
  };

  /* ── Approve / Reject — remove from pending list immediately ── */
  const updateStatus = async (id, newStatus) => {
    if (!id) return;
    setProcessingId(id);
    try {
      await axios.put(`/api/forms/gov-organization-registration/${id}`, {
        status: newStatus,
      });
      const remover = (prev) => prev.filter((r) => r.id !== id);
      setRows(remover);
      setFiltered(remover);
    } catch (err) {
      console.error(err);
      alert("Failed to update status: " + (err.response?.data?.message || err.message || ""));
    } finally {
      setProcessingId(null);
    }
  };

  /* ── Per-row detailed print — same full letter layout as the entry form ── */
  const handleRowPrint = (row) => {
    if (!row) return;

    const wardTitle =
      user?.role === "SUPERADMIN"
        ? "सबै वडा कार्यालय"
        : `${user?.ward || MUNICIPALITY.wardNumber || ""} नं. वडा कार्यालय`;

    const v = (val) => (val === null || val === undefined ? "" : String(val));
    const dateOnly = row.date ? v(row.date).slice(0, 10) : "";

    const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <title>सहकारी संस्था दर्ता सिफारिस</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;600;700&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: 'Kalimati', 'Noto Sans Devanagari', sans-serif;
            color: #000;
            background: white;
            padding: 15mm 20mm;
            font-size: 11pt;
            line-height: 1.8;
          }
          .header { text-align: center; margin-bottom: 20px; position: relative; min-height: 90px; }
          .logo { position: absolute; left: 0; top: 0; width: 70px; }
          .mun-name { color: #c0392b; font-size: 22pt; font-weight: 700; }
          .ward-title { color: #c0392b; font-size: 18pt; font-weight: 700; margin: 4px 0; }
          .addr { color: #c0392b; font-size: 10pt; }
          .sub-header { text-align: center; font-size: 12pt; margin: 16px 0; line-height: 1.6; border-top: 1px solid #ccc; padding-top: 12px; }
          .meta { display: flex; justify-content: space-between; align-items: flex-start; margin: 12px 0; font-size: 11pt; line-height: 1.8; }
          .meta-left { text-align: left; }
          .meta-right { text-align: right; }
          .top-info { margin: 18px 0; font-size: 11pt; line-height: 2; }
          .subject { text-align: center; font-weight: bold; font-size: 12pt; margin: 20px 0; text-decoration: underline; }
          .paragraph { font-size: 11pt; line-height: 2; text-align: justify; margin-bottom: 20px; }
          .section-title { font-weight: bold; font-size: 11pt; margin: 18px 0 10px; }
          .detail-line { font-size: 11pt; line-height: 2; margin-bottom: 4px; }
          .value { font-weight: bold; padding: 0 4px; }
          .applicant-box { border: 1px solid #999; padding: 14px; margin-top: 24px; border-radius: 3px; }
          .applicant-title { font-weight: bold; border-bottom: 1px solid #ddd; padding-bottom: 6px; margin-bottom: 10px; }
          .field-row { display: flex; margin-bottom: 8px; font-size: 10pt; }
          .field-label { min-width: 160px; font-weight: 600; }
          .field-val { flex: 1; }
          .note-box { margin-top: 20px; font-size: 11pt; line-height: 1.8; }
        </style>
      </head>
      <body>
        <div class="header">
          <img class="logo" src="/nepallogo.svg" alt="Nepal" />
          <div class="mun-name">${MUNICIPALITY.name}</div>
          <div class="ward-title">${wardTitle}</div>
          <div class="addr">${MUNICIPALITY.officeLine}</div>
          <div class="addr">${MUNICIPALITY.provinceLine}</div>
        </div>

        <div class="sub-header">
          अनुसूची २<br/>
          दर्ता दरखास्तको नमुना
        </div>

        <div class="meta">
          <div class="meta-left">
            <div>पत्र संख्या : <span class="value">${v(row.letterNo) || "2082/83"}</span></div>
          </div>
          <div class="meta-right">
            <div>मिति : <span class="value">${dateOnly}</span></div>
            <div>सन्दर्भ नं. : <span class="value">${v(row.refNo)}</span></div>
          </div>
        </div>

        <div class="top-info">
          श्री दत्ता गर्ने अधिकारी
          <span class="value">${v(row.officerName)}</span>
          ज्यू,<br/>
          <span class="value">${v(row.municipalityName)}</span>
          , नगर कार्यपालिकाको कार्यालय ।
        </div>

        <div class="subject">विषय : सहकारी संस्था दर्ता ।</div>

        <div class="paragraph">
          महोदय,<br/><br/>
          हामी देहायका व्यक्तिगत दर्ता भएको सहकारी संस्था दर्ता गरी पाउन निवेदन
          गर्दछौं। उद्देश्यअनुसार संस्थाले संचालन गर्न कार्यक्रमको योजना र
          प्रस्तावित संस्थाका विभिन्न विवरण सहित यसै साथ संलग्न राखी पेश गरेको छ।
        </div>

        <div class="section-title">संस्थासम्बन्धी विवरण</div>

        <div class="detail-line">(क) प्रस्तावित संस्था नामः <span class="value">${v(row.proposalName)}</span></div>
        <div class="detail-line">(ख) ठेगाना: वडा नं. <span class="value">${v(row.wardNo)}</span></div>
        <div class="detail-line">(ग) उद्देश्य: <span class="value">${v(row.purpose)}</span></div>
        <div class="detail-line">(घ) गतिविधि: <span class="value">${v(row.activities)}</span></div>
        <div class="detail-line">(ङ) मुख्य कार्यालय: <span class="value">${v(row.headOffice)}</span></div>
        <div class="detail-line">(च) शाखा कार्यालय: <span class="value">${v(row.branchOffice)}</span></div>
        <div class="detail-line">(छ) दायित्व: <span class="value">${v(row.liability)}</span></div>
        <div class="detail-line">(ज) सदस्य संख्या: महिला: <span class="value">${v(row.femaleMembers)}</span> जना &nbsp; पुरुष: <span class="value">${v(row.maleMembers)}</span> जना</div>
        <div class="detail-line">(झ) कुल शेयर पूँजीको रकमः <span class="value">${v(row.totalShareCapital)}</span></div>
        <div class="detail-line">(ञ) प्राप्त प्रवेश शुल्कको रकमः <span class="value">${v(row.entranceFee)}</span></div>

        ${
          v(row.recommendation_note)
            ? `<div class="note-box"><strong>सिफारिस टिप्पणी:</strong> <span class="value">${v(row.recommendation_note)}</span></div>`
            : ""
        }

        <div class="applicant-box">
          <div class="applicant-title">निवेदकको विवरण</div>
          <div class="field-row">
            <span class="field-label">नाम:</span>
            <span class="field-val">${v(row.applicantName)}</span>
          </div>
          <div class="field-row">
            <span class="field-label">ठेगाना:</span>
            <span class="field-val">${v(row.applicantAddress)}</span>
          </div>
          <div class="field-row">
            <span class="field-label">नागरिकता नं.:</span>
            <span class="field-val">${v(row.applicantCitizenship)}</span>
          </div>
          <div class="field-row">
            <span class="field-label">फोन:</span>
            <span class="field-val">${v(row.applicantPhone)}</span>
          </div>
        </div>
      </body>
      </html>
    `;

    const printWindow = window.open("", "_blank", "width=900,height=700");
    if (!printWindow) {
      alert("कृपया पप-अप अनुमति दिनुहोस् (popup blocked).");
      return;
    }
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  /* ── CSV export — full field set, UTF-8 BOM for Excel ── */
  const toCSV = (rs) => {
    if (!rs?.length) return "";

    const columns = [
      ["sn",                (r, i) => i + 1],
      ["regDate",           (r) => (r.date ? r.date.slice(0, 10) : "")],
      ["letterNo",          (r) => r.letterNo ?? ""],
      ["refNo",             (r) => r.refNo ?? ""],
      ["officerName",       (r) => r.officerName ?? ""],
      ["municipalityName",  (r) => r.municipalityName ?? ""],
      ["proposalName",      (r) => r.proposalName ?? ""],
      ["wardNo",            (r) => r.wardNo ?? ""],
      ["headOffice",        (r) => r.headOffice ?? ""],
      ["branchOffice",      (r) => r.branchOffice ?? ""],
      ["purpose",           (r) => r.purpose ?? ""],
      ["activities",        (r) => r.activities ?? ""],
      ["liability",         (r) => r.liability ?? ""],
      ["femaleMembers",     (r) => r.femaleMembers ?? ""],
      ["maleMembers",       (r) => r.maleMembers ?? ""],
      ["totalShareCapital", (r) => r.totalShareCapital ?? ""],
      ["entranceFee",       (r) => r.entranceFee ?? ""],
      ["applicantName",     (r) => r.applicantName ?? ""],
      ["applicantAddress",  (r) => r.applicantAddress ?? ""],
      ["applicantCitizenship", (r) => r.applicantCitizenship ?? ""],
      ["applicantPhone",    (r) => r.applicantPhone ?? ""],
      ["recommendationNote", (r) => r.recommendation_note ?? ""],
      ["status",            (r) => r.status ?? "pending"],
    ];

    const esc = (val) => `"${String(val).replace(/"/g, '""')}"`;
    const headerLine = columns.map(([h]) => esc(h)).join(",");
    const bodyLines = rs.map((r, i) =>
      columns.map(([, accessor]) => esc(accessor(r, i))).join(",")
    );

    return [headerLine, ...bodyLines].join("\r\n");
  };

  const handleExport = () => {
    const csv = toCSV(filtered);
    if (!csv) { alert("No rows to export"); return; }
    const BOM  = "\uFEFF";
    const blob = new Blob([BOM + csv], { type: "text/csv;charset=utf-8;" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = `coop_recommendations_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  /* ─────────────────────────────────────────────────────────────────────────
     Render
  ───────────────────────────────────────────────────────────────────────── */
  return (
    <div className="gorr-page">
      <style>{STYLES}</style>

      {/* ── Filter Bar ── */}
      <div className="gorr-filter-bar">
        <div className="gorr-filters">
          <div className="gorr-filter-group">
            <label>मिति देखि</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
          <div className="gorr-filter-group">
            <label>मिति सम्म</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
          <div className="gorr-filter-group wide">
            <label>सहकारी संस्थाको नाम</label>
            <input
              type="text"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              placeholder="नाम/आवेदक खोज्नुहोस्"
            />
          </div>
        </div>
        <button
          className="gorr-search-btn"
          onClick={fetchRows}
          aria-label="Search"
        >
          🔍
        </button>
      </div>

      {/* ── Table ── */}
      <div className="gorr-table-wrapper">
        {loading ? (
          <div className="gorr-state-msg">Loading...</div>
        ) : error ? (
          <div className="gorr-state-msg gorr-error">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="gorr-state-msg">कुनै पेन्डिङ रेकर्ड भेटिएन।</div>
        ) : (
          <div className="gorr-scroll">
            <table className="gorr-table">
              <thead>
                <tr>
                  <th>क्र.स.</th>
                  <th>दर्ता मिति</th>
                  <th>प्रस्तावित संस्था नाम</th>
                  <th>ठेगाना</th>
                  <th>उद्देश्य</th>
                  <th>मुख्य कार्य</th>
                  <th>प्राप्त सेयर</th>
                  <th>प्राप्त प्रवेश शुल्क</th>
                  <th>स्थिति</th>
                  <th>कार्य</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row, index) => (
                  <tr
                    key={row.id || index}
                    className={index % 2 === 0 ? "gorr-even" : "gorr-odd"}
                  >
                    <td data-label="क्र.स.">{index + 1}</td>
                    <td data-label="दर्ता मिति">{row.date ? row.date.slice(0, 10) : "-"}</td>
                    <td data-label="प्रस्तावित संस्था नाम">{row.proposalName || "-"}</td>
                    <td data-label="ठेगाना">{row.headOffice || "-"}</td>
                    <td data-label="उद्देश्य" className="gorr-ellipsis">
                      {(row.purpose || "-").slice(0, 40)}
                    </td>
                    <td data-label="मुख्य कार्य" className="gorr-ellipsis">
                      {(row.activities || "-").slice(0, 40)}
                    </td>
                    <td data-label="प्राप्त सेयर">{row.totalShareCapital || "-"}</td>
                    <td data-label="प्राप्त प्रवेश शुल्क">{row.entranceFee || "-"}</td>

                    <td data-label="स्थिति" className="gorr-center">
                      <span className="gorr-status-icon" title="पेन्डिङ">⏳</span>
                    </td>

                    <td data-label="कार्य" className="gorr-center">
                      <div className="gorr-action-cell">
                        <button
                          className="gorr-act-btn view"
                          onClick={() => handleRowPrint(row)}
                          title="पूर्वावलोकन"
                        >
                          👁
                        </button>
                        <button
                          className="gorr-act-btn print"
                          onClick={() => handleRowPrint(row)}
                          title="प्रिन्ट / डाउनलोड"
                        >
                          🖨
                        </button>
                        <button
                          className="gorr-act-btn ok"
                          disabled={processingId === row.id}
                          onClick={() => updateStatus(row.id, STATUS.APPROVED)}
                          title="स्वीकृत"
                        >
                          ✔
                        </button>
                        <button
                          className="gorr-act-btn cancel"
                          disabled={processingId === row.id}
                          onClick={() => updateStatus(row.id, STATUS.REJECTED)}
                          title="अस्वीकृत"
                        >
                          ✖
                        </button>
                        <button
                          className="gorr-act-btn edit"
                          onClick={() => openEdit(row)}
                          title="सम्पादन"
                        >
                          ✎
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Bottom Bar ── */}
      <div className="gorr-bottom-bar">
        <button onClick={handleExport} className="gorr-export-btn">
          📥 Export CSV
        </button>
      </div>

      <footer className="gorr-footer">
        © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
      </footer>

      {/* ── Edit Modal ── */}
      {editing && editRow && (
        <div className="gorr-modal-overlay" onClick={closeEdit}>
          <div className="gorr-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Edit Registration</h3>
            <div className="gorr-modal-grid">
              <label>Organization Name</label>
              <input name="proposalName" value={editRow.proposalName} onChange={handleEditChange} />

              <label>Date</label>
              <input name="date" type="date" value={editRow.date?.slice(0, 10) ?? ""} onChange={handleEditChange} />

              <label>Ward No</label>
              <input name="wardNo" value={editRow.wardNo} onChange={handleEditChange} />

              <label>Head Office / Address</label>
              <input name="headOffice" value={editRow.headOffice} onChange={handleEditChange} />

              <label>Purpose</label>
              <textarea name="purpose" value={editRow.purpose} onChange={handleEditChange} />

              <label>Activities</label>
              <textarea name="activities" value={editRow.activities} onChange={handleEditChange} />

              <label>Total Share Capital</label>
              <input name="totalShareCapital" value={editRow.totalShareCapital} onChange={handleEditChange} />

              <label>Entrance Fee</label>
              <input name="entranceFee" value={editRow.entranceFee} onChange={handleEditChange} />

              <label>Applicant Name</label>
              <input name="applicantName" value={editRow.applicantName} onChange={handleEditChange} />

              <label>Applicant Phone</label>
              <input name="applicantPhone" value={editRow.applicantPhone} onChange={handleEditChange} />

              <label>Recommendation Note</label>
              <textarea name="recommendation_note" value={editRow.recommendation_note} onChange={handleEditChange} />
            </div>
            <div className="gorr-modal-actions">
              <button className="gorr-modal-save" onClick={saveEdit} disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </button>
              <button className="gorr-modal-cancel" onClick={closeEdit}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GovOrganizationRegRecommendation;