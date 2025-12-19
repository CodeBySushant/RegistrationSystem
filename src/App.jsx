// src/App.jsx
import React, { useState, useMemo, useEffect } from "react";
import { Search, Menu, User } from "lucide-react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { MUNICIPALITY } from "./config/municipalityConfig";

import { AdminAuthProvider } from "./admin/context/AdminAuthContext";
import AdminProtectedRoute from "./admin/components/AdminProtectedRoute";

import AdminLayout from "./admin/AdminLayout";
import AdminLogin from "./admin/AdminLogin";

import AdminDashboard from "./admin/AdminDashboard";
import AdminUsers from "./admin/AdminUsers";
import AdminSettings from "./admin/AdminSettings";

import CreateAdmin from "./admin/pages/CreateAdmin";
import AdminList from "./admin/pages/AdminList";

import { NAV_ITEMS } from "./data/NavItems.js";
import SidebarItem from "./components/SidebarItem.jsx";

import Dashboard from "./pages/Dashboard.jsx";
import PlaceholderPage from "./pages/PlaceholderPage.jsx";
import Login from "./pages/Login.jsx"; // NEW

import { AuthProvider, useAuth } from "./context/AuthContext.jsx"; // NEW
import ProtectedRoute from "./components/ProtectedRoute.jsx"; // NEW
// pages/application
import AllowanceForm from "./pages/application/AllowanceForm.jsx";
import ApplicationforIndigenousNationalityCertification from "./pages/application/ApplicationforIndigenousNationalityCertification.jsx";
import ApplicationforKhasAryaCasteCertification from "./pages/application/ApplicationforKhasAryaCasteCertification.jsx";
import BusinessDeregistration from "./pages/application/BusinessDeregistrationForm.jsx";
import BusinessRegistrationApplicationForm from "./pages/application/BusinessRegistrationApplicationForm.jsx";
import CitizenshipwithHusbandSurname from "./pages/application/CitizenshipwithHusbandSurname.jsx";
import CitizenshipwithoutHusbandSurname from "./pages/application/CitizenshipwithoutHusbandSurname.jsx";
import DalitCasteCertification from "./pages/application/DalitCasteCertification.jsx";
import ImprovisedCitizenshipApplicationRecommendation from "./pages/application/ImpoverishedCitizenApplicationandRecommendation.jsx";
import LandBoundaryVerificationForm from "./pages/application/LandBoundaryVerificationForm.jsx";
import RequestforCertification from "./pages/application/RequestforCertification.jsx";
import RequestforCertificationMotherFather from "./pages/application/RequestforCertificationMotherFather.jsx";
import TribalVerificationRecommendation from "./pages/application/TribalVerificationRecommendation.jsx";
// pages/business-reg
import BusinessIndustryRegistrationForm from "./pages/business-reg/BusinessIndustryRegistrationForm.jsx";
import BusinessIndustryRegistrationList from "./pages/business-reg/BusinessIndustryRegistrationList.jsx";
import BusinessRegRenewCompleted from "./pages/business-reg/BusinessRegRenewCompleted.jsx";
import BusinessRegistrationCetificate from "./pages/business-reg/BusinessRegistrationCertificate.jsx";
import BusinessRegistrationRenewLeft from "./pages/business-reg/BusinessRegistrationRenewLeft.jsx";
// pages/business-recommendation
import BusinessClosed from "./pages/business-recommendation/BusinessClosed.jsx";
import BusinessExtensionPannumber from "./pages/business-recommendation/BusinessExtensionPannumber.jsx";
import BusinessRegSummary from "./pages/business-recommendation/BusinessRegSummary.jsx";
import IndustryChange from "./pages/business-recommendation/IndustryChange.jsx";
import IndustryClosedNotify from "./pages/business-recommendation/IndustryClosedNotify.jsx";
import IndustryFormCancellation from "./pages/business-recommendation/IndustryFormCancellation.jsx";
import IndustryPeriodSummary from "./pages/business-recommendation/IndustryPeriodSummary.jsx";
import IndustryRegistrationRecommendation from "./pages/business-recommendation/IndustryRegistrationRecommendation.jsx";
import IndustryTransferAcceptanceLetter from "./pages/business-recommendation/IndustryTransferAcceptanceLetter.jsx";
import IndustryTransferAcceptanceReq from "./pages/business-recommendation/IndustryTransferAcceptanceReq.jsx";
import NewBusinessPannumber from "./pages/business-recommendation/NewBusinessPannumber.jsx";
import PartnershipRegistrationApplicationForm from "./pages/business-recommendation/PartnershipRegistrationApplicationForm.jsx";
import ShopAgriculturalForm from "./pages/business-recommendation/ShopAgriculturalForm.jsx";
import ShopRegistrationForm from "./pages/business-recommendation/ShopRegistrationForm.jsx";
import TaxClearCertificate from "./pages/business-recommendation/TaxClearCertificate.jsx";
// pages/nepali-citizenship
import CitizenshipCertificateCopy from "./pages/nepali-citizenship/CitizenshipCertificateCopy.jsx";
import CitizenshipCertificateRecommendation from "./pages/nepali-citizenship/CitizenshipCertificateRecommendation.jsx";
import CitizenshipCertificateRecommendationCopy from "./pages/nepali-citizenship/CitizenshipCertificateRecommendationCopy.jsx";
import CitizenshipMujulka from "./pages/nepali-citizenship/CitizenshipMujulka.jsx";
import CitizenshipRecommendation from "./pages/nepali-citizenship/CitizenshipRecommendation.jsx";
import CitizenshipRecommendationOnHusbandDetail from "./pages/nepali-citizenship/CitizenshipRecommendationOnHusbandDetail.jsx";
import CitizenshipAngkrit from "./pages/nepali-citizenship/CitizenshipAngkrit.jsx";
import SthalagatSarjiminMujulka from "./pages/nepali-citizenship/SthalagatSarjiminMujulka.jsx";
// pages/identity-card
import BhawanNirmanSampanna from "./pages/identity-card/BhawanNirmanSampanna.jsx";
import ConsumerCommitteeRegistrationList from "./pages/identity-card/ConsumerCommitteeRegistrationList.jsx";
import DClassConstructionBusinessLicense from "./pages/identity-card/DClassConstructionBusinessLicense.jsx";
import DClassConstructionBusinessLicenseList from "./pages/identity-card/DClassConstructionBusinessLicenseList.jsx";
import DrinkingWaterCommitteeRegistration from "./pages/identity-card/DrinkingWaterCommitteeRegistration.jsx";
import FarmerGroupOrCommitteeRegistrationCertificate from "./pages/identity-card/FarmerGroupOrCommitteeRegistrationCertificate.jsx";
import FarmerGroupOrCommitteeRegistrationCertificateList from "./pages/identity-card/FarmerGroupOrCommitteeRegistrationCertificateList.jsx";
import PassbookOfConstructionWork from "./pages/identity-card/PassbookOfConstructionWork.jsx";
// pages/official-use
import ActingWardOfficerAssigned from "./pages/official-use/ActingWardOfficerAssigned.jsx";
import InterLocalTransferRecommendation from "./pages/official-use/InterLocalTransferRecommendation.jsx";
import RamanaPatra from "./pages/official-use/RamanaPatra.jsx";
import SuchanaDetailList from "./pages/official-use/SuchanaDetailList.jsx";
// pages/house-land
import BoundaryRecommendation from "./pages/house-land/BoundaryRecommendation.jsx";
import CharKillaReloaded from "./pages/house-land/CharKillaReloaded.jsx";
import GharKayamNewFormat from "./pages/house-land/GharKayamNewFormat.jsx";
import GovernmentalLandUtilizationRecommendation from "./pages/house-land/GovernmentalLandUtilizationRecommendation.jsx";
import HouseConstructionCompletedCertificate from "./pages/house-land/HouseConstructionCompletedCertificate.jsx";
import HouseDestroyedRecommendation from "./pages/house-land/HouseDestroyedRecommendation.jsx";
import HouseMaintainRecommendation from "./pages/house-land/HouseMaintainRecommendation.jsx";
import HouseRoadVerification from "./pages/house-land/HouseRoadVerification.jsx";
import HouseVerificationRecommendation from "./pages/house-land/HouseVerificationRecommendation.jsx";
import KittaKatRecommendation from "./pages/house-land/KittaKatRecommendation.jsx";
import LandClassificationRecommendation from "./pages/house-land/LandClassificationRecommendation.jsx";
import LandConsolidationRecommendation from "./pages/house-land/LandConsolidationRecommendation.jsx";
import OnsiteInspectionRecommendation from "./pages/house-land/OnsiteInspectionRecommendation.jsx";
import PartialHouseConstructionCompletedCertificate from "./pages/house-land/PartialHouseConstructionCompletedCertificate.jsx";
import PeskiAnurodhSifaris from "./pages/house-land/PeskiAnurodhSifaris.jsx";
import PropertyOwnerCertificateCopyRecommendation from "./pages/house-land/PropertyOwnerCertificateCopyRecommendation.jsx";
import PropertyOwnerCertificateHouseMaintainRecommendation from "./pages/house-land/PropertyOwnerCertificateHouseMaintainRecommendation.jsx";
import PropertyOwnershipTransferKitani from "./pages/house-land/PropertyOwnershipTransferKitani.jsx";
import PropertyOwnershipTransferRecommendation from "./pages/house-land/PropertyOwnershipTransferRecommendation.jsx";
import PropertyVerificationRecommendation from "./pages/house-land/PropertyVerificationRecommendation.jsx";
// pages/association
import BulkLoanRecommendation from "./pages/association/BulkLoanRecommendation.jsx";
import ClubRegistration from "./pages/association/ClubRegistration.jsx";
import ComitteeRegistration from "./pages/association/CommitteeRegistration.jsx";
import NewBankAccountRecommendation from "./pages/association/NewBankAccountRecommendation.jsx";
import NewOrganizationRegistration from "./pages/association/NewOrganizationRegistration.jsx";
import NonProfitOrgRegCertificate from "./pages/association/NonProfitOrgRegCertificate.jsx";
import OldNonProfitOrgRegCertificate from "./pages/association/OldNonProfitOrgRegCertificate.jsx";
import OrganizationRegistered from "./pages/association/OrganizationRegistered.jsx";
import OrganizationRegistrationPunishment from "./pages/association/OrganizationRegistrationPunishment.jsx";
import OrganizationRegistrationRecommendation from "./pages/association/OrganizationRegistrationRecommendation.jsx";
import OrganizationRenewRecommendation from "./pages/association/OrganizationRenewRecommendation.jsx";
import SocialOrganizationRenew from "./pages/association/SocialOrganizationRenew.jsx";
// pages/gov-organization
import GovOrganizationReg from "./pages/gov-organization/GovOrganizationReg.jsx";
import GovOrganizationRegProof from "./pages/gov-organization/GovOrganizationRegProof.jsx";
import GovOrganizationRegRecommendation from "./pages/gov-organization/GovOrganizationRegRecommendation.jsx";
import GovOrganizationRegUnsucessful from "./pages/gov-organization/GovOrganizationRegUnsucessful.jsx";
// pages/educational
import BackwardCommunityRecommendation from "./pages/educational/BackwardCommunityRecommendation.jsx";
import NewClassRecommendation from "./pages/educational/NewClassRecommendation.jsx";
import ScholarshipRecommendation from "./pages/educational/ScholarshipRecommendation.jsx";
// pages/physical-development
import ElectricityCapacityIncrease from "./pages/physical-development/ElectricityCapacityIncrease.jsx";
import ElectricityInstallation from "./pages/physical-development/ElectricityInstallation.jsx";
import ElectricityInstallationRecommendation from "./pages/physical-development/ElectricityInstallationRecommendation.jsx";
import FreeElectricityConnectionRecommendation from "./pages/physical-development/FreeElectricityConnectionRecommendation.jsx";
import IrrigationElectricMeterInstallationRecommendation from "./pages/physical-development/IrrigationElectricMeterInstallationRecommendation.jsx";
import LandKittakatForRoadRecommendation from "./pages/physical-development/LandKittakatForRoadRecommendation.jsx";
import RoadExcavationApprovalRecommendation from "./pages/physical-development/RoadExcavationApprovalRecommendation.jsx";
import RoadMaintainRecommendation from "./pages/physical-development/RoadMaintainRecommendation.jsx";
import TapInstallationRecommendation from "./pages/physical-development/TapInstallationRecommendation.jsx";
// pages/english-format
import AddressVerification from "./pages/english-format/AddressVerification.jsx";
import AnnualIncomeCertificate from "./pages/english-format/AnnualIncomeCertificate.jsx";
import BirthDateVerification from "./pages/english-format/BirthDateVerification.jsx";
import CertificateOfOccupation from "./pages/english-format/CertificateofOccupation.jsx";
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
import BirthCertificateNew from "./pages/english-format/new/BirthCertificateNew.jsx";
import OccupationVerificationNew from "./pages/english-format/new/OccupationVerificationNew.jsx";
import SurnameVerificationAfterMarriage from "./pages/english-format/new/SurnameVerificationAfterMarriage.jsx";
import SurnameVerificationCertificateNew from "./pages/english-format/new/SurnameVerificationCertificateNew.jsx";
import TaxClearanceNewFormat from "./pages/english-format/new/TaxClearanceNewFormat.jsx";
import VerifyRevisedEmblem from "./pages/english-format/new/VerifyRevisedEmblem.jsx";
// pages/economic
import AdvancePaymentRequest from "./pages/economic/AdvancePaymentRequest.jsx";
import BankAccountForSocialSecurity from "./pages/economic/BankAccountForSocialSecurity.jsx";
import FixedAssetValuation from "./pages/economic/FixedAssetValuation.jsx";
import LekhaParikshyan from "./pages/economic/LekhaParikshyan.jsx";
import NewBeneficiaryAccount from "./pages/economic/NewBeneficiaryAccount.jsx";
import ReqforHelpinHealth from "./pages/economic/ReqforHelpinHealth.jsx";
import SocialSecurityPaymentClosure from "./pages/economic/SocialSecurityPaymentClosure.jsx";
import SocialSecurityViaGuardian from "./pages/economic/SocialSecurityViaGuardian.jsx";
import WorkPlanningCompleted from "./pages/economic/WorkPlanningCompleted.jsx";
// pages/social-family
import BehaviorRecommendation from "./pages/social-family/BehaviorRecommendation.jsx";
import BeneficiaryAllowanceTransfer from "./pages/social-family/BeneficiaryAllowanceTransfer.jsx";
import BirthOrSettlementRecommendation from "./pages/social-family/BirthOrSettlementRecommendation.jsx";
import BirthVerificationNepali from "./pages/social-family/BirthVerificationNepali.jsx";
import DemisedHeirRecommendation from "./pages/social-family/DemisedHeirRecommendation.jsx";
import DemisedSecurityAllowanceToHeir from "./pages/social-family/DemisedSecurityAllowanceToHeir.jsx";
import DestituteRecommendation from "./pages/social-family/DestituteRecommendation.jsx";
import DisabilityIdentityCardRecommendation from "./pages/social-family/DisabilityIdentityCardRecommendation.jsx";
import DisableIdentityCardRenew from "./pages/social-family/DisableIdentityCardRenew.jsx";
import ElectricityConnectionRecommendation from "./pages/social-family/ElectricityConnectionRecommendation.jsx";
import EthnicIdentityRecommendation from "./pages/social-family/EthnicIdentityRecommendation.jsx";
import FreeHealthInsuranceRequest from "./pages/social-family/FreeHealthInsuranceRequest.jsx";
import IncomeSourceCertification from "./pages/social-family/IncomeSourceCertification.jsx";
import InternalMigrationRecommendation from "./pages/social-family/InternalMigrationRecommendation.jsx";
import JesthaNagarikSifarisWada from "./pages/social-family/JesthaNagarikSifarisWada.jsx";
import MarriageCertificateOfficial from "./pages/social-family/MarriageCertificate.jsx";
import MinorIdentityCard from "./pages/social-family/MinorIdentityCard.jsx";
import MinorIdentityCardRecommendation from "./pages/social-family/MinorIdentityCardRecommendation.jsx";
import NewBirthVerification from "./pages/social-family/NewBirthVerification.jsx";
import NoSecondMarriageRecommendation from "./pages/social-family/NoSecondMarriageRecommendation.jsx";
import OldAgeAllowanceForm from "./pages/social-family/OldAgeAllowanceForm.jsx";
import PermanentResidenceRecommendation from "./pages/social-family/PermanentResidenceRecommendation.jsx";
import RelationTemporaryResidence from "./pages/social-family/RelationTemporaryResidence.jsx";
import RelationshipVerification from "./pages/social-family/RelationshipVerification.jsx";
import SocialSecurityAllowanceRecommendation from "./pages/social-family/SocialSecurityAllowanceRecommendation.jsx";
import SocialSecurityRecommendation from "./pages/social-family/SocialSecurityRecommendation.jsx";
import TemporaryResidenceRecommendation from "./pages/social-family/TemporaryResidenceRecommendation.jsx";
import ThreeGenerationCertificate from "./pages/social-family/ThreeGenerationCertificate.jsx";
import TribalRecommendation from "./pages/social-family/TribalRecommendation.jsx";
import UnmarriedVerification from "./pages/social-family/UnmarriedVerification.jsx";
// pages/MRP
import PassportRecommendation from "./pages/MRP/PassportRecommendation";
// pages/others
import DifferentDOBCertification from "./pages/others/DifferentDOBCertification.jsx";
import DifferentEnglishSpellingCertification from "./pages/others/DifferentEnglishSpellingCertification.jsx";
import DifferentNameCertification from "./pages/others/DifferentNameCertification.jsx";
import LeaveRequestApplication from "./pages/others/LeaveRequestApplication.jsx";
// pages/animal-husbandry
import DomesticAnimalInsuranceClaimRecommendation from "./pages/animal-husbandry/DomesticAnimalInsuranceClaimRecommendation.jsx";
import DomesticAnimalMaternityNutritionAllowance from "./pages/animal-husbandry/DomesticAnimalMaternityNutritionAllowance.jsx";
// pages/planning
import AgreementOfPlan from "./pages/planning/AgreementOfPlan.jsx";
import WithdrawalFundRecommendation from "./pages/planning/WithdrawalFundRecommendation.jsx";
// pages/open-format
import EnglishLanguage from "./pages/open-format/EnglishLanguage.jsx";
import NepaliLanguage from "./pages/open-format/NepaliLanguage.jsx";
import OpenApplication from "./pages/open-format/OpenApplication.jsx";
import OpenFormatTippani from "./pages/open-format/OpenFormatTippani.jsx";
import PartialInformation from "./pages/open-format/PartialInformation.jsx";
// pages/report
import CategoryReportSearch from "./pages/report/CategoryReportSearch.jsx";
import CertificateRenewalList from "./pages/report/CertificateRenewalList.jsx";
import DisabilityIdentityCardList from "./pages/report/DisabilityIdentityCardList.jsx";
import ReportList from "./pages/report/ReportList.jsx";
import SeniorCitizenIdentityCardList from "./pages/report/SeniorCitizenIdentityCardList.jsx";
// pages/daily-work-execute
import DailyWorkPerformanceList from "./pages/daily-work-execute/DailyWorkPerformanceList.jsx";

