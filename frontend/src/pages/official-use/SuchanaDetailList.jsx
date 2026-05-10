// src/pages/official-use/SuchanaDetailList.jsx
import React, { useEffect, useState } from "react";
import PrintPreviewModal from "../../components/PrintPreviewModal";
import axios from "../../utils/axiosInstance";

/* ─────────────────────────── Styles ─────────────────────────── */
const styles = `
.coop-page {
  width: 100%;
  min-height: 100vh;
  background-image: url("/papertexture1.jpg");
  background-repeat: repeat;
  background-size: auto;
  background-position: top left;
  font-family: 'Kalimati', 'Kokila', sans-serif;
  display: flex;
  flex-direction: column;
}

/* ── Source tab bar ── */
.sdl-source-bar {
  display: flex;
  gap: 4px;
  padding: 10px 20px 0;
  background: #fff;
  border-bottom: 2px solid #dde3ea;
  flex-wrap: wrap;
}
.sdl-source-btn {
  background: none;
  border: none;
  border-bottom: 3px solid transparent;
  padding: 8px 14px 10px;
  font-family: 'Kalimati', 'Kokila', sans-serif;
  font-size: 0.88rem;
  color: #555;
  cursor: pointer;
  white-space: nowrap;
  margin-bottom: -2px;
  transition: color 0.15s, border-color 0.15s;
}
.sdl-source-btn:hover { color: #192236; }
.sdl-source-btn.active { color: #192236; font-weight: 700; border-bottom-color: #2980b9; }
.sdl-count {
  display: inline-block;
  background: #e4e8ec;
  color: #444;
  font-size: 0.72rem;
  border-radius: 10px;
  padding: 1px 7px;
  margin-left: 6px;
  line-height: 1.5;
}
.sdl-source-btn.active .sdl-count { background: #2980b9; color: #fff; }

/* ── Filter bar ── */
.coop-filter-bar {
  background: #192236;
  padding: 16px 20px;
  display: flex;
  align-items: flex-end;
  gap: 16px;
  flex-wrap: wrap;
}
.coop-filters {
  display: flex;
  gap: 16px;
  flex: 1;
  flex-wrap: wrap;
  align-items: flex-end;
}
.coop-filter-group { display: flex; flex-direction: column; gap: 4px; }
.coop-filter-group.wide { flex: 1; min-width: 200px; }
.coop-filter-group label { color: #aab7c4; font-size: 0.78rem; }
.coop-filter-group input {
  padding: 7px 10px;
  border: none;
  border-radius: 3px;
  font-family: 'Kalimati', 'Kokila', sans-serif;
  font-size: 0.88rem;
  height: 36px;
  box-sizing: border-box;
  background: #fff;
}
.coop-search-btn {
  background: #2980b9;
  color: #fff;
  border: none;
  border-radius: 4px;
  width: 38px;
  height: 36px;
  font-size: 1.1rem;
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.15s;
}
.coop-search-btn:hover { background: #1a6a9a; }

/* ── Table wrapper ── */
.coop-table-wrapper { flex: 1; padding: 24px 20px 0; }
.coop-state-msg { padding: 40px; text-align: center; color: #666; font-size: 0.95rem; }
.coop-error { color: #c0392b; }
.coop-scroll {
  overflow-x: auto;
  background: rgba(255,255,255,0.88);
  box-shadow: 0 1px 6px rgba(0,0,0,0.08);
  border-radius: 4px;
}

/* ── Table ── */
.coop-table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
.coop-table th {
  background: #192236;
  color: #fff;
  padding: 11px 10px;
  text-align: center;
  font-weight: 600;
  white-space: nowrap;
  border-right: 1px solid #2c3e5a;
}
.coop-table th:last-child { border-right: none; }
.coop-table td {
  padding: 9px 10px;
  color: #333;
  vertical-align: middle;
  text-align: center;
  border-bottom: 1px solid #ddd;
}
.coop-table tr.even-row td { background: #f9f9f9; }
.coop-table tr.odd-row  td { background: #ffffff; }
.coop-table tr:hover td { background: #edf4fb; }
.coop-table td.ellipsis {
  max-width: 180px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ── Badges ── */
.sdl-badge {
  display: inline-block;
  font-size: 0.75rem;
  padding: 2px 10px;
  border-radius: 10px;
  font-weight: 600;
  white-space: nowrap;
}
.sdl-badge--blue  { background: #d6eaf8; color: #1a5276; }
.sdl-badge--green { background: #d5f5e3; color: #1e8449; }
.sdl-badge--amber { background: #fdebd0; color: #935116; }

/* ── Eye button ── */
.eye-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  padding: 3px 7px;
  border-radius: 4px;
  transition: background 0.15s;
}
.eye-btn:hover { background: #e8f4fd; }

.center-cell { text-align: center !important; }

/* ── Bottom bar ── */
.coop-bottom-bar {
  display: flex;
  gap: 10px;
  padding: 14px 20px;
  background: #fff;
  border-top: 1px solid #e0e0e0;
  margin-top: 20px;
}
.coop-export-btn,
.coop-print-btn {
  padding: 7px 18px;
  border: none;
  border-radius: 4px;
  font-family: 'Kalimati', 'Kokila', sans-serif;
  font-size: 0.88rem;
  cursor: pointer;
  transition: background 0.15s;
}
.coop-export-btn       { background: #5a7b94; color: #fff; }
.coop-export-btn:hover { background: #4a6a82; }
.coop-print-btn        { background: #192236; color: #fff; }
.coop-print-btn:hover  { background: #0f1722; }

/* ── Footer ── */
.coop-footer {
  text-align: right;
  padding: 12px 20px;
  font-size: 0.82rem;
  color: #888;
  background: #fff;
  border-top: 1px solid #eee;
}

/* ── Print ── */
@media print {
  .sdl-source-bar,
  .coop-filter-bar,
  .coop-bottom-bar,
  .coop-footer { display: none !important; }
  .coop-table-wrapper { padding: 0; }
  .coop-scroll { box-shadow: none; background: #fff; }
}

/* ── Responsive ── */
@media (max-width: 700px) {
  .coop-table thead { display: none; }
  .coop-table tr { display: block; margin-bottom: 12px; border: 1px solid #ddd; }
  .coop-table td {
    display: flex;
    justify-content: space-between;
    text-align: right;
    border-bottom: 1px solid #f0f0f0;
    padding: 7px 12px;
  }
  .coop-table td::before {
    content: attr(data-label);
    font-weight: 600;
    color: #555;
    text-align: left;
    flex-shrink: 0;
    margin-right: 8px;
  }
}
`;

