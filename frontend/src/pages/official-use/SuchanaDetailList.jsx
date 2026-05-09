import React, { useEffect, useState } from "react";
import "./SuchanaDetailList.css";
import PrintPreviewModal from "../../components/PrintPreviewModal";
import axios from "../../utils/axiosInstance";

/* ─────────────────────────────────────────────
   Source definitions — one per form type.
   mapRow      → common table display shape
   buildPreview → maps raw fields → PrintPreviewModal props
───────────────────────────────────────────── */
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
      officerName: r.requested_person_name || "",
      municipalityName: r.transfer_to_local || "",
      letterNo: r.letter_no || "",
      refNo: r.reference_no || "",
      proposalName: r.employee_name || "",
      wardNo: r.permanent_address || "",
      purpose: r.service_group || "",
      activities: r.transfer_local || "",
      headOffice: r.appointing_local || "",
      branchOffice: r.transfer_to_position || "",
      liability: r.citizenship_no || "",
      femaleMembers: "",
      maleMembers: "",
      totalShareCapital: r.dob || "",
      entranceFee: r.phone || "",
      applicantName: r.applicant_name || "",
      applicantAddress: r.applicant_address || "",
      applicantCitizenship: r.applicant_citizenship_no || "",
      applicantPhone: r.applicant_phone || "",
      recommendation_note: r.notes || "",
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
      officerName: r.recipient_name || "",
      municipalityName: r.recipient_address || "",
      letterNo: r.letter_no || "",
      refNo: r.reference_no || "",
      proposalName: r.emp_name || "",
      wardNo: r.point2_signal || "",
      purpose: r.point3_c_service || "",
      activities: r.transfer_office || "",
      headOffice: r.point6_a_salary || "",
      branchOffice: r.point6_b_grade || "",
      liability: r.point9_pan || "",
      femaleMembers: "",
      maleMembers: "",
      totalShareCapital: r.point13_last_payment_date || "",
      entranceFee: r.point15_travel_allowance || "",
      applicantName: r.applicant_name || "",
      applicantAddress: r.applicant_address || "",
      applicantCitizenship: r.applicant_citizenship_no || "",
      applicantPhone: r.applicant_phone || "",
      recommendation_note: r.bodartha || "",
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
      officerName: r.assigned_member_name || "",
      municipalityName: r.assigned_member_address || "",
      letterNo: r.letter_no || "",
      refNo: r.reference_no || "",
      proposalName: r.subject || "",
      wardNo: r.assigned_ward_no || "",
      purpose: r.assign_from_date || "",
      activities: r.assign_to_date || "",
      headOffice: r.signatory_name || "",
      branchOffice: r.signatory_position || "",
      liability: "",
      femaleMembers: "",
      maleMembers: "",
      totalShareCapital: "",
      entranceFee: "",
      applicantName: r.applicant_name || "",
      applicantAddress: r.applicant_address || "",
      applicantCitizenship: r.applicant_citizenship_no || "",
      applicantPhone: r.applicant_phone || "",
      recommendation_note: r.bodartha_text || "",
    }),
  },
];

