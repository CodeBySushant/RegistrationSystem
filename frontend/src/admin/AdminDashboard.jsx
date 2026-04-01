import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
);

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const COLORS = [
  "#378ADD",
  "#1D9E75",
  "#D85A30",
  "#7F77DD",
  "#BA7517",
  "#D4537E",
  "#639922",
  "#888780",
  "#E24B4A",
  "#0F6E56",
];

const AdminDashboard = () => {
  const { token, user } = useAuth();
  const [categories, setCategories] = useState({});
  const [grandTotal, setGrandTotal] = useState(0);
  const [wardCounts, setWardCounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` };

    Promise.all([
      fetch(`${API}/api/admin-dashboard/category-counts`, { headers }).then(
        (r) => r.json(),
      ),
      user?.role === "SUPERADMIN"
        ? fetch(`${API}/api/admin-dashboard/ward-counts`, { headers }).then(
            (r) => r.json(),
          )
        : Promise.resolve([]),
    ])
      .then(([catData, wardData]) => {
        setCategories(catData.categories || {});
        setGrandTotal(catData.grandTotal || 0);
        // ✅ Add this safety check:
        setWardCounts(Array.isArray(wardData) ? wardData : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [token]);

  const catNames = Object.keys(categories);
  const catValues = Object.values(categories);
  const topCat = catNames[catValues.indexOf(Math.max(...catValues))] || "—";
  const topCatCount = Math.max(...catValues) || 0;

  const barData = {
    labels: catNames,
    datasets: [
      {
        data: catValues,
        backgroundColor: COLORS,
        borderRadius: 4,
        borderSkipped: false,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: {
        ticks: { font: { size: 11 }, maxRotation: 35 },
        grid: { display: false },
      },
      y: {
        ticks: { font: { size: 11 } },
        grid: { color: "rgba(128,128,128,0.15)" },
      },
    },
  };

  const pieData = {
    labels: catNames,
    datasets: [
      {
        data: catValues,
        backgroundColor: COLORS,
        borderWidth: 2,
        borderColor: "transparent",
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "60%",
    plugins: { legend: { display: false } },
  };

  const wardData = {
    labels: wardCounts.map((w) => `Ward ${w.ward_number}`),
    datasets: [
      {
        data: wardCounts.map((w) => w.count),
        backgroundColor: "#378ADD",
        borderRadius: 4,
      },
    ],
  };

  const wardOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { ticks: { font: { size: 11 } }, grid: { display: false } },
      y: {
        ticks: { font: { size: 11 } },
        grid: { color: "rgba(128,128,128,0.15)" },
      },
    },
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">
        Loading dashboard...
      </div>
    );

  return (
    <div className="p-6 space-y-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-xs text-gray-500 mb-1">Total forms submitted</p>
          <p className="text-2xl font-medium">{grandTotal.toLocaleString()}</p>
          <p className="text-xs text-gray-400 mt-1">all categories</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-xs text-gray-500 mb-1">Categories</p>
          <p className="text-2xl font-medium">{catNames.length}</p>
          <p className="text-xs text-gray-400 mt-1">form groups</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-xs text-gray-500 mb-1">Most active</p>
          <p className="text-base font-medium mt-1">{topCat}</p>
          <p className="text-xs text-gray-400 mt-1">
            {topCatCount.toLocaleString()} forms
          </p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-xs text-gray-500 mb-1">Total form types</p>
          <p className="text-2xl font-medium">120</p>
          <p className="text-xs text-gray-400 mt-1">registered forms</p>
        </div>
      </div>

      {/* Bar + Pie Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Bar Chart */}
        <div className="md:col-span-2 bg-white border border-gray-100 rounded-xl p-4">
          <p className="text-sm font-medium text-gray-500 mb-3">
            Submissions by category
          </p>

          {/* Legend */}
          <div className="flex flex-wrap gap-3 mb-3">
            {catNames.map((name, i) => (
              <span
                key={name}
                className="flex items-center gap-1 text-xs text-gray-500"
              >
                <span
                  className="w-2.5 h-2.5 rounded-sm inline-block"
                  style={{ background: COLORS[i] }}
                />
                {name}
              </span>
            ))}
          </div>

          <div style={{ height: 280 }}>
            <Bar data={barData} options={barOptions} />
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white border border-gray-100 rounded-xl p-4">
          <p className="text-sm font-medium text-gray-500 mb-3">
            Category distribution
          </p>

          {/* Legend */}
          <div className="flex flex-wrap gap-2 mb-3">
            {catNames.map((name, i) => (
              <span
                key={name}
                className="flex items-center gap-1 text-xs text-gray-500"
              >
                <span
                  className="w-2.5 h-2.5 rounded-sm inline-block"
                  style={{ background: COLORS[i] }}
                />
                {name}{" "}
                {grandTotal ? Math.round((catValues[i] / grandTotal) * 100) : 0}
                %
              </span>
            ))}
          </div>

          <div style={{ height: 220 }}>
            <Doughnut data={pieData} options={pieOptions} />
          </div>
        </div>
      </div>

      {/* Ward Chart — SUPERADMIN only */}
      {user?.role === "SUPERADMIN" && wardCounts.length > 0 && (
        <div className="bg-white border border-gray-100 rounded-xl p-4">
          <p className="text-sm font-medium text-gray-500 mb-3">
            Submissions per ward (top 10)
          </p>
          <div style={{ height: 160 }}>
            <Bar data={wardData} options={wardOptions} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