/* ─────────────────────────── Source definitions ─────────────────────────── */
const SOURCES = [
  {
    key: "antar-sthaniya",
    label: "अन्तर स्थानीय सरुवा",
    api: "/api/forms/inter-local-transfer-recommendation",
    badgeClass: "sdl-badge--blue",
    badgeText: "सरुवा",
    mapRow: (r) => ({
      id: r.id,
      _source: "antar-sthaniya",
      _raw: r,
      date: r.date || "",
      letter_no: r.letter_no || "—",
      subject: r.subject || "अन्तर स्थानीय सरुवा सहमति",
      type: "अन्तर स्थानीय सरुवा",
      name: r.employee_name || "—",
      location: r.transfer_local || "—",
    }),
    buildPreview: (r) => ({
      ...r,
      officerName:        r.requested_person_name   || "",
      municipalityName:   r.transfer_to_local       || "",
      letterNo:           r.letter_no               || "",
      refNo:              r.reference_no             || "",
      proposalName:       r.employee_name            || "",
      wardNo:             r.permanent_address        || "",
      purpose:            r.service_group            || "",
      activities:         r.transfer_local           || "",
      headOffice:         r.appointing_local         || "",
      branchOffice:       r.transfer_to_position     || "",
      liability:          r.citizenship_no           || "",
      femaleMembers:      "",
      maleMembers:        "",
      totalShareCapital:  r.dob                      || "",
      entranceFee:        r.phone                    || "",
      applicantName:      r.applicant_name           || "",
      applicantAddress:   r.applicant_address        || "",
      applicantCitizenship: r.applicant_citizenship_no || "",
      applicantPhone:     r.applicant_phone          || "",
      recommendation_note: r.notes                  || "",
    }),
  },
  {
    key: "ramana-patra",
    label: "रमाना पत्र",
    api: "/api/forms/ramana-patra",
    badgeClass: "sdl-badge--green",
    badgeText: "रमाना",
    mapRow: (r) => ({
      id: r.id,
      _source: "ramana-patra",
      _raw: r,
      date: r.date || "",
      letter_no: r.letter_no || "—",
      subject: "रमाना पत्र",
      type: "रमाना पत्र",
      name: r.emp_name || "—",
      location: r.transfer_office || "—",
    }),
    buildPreview: (r) => ({
      ...r,
      officerName:        r.recipient_name           || "",
      municipalityName:   r.recipient_address        || "",
      letterNo:           r.letter_no               || "",
      refNo:              r.reference_no             || "",
      proposalName:       r.emp_name                 || "",
      wardNo:             r.point2_signal            || "",
      purpose:            r.point3_c_service         || "",
      activities:         r.transfer_office          || "",
      headOffice:         r.point6_a_salary          || "",
      branchOffice:       r.point6_b_grade           || "",
      liability:          r.point9_pan               || "",
      femaleMembers:      "",
      maleMembers:        "",
      totalShareCapital:  r.point13_last_payment_date || "",
      entranceFee:        r.point15_travel_allowance  || "",
      applicantName:      r.applicant_name            || "",
      applicantAddress:   r.applicant_address         || "",
      applicantCitizenship: r.applicant_citizenship_no || "",
      applicantPhone:     r.applicant_phone           || "",
      recommendation_note: r.bodartha               || "",
    }),
  },
  {
    key: "karyabahaak",
    label: "कार्यवाहक तोकिएको",
    api: "/api/forms/acting-ward-officer-assigned",
    badgeClass: "sdl-badge--amber",
    badgeText: "कार्यवाहक",
    mapRow: (r) => ({
      id: r.id,
      _source: "karyabahaak",
      _raw: r,
      date: r.date || "",
      letter_no: r.letter_no || "—",
      subject: r.subject || "कार्यवाहक तोकिएको",
      type: "कार्यवाहक",
      name: r.assigned_member_name || "—",
      location: r.assigned_member_address || "—",
    }),
    buildPreview: (r) => ({
      ...r,
      officerName:        r.assigned_member_name    || "",
      municipalityName:   r.assigned_member_address || "",
      letterNo:           r.letter_no               || "",
      refNo:              r.reference_no             || "",
      proposalName:       r.subject                  || "",
      wardNo:             r.assigned_ward_no         || "",
      purpose:            r.assign_from_date         || "",
      activities:         r.assign_to_date           || "",
      headOffice:         r.signatory_name           || "",
      branchOffice:       r.signatory_position       || "",
      liability:          "",
      femaleMembers:      "",
      maleMembers:        "",
      totalShareCapital:  "",
      entranceFee:        "",
      applicantName:      r.applicant_name           || "",
      applicantAddress:   r.applicant_address        || "",
      applicantCitizenship: r.applicant_citizenship_no || "",
      applicantPhone:     r.applicant_phone          || "",
      recommendation_note: r.bodartha_text          || "",
    }),
  },
];

