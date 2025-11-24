import React from 'react';
import { 
    Briefcase, FileText, BadgeCheck, GraduationCap, 
    Bell, Receipt, ClipboardList, TrendingUp 
} from 'lucide-react';

const DASHBOARD_CARDS = [
    { label: 'दर्ता', value: 4, icon: FileText, color: 'text-orange-600 bg-orange-100', linkText: 'दर्ता किताब मा जानुहोस् →' },
    { label: 'चलानी', value: 91, icon: FileText, color: 'text-green-600 bg-green-100', linkText: 'चलानी किताब मा जानुहोस् →' },
    { label: 'सूचना', value: 0, icon: Bell, color: 'text-red-600 bg-red-100', linkText: 'सूचनाको सूचीमा जानुहोस् →' },
    { label: 'सिफारिस', value: 75, icon: FileText, color: 'text-cyan-600 bg-cyan-100', linkText: 'सिफारिस किताब मा जानुहोस् →' },
    { label: 'अनुसूची', value: 30, icon: ClipboardList, color: 'text-yellow-600 bg-yellow-100', linkText: 'अनुसूची दर्तामा जानुहोस् →' },
    { label: 'व्यवसाय दर्ता', value: 2, icon: Briefcase, color: 'text-red-600 bg-red-100', linkText: 'व्यवसाय दर्ता सूचीमा जानुहोस् →' },
    { label: 'व्यवसाय नविकरण गर्न बाँकी', value: 2, icon: Receipt, color: 'text-sky-600 bg-sky-100', linkText: 'व्यवसाय नविकरण बाँकी सूचीमा जानुहोस् →' },
    { label: 'व्यवसाय नविकरण भइसकेको', value: 0, icon: BadgeCheck, color: 'text-orange-600 bg-orange-100', linkText: 'व्यवसाय नविकरण भइसकेको सूचीमा जानुहोस् →' },
    { label: 'प्रमाण पत्र', value: 1, icon: GraduationCap, color: 'text-green-600 bg-green-100', linkText: 'प्रमाण पत्र सूचीमा जानुहोस् →' },
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
            <a href="#" onClick={(e) => e.preventDefault()} className="text-sm text-indigo-600 hover:text-indigo-800 font-medium mt-2">
                {linkText}
            </a>
        </div>
    );
}

const Dashboard = () => {
    return (
        <div className="p-4 sm:p-8 space-y-8">
            <div className="flex justify-between items-center border-b pb-4">
               
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {DASHBOARD_CARDS.map((card, index) => (
                    <DashboardCard key={index} {...card} />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-6">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">यस साताको रेकर्डहरू (Weekly Record)</h3>
                    <div className="w-full h-64 bg-gray-50 border border-gray-200 flex items-center justify-center rounded-lg relative">
                        <TrendingUp className="w-10 h-10 text-cyan-400 absolute opacity-30" />
                        <div className="text-gray-400 text-sm">ग्राफको लागि स्थान</div>
                        <div className="absolute bottom-0 w-full flex justify-between px-4 text-xs text-gray-500 pb-1">
                            <span>आइतबार</span><span>सोमबार</span><span>...</span><span>शुक्रबार</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">यस आर्थिक वर्षको रेकर्डहरू (Yearly Record)</h3>
                    <div className="w-full h-64 bg-gray-50 border border-gray-200 flex items-end justify-around rounded-lg">
                        {[6, 2, 4, 3, 5, 1, 0, 2].map((height, index) => (
                            <div 
                                key={index} 
                                style={{ height: `${height * 10}%` }}
                                className="w-8 bg-indigo-400 hover:bg-indigo-500 transition-all duration-300 rounded-t-sm"
                            />
                        ))}
                    </div>
                    <div className="text-xs text-center text-gray-500 mt-2">व्यवसाय, निवेदन, सिफारिस...</div>
                </div>

                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">यस आर्थिक वर्षको सिफारिस रेकर्डहरू (Service Category Breakdown)</h3>
                    <div className="flex flex-col md:flex-row items-center justify-around h-80">
                        <div className="w-48 h-48 rounded-full bg-conic-gradient relative">
                            <div className="w-20 h-20 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                        </div>
                        <div className="mt-4 md:mt-0 md:ml-8 text-sm space-y-2">
                            <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-purple-500 mr-2"></span> नेपाली नागरिकता</div>
                            <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-pink-500 mr-2"></span> घर / जग्गा जमिन</div>
                            <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span> संघ / संस्था</div>
                            <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span> व्यवसाय दर्ता</div>
                            <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span> अन्य</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;