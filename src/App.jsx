import React, { useState, useMemo } from "react";
import { Search, Menu, User } from "lucide-react";
import { NAV_ITEMS } from "./data/NavItems.js";
import SidebarItem from "./components/SidebarItem.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import BusinessRegistrationForm from "./pages/BusinessRegistrationForm.jsx";
import PlaceholderPage from "./pages/PlaceholderPage.jsx";

import TribalVerificationRecommendation from "./pages/application/TribalVerificationRecommendation.jsx";
import DalitCasteCertification from "./pages/application/DalitCasteCertification.jsx";

import AddressVerification from "./pages/english-format/AddressVerification.jsx";
import AnnualIncomeCertificate from "./pages/english-format/AnnualIncomeCertificate.jsx";
import BirthDateVerification from "./pages/english-format/BirthDateVerification.jsx";
import CertificateofOccupation from "./pages/english-format/CertificateofOccupation.jsx";
import DigitalVerification from "./pages/english-format/DigitalVerification.jsx";
import EconomicStatus from "./pages/english-format/EconomicStatus.jsx";
import MarriageCerificateEnglish from "./pages/english-format/MarriageCertificateEnglish.jsx";
import OccupationVerification from "./pages/english-format/OccupationVerification.jsx";
import PowerofAttorney from "./pages/english-format/PowerofAttorney.jsx";
import PropertyValuationReport from "./pages/english-format/PropertyValuationReport.jsx";
import RelationshipVerificationEnglish from "./pages/english-format/RelationshipVerificationEnglish.jsx";
import SamePersonCertificate from "./pages/english-format/SamePersonCertificate.jsx";
import ScholarshipVerification from "./pages/english-format/ScholarshipVerification.jsx";
import TaxClearBasic from "./pages/english-format/TaxClearBasic.jsx";
import TaxClearanceCertificate from "./pages/english-format/TaxCleranceCertificate.jsx";
import UnmarriedVerificationEnglish from "./pages/english-format/UnmarriedVerificationEnglish.jsx";
import AddressVerificationNew from "./pages/english-format/new/AddressVerificationNew.jsx";
import AnnualIncomeVerificationNew from "./pages/english-format/new/AnnualIncomeVerificationNew.jsx";
import BirthCertificateNew from "./pages/english-format/new/BirthCertificate.jsx";
import OccupationVerificationNew from "./pages/english-format/new/OccupationVerificationNew.jsx";
import SurnameVerificationAfterMarriage from "./pages/english-format/new/SurnameVerificationAfterMarriage.jsx";
import SurnameVerificationCertificateNew from "./pages/english-format/new/SurnameVerificationCertificateNew.jsx";
import TaxClearanceNewFormat from "./pages/english-format/new/TaxClearanceNewFormat.jsx";
import VerifyRevisedEmblem from "./pages/english-format/new/VerifyRevisedEmblem.jsx";