/* ─────────────────────────── Helpers ─────────────────────────── */

/** Fetch one source API and return mapped rows, or [] on failure. */
const fetchSource = async (source) => {
  try {
    const res = await axios.get(source.api);
    const arr = Array.isArray(res.data) ? res.data : res.data?.data || [];
    return arr.map(source.mapRow);
  } catch {
    return [];
  }
};

/** Build a UTF-8 CSV blob and trigger a download. */
const exportCSV = (rows) => {
  if (!rows.length) { alert("निर्यात गर्न कुनै डेटा छैन।"); return; }
  const header = ["क्र.स.", "पत्र नं.", "मिति", "किसिम", "नाम", "विषय", "स्थान"];
  const csvRows = rows.map((r, i) =>
    [i + 1, r.letter_no, r.date, r.type, r.name, r.subject, r.location]
      .map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`)
      .join(",")
  );
  const csv  = [header.join(","), ...csvRows].join("\r\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url  = URL.createObjectURL(blob);
  const a    = Object.assign(document.createElement("a"), {
    href: url,
    download: `suchana_bibaran_${new Date().toISOString().slice(0, 10)}.csv`,
  });
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};

/* ─────────────────────────── Component ─────────────────────────── */
const SuchanaDetailList = () => {
  const [rows, setRows]         = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  const [fromDate, setFromDate]         = useState("");
  const [toDate, setToDate]             = useState("");
  const [searchName, setSearchName]     = useState("");
  const [activeSource, setActiveSource] = useState("all");

  const [previewRow, setPreviewRow] = useState(null);

  /* Fetch all 3 APIs in parallel */
  const fetchRows = async () => {
    setLoading(true);
    setError("");
    try {
      const results  = await Promise.allSettled(SOURCES.map(fetchSource));
      const combined = results
        .flatMap((r) => (r.status === "fulfilled" ? r.value : []))
        .sort((a, b) => (b.date || "").localeCompare(a.date || ""));
      setRows(combined);
      setFiltered(combined);
    } catch (err) {
      console.error(err);
      setError("डेटा लोड गर्न सकिएन।");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRows(); }, []);

  /* Client-side filters */
  useEffect(() => {
    let out = [...rows];
    if (activeSource !== "all")   out = out.filter((r) => r._source === activeSource);
    if (searchName.trim()) {
      const q = searchName.trim().toLowerCase();
      out = out.filter(
        (r) =>
          r.name?.toLowerCase().includes(q)     ||
          r.letter_no?.toLowerCase().includes(q)||
          r.subject?.toLowerCase().includes(q)  ||
          r.location?.toLowerCase().includes(q)
      );
    }
    if (fromDate) out = out.filter((r) => r.date && r.date.slice(0, 10) >= fromDate);
    if (toDate)   out = out.filter((r) => r.date && r.date.slice(0, 10) <= toDate);
    setFiltered(out);
  }, [rows, activeSource, searchName, fromDate, toDate]);

  /* Open preview modal */
  const openPreview = (mappedRow) => {
    const src = SOURCES.find((s) => s.key === mappedRow._source);
    if (src) setPreviewRow(src.buildPreview(mappedRow._raw));
  };

  /* Count helper */
  const countFor = (key) =>
    key === "all" ? rows.length : rows.filter((r) => r._source === key).length;

  return (
    <>
      <style>{styles}</style>

      <div className="coop-page">

        {/* Source tabs */}
        <div className="sdl-source-bar">
          <button
            className={`sdl-source-btn ${activeSource === "all" ? "active" : ""}`}
            onClick={() => setActiveSource("all")}
          >
            सबै <span className="sdl-count">{countFor("all")}</span>
          </button>
          {SOURCES.map((s) => (
            <button
              key={s.key}
              className={`sdl-source-btn ${activeSource === s.key ? "active" : ""}`}
              onClick={() => setActiveSource(s.key)}
            >
              {s.label} <span className="sdl-count">{countFor(s.key)}</span>
            </button>
          ))}
        </div>

        {/* Filter bar */}
        <div className="coop-filter-bar">
          <div className="coop-filters">
            <div className="coop-filter-group">
              <label>मिति देखि</label>
              <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
            </div>
            <div className="coop-filter-group">
              <label>मिति सम्म</label>
              <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
            </div>
            <div className="coop-filter-group wide">
              <label>नाम / पत्र नं. / विषय</label>
              <input
                type="text"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                placeholder="नाम / पत्र नं. / विषय खोज्नुहोस्"
              />
            </div>
          </div>
          <button className="coop-search-btn" onClick={fetchRows} aria-label="Search">🔍</button>
        </div>

        {/* Table */}
        <div className="coop-table-wrapper">
          {loading ? (
            <div className="coop-state-msg">Loading...</div>
          ) : error ? (
            <div className="coop-state-msg coop-error">{error}</div>
          ) : filtered.length === 0 ? (
            <div className="coop-state-msg">कुनै रेकर्ड फेला परेन।</div>
          ) : (
            <div className="coop-scroll">
              <table className="coop-table">
                <thead>
                  <tr>
                    <th>क्र.स.</th>
                    <th>पत्र नं.</th>
                    <th>मिति</th>
                    <th>किसिम</th>
                    <th>नाम</th>
                    <th>विषय</th>
                    <th>स्थान / कार्यालय</th>
                    <th>स्क्यान</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((row, index) => {
                    const src = SOURCES.find((s) => s.key === row._source);
                    return (
                      <tr
                        key={`${row._source}-${row.id ?? index}`}
                        className={index % 2 === 0 ? "even-row" : "odd-row"}
                      >
                        <td data-label="क्र.स.">{index + 1}</td>
                        <td data-label="पत्र नं.">{row.letter_no}</td>
                        <td data-label="मिति">{row.date || "—"}</td>
                        <td data-label="किसिम" className="center-cell">
                          {src && (
                            <span className={`sdl-badge ${src.badgeClass}`}>
                              {src.badgeText}
                            </span>
                          )}
                        </td>
                        <td data-label="नाम">{row.name}</td>
                        <td data-label="विषय" className="ellipsis">
                          {(row.subject || "—").slice(0, 40)}
                        </td>
                        <td data-label="स्थान">{row.location}</td>
                        <td data-label="स्क्यान" className="center-cell">
                          <button
                            className="eye-btn"
                            onClick={() => openPreview(row)}
                            title="प्रिन्ट पूर्वावलोकन"
                          >
                            👁
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Bottom bar */}
        <div className="coop-bottom-bar">
          <button onClick={() => exportCSV(filtered)} className="coop-export-btn">📥 Export CSV</button>
          <button onClick={() => window.print()}       className="coop-print-btn">🖨 Print</button>
        </div>

        <footer className="coop-footer">© सर्वाधिकार सुरक्षित नगरपालिका</footer>

        {/* Print preview modal */}
        {previewRow && (
          <PrintPreviewModal row={previewRow} onClose={() => setPreviewRow(null)} />
        )}
      </div>
    </>
  );
};

export default SuchanaDetailList;