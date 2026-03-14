// BhawanNirmanSampanna.jsx
import React, { useState } from "react";
import "./BhawanNirmanSampanna.css";

const emptyFloorRow = () => ({ label: "", value: "" });
const emptyTransferRow = () => ({ date: "", name: "", recommender: "", approver: "" });

export default function BhawanNirmanSampanna() {
  const [form, setForm] = useState({
    date_nep: new Date().toISOString().slice(0, 10),
    owner_name: "",
    municipality: "नागार्जुन",
    ward_no: "",
    tole: "",
    construction_note: "",
    land_prev_local: "",
    land_prev_ward: "",
    land_prev_halqa: "",
    land_tol: "",
    land_kitta: "",
    land_area: "",
    land_region: "",
    land_subregion: "",

    boundary_east: "",
    boundary_west: "",
    boundary_north: "",
    boundary_south: "",

    land_owner: "",
    house_owner: "",
    owner_parent: "",

    construction_type: "",
    map_pass_no: "",
    map_pass_date: "२०८२-०८-०६",
    regularized_date: "२०८२-०८-०६",
    regularized_floor_count: "",

    purpose: "",

    floor_details: [
      { key: "coverage", label: "कभरेज वर्ग फिट / वर्ग मि", value: "" },
      { key: "basement", label: "भूमिगत वा अर्ध भूमिगत तला", value: "" },
      { key: "ground", label: "जमिन तला", value: "" },
      { key: "first", label: "पहिलो तला", value: "" },
      { key: "second", label: "दोस्रो तला", value: "" },
      { key: "third", label: "तेस्रो तला", value: "" },
      { key: "fourth", label: "चौथो तला", value: "" },
      { key: "total", label: "जम्मा क्षेत्रफल", value: "" }
    ],

    height: "",
    setback_distance: "",
    setback_value: "",
    electric_distance: "",
    electric_left: "",
    electric_volt: "",
    river_distance: "",
    river_left: "",
    river_name: "",
    septic: "",
    remarks: "",

    transfers1: [emptyTransferRow()],
    transfers2: [ { from_name: "", to_name: "", recommender: "", approver: "" } ],

    applicant_name: "",
    applicant_address: "",
    applicant_citizenship_no: "",
    applicant_phone: "",

    signature_owner: "",
    signature_faatwala: "",
    signature_inspector: "",
    signature_engineer: "",
    signature_issuer: ""
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const setField = (k, v) => setForm(p => ({ ...p, [k]: v }));

  // floor details handlers
  const updateFloor = (idx, value) => {
    setForm(p => {
      const fd = p.floor_details.slice();
      fd[idx] = { ...fd[idx], value };
      return { ...p, floor_details: fd };
    });
  };

  // transfers table handlers
  const addTransfer1 = () => setForm(p => ({ ...p, transfers1: [...p.transfers1, emptyTransferRow()] }));
  const updateTransfer1 = (idx, key, value) => {
    setForm(p => {
      const t = p.transfers1.slice();
      t[idx] = { ...t[idx], [key]: value };
      return { ...p, transfers1: t };
    });
  };
  const removeTransfer1 = (idx) => setForm(p => ({ ...p, transfers1: p.transfers1.filter((_, i) => i !== idx) }));

  const addTransfer2 = () => setForm(p => ({ ...p, transfers2: [...p.transfers2, { from_name: "", to_name: "", recommender: "", approver: "" }] }));
  const updateTransfer2 = (idx, key, value) => {
    setForm(p => {
      const t = p.transfers2.slice();
      t[idx] = { ...t[idx], [key]: value };
      return { ...p, transfers2: t };
    });
  };
  const removeTransfer2 = (idx) => setForm(p => ({ ...p, transfers2: p.transfers2.filter((_, i) => i !== idx) }));

  const validate = () => {
    if (!form.ward_no) return "कृपया वडा नं भर्नुहोस्।";
    if (!form.owner_name) return "कृपया घर/जग्गा मालिकको नाम भर्नुहोस्।";
    if (!form.applicant_name) return "कृपया निवेदकको नाम भर्नुहोस्।";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(""); setErr("");
    const v = validate();
    if (v) { setErr(v); return; }
    setLoading(true);
    // prepare payload
    const payload = {
      date_nep: form.date_nep,
      owner_name: form.owner_name,
      municipality: form.municipality,
      ward_no: form.ward_no,
      tole: form.tole,
      construction_note: form.construction_note,

      land_prev_local: form.land_prev_local,
      land_prev_ward: form.land_prev_ward,
      land_prev_halqa: form.land_prev_halqa,
      land_tol: form.land_tol,
      land_kitta: form.land_kitta,
      land_area: form.land_area,
      land_region: form.land_region,
      land_subregion: form.land_subregion,

      boundary_east: form.boundary_east,
      boundary_west: form.boundary_west,
      boundary_north: form.boundary_north,
      boundary_south: form.boundary_south,

      land_owner: form.land_owner,
      house_owner: form.house_owner,
      owner_parent: form.owner_parent,

      construction_type: form.construction_type,
      map_pass_no: form.map_pass_no,
      map_pass_date: form.map_pass_date,
      regularized_date: form.regularized_date,
      regularized_floor_count: form.regularized_floor_count,

      purpose: form.purpose,

      // arrays as JSON strings
      floor_details: JSON.stringify(form.floor_details),
      height: form.height,
      setback_distance: form.setback_distance,
      setback_value: form.setback_value,
      electric_distance: form.electric_distance,
      electric_left: form.electric_left,
      electric_volt: form.electric_volt,
      river_distance: form.river_distance,
      river_left: form.river_left,
      river_name: form.river_name,
      septic: form.septic,
      remarks: form.remarks,

      transfers1: JSON.stringify(form.transfers1),
      transfers2: JSON.stringify(form.transfers2),

      applicant_name: form.applicant_name,
      applicant_address: form.applicant_address,
      applicant_citizenship_no: form.applicant_citizenship_no,
      applicant_phone: form.applicant_phone,

      signature_owner: form.signature_owner,
      signature_faatwala: form.signature_faatwala,
      signature_inspector: form.signature_inspector,
      signature_engineer: form.signature_engineer,
      signature_issuer: form.signature_issuer
    };

    try {
      const res = await fetch("/api/forms/bhawan-nirman-sampanna", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.error || "Server error");
      setMsg(`रेकर्ड सेभ भयो (ID: ${data.id})`);
      // keep values or reset
    } catch (e) {
      setErr(e.message || "अनजान त्रुटि");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bhawan-nirman-container">
      <form onSubmit={handleSubmit}>
        <div className="top-bar-title">
          भवन निर्माण सम्पन्न प्रमाण-पत्र
          <span className="top-right-bread">घर/जग्गा &gt; भवन निर्माण सम्पन्न प्रमाण-पत्र</span>
        </div>

        <div className="form-header-section">
          <div className="header-logo"><img src="/nepallogo.svg" alt="Nepal Emblem" /></div>
          <div className="header-text">
            <h1 className="municipality-name red-text">नागार्जुन नगरपालिका</h1>
            <h2 className="ward-title red-text">नगर कार्यपालिकाको कार्यालय</h2>
            <p className="address-text red-text">नागार्जुन, काठमाडौँ</p>
            <p className="province-text red-text">भूमि व्यवस्थापन तथा भवन नियमन शाखा</p>
            <p className="province-text red-text">भवन तथा भवन संहिता र मापदण्ड कार्यान्वयन उपशाखा</p>
            <h3 className="certificate-title red-text">भवन निर्माण सम्पन्न प्रमाण-पत्र</h3>
          </div>
        </div>

        <div className="date-section">
          <p>मिति : <span className="bold-text">{form.date_nep}</span></p>
        </div>

        <div className="form-body">
          <div className="intro-line">
            श्रीमान् / श्रीमती / सुश्री
            <input value={form.owner_name} onChange={e=>setField("owner_name", e.target.value)} type="text" className="dotted-input medium-input" />
            को काठमाडौँ
            <input value={form.municipality} onChange={e=>setField("municipality", e.target.value)} type="text" className="dotted-input medium-input" />
            नगरपालिका वडा नं
            <input value={form.ward_no} onChange={e=>setField("ward_no", e.target.value)} type="text" className="dotted-input tiny-input" required />
            टोल/गाउँमा
            <input value={form.tole} onChange={e=>setField("tole", e.target.value)} type="text" className="dotted-input long-input" />
            निम्न बमोजिम
            <input value={form.construction_note} onChange={e=>setField("construction_note", e.target.value)} type="text" className="dotted-input medium-input" />
            निर्माण कार्य पुरा भएको प्रमाणित गरिएको छ ।
          </div>

          <div className="details-list">
            <div className="detail-item">
              <span className="item-number">(१)</span>
              <label>जग्गाको विवरण :</label>
            </div>

            <div className="sub-detail-row">
              <label>साविक गा.वि.स. / न.पा.</label>
              <input value={form.land_prev_local} onChange={e=>setField("land_prev_local", e.target.value)} type="text" className="dotted-input medium-input" />
              <label>वडा नं</label>
              <input value={form.land_prev_ward} onChange={e=>setField("land_prev_ward", e.target.value)} type="text" className="dotted-input tiny-input" />
              <label>हल्का नं. / गा.पा. / वडा नं</label>
              <input value={form.land_prev_halqa} onChange={e=>setField("land_prev_halqa", e.target.value)} type="text" className="dotted-input medium-input" />
              <label>टोल</label>
              <input value={form.land_tol} onChange={e=>setField("land_tol", e.target.value)} type="text" className="dotted-input medium-input" />
            </div>

            <div className="sub-detail-row">
              <label>कित्ता नं</label>
              <input value={form.land_kitta} onChange={e=>setField("land_kitta", e.target.value)} type="text" className="dotted-input small-input" />
              <label>क्षेत्रफल</label>
              <input value={form.land_area} onChange={e=>setField("land_area", e.target.value)} type="text" className="dotted-input medium-input" />
              <label>क्षेत्र</label>
              <input value={form.land_region} onChange={e=>setField("land_region", e.target.value)} type="text" className="dotted-input medium-input" />
              <label>उपक्षेत्र</label>
              <input value={form.land_subregion} onChange={e=>setField("land_subregion", e.target.value)} type="text" className="dotted-input medium-input" />
            </div>

            <div className="detail-item">
              <span className="item-number">(२)</span>
              <label>चार किल्ला:</label>
              पूर्व <input value={form.boundary_east} onChange={e=>setField("boundary_east", e.target.value)} type="text" className="dotted-input medium-input" />
              पश्चिम <input value={form.boundary_west} onChange={e=>setField("boundary_west", e.target.value)} type="text" className="dotted-input medium-input" />
              उत्तर <input value={form.boundary_north} onChange={e=>setField("boundary_north", e.target.value)} type="text" className="dotted-input medium-input" />
              दक्षिण <input value={form.boundary_south} onChange={e=>setField("boundary_south", e.target.value)} type="text" className="dotted-input medium-input" />
            </div>

            <div className="detail-item">
              <span className="item-number">(३)</span>
              <label>जग्गा धनीको नाम, थर, वतन :</label>
              <input value={form.land_owner} onChange={e=>setField("land_owner", e.target.value)} type="text" className="dotted-input long-input" />
            </div>

            <div className="detail-item">
              <span className="item-number">(४)</span>
              <label>घर धनीको नाम थर, वतन :</label>
              <input value={form.house_owner} onChange={e=>setField("house_owner", e.target.value)} type="text" className="dotted-input long-input" />
            </div>

            <div className="detail-item">
              <span className="item-number">(५)</span>
              <label>घर धनीको बाबु/पतिको नाम, थर, वतन :</label>
              <input value={form.owner_parent} onChange={e=>setField("owner_parent", e.target.value)} type="text" className="dotted-input long-input" />
            </div>

            <div className="detail-item">
              <span className="item-number">(६)</span>
              <label>निर्माणको किसिम :</label>
              <input value={form.construction_type} onChange={e=>setField("construction_type", e.target.value)} type="text" className="dotted-input long-input" />
            </div>

            <div className="detail-item">
              <span className="item-number">(७)</span>
              <label>(क) नक्सा पास प्रमाण-पत्र नं</label>
              <input value={form.map_pass_no} onChange={e=>setField("map_pass_no", e.target.value)} type="text" className="dotted-input medium-input" />
              <label>मिति :</label>
              <span className="bold-text">{form.map_pass_date}</span>
            </div>

            <div className="sub-detail-row pl-20">
              <label>(ख) तला थप गरी बनाएको भए नियमित गरिएको मिति</label>
              <input value={form.regularized_date} onChange={e=>setField("regularized_date", e.target.value)} type="text" className="dotted-input medium-input" />
              <label>सम्मन तला</label>
              <input value={form.regularized_floor_count} onChange={e=>setField("regularized_floor_count", e.target.value)} type="text" className="dotted-input small-input" />
            </div>

            <div className="detail-item">
              <span className="item-number">(८)</span>
              <label>भवनको प्रयोजन :</label>
              <input value={form.purpose} onChange={e=>setField("purpose", e.target.value)} type="text" className="dotted-input long-input" />
            </div>

            <div className="detail-item">
              <span className="item-number">(९)</span>
              <label>पास नक्सा अनुसार गाउने निर्माणको विवरण</label>
            </div>

            <div className="floor-details-grid pl-20">
              {form.floor_details.map((r, i) => (
                <div key={r.key || i} className="grid-row">
                  <label>{r.label}</label>
                  <input value={r.value} onChange={e=>updateFloor(i, e.target.value)} type="text" className="dotted-input" />
                </div>
              ))}
            </div>

            <div className="detail-item">
              <span className="item-number">(१०)</span>
              <label>उचाई फिट/ मीटर :</label>
              <input value={form.height} onChange={e=>setField("height", e.target.value)} type="text" className="dotted-input medium-input" />
            </div>

            <div className="detail-item">
              <span className="item-number">(११)</span>
              <label>सेट ब्याक केन्द्र रेखाबाट छाड्नुपर्ने दुरी</label>
              <input value={form.setback_distance} onChange={e=>setField("setback_distance", e.target.value)} type="text" className="dotted-input small-input" />
              <label>सेट ब्याक छोड्को दुरी</label>
              <input value={form.setback_value} onChange={e=>setField("setback_value", e.target.value)} type="text" className="dotted-input small-input" />
            </div>

            <div className="detail-item">
              <span className="item-number">(१२)</span>
              <label>बिजुलीको तार नजिक भएमा छोड्नुपर्ने दुरी</label>
              <input value={form.electric_distance} onChange={e=>setField("electric_distance", e.target.value)} type="text" className="dotted-input small-input" />
              <label>छाडेको दुरी</label>
              <input value={form.electric_left} onChange={e=>setField("electric_left", e.target.value)} type="text" className="dotted-input small-input" />
              <label>भोल्ट</label>
              <input value={form.electric_volt} onChange={e=>setField("electric_volt", e.target.value)} type="text" className="dotted-input small-input" />
            </div>

            <div className="detail-item">
              <span className="item-number">(१३)</span>
              <label>नदी किनार भए त्यसको लागि छोड्नुपर्ने दुरी</label>
              <input value={form.river_distance} onChange={e=>setField("river_distance", e.target.value)} type="text" className="dotted-input small-input" />
              <label>छाडेको दुरी</label>
              <input value={form.river_left} onChange={e=>setField("river_left", e.target.value)} type="text" className="dotted-input small-input" />
              <label>नदीको नाम</label>
              <input value={form.river_name} onChange={e=>setField("river_name", e.target.value)} type="text" className="dotted-input medium-input" />
            </div>

            <div className="detail-item">
              <span className="item-number">(१४)</span>
              <label>निकास सम्बन्धि (ढल वा सेफ्टी ट्यांकी)</label>
              <input value={form.septic} onChange={e=>setField("septic", e.target.value)} type="text" className="dotted-input long-input" />
            </div>

            <div className="detail-item">
              <span className="item-number">(१५)</span>
              <label>अन्य कुनै विवरण</label>
              <input value={form.remarks} onChange={e=>setField("remarks", e.target.value)} type="text" className="dotted-input long-input" />
            </div>
          </div>

          <div className="signatures-grid mt-40">
            <div className="sig-box"><div className="line"></div><p>घर धनीको सही</p></div>
            <div className="sig-box"><div className="line"></div><p>फाँटवालाको सही</p></div>
            <div className="sig-box"><div className="line"></div><p>स्थलगत निरिक्षकको सही</p></div>
            <div className="sig-box"><div className="line"></div><p>सिफारिस गर्नेको सही (इन्जिनियर)</p></div>
            <div className="sig-box"><div className="line"></div><p>प्रमाणपत्र दिनेको सही</p></div>
          </div>

          <div className="bodartha-section mt-30">
            <p className="bold-text">बोधार्थ:</p>
            <p>श्री ....................................................</p>
            <p>.......................वडा .........................</p>
            <p>..........................काठमाडौँ</p>
          </div>

          <div className="transfer-tables-section mt-20">
            <p className="center-text bold-text">नामसारी गर्ने घर/जग्गाको विवरण</p>
            <table className="transfer-table">
              <thead>
                <tr>
                  <th>क्र.स.</th><th>मिति</th><th>नाम</th><th>सिफारिस गर्ने</th><th>स्वीकृत गर्ने</th><th></th>
                </tr>
              </thead>
              <tbody>
                {form.transfers1.map((t, i) => (
                  <tr key={i}>
                    <td>{i+1}</td>
                    <td><input value={t.date} onChange={e=>updateTransfer1(i, "date", e.target.value)} className="table-input" /></td>
                    <td><input value={t.name} onChange={e=>updateTransfer1(i, "name", e.target.value)} className="table-input" /></td>
                    <td><input value={t.recommender} onChange={e=>updateTransfer1(i, "recommender", e.target.value)} className="table-input" /></td>
                    <td><input value={t.approver} onChange={e=>updateTransfer1(i, "approver", e.target.value)} className="table-input" /></td>
                    <td className="action-cell">
                      <button type="button" onClick={addTransfer1} className="add-btn">+</button>
                      {form.transfers1.length>1 && <button type="button" onClick={()=>removeTransfer1(i)}>-</button>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="center-text bold-text mt-10">नामसारी गर्ने घर/जग्गाको विवरण</p>
            <table className="transfer-table">
              <thead>
                <tr>
                  <th>क्र.स.</th><th>नामसारी गरिदिनेको नाम, थर</th><th>नामसारी लिनेको नाम, थर</th><th>सिफारिस गर्ने</th><th>स्वीकृत गर्ने</th><th></th>
                </tr>
              </thead>
              <tbody>
                {form.transfers2.map((t, i) => (
                  <tr key={i}>
                    <td>{i+1}</td>
                    <td><input value={t.from_name} onChange={e=>updateTransfer2(i, "from_name", e.target.value)} className="table-input" /></td>
                    <td><input value={t.to_name} onChange={e=>updateTransfer2(i, "to_name", e.target.value)} className="table-input" /></td>
                    <td><input value={t.recommender} onChange={e=>updateTransfer2(i, "recommender", e.target.value)} className="table-input" /></td>
                    <td><input value={t.approver} onChange={e=>updateTransfer2(i, "approver", e.target.value)} className="table-input" /></td>
                    <td className="action-cell">
                      <button type="button" onClick={addTransfer2} className="add-btn">+</button>
                      {form.transfers2.length>1 && <button type="button" onClick={()=>removeTransfer2(i)}>-</button>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="applicant-details-box">
            <h3>निवेदकको विवरण</h3>
            <div className="details-grid">
              <div className="detail-group">
                <label>निवेदकको नाम</label>
                <input value={form.applicant_name} onChange={e=>setField("applicant_name", e.target.value)} type="text" className="detail-input bg-gray" />
              </div>
              <div className="detail-group">
                <label>निवेदकको ठेगाना</label>
                <input value={form.applicant_address} onChange={e=>setField("applicant_address", e.target.value)} type="text" className="detail-input bg-gray" />
              </div>
              <div className="detail-group">
                <label>निवेदकको नागरिकता नं.</label>
                <input value={form.applicant_citizenship_no} onChange={e=>setField("applicant_citizenship_no", e.target.value)} type="text" className="detail-input bg-gray" />
              </div>
              <div className="detail-group">
                <label>निवेदकको फोन नं.</label>
                <input value={form.applicant_phone} onChange={e=>setField("applicant_phone", e.target.value)} type="text" className="detail-input bg-gray" />
              </div>
            </div>
          </div>

          <div className="form-footer">
            <button className="save-print-btn" type="submit" disabled={loading}>{loading ? "सेभ हुँदैछ..." : "रेकर्ड सेभ र प्रिन्ट गर्नुहोस्"}</button>
          </div>

          {msg && <div className="success-message" style={{marginTop:12}}>{msg}</div>}
          {err && <div className="error-message" style={{marginTop:12}}>{err}</div>}

          <div className="copyright-footer">© सर्वाधिकार सुरक्षित नागार्जुन नगरपालिका</div>
        </div>
      </form>
    </div>
  );
}
