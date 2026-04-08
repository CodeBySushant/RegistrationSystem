// src/pages/daily-work-execute/DailyWorkPerformanceList.jsx
import React, { useEffect, useState, useCallback } from 'react';
import './DailyWorkPerformanceList.css';
import { MUNICIPALITY } from "../../config/municipalityConfig";
import {
  getFreshSubmissions,
  deleteSubmission,
  timeLeftLabel,
} from '../../utils/submissionTracker';

const DailyWorkPerformanceList = ({ setActiveLink }) => {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchText, setSearchText] = useState('');

  // Load fresh submissions from localStorage (drops anything older than 24h automatically)
  const reload = useCallback(() => {
    const fresh = getFreshSubmissions();
    // Newest first
    fresh.sort((a, b) => b._submittedAt - a._submittedAt);
    setData(fresh);
    setFiltered(fresh);
  }, []);

  // Load on mount
  useEffect(() => {
    reload();
  }, [reload]);

  // Auto-refresh every 60 seconds so expired rows disappear in real time
  useEffect(() => {
    const interval = setInterval(reload, 60_000);
    return () => clearInterval(interval);
  }, [reload]);

  // Search/filter by form name
  const handleSearch = () => {
    if (!searchText.trim()) {
      setFiltered(data);
      return;
    }
    const lower = searchText.toLowerCase();
    setFiltered(
      data.filter(item =>
        (item.formName || '').toLowerCase().includes(lower) ||
        Object.values(item).some(v =>
          String(v).toLowerCase().includes(lower)
        )
      )
    );
  };

  // Reset search
  const handleReset = () => {
    setSearchText('');
    setFiltered(data);
  };

  // Delete a single entry
  const handleDelete = (id) => {
    if (!window.confirm('के तपाईं यो रेकर्ड मेटाउन चाहनुहुन्छ?')) return;
    deleteSubmission(id);
    reload();
  };

  // Export current filtered list as CSV
  const handleExcelExport = () => {
    if (!filtered.length) {
      alert('निर्यात गर्न कुनै तथ्याङ्क छैन।');
      return;
    }
    const skip = new Set(['id', '_submittedAt']);
    const allKeys = [
      ...new Set(filtered.flatMap(r => Object.keys(r).filter(k => !skip.has(k))))
    ];
    const header = ['पेश गरिएको समय', ...allKeys];
    const rows = filtered.map(r => [
      new Date(r._submittedAt).toLocaleString('ne-NP'),
      ...allKeys.map(k => r[k] ?? ''),
    ]);
    const csv = [header, ...rows]
      .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `daily-work-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="daily-work-container">

      {/* Header */}
      <div className="top-bar-header">
        <h1>दैनिक कार्य सम्पादनका सूचीहरू</h1>
        <button className="back-button" onClick={() => setActiveLink('गृहपृष्ठ')}>
          ← Back
        </button>
      </div>

      {/* Info message */}
      <div style={{
        background: '#e8f4fd',
        border: '1px solid #bee3f8',
        borderRadius: 6,
        padding: '10px 16px',
        marginBottom: 16,
        fontSize: '0.9rem',
        color: '#2c5282'
      }}>
        📋 यहाँ आजको पेश गरिएका सबै फारमहरू देखिन्छन्। पेश गरेको <strong>२४ घण्टापछि</strong> स्वतः हट्नेछ।
      </div>

      {/* Action buttons */}
      <div className="actions-bar">
        <button className="excel-export-btn" onClick={handleExcelExport}>
          📥 एक्सेल निर्यात
        </button>
        <span style={{ fontSize: '0.85rem', color: '#555', alignSelf: 'center' }}>
          जम्मा: <strong>{filtered.length}</strong> फारम
        </span>
      </div>

      {/* Search bar */}
      <div className="search-filter-bar">
        <div className="date-input-group">
          <input
            type="text"
            placeholder="फारमको नाम वा विवरणले खोज्नुहोस्..."
            className="filter-input"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
          />
        </div>
        <button className="search-btn" onClick={handleSearch}>🔍</button>
        <button
          onClick={handleReset}
          style={{
            marginLeft: 8,
            background: '#aaa',
            color: 'white',
            border: 'none',
            padding: '10px 14px',
            borderRadius: 4,
            cursor: 'pointer'
          }}
        >
          ✕ रिसेट
        </button>
      </div>

      {/* Table */}
      <div className="data-table-container">
        <table className="performance-table">
          <thead>
            <tr>
              <th style={{ width: 40 }}>#</th>
              <th>फारमको नाम</th>
              <th>पेश गरिएको समय</th>
              <th>आवेदकको नाम</th>
              <th>मुख्य विवरण</th>
              <th style={{ width: 110 }}>समय बाँकी</th>
              <th style={{ width: 100 }}>मेटाउनुहोस्</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: 32, color: '#888' }}>
                  <div style={{ fontSize: '2rem', marginBottom: 8 }}>📭</div>
                  <div>अहिलेसम्म कुनै फारम पेश गरिएको छैन।</div>
                  <div style={{ fontSize: '0.85rem', marginTop: 4 }}>
                    फारम पेश गरेपछि यहाँ स्वतः देखिनेछ।
                  </div>
                </td>
              </tr>
            ) : filtered.map((item, idx) => {
              const skip = new Set(['id', '_submittedAt', 'formName', 'applicantName', 'applicant_name']);
              const detailPairs = Object.entries(item)
                .filter(([k]) => !skip.has(k))
                .slice(0, 4); // show max 4 detail fields to keep table clean

              const applicantName =
                item.applicantName ||
                item.applicant_name ||
                item['आवेदकको नाम'] ||
                '—';

              const submittedTime = new Date(item._submittedAt).toLocaleString('ne-NP');
              const remaining = TWENTY_FOUR_HOURS - (Date.now() - item._submittedAt);
              const isExpiringSoon = remaining < 2 * 60 * 60 * 1000; // less than 2 hours

              return (
                <tr key={item.id} style={isExpiringSoon ? { background: '#fff8f0' } : {}}>
                  <td style={{ textAlign: 'center', color: '#888' }}>{idx + 1}</td>
                  <td style={{ fontWeight: 'bold', color: '#2c3e50' }}>
                    {item.formName || '—'}
                  </td>
                  <td style={{ fontSize: '0.82rem', color: '#555' }}>
                    {submittedTime}
                  </td>
                  <td style={{ fontSize: '0.88rem' }}>
                    {applicantName}
                  </td>
                  <td style={{ fontSize: '0.82rem', color: '#444' }}>
                    {detailPairs.length > 0 ? (
                      detailPairs.map(([k, v]) => (
                        <div key={k}>
                          <span style={{ color: '#888' }}>{k}:</span>{' '}
                          <strong>{String(v).slice(0, 40)}</strong>
                        </div>
                      ))
                    ) : '—'}
                  </td>
                  <td style={{
                    fontSize: '0.78rem',
                    color: isExpiringSoon ? '#e53e3e' : '#718096',
                    fontWeight: isExpiringSoon ? 'bold' : 'normal',
                    whiteSpace: 'nowrap'
                  }}>
                    {timeLeftLabel(item._submittedAt)}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      onClick={() => handleDelete(item.id)}
                      style={{
                        color: 'white',
                        background: '#e53e3e',
                        border: 'none',
                        borderRadius: 4,
                        padding: '4px 10px',
                        cursor: 'pointer',
                        fontSize: '0.8rem'
                      }}
                    >
                      मेटाउनुहोस्
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="copyright-footer">
        © सर्वाधिकार सुरक्षित {MUNICIPALITY.name}
      </div>
    </div>
  );
};

// Make TWENTY_FOUR_HOURS available inside the component without re-importing
const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

export default DailyWorkPerformanceList;