/* ═══════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════ */
const SuchanaDetailList = () => {
  const [rows, setRows]         = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  const [fromDate, setFromDate]       = useState("");
  const [toDate, setToDate]           = useState("");
  const [searchName, setSearchName]   = useState("");
  const [activeSource, setActiveSource] = useState("all");

  const [previewRow, setPreviewRow] = useState(null);

  /* ── Fetch all 3 APIs in parallel ── */
  const fetchRows = async () => {
    setLoading(true);
    setError("");
    try {
      const results = await Promise.allSettled(
        SOURCES.map((s) =>
          axios.get(s.api).then((res) => {
            const arr = Array.isArray(res.data)
              ? res.data
              : res.data?.data || [];
            return arr.map(s.mapRow);
          })
        )
      );

      const combined = results.flatMap((r) =>
        r.status === "fulfilled" ? r.value : []
      );

      // Newest first
      combined.sort((a, b) => (b.date || "").localeCompare(a.date || ""));

      setRows(combined);
      setFiltered(combined);
    } catch (err) {
      console.error(err);
      setError("डेटा लोड गर्न सकिएन।");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRows();
  }, []);

  /* ── Client-side filters ── */
  useEffect(() => {
    let out = [...rows];

    if (activeSource !== "all") {
      out = out.filter((r) => r._source === activeSource);
    }
    if (searchName.trim()) {
      const q = searchName.trim().toLowerCase();
      out = out.filter(
        (r) =>
          r.name?.toLowerCase().includes(q) ||
          r.letter_no?.toLowerCase().includes(q) ||
          r.subject?.toLowerCase().includes(q) ||
          r.location?.toLowerCase().includes(q)
      );
    }
    if (fromDate) {
      out = out.filter((r) => r.date && r.date.slice(0, 10) >= fromDate);
    }
    if (toDate) {
      out = out.filter((r) => r.date && r.date.slice(0, 10) <= toDate);
    }

    setFiltered(out);
  }, [rows, activeSource, searchName, fromDate, toDate]);

  /* ── Open preview modal ── */
  const openPreview = (mappedRow) => {
    const src = SOURCES.find((s) => s.key === mappedRow._source);
    if (!src) return;
    setPreviewRow(src.buildPreview(mappedRow._raw));
  };

  /* ── CSV Export ── */
  const handleExport = () => {
    if (!filtered.length) return alert("निर्यात गर्न कुनै डेटा छैन।");
    const header = ["क्र.स.", "पत्र नं.", "मिति", "किसिम", "नाम", "विषय", "स्थान"];
    const csvRows = filtered.map((r, i) =>
      [i + 1, r.letter_no, r.date, r.type, r.name, r.subject, r.location]
        .map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`)
        .join(",")
    );
    const csv = [header.join(","), ...csvRows].join("\r\n");
    const BOM = "\uFEFF";
    const blob = new Blob([BOM + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `suchana_bibaran_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  /* ── Count helper ── */
  const countFor = (key) =>
    key === "all"
      ? rows.length
      : rows.filter((r) => r._source === key).length;

  /* ── Render ── */
  return (
    <div className="coop-page">

      {/* ── Source Tabs ── */}
      <div className="sdl-source-bar">
        <button
          className={`sdl-source-btn ${activeSource === "all" ? "active" : ""}`}
          onClick={() => setActiveSource("all")}
        >
          सबै
          <span className="sdl-count">{countFor("all")}</span>
        </button>
        {SOURCES.map((s) => (
          <button
            key={s.key}
            className={`sdl-source-btn ${activeSource === s.key ? "active" : ""}`}
            onClick={() => setActiveSource(s.key)}
          >
            {s.label}
            <span className="sdl-count">{countFor(s.key)}</span>
          </button>
        ))}
      </div>

      {/* ── Filter Bar — same as GovOrganizationRegRecommendation ── */}
      <div className="coop-filter-bar">
        <div className="coop-filters">
          <div className="coop-filter-group">
            <label>मिति देखि</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
          <div className="coop-filter-group">
            <label>मिति सम्म</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
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
        <button
          className="coop-search-btn"
          onClick={fetchRows}
          aria-label="Search"
        >
          🔍
        </button>
      </div>

      {/* ── Table wrapper — same as GovOrganizationRegRecommendation ── */}
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

      {/* ── Bottom bar — same as GovOrganizationRegRecommendation ── */}
      <div className="coop-bottom-bar">
        <button onClick={handleExport} className="coop-export-btn">
          📥 Export CSV
        </button>
        <button onClick={() => window.print()} className="coop-print-btn">
          🖨 Print
        </button>
      </div>

      <footer className="coop-footer">
        © सर्वाधिकार सुरक्षित नगरपालिका
      </footer>

      {/* ── Print Preview Modal ── */}
      {previewRow && (
        <PrintPreviewModal
          row={previewRow}
          onClose={() => setPreviewRow(null)}
        />
      )}
    </div>
  );
};

export default SuchanaDetailList;