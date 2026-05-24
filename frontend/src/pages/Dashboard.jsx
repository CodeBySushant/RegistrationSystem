import React, { useState, useMemo, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import {
  Briefcase,
  FileText,
  BadgeCheck,
  GraduationCap,
  Bell,
  Receipt,
  ClipboardList,
} from "lucide-react";
import { Chart } from "react-google-charts";

// ── Card metadata — labels must match what backend returns ──
const CARD_META = [
  {
    label: "व्यवसाय दर्ता",
    icon: Briefcase,
    color: "text-red-600 bg-red-100",
    linkText: "व्यवसाय दर्ता सूचीमा जानुहोस् →",
  },
  {
    label: "व्यवसाय नविकरण गर्न बाँकी",
    icon: Receipt,
    color: "text-sky-600 bg-sky-100",
    linkText: "व्यवसाय नविकरण बाँकी सूचीमा जानुहोस् →",
  },
  {
    label: "व्यवसाय नविकरण भइसकेको",
    icon: BadgeCheck,
    color: "text-orange-600 bg-orange-100",
    linkText: "व्यवसाय नविकरण भइसकेको सूचीमा जानुहोस् →",
  },
  {
    label: "दैनिक कार्य सम्पादन",
    icon: ClipboardList,
    color: "text-green-600 bg-green-100",
    linkText: "दैनिक कार्य सूचीमा जानुहोस् →",
  },
];

const DashboardCard = ({ label, value, icon: Icon, color, linkText }) => (
  <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between min-h-[140px]">
    <div className="flex justify-between items-start mb-3">
      <h3 className="text-base font-semibold text-gray-700 leading-tight pr-2">
        {label}
      </h3>

      <div className={`p-2 rounded-lg flex-shrink-0 ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>

    <div className="text-4xl font-extrabold text-gray-800 mb-2">
      {value}
    </div>

    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
    >
      {linkText}
    </a>
  </div>
);

// ── Stat card for category breakdown ──
const CategoryCard = ({ label, value, color }) => (
  <div className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
    <div
      className="w-3 h-12 rounded-full flex-shrink-0"
      style={{ backgroundColor: color }}
    />
    <div>
      <div className="text-xs text-gray-500 leading-tight">{label}</div>
      <div className="text-2xl font-bold text-gray-800">{value}</div>
    </div>
  </div>
);

const CATEGORY_COLORS = {
  "Social & Family":          "#8b5cf6",
  "Citizenship":              "#ec4899",
  "Business & Industry":      "#f59e0b",
  "House & Land":             "#10b981",
  "Association & Organization":"#3b82f6",
  "English Format":           "#06b6d4",
  "Physical Development":     "#f97316",
  "Animal Husbandry":         "#84cc16",
  "Economic":                 "#6366f1",
  "Official & Planning":      "#ef4444",
};

const PIE_OPTIONS = {
  pieHole: 0.4,
  legend: { position: "right", textStyle: { fontSize: 11 } },
  chartArea: { width: "75%", height: "80%" },
  tooltip: { trigger: "both" },
};

const BAR_OPTIONS = {
  legend: { position: "none" },
  chartArea: { width: "75%", height: "70%" },
  hAxis: { minValue: 0, textStyle: { fontSize: 10 } },
  vAxis: { textStyle: { fontSize: 10 } },
  colors: ["#6366f1"],
};

const Dashboard = () => {
  const [dashboardCards, setDashboardCards] = useState(
    CARD_META.map((card) => ({ ...card, value: 0 }))
  );
  const [yearlyStats, setYearlyStats]       = useState([]);
  const [categoryStats, setCategoryStats]   = useState({});
  const [grandTotal, setGrandTotal]         = useState(0);
  const [loading, setLoading]               = useState(true);
  const [error, setError]                   = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);

        // Fetch both endpoints in parallel
        const [statsRes, categoryRes] = await Promise.all([
          axiosInstance.get("/api/dashboard-stats"),
          axiosInstance.get("/api/admin-dashboard/category-counts"),
        ]);

        // ── Cards ──
        if (Array.isArray(statsRes.data.cards)) {
          setDashboardCards((prev) =>
            prev.map((card) => {
              const fromApi = statsRes.data.cards.find(
                (c) => c.label === card.label
              );
              return fromApi ? { ...card, value: fromApi.value } : card;
            })
          );
        }

        // ── Yearly stats ──
        if (Array.isArray(statsRes.data.yearlyStats)) {
          setYearlyStats(statsRes.data.yearlyStats);
        }

        // ── Category counts ──
        if (categoryRes.data.categories) {
          setCategoryStats(categoryRes.data.categories);
          setGrandTotal(categoryRes.data.grandTotal || 0);
        }

        setError(null);
      } catch (err) {
        console.error(err);
        setError("ड्यासबोर्ड डाटा लोड गर्न समस्या भयो।");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  // ── Pie chart data from category stats ──
  const pieData = useMemo(() => {
    const entries = Object.entries(categoryStats).filter(([, v]) => v > 0);
    if (!entries.length)
      return [["श्रेणी", "संख्या"], ["कुनै डाटा छैन", 1]];
    return [
      ["श्रेणी", "संख्या"],
      ...entries.map(([label, value]) => [label, value]),
    ];
  }, [categoryStats]);

  // ── Bar chart data from yearly stats ──
  const barData = useMemo(() => {
    if (!yearlyStats.length)
      return [["सेवा", "संख्या"], ["कुनै डाटा छैन", 0]];
    return [
      ["सेवा", "संख्या"],
      ...yearlyStats.map((s) => [s.label, s.value]),
    ];
  }, [yearlyStats]);

  const maxYearly = useMemo(
    () => Math.max(...yearlyStats.map((s) => s.value), 1),
    [yearlyStats]
  );

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-screen-2xl mx-auto">

      {/* ── Status bar ── */}
      <div className="flex justify-between items-center border-b pb-3">
        <h1 className="text-xl font-bold text-gray-800">ड्यासबोर्ड</h1>
        <div className="flex items-center gap-3">
          {loading && (
            <span className="text-xs text-gray-400 animate-pulse">
              लोड हुँदैछ...
            </span>
          )}
          {error && (
            <span className="text-xs text-red-500 bg-red-50 px-2 py-1 rounded">
              {error}
            </span>
          )}
          {!loading && !error && (
            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
              जम्मा: {grandTotal.toLocaleString()} रेकर्डहरू
            </span>
          )}
        </div>
      </div>

      {/* ── Top cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardCards.map((card, index) => (
          <DashboardCard key={index} {...card} />
        ))}
      </div>

      {/* ── Charts row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Pie chart — category breakdown */}
        <div className="bg-white p-5 rounded-xl shadow-md">
          <h3 className="text-base font-semibold text-gray-700 mb-1">
            श्रेणी अनुसार कुल रेकर्डहरू
          </h3>
          <p className="text-xs text-gray-400 mb-3">
            सबै समयको डाटा
          </p>
          <div className="h-64">
            {loading ? (
              <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                लोड हुँदैछ...
              </div>
            ) : (
              <Chart
                chartType="PieChart"
                width="100%"
                height="100%"
                data={pieData}
                options={PIE_OPTIONS}
                loader={
                  <div className="text-gray-400 text-sm text-center pt-20">
                    चार्ट लोड हुँदैछ...
                  </div>
                }
              />
            )}
          </div>
        </div>

        {/* Bar chart — yearly stats */}
        <div className="bg-white p-5 rounded-xl shadow-md">
          <h3 className="text-base font-semibold text-gray-700 mb-1">
            यस आर्थिक वर्षको रेकर्डहरू
          </h3>
          <p className="text-xs text-gray-400 mb-3">
            चालु आर्थिक वर्ष मात्र
          </p>
          <div className="h-64">
            {loading ? (
              <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                लोड हुँदैछ...
              </div>
            ) : yearlyStats.every((s) => s.value === 0) ? (
              <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                यस वर्ष कुनै रेकर्ड छैन
              </div>
            ) : (
              // Custom bar chart — more readable than Google Charts for small values
              <div className="h-full flex items-end justify-around gap-1 px-2 pb-2">
                {yearlyStats.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center flex-1 min-w-0"
                  >
                    <span className="text-[9px] text-gray-600 mb-1 font-medium">
                      {item.value}
                    </span>
                    <div
                      className="w-full bg-indigo-400 hover:bg-indigo-500 transition-colors rounded-t cursor-default"
                      style={{
                        height: `${Math.max(
                          (item.value / maxYearly) * 180,
                          item.value > 0 ? 4 : 0
                        )}px`,
                      }}
                      title={`${item.label}: ${item.value}`}
                    />
                    <span
                      className="text-[8px] text-gray-500 mt-1 text-center leading-tight"
                      style={{
                        maxWidth: "100%",
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Category breakdown cards ── */}
      <div className="bg-white p-5 rounded-xl shadow-md">
        <h3 className="text-base font-semibold text-gray-700 mb-1">
          श्रेणी अनुसार विवरण
        </h3>
        <p className="text-xs text-gray-400 mb-4">
          सबै श्रेणीका कुल रेकर्डहरू
        </p>
        {loading ? (
          <div className="text-center text-gray-400 py-8 text-sm">
            लोड हुँदैछ...
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {Object.entries(categoryStats).map(([label, value]) => (
              <CategoryCard
                key={label}
                label={label}
                value={value.toLocaleString()}
                color={CATEGORY_COLORS[label] || "#94a3b8"}
              />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default Dashboard;