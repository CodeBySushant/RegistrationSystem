// src/utils/submissionTracker.js
// This file handles saving/reading/deleting form submissions from localStorage.
// Every form calls trackSubmission() after a successful API save.
// The DailyWorkPerformanceList reads from this to show today's submissions.

const STORAGE_KEY = 'daily_submissions_log';
const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

/**
 * Read all submissions from localStorage.
 * Automatically removes entries older than 24 hours.
 */
export const getFreshSubmissions = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const all = JSON.parse(raw);
    const now = Date.now();
    const fresh = all.filter(entry => now - entry._submittedAt < TWENTY_FOUR_HOURS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
    return fresh;
  } catch {
    return [];
  }
};

/**
 * Call this from any form right after a successful API save.
 * @param {string} formName - Nepali name of the form
 * @param {object} fields   - Key/value pairs to display in the daily list
 */
export const trackSubmission = ({ formName, fields = {} }) => {
  try {
    const fresh = getFreshSubmissions();
    const newEntry = {
      id: `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      _submittedAt: Date.now(),
      formName,
      ...fields,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...fresh, newEntry]));
  } catch (e) {
    console.error('trackSubmission error:', e);
  }
};

/**
 * Delete one submission by its id.
 */
export const deleteSubmission = (id) => {
  try {
    const fresh = getFreshSubmissions().filter(entry => entry.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
  } catch (e) {
    console.error('deleteSubmission error:', e);
  }
};

/**
 * Returns time remaining before the 24h expiry.
 */
export const timeLeftLabel = (submittedAt) => {
  const ms = TWENTY_FOUR_HOURS - (Date.now() - submittedAt);
  if (ms <= 0) return 'म्याद सकियो';
  const hours = Math.floor(ms / 3_600_000);
  const minutes = Math.floor((ms % 3_600_000) / 60_000);
  return `${hours}घ ${minutes}मि बाँकी`;
};