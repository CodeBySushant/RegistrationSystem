import React, { useEffect, useState } from 'react';
import './DailyWorkPerformanceList.css';

const DailyWorkPerformanceList = () => {
  const [data, setData] = useState([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [loading, setLoading] = useState(false);

  const baseUrl = '/api/forms/daily-work-performance-list';

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(baseUrl);
      if (!res.ok) throw new Error('Failed to fetch');
      const json = await res.json();
      setData(json);
    } catch (e) {
      console.error('Fetch error', e);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = () => {
    // Basic client-side filtering by date strings (you can implement server-side later)
    if (!fromDate && !toDate) { fetchData(); return; }
    const filtered = data.filter(d => {
      const date = d.report_date || d.reportDate || '';
      if (fromDate && date < fromDate) return false;
      if (toDate && date > toDate) return false;
      return true;
    });
    setData(filtered);
  };

  const handleAddRecord = () => {
    // quick demo: open a prompt and POST a minimal record (replace with proper form later)
    const date = prompt('Enter report date (e.g. २०८२-०८-०६):');
    if (!date) return;
    const totalForms = parseInt(prompt('Total forms:'), 10) || 0;
    const totalAmount = prompt('Total amount (string):', '०');
    const department = prompt('Department:', 'वडा नं. १');
    const task = prompt('Task:', 'सिफारिस');

    const payload = {
      report_date: date,
      total_forms: totalForms,
      total_amount: totalAmount,
      department,
      task
    };

    fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(r => r.json())
      .then(result => {
        alert('Created id: ' + result.id);
        fetchData();
      })
      .catch(err => {
        console.error('Create error', err);
        alert('Create failed');
      });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('के तपाईं यो रेकर्ड मेटाउन चाहनुहुन्छ?')) return;
    try {
      const res = await fetch(`${baseUrl}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      await fetchData();
    } catch (e) {
      console.error(e);
      alert('Delete failed');
    }
  };

  const handleExcelExport = () => {
    // Placeholder: convert current data to CSV and trigger download
    if (!data.length) { alert('No data to export'); return; }
    const header = ['report_date','total_forms','total_amount','department','task'];
    const rows = data.map(r => [
      r.report_date ?? r.reportDate ?? '',
      r.total_forms ?? '',
      r.total_amount ?? '',
      r.department ?? '',
      r.task ?? ''
    ]);
    const csv = [header, ...rows].map(r => r.map(cell => `"${String(cell).replace(/"/g,'""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `daily-work-performance-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="daily-work-container">
      <div className="top-bar-header">
        <h1>दैनिक कार्य सम्पादनका सूचीहरू ।</h1>
        <button className="back-button" onClick={() => window.history.back()}>← Back</button>
      </div>

      <div className="actions-bar">
        <button className="excel-export-btn" onClick={handleExcelExport}>एक्सेल निर्यात</button>
        <button className="add-record-btn" onClick={handleAddRecord}>+ नयाँ रेकर्ड थप्नुहोस</button>
      </div>

      <div className="search-filter-bar">
        <div className="date-input-group">
          <input 
            type="text"
            placeholder="मिति देखि"
            className="filter-input"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>

        <div className="date-input-group">
          <input 
            type="text"
            placeholder="मिति सम्म"
            className="filter-input"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>

        <button className="search-btn" onClick={handleSearch}>🔍</button>
      </div>

      <div className="data-table-container">
        {loading ? (
          <div style={{padding:20}}>लोड हुँदैछ...</div>
        ) : (
          <table className="performance-table">
            <thead>
              <tr>
                <th>मिति</th>
                <th>कुल फारम</th>
                <th>कुल रकम रू</th>
                <th>वडा नं / विभाग</th>
                <th>कार्य</th>
                <th>कार्य (Delete)</th>
              </tr>
            </thead>

            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                    कुनै तथ्याङ्क फेला परेन।
                  </td>
                </tr>
              ) : data.map(item => (
                <tr key={item.id}>
                  <td>{item.report_date}</td>
                  <td>{item.total_forms}</td>
                  <td>{item.total_amount}</td>
                  <td>{item.department}</td>
                  <td>{item.task}</td>
                  <td>
                    <button onClick={() => handleDelete(item.id)} style={{color:'red'}}>मेटाउनुहोस्</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="copyright-footer">
        © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
      </div>
    </div>
  );
};

export default DailyWorkPerformanceList;