const Layout = () => {
  const [openMenu, setOpenMenu] = useState("application");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeLink, setActiveLink] = useState("गृहपृष्ठ");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const today = new Date().toLocaleDateString("ne-NP", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  // Auto-hide logout menu after 4 seconds
  useEffect(() => {
    if (isUserMenuOpen) {
      const timer = setTimeout(() => {
        setIsUserMenuOpen(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [isUserMenuOpen]);

  const handleLogout = () => {
    logout(); // from AuthContext
    navigate("/"); // go back to login page
  };

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
    // only called for leaf items (children)
    setActiveLink(linkName);

    const parent = NAV_ITEMS.find((i) => i.children.includes(linkName));
    setOpenMenu(parent ? parent.id : null);
  };

  const getParentIdOfActiveLink = useMemo(() => {
    const parent = NAV_ITEMS.find((item) => item.children.includes(activeLink));
    return parent ? parent.id : null;
  }, [activeLink]);

  const renderMainContent = () => {
    switch (activeLink) {
      case "गृहपृष्ठ":
        return <Dashboard />;
      // pages/application
      case "व्यवसाय दर्ता दरखास्त फारम":
        return (
          <BusinessRegistrationApplicationForm setActiveLink={setActiveLink} />
        );
      case "आदिवासी प्रमाणित सिफारिस":
        return (
          <TribalVerificationRecommendation setActiveLink={setActiveLink} />
        );
      case "वृद्ध भत्ताको निवेदन":
        return <AllowanceForm setActiveLink={setActiveLink} />;
      case "जग्गाको साँध सिमाङ्कन":
        return <LandBoundaryVerificationForm setActiveLink={setActiveLink} />;
      case "फर्म खारेजी":
        return <BusinessDeregistration setActiveLink={setActiveLink} />;
      case "विपन्न नागरिक आवेदन तथा सिफारिस":
        return (
          <ImprovisedCitizenshipApplicationRecommendation
            setActiveLink={setActiveLink}
          />
        );
      case "पतिको वतन कायम नागरिकताको प्रति‍लिपि new":
        return <CitizenshipwithHusbandSurname setActiveLink={setActiveLink} />;
      case "पतिको नाम, थर, वतन कायम गरी नागरिकताको प्रति‍लिपि new":
        return (
          <CitizenshipwithoutHusbandSurname setActiveLink={setActiveLink} />
        );
      case "जनजाति प्रमाणित new":
        return (
          <ApplicationforIndigenousNationalityCertification
            setActiveLink={setActiveLink}
          />
        );
      case "दलित जाति प्रमाणित new":
        return <DalitCasteCertification setActiveLink={setActiveLink} />;
      case "खस आर्य जाति प्रमाणित new":
        return (
          <ApplicationforKhasAryaCasteCertification
            setActiveLink={setActiveLink}
          />
        );
      case "नागरिकता प्रमाणपत्र शैक्षिक योग्यताको प्रमाणपत्र फरक":
        return <RequestforCertification setActiveLink={setActiveLink} />;
      case "नागरिकता प्रमाणपत्र बुवा/आमाको नागरिकतामा फरक new":
        return (
          <RequestforCertificationMotherFather setActiveLink={setActiveLink} />
        );

      // pages/business-reg
      case "व्यवसाय दर्ता (नयाँ)":
        return (
          <BusinessIndustryRegistrationForm setActiveLink={setActiveLink} />
        );
      case "व्यवसाय दर्ता (पुरानो वाला)":
        return <BusinessRegistrationCetificate setActiveLink={setActiveLink} />;
      case "व्यवसाय दर्ता सूची":
        return (
          <BusinessIndustryRegistrationList setActiveLink={setActiveLink} />
        );
      case "व्यवसाय दर्ता नविकरण वाकि सूची":
        return <BusinessRegistrationRenewLeft setActiveLink={setActiveLink} />;
      case "व्यवसाय दर्ता नविकरण भइसकेको सूची":
        return <BusinessRegRenewCompleted setActiveLink={setActiveLink} />;

      // pages/business-recommendation
      case "व्यवसाय बन्द":
        return <BusinessClosed setActiveLink={setActiveLink} />;
      case "व्यवसाय दर्ताको विवरण पठाइदिने बारे":
        return <BusinessRegSummary setActiveLink={setActiveLink} />;
      case "पसल, कृषि, पक्षी फर्म/दर्ता मुचुल्का":
        return <ShopAgriculturalForm setActiveLink={setActiveLink} />;
      case "पसल तथा फर्म दर्ता सिफारिस":
        return <ShopRegistrationForm setActiveLink={setActiveLink} />;
      case "उद्योगको दर्ता खारेजी":
        return <IndustryFormCancellation setActiveLink={setActiveLink} />;
      case "उद्योगको क्षमता परिवर्तन":
        return <IndustryChange setActiveLink={setActiveLink} />;
      case "उद्योग बन्द भएको जानकारी पत्र":
        return <IndustryClosedNotify setActiveLink={setActiveLink} />;
      case "उद्योग आवधिक विवरण":
        return <IndustryPeriodSummary setActiveLink={setActiveLink} />;
      case "उद्योग स्थानन्तरण स्वीकृति अनुरोध":
        return <IndustryTransferAcceptanceReq setActiveLink={setActiveLink} />;
      case "उद्योग स्थान्तरण स्वीकृति पत्र":
        return (
          <IndustryTransferAcceptanceLetter setActiveLink={setActiveLink} />
        );
      case "उद्योग दर्ता सिफारिस":
        return (
          <IndustryRegistrationRecommendation setActiveLink={setActiveLink} />
        );
      case "साझेदारी दर्ता आवेदन":
        return (
          <PartnershipRegistrationApplicationForm
            setActiveLink={setActiveLink}
          />
        );
      case "नयाँ स्थायी लेखा नं":
        return <NewBusinessPannumber setActiveLink={setActiveLink} />;
      case "कारोबार थप स्थायी लेखा नं":
        return <BusinessExtensionPannumber setActiveLink={setActiveLink} />;
      case "कर चुक्ता प्रमाणपत्र":
        return <TaxClearCertificate setActiveLink={setActiveLink} />;

      // pages/nepali-citizenship
      case "नागरिकता प्रतिलिपि सिफारिस":
        return (
          <CitizenshipCertificateRecommendationCopy
            setActiveLink={setActiveLink}
          />
        );
      case "नागरिकताको लागि मुचुल्का":
        return <CitizenshipMujulka setActiveLink={setActiveLink} />;
      case "स्थलगत सर्जमिन मुचुल्का":
        return <SthalagatSarjiminMujulka setActiveLink={setActiveLink} />;
      case "नागरिकता प्रमाणपत्र सिफारिस":
        return (
          <CitizenshipCertificateRecommendation setActiveLink={setActiveLink} />
        );
      case "नागरिकता सिफारिस":
        return <CitizenshipRecommendation setActiveLink={setActiveLink} />;
      case "नागरिकताको प्रमाण-पत्र प्रतिलिपि":
        return <CitizenshipProofCopy setActiveLink={setActiveLink} />;
      case "नेपाली अंगीकृत नागरिकता":
        return <CitizenshipAngkrit setActiveLink={setActiveLink} />;
      case "पतिको नाममा नेपाली नागरिकताको प्रमाण-पत्र":
        return (
          <CitizenshipRecommendationOnHusbandDetail
            setActiveLink={setActiveLink}
          />
        );
      // pages/open-format
      case "नेपाली भाषामा":
        return <NepaliLanguage setActiveLink={setActiveLink} />;
      case "अंग्रेजी भाषामा":
        return <EnglishLanguage setActiveLink={setActiveLink} />;
      case "खुल्ला निवेदन":
        return <OpenApplication setActiveLink={setActiveLink} />;
      case "सूचना अध्यावधिक":
        return <PartialInformation setActiveLink={setActiveLink} />;
      case "टिप्पणी new":
        return <OpenFormatTippani setActiveLink={setActiveLink} />;
      // pages/official-use
      case "अन्तर स्थानीय सरुवा new":
        return (
          <InterLocalTransferRecommendation setActiveLink={setActiveLink} />
        );
      case "रमाना पत्र new":
        return <RamanaPatra setActiveLink={setActiveLink} />;
      case "कार्यवाहक तोकिएको सिफारिस":
        return <ActingWardOfficerAssigned setActiveLink={setActiveLink} />;
      case "सूचना विवरण सूची":
        return <SuchanaDetailList setActiveLink={setActiveLink} />;

      // pages/identity-card
      case "कृषक समूह/समिति दर्ता प्रमाण–पत्र":
        return (
          <FarmerGroupOrCommitteeRegistrationCertificate
            setActiveLink={setActiveLink}
          />
        );
      case "घ वर्गको निर्माण व्यवसाय इजाजत पत्र":
        return (
          <DClassConstructionBusinessLicense setActiveLink={setActiveLink} />
        );
      case "निर्माण कार्य को पासबुक":
        return <PassbookOfConstructionWork setActiveLink={setActiveLink} />;
      case "घ वर्गको निर्माण व्यवसाय इजाजत पत्रको नवीकरण":
        return (
          <DClassConstructionBusinessLicenseList
            setActiveLink={setActiveLink}
          />
        );
      case "उपभोक्ता संग दर्ता प्रमाणपत्र सूची":
        return (
          <ConsumerCommitteeRegistrationList setActiveLink={setActiveLink} />
        );
      case "कृषक समूह/समिति दर्ता प्रमाण–पत्र सूची":
        return (
          <FarmerGroupOrCommitteeRegistrationCertificateList
            setActiveLink={setActiveLink}
          />
        );
      case "भवन निर्माण प्रमाण–पत्र":
        return <BhawanNirmanSampanna setActiveLink={setActiveLink} />;
      case "खानेपानी उपभोक्ता संस्था दर्ता प्रमाण पत्र":
        return (
          <DrinkingWaterCommitteeRegistration setActiveLink={setActiveLink} />
        );

      // pages/house-land
      case "जग्गा वर्गीकरण new":
        return (
          <LandClassificationRecommendation setActiveLink={setActiveLink} />
        );
      case "स्थलगत निरीक्षण new":
        return <OnsiteInspectionRecommendation setActiveLink={setActiveLink} />;
      case "घर जग्गा नामसारी सिफारिस (किटानी)":
        return (
          <PropertyOwnershipTransferKitani setActiveLink={setActiveLink} />
        );
      case "घर कायम सिफारिस":
        return <HouseMaintainRecommendation setActiveLink={setActiveLink} />;
      case "घर जग्गा नामसारी सिफारिस":
        return (
          <PropertyOwnershipTransferRecommendation
            setActiveLink={setActiveLink}
          />
        );
      case "घर जनाउने सिफारिस":
        return (
          <HouseVerificationRecommendation setActiveLink={setActiveLink} />
        );
      case "कित्ताकाट सिफारिस":
        return <KittaKatRecommendation setActiveLink={setActiveLink} />;
      case "घरबाटो प्रमाणित":
        return <HouseRoadVerification setActiveLink={setActiveLink} />;
      case "चार किल्ला सिफारिस":
        return <PeskiAnurodhSifaris setActiveLink={setActiveLink} />;
      case "चार किल्ला खुलाई सिफारिस new":
        return <CharKillaReloaded setActiveLink={setActiveLink} />;
      case "लालपुर्जाको प्रतिलिपि सिफारिस":
        return (
          <PropertyOwnerCertificateCopyRecommendation
            setActiveLink={setActiveLink}
          />
        );
      case "जग्गाधनी प्रमाण पुर्जामा घर कायम सिफारिस":
        return (
          <PropertyOwnerCertificateHouseMaintainRecommendation
            setActiveLink={setActiveLink}
          />
        );
      case "घर पाताल भएको सिफारिस":
        return <HouseDestroyedRecommendation setActiveLink={setActiveLink} />;
      case "जोत भोग चलनको सिफारिस":
        return (
          <GovernmentalLandUtilizationRecommendation
            setActiveLink={setActiveLink}
          />
        );
      case "चौहद्दी सिफारिस":
        return <BoundaryRecommendation setActiveLink={setActiveLink} />;
      case "भुकम्प प्रतिरोधि घर निर्माण सम्पन्न प्रमाणपत्र":
        return (
          <HouseConstructionCompletedCertificate
            setActiveLink={setActiveLink}
          />
        );
      case "आंशिक / पूर्ण घर निर्माण सम्पन्न प्रमाणपत्र":
        return (
          <PartialHouseConstructionCompletedCertificate
            setActiveLink={setActiveLink}
          />
        );
      case "सम्पत्ति प्रमाणीकरण सिफारिस":
        return (
          <PropertyVerificationRecommendation setActiveLink={setActiveLink} />
        );
      case "जग्गा एकिकृत सिफारिस":
        return (
          <LandConsolidationRecommendation setActiveLink={setActiveLink} />
        );
      case "घर कायम New Format":
        return <GharKayamNewFormat setActiveLink={setActiveLink} />;

      // pages/association
      case "गैर नाफामुलुक संस्था दर्ता":
        return <NonProfitOrgRegCertificate setActiveLink={setActiveLink} />;
      case "गैर नाफामुलुक संस्था दर्ता पुरानो वला":
        return <OldNonProfitOrgRegCertificate setActiveLink={setActiveLink} />;
      case "संस्था नबिकरण सिफारिस":
        return (
          <OrganizationRenewRecommendation setActiveLink={setActiveLink} />
        );
      case "घरेलु तथा साना उद्योग दर्ता":
        return (
          <OrganizationRegistrationRecommendation
            setActiveLink={setActiveLink}
          />
        );
      case "संस्था दर्ता":
        return <NewOrganizationRegistration setActiveLink={setActiveLink} />;
      case "सामाजिक संस्था नविकरण":
        return <SocialOrganizationRenew setActiveLink={setActiveLink} />;
      case "समिति दर्ता सिफारिस":
        return <CommitteeRegistration setActiveLink={setActiveLink} />;
      case "सजाय पाए नपाएको":
        return (
          <OrganizationRegistrationPunishment setActiveLink={setActiveLink} />
        );
      case "थोक कर्जा सिफारिस":
        return <BulkLoanRecommendation setActiveLink={setActiveLink} />;
      case "संस्था दर्ता गरिएको":
        return <OrganizationRegistered setActiveLink={setActiveLink} />;
      case "क्लब दर्ता सिफारिस":
        return <ClubRegistration setActiveLink={setActiveLink} />;
      case "खाता खोली दिने":
        return <NewBankAccountRecommendation setActiveLink={setActiveLink} />;

      // pages/gov-organization
      case "सहकारी संस्था दर्ता सिफारिस":
        return <GovOrganizationReg setActiveLink={setActiveLink} />;
      case "सहकारी संस्था दर्ता सिफारिसको सूची":
        return <GovOrganizationRegUnsucessful setActiveLink={setActiveLink} />;
      case "सहकारी संस्था दर्ता अस्वीकृत सूची":
        return (
          <GovOrganizationRegRecommendation setActiveLink={setActiveLink} />
        );
      case "सहकारी संस्था दर्ता प्रमाण-पत्र सूची":
        return <GovOrganizationRegProof setActiveLink={setActiveLink} />;

      // pages/educational
      case "छात्रवृत्ति सिफारिस":
        return <ScholarshipRecommendation setActiveLink={setActiveLink} />;
      case "विपन्नता सिफारिस":
        return (
          <BackwardCommunityRecommendation setActiveLink={setActiveLink} />
        );
      case "कक्षा थप सिफारिस":
        return <NewClassRecommendation setActiveLink={setActiveLink} />;

      // pages/physical-development
      case "धारा जडान सिफारिस":
        return <TapInstallationRecommendation setActiveLink={setActiveLink} />;
      case "बिजुली जडान सिफारिस":
        return (
          <ElectricityInstallationRecommendation
            setActiveLink={setActiveLink}
          />
        );
      case "नयाँ बिजुली जडान सिफारिस":
        return <ElectricityInstallation setActiveLink={setActiveLink} />;
      case "विद्युत् क्षमता बढाउन सिफारिस":
        return <ElectricityCapacityIncrease setActiveLink={setActiveLink} />;
      case "सडक खन्ने स्वीकृतिको सिफारिस":
        return (
          <RoadExcavationApprovalRecommendation setActiveLink={setActiveLink} />
        );
      case "नेपाल सरकारको नाममा बाटो कायम सिफारिस":
        return <RoadMaintainRecommendation setActiveLink={setActiveLink} />;
      case "सडक सिफारिसको लागि भूमि कित्ताकाट":
        return (
          <LandKittakatForRoadRecommendation setActiveLink={setActiveLink} />
        );
      case "ससिचार विद्युत् मिटर जडान सिफारिस":
        return (
          <IrrigationElectricMeterInstallationRecommendation
            setActiveLink={setActiveLink}
          />
        );
      case "निशुल्क विद्युत् जडान":
        return (
          <FreeElectricityConnectionRecommendation
            setActiveLink={setActiveLink}
          />
        );

      // pages/english-format
      case "Relationship Verification":
        return (
          <RelationshipVerificationEnglish setActiveLink={setActiveLink} />
        );
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
      case "Certification of Occupation":
        return <CertificateOfOccupation setActiveLink={setActiveLink} />;
      case "Tax Clear Basic":
        return <TaxClearBasic setActiveLink={setActiveLink} />;
      case "Digital Verification":
        return <DigitalVerification setActiveLink={setActiveLink} />;
      case "Occupation Verification New":
        return <OccupationVerificationNew setActiveLink={setActiveLink} />;
      case "Address Verification New":
        return <AddressVerificationNew setActiveLink={setActiveLink} />;
      case "Birth Certification New":
        return <BirthCertificateNew setActiveLink={setActiveLink} />;
      case "Verify Revised Emblem New":
        return <VerifyRevisedEmblem setActiveLink={setActiveLink} />;
      case "Tax Clearance New Format":
        return <TaxClearanceNewFormat setActiveLink={setActiveLink} />;
      case "Annual Income Verification New":
        return <AnnualIncomeVerificationNew setActiveLink={setActiveLink} />;
      case "Surname Verification Certificate":
        return (
          <SurnameVerificationCertificateNew setActiveLink={setActiveLink} />
        );
      case "Surname Verification After Marriage":
        return (
          <SurnameVerificationAfterMarriage setActiveLink={setActiveLink} />
        );

      // pages/economic
      case "उपचारमा आर्थिक सहायता सिफारिस":
        return <ReqforHelpinHealth setActiveLink={setActiveLink} />;
      case "अचल सम्पत्ति मुल्यांकन":
        return <FixedAssetValuation setActiveLink={setActiveLink} />;
      case "कार्य योजना पूरा भयो सिफारिस":
        return <WorkPlanningCompleted setActiveLink={setActiveLink} />;
      case "पेश्की अनुरोध सिफारिस":
        return <AdvancePaymentRequest setActiveLink={setActiveLink} />;
      case "सामाजिक सुरक्षाको बैंक खाता":
        return <BankAccountForSocialSecurity setActiveLink={setActiveLink} />;
      case "नयाँ लाभग्राहीको खाता खोल्न":
        return <NewBeneficiaryAccount setActiveLink={setActiveLink} />;
      case "सामाजिक सुरक्षा भत्ता रकम भुक्तानी गरि खाता बन्द गरिने":
        return <SocialSecurityPaymentClosure setActiveLink={setActiveLink} />;
      case "संरक्षक मार्फत सामाजिक सुरक्षा भत्ता उपलब्ध":
        return <SocialSecurityViaGuardian setActiveLink={setActiveLink} />;
      case "लेखा परीक्षण":
        return <LekhaParikshyan setActiveLink={setActiveLink} />;

      // pages/social-family
      case "पारिवारिक विवरण":
        return <OldAgeAllowanceForm setActiveLink={setActiveLink} />;
      case "अस्थायी बसोवास सिफारिस":
        return (
          <TemporaryResidenceRecommendation setActiveLink={setActiveLink} />
        );
      case "अस्थायी बसोवास प्रमाणित":
        return <RelationTemporaryResidence setActiveLink={setActiveLink} />;
      case "स्थायी बसोवास सिफारिस":
        return (
          <PermanentResidenceRecommendation setActiveLink={setActiveLink} />
        );
      case "विवाह प्रमाणित":
        return <MarriageCertificateOfficial setActiveLink={setActiveLink} />;
      case "जन्म मिति प्रमाणित":
        return <BirthVerificationNepali setActiveLink={setActiveLink} />;
      case "जन्म प्रमाणिकरण new":
        return <NewBirthVerification setActiveLink={setActiveLink} />;
      case "अविवाहित प्रमाणित":
        return <UnmarriedVerification setActiveLink={setActiveLink} />;
      case "नाता प्रमाणित":
        return <RelationTemporaryResidence setActiveLink={setActiveLink} />;
      case "नाता प्रमाणित प्रमाण पत्र new":
        return <RelationshipVerification setActiveLink={setActiveLink} />;
      case "तीन पुस्ते प्रमाणित":
        return <ThreeGenerationCertificate setActiveLink={setActiveLink} />;
      case "चालचलन सिफारिस":
        return <BehaviorRecommendation setActiveLink={setActiveLink} />;
      case "सामाजिक सुरक्षा सिफारिस":
        return <SocialSecurityRecommendation setActiveLink={setActiveLink} />;
      case "आन्तरिक बसाईँसराई सिफारिस":
        return (
          <InternalMigrationRecommendation setActiveLink={setActiveLink} />
        );
      case "नाबालक परिचयपत्रको अनुसूची":
        return (
          <MinorIdentityCardRecommendation setActiveLink={setActiveLink} />
        );
      case "नाबालक परिचय पत्र":
        return <MinorIdentityCard setActiveLink={setActiveLink} />;
      case "मृतकका हकदारको सिफारिस":
        return <DemisedHeirRecommendation setActiveLink={setActiveLink} />;
      case "अपांग परिचय पत्र सिफारिस":
        return (
          <DisabilityIdentityCardRecommendation setActiveLink={setActiveLink} />
        );
      case "जेष्ठ नागरिक सिफारिस":
        return <JesthaNagarikSifarisWada setActiveLink={setActiveLink} />;
      case "आदिवासी सिफारिस":
        return <TribalRecommendation setActiveLink={setActiveLink} />;
      case "जन्म / बसोबास प्रमाणित":
        return (
          <BirthOrSettlementRecommendation setActiveLink={setActiveLink} />
        );
      case "मृतकको सामाजिक सुरक्षा भत्ता हकदारलाई":
        return <DemisedSecurityAllowanceToHeir setActiveLink={setActiveLink} />;
      case "सामाजिक सुरक्षा भत्ता":
        return (
          <SocialSecurityAllowanceRecommendation
            setActiveLink={setActiveLink}
          />
        );
      case "निशुल्क स्वास्थ्य बिमा":
        return <FreeHealthInsuranceRequest setActiveLink={setActiveLink} />;
      case "आय श्रोत प्रमाणित":
        return <IncomeSourceCertification setActiveLink={setActiveLink} />;
      case "दोश्रो विवाह नगरेको सिफारिस":
        return <NoSecondMarriageRecommendation setActiveLink={setActiveLink} />;
      case "परिचय पत्र नविकरण":
        return <DisableIdentityCardRenew setActiveLink={setActiveLink} />;
      case "विपन्न सिफारिस":
        return <DestituteRecommendation setActiveLink={setActiveLink} />;
      case "लाभग्राहीको लगत स्थानान्तरण":
        return <BeneficiaryAllowanceTransfer setActiveLink={setActiveLink} />;
      case "जातीय पहिचान सिफारिस":
        return <EthnicIdentityRecommendation setActiveLink={setActiveLink} />;

      // pages/MRP
      case "राहदानी प्रमाण पत्र":
        return <PassportRecommendation setActiveLink={setActiveLink} />;

      // pages/others
      case "फरक फरक नाम र थर सिफारिस":
        return <DifferentNameCertification setActiveLink={setActiveLink} />;
      case "फरक फरक जन्म मिति प्रमाणित":
        return <DifferentDOBCertification setActiveLink={setActiveLink} />;
      case "फरक फरक अंग्रेजी हिज्जे प्रमाणित":
        return (
          <DifferentEnglishSpellingCertification
            setActiveLink={setActiveLink}
          />
        );
      case "बिदाको निवेदन":
        return <LeaveRequestApplication setActiveLink={setActiveLink} />;

      // pages/animal-husbandry
      case "गाई / भैंसी सुत्केरी पोषण भत्ता":
        return (
          <DomesticAnimalMaternityNutritionAllowance
            setActiveLink={setActiveLink}
          />
        );
      case "पशु बिमा पाउँ":
        return (
          <DomesticAnimalInsuranceClaimRecommendation
            setActiveLink={setActiveLink}
          />
        );

      // pages/planning
      case "योजना सम्झौताकॊ सिफारिस":
        return <AgreementOfPlan setActiveLink={setActiveLink} />;
      case "रकम निकाशाको सिफारिस":
        return <WithdrawalFundRecommendation setActiveLink={setActiveLink} />;

      // pages/report
      case "कोटीको आधारमा रिपोर्ट हेर्नुहोस्":
        return <CategoryReportSearch setActiveLink={setActiveLink} />;
      case "कोटीको आधारमा सूची हेर्नुहोस्":
        return <ReportList setActiveLink={setActiveLink} />;
      case "अस्वीकृत अपाङ्गता परिचयपत्रको सूची":
        return <DisabilityIdentityCardList setActiveLink={setActiveLink} />;
      case "अस्वीकृत जेष्ठ नागरिक परिचयपत्रको सूची":
        return <SeniorCitizenIdentityCardList setActiveLink={setActiveLink} />;
      case "परिचय–पत्र नवीकरण सूची":
        return <CertificateRenewalList setActiveLink={setActiveLink} />;

      // pages/daily-work-execute
      case "दैनिक कार्य सम्पादन":
        return <DailyWorkPerformanceList setActiveLink={setActiveLink} />;

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
              {MUNICIPALITY.name}, {MUNICIPALITY.officeLine}
              <br />
              <div className="w-6" aria-hidden="true" />
              {MUNICIPALITY.provinceLine}
            </h1>
          </div>
        </div>
        <div className="flex items-center space-x-4 relative">
          <span className="text-sm">{today}</span>

          {/* User avatar button */}
          <button
            type="button"
            onClick={() => setIsUserMenuOpen((prev) => !prev)}
            className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center 
             hover:bg-blue-700 active:bg-blue-800 transition"
          >
            <User className="w-6 h-6" />
          </button>

          {/* Dropdown menu */}
          {isUserMenuOpen && (
            <div className="absolute right-0 top-12 mt-2 w-40 bg-white text-gray-800 rounded-md shadow-lg py-1 z-50">
              <button
                type="button"
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm font-semibold text-red-600 
             hover:bg-red-200 hover:text-red-800 transition flex items-center gap-2"
              >
                लग आउट
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 bottom-0 w-72 bg-[#0f172a] text-white transition-transform duration-300 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } z-40 flex flex-col`}
      >
        <div className="p-4">
          <div className="relative w-full">
            {/* Search Icon */}
            <Search
              className="
      absolute
      left-3
      top-1/2
      -translate-y-1/2
      w-5
      h-5
      text-gray-400
      pointer-events-none
    "
            />

            {/* Search Input */}
            <input
              type="text"
              placeholder="      मेनु खोज्नुहोस्..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="
      w-full
      !bg-gray-800
      !text-white
      caret-white
      placeholder-gray-400
      placeholder-opacity-100
      placeholder-shown:opacity-100
      border
      border-white/40
      rounded-lg
      py-2
      pl-11
      pr-3
      text-sm
      shadow-[0_0_0_1px_rgba(255,255,255,0.15)]
      focus:outline-none
      focus:border-blue-500
      focus:ring-2
      focus:ring-blue-500/30
    "
            />
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

/* ------------------------------------------------------------------
    The real App – router + auth
------------------------------------------------------------------ */
const App = () => {
  return (
    <AuthProvider>
      <AdminAuthProvider>
        <BrowserRouter>
          <Routes>
            {/* ---------------- ADMIN ROUTES ---------------- */}
            <Route path="/admin/login" element={<AdminLogin />} />

            <Route
              path="/admin"
              element={
                <AdminProtectedRoute>
                  <AdminLayout />
                </AdminProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="create-admin" element={<CreateAdmin />} />
              <Route path="admin-list" element={<AdminList />} />
            </Route>

            {/* ---------------- USER LOGIN ---------------- */}
            <Route path="/" element={<Login />} />

            {/* ---------------- MAIN SYSTEM (YOUR LARGE LAYOUT) ---------------- */}
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AdminAuthProvider>
    </AuthProvider>
  );
};

export default App;
