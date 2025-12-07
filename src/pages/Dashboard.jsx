import React, { useState, useMemo, useEffect } from "react";
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

// 🔹 Only meta info here: label, icon, color, linkText (NO real values)
const CARD_META = [
  {
    label: "दर्ता",
    icon: FileText,
    color: "text-orange-600 bg-orange-100",
    linkText: "दर्ता किताब मा जानुहोस् →",
  },
  {
    label: "चलानी",
    icon: FileText,
    color: "text-green-600 bg-green-100",
    linkText: "चलानी किताब मा जानुहोस् →",
  },
  {
    label: "सूचना",
    icon: Bell,
    color: "text-red-600 bg-red-100",
    linkText: "सूचनाको सूचीमा जानुहोस् →",
  },
  {
    label: "सिफारिस",
    icon: FileText,
    color: "text-cyan-600 bg-cyan-100",
    linkText: "सिफारिस किताब मा जानुहोस् →",
  },
  {
    label: "अनुसूची",
    icon: ClipboardList,
    color: "text-yellow-600 bg-yellow-100",
    linkText: "अनुसूची दर्तामा जानुहोस् →",
  },
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
    label: "प्रमाण पत्र",
    icon: GraduationCap,
    color: "text-green-600 bg-green-100",
    linkText: "प्रमाण पत्र सूचीमा जानुहोस् →",
  },
];

const DashboardCard = ({ label, value, icon: Icon, color, linkText }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-lg transition-transform hover:shadow-xl hover:scale-[1.01] duration-300 flex flex-col justify-between">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-700">{label}</h3>
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="text-4xl font-extrabold text-gray-800 mb-2">{value}</div>
      <a
        href="#"
        onClick={(e) => e.preventDefault()}
        className="text-sm text-indigo-600 hover:text-indigo-800 font-medium mt-2"
      >
        {linkText}
      </a>
    </div>
  );
};

const WEEKLY_PIE_OPTIONS = {
  title: "यस साताको रेकर्डहरू",
  pieHole: 0.4,
  legend: { position: "right" },
  chartArea: { width: "80%", height: "80%" },
};

const Dashboard = () => {
  // 🔹 start with all values = 0; icons/labels from CARD_META
  const [dashboardCards, setDashboardCards] = useState(
    CARD_META.map((card) => ({ ...card, value: 0 }))
  );

  // 🔹 yearly stats only from API (no static numbers)
  const [yearlyStats, setYearlyStats] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔁 Fetch from backend: /api/dashboard-stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/dashboard-stats"); // adjust URL if needed
        if (!res.ok) throw new Error("Failed to load dashboard stats");
        const data = await res.json(); // { cards: [...], yearlyStats: [...] }

        // cards from DB: update values, keep icons/colors/linkText from META
        if (Array.isArray(data.cards)) {
          setDashboardCards((prev) =>
            prev.map((card) => {
              const fromApi = data.cards.find((c) => c.label === card.label);
              return fromApi ? { ...card, value: fromApi.value } : card;
            })
          );
        }

        // yearly stats directly from API
        if (Array.isArray(data.yearlyStats)) {
          setYearlyStats(data.yearlyStats);
        }

        setError(null);
      } catch (err) {
        console.error(err);
        setError("ड्यासबोर्ड डाटा लोड गर्न समस्या भयो।");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // pie chart data derived from *current* dashboardCards (DB-driven)
  const weeklyPieData = useMemo(
    () => [
      ["service", "score"],
      ...dashboardCards.map((item) => [item.label, item.value]),
    ],
    [dashboardCards]
  );

  // bar height scaling based on DB values
  const maxYearlyValue = useMemo(
    () =>
      yearlyStats.length > 0
        ? Math.max(...yearlyStats.map((s) => s.value), 1)
        : 1,
    [yearlyStats]
  );

  return (
    <div className="p-4 sm:p-8 space-y-8">
      <div className="flex justify-between items-center border-b pb-4">
        {loading && (
          <span className="text-xs text-gray-500">डाटा लोड हुँदैछ...</span>
        )}
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>

      {/* Top cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {dashboardCards.map((card, index) => (
          <DashboardCard key={index} {...card} />
        ))}
      </div>

      {/* Charts section: Weekly + Yearly side by side, Breakdown full width */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-6">
        {/* Weekly pie chart */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            यस साताको रेकर्डहरू (Weekly Record)
          </h3>
          <div className="relative w-full h-64 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
            <Chart
              chartType="PieChart"
              width="100%"
              height="230px"
              data={weeklyPieData}
              options={WEEKLY_PIE_OPTIONS}
              loader={
                <div className="text-gray-400 text-sm">Loading chart…</div>
              }
            />
          </div>
        </div>

        {/* Yearly record */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            यस आर्थिक वर्षको रेकर्डहरू (Yearly Record)
          </h3>
          <div className="w-full h-64 bg-gray-50 border border-gray-200 flex items-end justify-around rounded-lg">
            {yearlyStats.map((item, index) => (
              <div
                key={index}
                style={{
                  height: `${(item.value / maxYearlyValue) * 100}%`,
                }}
                className="w-8 bg-indigo-400 hover:bg-indigo-500 transition-all duration-300 rounded-t-sm flex items-end justify-center"
                title={`${item.label}: ${item.value}`}
              >
                <span className="text-[10px] text-white mb-1">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
          <div className="text-xs text-center text-gray-500 mt-2">
            व्यवसाय, निवेदन, सिफारिस...
          </div>
        </div>

        {/* Breakdown full width under both on large screens */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            यस आर्थिक वर्षको सिफारिस रेकर्डहरू (Service Category Breakdown)
          </h3>

          <div className="flex flex-col md:flex-row items-center justify-around h-80">
            {/* 🔹 Bar Chart (Dynamic from database) */}
            <div className="w-full md:w-2/3 h-full flex items-center justify-center">
              <Chart
                chartType="BarChart"
                width="100%"
                height="100%"
                data={[
                  ["service", "count"],
                  ...yearlyStats.map((item) => [item.label, item.value]),
                ]}
                options={{
                  legend: { position: "none" },
                  chartArea: { width: "80%", height: "70%" },
                  hAxis: { minValue: 0 },
                }}
              />
            </div>

            {/* 🔹 Legend (same as before) */}
            <div className="mt-4 md:mt-0 md:ml-8 text-sm space-y-2">
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-purple-500 mr-2" />
                नेपाली नागरिकता
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-pink-500 mr-2" />
                घर / जग्गा जमिन
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-blue-500 mr-2" />
                संघ / संस्था
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-yellow-500 mr-2" />
                व्यवसाय दर्ता
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-red-500 mr-2" />
                अन्य
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