const App = () => {
  const [openMenu, setOpenMenu] = useState("application");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeLink, setActiveLink] = useState("व्यवसाय दर्ता दरखास्त फारम");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const today = new Date().toLocaleDateString("ne-NP", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const handleToggle = (id) => {
    if (searchTerm) return;
    setOpenMenu((prevId) => (prevId === id ? null : id));
  };

  const handleSearch = (query) => {
    setSearchTerm(query);
    if (query) {
      setOpenMenu(null);
    }
  };

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
    let parentId = NAV_ITEMS.find((item) => item.label === linkName)?.id;

    if (!parentId) {
      const parent = NAV_ITEMS.find((item) => item.children.includes(linkName));
      parentId = parent ? parent.id : null;
    }
    setOpenMenu(parentId);
  };

  const getParentIdOfActiveLink = useMemo(() => {
    const parent = NAV_ITEMS.find((item) => item.children.includes(activeLink));
    return parent ? parent.id : null;
  }, [activeLink]);

  const renderMainContent = () => {
    switch (activeLink) {
      case "गृहपृष्ठ":
        return <Dashboard />;
      case "व्यवसाय दर्ता दरखास्त फारम":
        return <BusinessRegistrationForm setActiveLink={setActiveLink} />;
      case "आदिवासी प्रमाणित सिफारिस":
        return <TribalVerificationRecommendation setActiveLink={setActiveLink} />;
      case "दलित जाति प्रमाणित _new_":
        return <DalitCasteCertification setActiveLink={setActiveLink} />;


      case "Relationship Verification":
        return <RelationshipVerificationEnglish setActiveLink={setActiveLink} />;
      case "Scholarship Verification":
        return <ScholarshipVerification setActiveLink={setActiveLink} />;
      case "Power of Attorney":
        return <PowerofAttorney setActiveLink={setActiveLink} />;
      case "Birth Date Verification":
        return <BirthDateVerification setActiveLink={setActiveLink} />;
      case "Occupation Verification":
        return <OccupationVerification setActiveLink={setActiveLink} />;
      case "Unmarried Verification":
        return <UnmarriedVerificationEnglish setActiveLink={setActiveLink} />;
      case "Address Verification":
        return <AddressVerification setActiveLink={setActiveLink} />;
      case "Tax Clearance Certificate":
        return <TaxClearanceCertificate setActiveLink={setActiveLink} />;
      case "Economic Status":
        return <EconomicStatus setActiveLink={setActiveLink} />;
      case "Annual Income Certificate":
        return <AnnualIncomeCertificate setActiveLink={setActiveLink} />;
      case "Property Valuation Report":
        return <PropertyValuationReport setActiveLink={setActiveLink} />;
      case "Marriage Certificate":
        return <MarriageCerificateEnglish setActiveLink={setActiveLink} />;
      case "Same Person Certificate":
        return <SamePersonCertificate setActiveLink={setActiveLink} />;
      case "Certificate of Occupation":
        return <CertificateofOccupation setActiveLink={setActiveLink} />;
      case "Tax Clear Basic":
        return <TaxClearBasic setActiveLink={setActiveLink} />;
      case "Digital Verification":
        return <DigitalVerification setActiveLink={setActiveLink} />;
      case "Occupation Verification New":
        return <OccupationVerificationNew setActiveLink={setActiveLink} />;
      case "Address Verification New":
        return <AddressVerificationNew setActiveLink={setActiveLink} />;
      case "Birth Certificate New":
        return <BirthCertificateNew setActiveLink={setActiveLink} />;
      case "Verify Revised Emblem New":
        return <VerifyRevisedEmblem setActiveLink={setActiveLink} />;
      case "Tax Clearance Format New":
        return <TaxClearanceNewFormat setActiveLink={setActiveLink} />;
      case "Annual Income Verification New":
        return <AnnualIncomeVerificationNew setActiveLink={setActiveLink} />;
      case "Surname Verification Certificate New":
        return <SurnameVerificationCertificateNew setActiveLink={setActiveLink} />;
      case "Surname Verification After Marriage":
        return <SurnameVerificationAfterMarriage setActiveLink={setActiveLink} />;
      
      
        default:
        return <PlaceholderPage activeLink={activeLink} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-[#0f172a] text-white z-50 flex items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-6" aria-hidden="true" />
            <div className="w-6" aria-hidden="true" />

            <img src="/nepallogo.svg" alt="Logo" className="h-12" />
            <div className="w-6" aria-hidden="true" />
            <div className="w-6" aria-hidden="true" />
            <div className="w-6" aria-hidden="true" />
            <div className="w-6" aria-hidden="true" />

            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Menu className="w-10 h-10" />
            </button>
            <div className="w-6" aria-hidden="true" />
            <div className="w-6" aria-hidden="true" />
            <div className="w-6" aria-hidden="true" />
            <div className="w-6" aria-hidden="true" />
            <div className="w-6" aria-hidden="true" />
            <div className="w-6" aria-hidden="true" />
            <div className="w-6" aria-hidden="true" />
            <div className="w-6" aria-hidden="true" />
            <div className="w-6" aria-hidden="true" />
            <div className="w-6" aria-hidden="true" />

            <h1 className="text-lg font-bold">
              नागार्जुन नगरपालिका, नगर कार्यपालिकाको कार्यालय <br />
              <div className="w-6" aria-hidden="true" />
              बाग्मती प्रदेश, नेपाल
            </h1>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm">{today}</span>
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <User className="w-6 h-6" />
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 bottom-0 w-72 bg-[#0f172a] text-white transition-transform duration-300 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } z-40 flex flex-col`}
      >
        <div className="p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="मेनु खोज्नुहोस्..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full bg-gray-800 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-2">
          {NAV_ITEMS.map((item) => (
            <div
              key={item.id}
              className={`${
                item.children.length > 0 && getParentIdOfActiveLink === item.id
                  ? "border-l-4 border-blue-500"
                  : ""
              }`}
            >
              <SidebarItem
                item={item}
                openMenu={openMenu}
                handleToggle={handleToggle}
                searchTerm={searchTerm}
                handleLinkClick={handleLinkClick}
                activeLink={activeLink}
              />
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main
        className={`pt-16 transition-all duration-300 ${
          isSidebarOpen ? "ml-72" : "ml-0"
        }`}
      >
        <div className="p-6">{renderMainContent()}</div>
      </main>
    </div>
  );
};

export default App;
