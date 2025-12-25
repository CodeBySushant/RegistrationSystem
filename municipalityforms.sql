CREATE DATABASE IF NOT EXISTS MunicipalityForms
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
USE MunicipalityForms;

-- pages/animalhusbandry

CREATE TABLE IF NOT EXISTS DomesticAnimalInsuranceClaimRecommendation (
  id INT AUTO_INCREMENT PRIMARY KEY,
  -- Meta / header
  chalan_no VARCHAR(100),                     -- "चलानी नं." input
  subject VARCHAR(255) DEFAULT 'सिफारिस सम्बन्धमा',
  -- Addressee / recipient lines (top of form)
  addressee_line1 VARCHAR(255),               -- first addressee input after "श्री"
  addressee_line2 VARCHAR(255),               -- second row first input
  addressee_line3 VARCHAR(255),               -- second row second input
  -- Location / header defaults
  municipality_name VARCHAR(255) DEFAULT 'नागार्जुन नगरपालिका',
  ward_no VARCHAR(50),                        -- ward number shown or used in text (if needed)
  -- Main paragraph / incident details (fields visible as inline inputs)
  resident_name_in_paragraph VARCHAR(255),    -- long-box input: the person mentioned in paragraph (प्रस्तुत विषयमा ... श्री <input>)
  local_select_type VARCHAR(50),              -- the inline-select (e.g. गुयुल्का / वडा)
  animal_type VARCHAR(255),                   -- inline input for पशु (if present)
  animal_inspected_by VARCHAR(255),           -- inline input "श्री <input>" (inspector / owner / related person)
  report_brief VARCHAR(1000),                 -- optional short summary / "जाँच प्रतिवेदन अनुसार" free text
  damaged_area_description VARCHAR(255),      -- "बिगा लेख ..." inline input
  tag_number VARCHAR(100),                    -- "ट्याग नं." inline input
  tag_subtype VARCHAR(255),                   -- another inline input near tag (e.g. animal part / type)
  animal_color VARCHAR(100),                  -- color input
  death_date DATE,                            -- date if you want to store the death date (use YYYY-MM-DD)
  -- Applicant details box (explicit fields in bottom box)
  applicant_name VARCHAR(255),
  applicant_address VARCHAR(500),
  applicant_citizenship_no VARCHAR(100),
  applicant_phone VARCHAR(50),
  -- Signature block
  signer_name VARCHAR(255),                   -- text under signature line
  signer_designation VARCHAR(100),            -- designation select (वडा अध्यक्ष, वडा सचिव, ...)
  -- housekeeping
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS DomesticAnimalMaternityNutritionAllowance (
  id INT AUTO_INCREMENT PRIMARY KEY,
  -- header / meta
  chalan_no VARCHAR(100),
  subject VARCHAR(255) DEFAULT 'गाई / भैंसी सुत्केरी पोषण भत्ता उपलब्ध गरिदिने बारे ।',
  issue_date DATE,                -- optional: the form date (YYYY-MM-DD)
  -- addressee / recipient
  addressee_line1 VARCHAR(255),
  addressee_line2 VARCHAR(255),
  -- location / identity in paragraph
  district VARCHAR(100),          -- first inline input (e.g. जिल्ला)
  municipality_name VARCHAR(255) DEFAULT 'नागार्जुन',
  ward_no VARCHAR(50),
  resident_name VARCHAR(255),     -- long-box: person who owns/keeps the animal
  duration_value VARCHAR(50),     -- tiny-box: number of months/years (string so it can hold Nepali digits)
  duration_unit VARCHAR(20),      -- "महिना" or "वर्ष"
  calving_date DATE,              -- date input (use DATE type)
  animal_count INT DEFAULT 1,     -- optional if you want to record how many animals (not present in form but useful)
  -- signature
  signer_name VARCHAR(255),
  signer_designation VARCHAR(100),
  -- applicant details box
  applicant_name VARCHAR(255),
  applicant_address VARCHAR(500),
  applicant_citizenship_no VARCHAR(100),
  applicant_phone VARCHAR(50),
  -- housekeeping
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;



-- pages/application
CREATE TABLE IF NOT EXISTS AllowanceForm (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nagarpalika VARCHAR(255),
  ward VARCHAR(20),
  targetGroup VARCHAR(255),
  gender VARCHAR(50),
  fullName VARCHAR(255),
  fatherName VARCHAR(255),
  motherName VARCHAR(255),
  address VARCHAR(500),
  nagariktaNo VARCHAR(100),
  jariJilla VARCHAR(100),
  birthDate DATE,
  mobileNo VARCHAR(50),
  patiMrituNo VARCHAR(100),
  patiMrituMiti DATE,
  allowanceType VARCHAR(255),
  parichayaNo VARCHAR(100),
  allowanceStartDate VARCHAR(50),
  allowanceStartQuarter VARCHAR(50),
  applicantName VARCHAR(255),
  applicantAddress VARCHAR(500),
  applicantNagarikta VARCHAR(100),
  applicantPhone VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS IndigenousNationalityCertification (
  id INT AUTO_INCREMENT PRIMARY KEY,
  `date` VARCHAR(50),               -- store as string (you used Nepali date format)
  headerDistrict VARCHAR(255),
  mainDistrict VARCHAR(255),
  palikaName VARCHAR(255),
  wardNo VARCHAR(50),
  residentName VARCHAR(255),
  `relation` VARCHAR(50),
  guardianName VARCHAR(255),
  tribeName VARCHAR(255),
  sigName VARCHAR(255),
  sigAddress VARCHAR(500),
  sigMobile VARCHAR(50),
  sigSignature VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS KhasAryaCasteCertification (
  id INT AUTO_INCREMENT PRIMARY KEY,
  `date` VARCHAR(50),
  headerDistrict VARCHAR(255),
  mainDistrict VARCHAR(255),
  palikaName VARCHAR(255),
  wardNo VARCHAR(50),
  residentName VARCHAR(255),
  `relation` VARCHAR(50),
  guardianName VARCHAR(255),
  casteName VARCHAR(255),
  sigName VARCHAR(255),
  sigAddress VARCHAR(500),
  sigMobile VARCHAR(50),
  sigSignature VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS BusinessDeregistration (
  id INT AUTO_INCREMENT PRIMARY KEY,
  headerTo VARCHAR(255),
  headerMunicipality VARCHAR(255),
  headerOffice VARCHAR(255),
  `date` VARCHAR(50),
  municipality VARCHAR(255),
  firmType VARCHAR(100),
  firmRegNo VARCHAR(100),
  firmName VARCHAR(500),
  dissolveReason VARCHAR(1000),
  applicantNameForDissolve VARCHAR(255),
  sigSignature VARCHAR(1000),
  sigName VARCHAR(255),
  sigAddress VARCHAR(500),
  sigFirmStamp VARCHAR(255),
  applicantName VARCHAR(255),
  applicantAddress VARCHAR(500),
  applicantCitizenship VARCHAR(100),
  applicantPhone VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS BusinessRegistration (
  id INT AUTO_INCREMENT PRIMARY KEY,
  -- Business Details
  businessNameNp VARCHAR(500) NOT NULL,
  businessNameEn VARCHAR(500),
  businessTole VARCHAR(255),
  businessDistrict VARCHAR(255),
  businessWard VARCHAR(50),
  businessRoad VARCHAR(255),
  businessHouseNo VARCHAR(100),
  businessPhone VARCHAR(50),
  capitalAmount VARCHAR(100),
  capitalInWords VARCHAR(255),
  businessObjective VARCHAR(255),
  mainGoods VARCHAR(500),
  -- Proprietor
  proprietorName VARCHAR(255),
  grandfatherName VARCHAR(255),
  grandfatherAddress VARCHAR(500),
  fatherName VARCHAR(255),
  fatherAddress VARCHAR(500),
  husbandName VARCHAR(255),
  husbandAddress VARCHAR(500),
  -- Permanent Address
  permDistrict VARCHAR(255),
  permWard VARCHAR(50),
  permTole VARCHAR(255),
  permPhone VARCHAR(50),
  citizenshipNo VARCHAR(100),
  citizenshipIssueDistrict VARCHAR(255),
  citizenshipIssueDate DATE,
  -- Temporary Address
  tempAddress VARCHAR(500),
  tempDistrict VARCHAR(255),
  tempWard VARCHAR(50),
  tempTole VARCHAR(255),
  -- Applicant
  applicant_name VARCHAR(255),
  applicant_address VARCHAR(500),
  applicant_citizenship_no VARCHAR(100),
  applicant_phone VARCHAR(50),
  -- Signatures
  applicantSignature VARCHAR(255),
  witnessName VARCHAR(255),
  -- Municipality Meta
  municipality VARCHAR(255),
  wardNo VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


CREATE TABLE IF NOT EXISTS CitizenshipWithHusbandSurname (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date VARCHAR(50),
  districtOffice VARCHAR(255),
  preMarriageDate VARCHAR(50),
  preMarriageDistrict VARCHAR(255),
  currentMunicipality VARCHAR(255),
  currentWard VARCHAR(50),
  husbandName VARCHAR(255),
  sigName VARCHAR(255),
  sigAddress VARCHAR(500),
  sigMobile VARCHAR(50),
  sigSignature VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS CitizenshipWithoutHusbandSurname (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date VARCHAR(50),
  districtOffice VARCHAR(255),
  preMarriageDate VARCHAR(50),
  preMarriageDistrict VARCHAR(255),
  relationshipStatus VARCHAR(100),
  certificateInfo VARCHAR(500),
  currentHusbandName VARCHAR(255),
  currentDistrict VARCHAR(255),
  currentPalikaType VARCHAR(50),
  currentPalikaName VARCHAR(255),
  sigName VARCHAR(255),
  sigAddress VARCHAR(500),
  sigMobile VARCHAR(50),
  sigSignature VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS DalitCasteCertification (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date VARCHAR(50),
  headerDistrict VARCHAR(255),
  mainDistrict VARCHAR(255),
  palikaName VARCHAR(255),
  wardNo VARCHAR(50),
  residentName VARCHAR(255),
  relation VARCHAR(50),
  guardianName VARCHAR(255),
  casteName VARCHAR(255),
  sigName VARCHAR(255),
  sigAddress VARCHAR(500),
  sigMobile VARCHAR(50),
  sigSignature VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS ImpoverishedCitizenApplicationRecommendation (
  id INT AUTO_INCREMENT PRIMARY KEY,
  headerTo VARCHAR(255),
  headerOffice VARCHAR(255),
  patientName VARCHAR(255),
  age VARCHAR(50),
  gender VARCHAR(50),
  permJilla VARCHAR(255),
  permPalika VARCHAR(255),
  permWarda VARCHAR(50),
  tempJilla VARCHAR(255),
  tempPalika VARCHAR(255),
  tempWarda VARCHAR(50),
  ethnicity VARCHAR(100),
  familySize VARCHAR(50),
  incomeSource VARCHAR(255),
  monthlyIncome VARCHAR(100),
  landDetails JSON,                  -- JSON column (MySQL 5.7+). If older MySQL, use TEXT.
  bankName VARCHAR(255),
  bankBranch VARCHAR(255),
  accountNo VARCHAR(100),
  healthStatus VARCHAR(255),
  recommenderRelation VARCHAR(255),
  applicantSigName VARCHAR(255),
  applicantSigAddress VARCHAR(500),
  applicantSigDate VARCHAR(50),
  applicantSigPhone VARCHAR(50),
  recName VARCHAR(255),
  recPosition VARCHAR(100),
  recDate VARCHAR(50),
  recOfficeStamp VARCHAR(255),
  applicantName VARCHAR(255),
  applicantAddress VARCHAR(500),
  applicantCitizenship VARCHAR(100),
  applicantPhone VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS LandBoundaryVerification (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date VARCHAR(50),
  headerTo VARCHAR(255),
  headerMunicipality VARCHAR(255),
  headerOffice VARCHAR(255),
  headerDistrict VARCHAR(255),
  mainDistrict VARCHAR(255),
  mainMunicipality VARCHAR(255),
  mainWardNo1 VARCHAR(50),
  prevLocationType VARCHAR(100),
  prevWardNo VARCHAR(50),
  tole VARCHAR(255),
  applicantTitle VARCHAR(50),
  applicantName VARCHAR(255),
  applicantRelation VARCHAR(50),
  applicantAge VARCHAR(50),
  guardianTitle VARCHAR(50),
  guardianName VARCHAR(255),
  kittaNo VARCHAR(100),
  landName VARCHAR(255),
  landArea VARCHAR(100),
  feeAmount VARCHAR(100),
  feeAmountWords VARCHAR(255),
  sigApplicantType VARCHAR(50),
  sigName VARCHAR(255),
  sigAddress VARCHAR(500),
  sigWard VARCHAR(50),
  sigPhone VARCHAR(50),
  detailApplicantName VARCHAR(255),
  detailApplicantAddress VARCHAR(500),
  detailApplicantCitizenship VARCHAR(100),
  detailApplicantPhone VARCHAR(50),

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS RequestForCertification (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date VARCHAR(50),
  headerDistrict VARCHAR(255),
  mainDistrict VARCHAR(255),
  palikaName VARCHAR(255),
  wardNo VARCHAR(50),
  residentName VARCHAR(255),
  relation VARCHAR(50),
  guardianName VARCHAR(255),
  doc1Type VARCHAR(255),
  doc1Detail TEXT,
  doc2Type VARCHAR(255),
  doc2Detail TEXT,
  variationDetail TEXT,
  sigName VARCHAR(255),
  sigAddress VARCHAR(500),
  sigMobile VARCHAR(50),
  sigSignature VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS RequestForCertificationMotherFather (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date VARCHAR(50),
  headerDistrict VARCHAR(255),
  mainDistrict VARCHAR(255),
  palikaName VARCHAR(255),
  wardNo VARCHAR(50),
  residentName VARCHAR(255),
  relation VARCHAR(50),
  guardianName VARCHAR(255),
  doc1Detail TEXT,
  doc2Detail TEXT,
  sigName VARCHAR(255),
  sigAddress VARCHAR(500),
  sigMobile VARCHAR(50),
  sigSignature VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS TribalVerificationRecommendation (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date VARCHAR(50),
  headerTo VARCHAR(255),
  municipality1 VARCHAR(255),
  wardNo1 VARCHAR(50),
  officeName VARCHAR(255),
  address1 VARCHAR(255),
  municipality2 VARCHAR(255),
  wardNo2 VARCHAR(50),
  residentTitle VARCHAR(50),
  relation VARCHAR(50),
  guardianTitle VARCHAR(50),
  guardianName VARCHAR(255),
  tribeCategory VARCHAR(255),
  tribeName VARCHAR(255),
  mainContent TEXT,
  applicantNameSignature VARCHAR(255),
  applicantAddressSignature VARCHAR(500),
  applicantName VARCHAR(255),
  applicantAddress VARCHAR(500),
  applicantCitizenship VARCHAR(100),
  applicantPhone VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- pages/association
CREATE TABLE IF NOT EXISTS BulkLoanRecommendation (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date VARCHAR(50),
  patraSankhya VARCHAR(100),
  chalanNo VARCHAR(100),
  toName VARCHAR(255),
  toSecondLine VARCHAR(255),
  wardNo VARCHAR(50),
  prevLocationType VARCHAR(100),
  prevLocationWardNo VARCHAR(50),
  cooperativeName VARCHAR(500),
  cooperativePurpose VARCHAR(500),
  governmentAgency VARCHAR(255),
  signerName VARCHAR(255),
  signerDesignation VARCHAR(100),
  applicantName VARCHAR(255),
  applicantAddress VARCHAR(500),
  applicantCitizenship VARCHAR(100),
  applicantPhone VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
 

CREATE TABLE IF NOT EXISTS ClubRegistration (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date VARCHAR(50),
  patraSankhya VARCHAR(100),
  chalanNo VARCHAR(100),
  toName VARCHAR(255),
  toSecondLine VARCHAR(255),
  district VARCHAR(100),
  municipality VARCHAR(255),
  wardNo VARCHAR(50),
  residentName VARCHAR(255),
  clubName VARCHAR(255),
  clubAddress VARCHAR(500),
  signerName VARCHAR(255),
  signerDesignation VARCHAR(100),
  applicantName VARCHAR(255),
  applicantAddress VARCHAR(500),
  applicantCitizenship VARCHAR(100),
  applicantPhone VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS CommitteeRegistration (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date VARCHAR(50),
  patraSankhya VARCHAR(100),
  chalanNo VARCHAR(100),
  toName VARCHAR(255),
  toPlace VARCHAR(255),
  district VARCHAR(100),
  municipalityType VARCHAR(50),
  municipalityWardNo VARCHAR(50),
  prevWardNo VARCHAR(50),
  locationName VARCHAR(500),
  signerName VARCHAR(255),
  signerDesignation VARCHAR(100),
  applicantName VARCHAR(255),
  applicantAddress VARCHAR(500),
  applicantCitizenship VARCHAR(100),
  applicantPhone VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS NewBankAccountRecommendation (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date VARCHAR(50),
  patraSankhya VARCHAR(150),
  chalanNo VARCHAR(150),
  toName VARCHAR(255),
  toPlace VARCHAR(255),
  district VARCHAR(150),
  municipalityWardNo VARCHAR(50),
  groupName VARCHAR(500),
  groupWardNo VARCHAR(50),
  groupRefPatraNo VARCHAR(150),
  groupRefChalanNo VARCHAR(150),
  officials TEXT, -- JSON string of officials array
  signerName VARCHAR(255),
  signerDesignation VARCHAR(100),
  applicantName VARCHAR(255),
  applicantAddress VARCHAR(500),
  applicantCitizenship VARCHAR(100),
  applicantPhone VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS NewOrganizationRegistration (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date VARCHAR(50),
  patraSankhya VARCHAR(150),
  chalanNo VARCHAR(150),
  toName VARCHAR(255),
  toPlace VARCHAR(255),
  district VARCHAR(150),
  municipalityWardNo VARCHAR(50),
  prevWardNo VARCHAR(50),
  organizationName VARCHAR(500),
  organizationLocation VARCHAR(500),
  organizationType VARCHAR(200),
  suggestedBy VARCHAR(255),
  signerName VARCHAR(255),
  signerDesignation VARCHAR(100),
  applicantName VARCHAR(255),
  applicantAddress VARCHAR(500),
  applicantCitizenship VARCHAR(150),
  applicantPhone VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS NonProfitOrgRegCertificate (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fiscalYear VARCHAR(32),
  date VARCHAR(50),
  chalaniNo VARCHAR(150),
  regNo VARCHAR(150),
  regDate VARCHAR(50),
  organizationName VARCHAR(500),
  organizationAddress VARCHAR(500),
  subjectArea VARCHAR(255),
  startDate VARCHAR(50),
  email VARCHAR(255),
  phone VARCHAR(50),
  presidentName VARCHAR(255),
  presidentAddress VARCHAR(500),
  presidentEmail VARCHAR(255),
  presidentPhone VARCHAR(50),
  bankAccountInfo VARCHAR(500),
  bankEmail VARCHAR(255),
  bankPhone VARCHAR(50),
  signerName VARCHAR(255),
  signerDesignation VARCHAR(100),
  applicantName VARCHAR(255),
  applicantAddress VARCHAR(500),
  applicantCitizenship VARCHAR(150),
  applicantPhone VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS OldNonProfitOrgCertificate (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fiscalYear VARCHAR(32),
  date VARCHAR(50),
  regNo VARCHAR(150),
  regDate VARCHAR(50),
  organizationName VARCHAR(500),
  organizationAddress VARCHAR(500),
  subjectArea VARCHAR(255),
  startDate VARCHAR(50),
  email VARCHAR(255),
  phone VARCHAR(50),
  presidentName VARCHAR(255),
  presidentAddress VARCHAR(500),
  presidentEmail VARCHAR(255),
  presidentPhone VARCHAR(50),
  bankAccountInfo VARCHAR(500),
  bankEmail VARCHAR(255),
  bankPhone VARCHAR(50),
  signerName VARCHAR(255),
  signerDesignation VARCHAR(100),
  applicantName VARCHAR(255),
  applicantAddress VARCHAR(500),
  applicantCitizenship VARCHAR(150),
  applicantPhone VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS OrganizationRegistered (
  id INT AUTO_INCREMENT PRIMARY KEY,
  localityType VARCHAR(50),
  wardNo VARCHAR(50),
  district VARCHAR(255),
  organizationName VARCHAR(500),
  registrationDate VARCHAR(50),
  regNo VARCHAR(150),
  certNo VARCHAR(150),
  extraInfo VARCHAR(500),
  toOffice VARCHAR(255),
  signerName VARCHAR(255),
  signerDesignation VARCHAR(100),
  applicantName VARCHAR(255),
  applicantAddress VARCHAR(500),
  applicantCitizenship VARCHAR(150),
  applicantPhone VARCHAR(50),
  date VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE organizationregistrationpunishment (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date VARCHAR(50),
  refLetterNo VARCHAR(255),
  chalaniNo VARCHAR(255),
  toOffice VARCHAR(255),
  toOffice2 VARCHAR(255),
  introText TEXT,
  persons LONGTEXT,   -- JSON string from frontend
  signerName VARCHAR(255),
  signerDesignation VARCHAR(255),
  applicantName VARCHAR(255),
  applicantAddress VARCHAR(255),
  applicantCitizenship VARCHAR(255),
  applicantPhone VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE OrganizationRegistrationRecommendation (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date VARCHAR(50),
  refLetterNo VARCHAR(255),
  chalaniNo VARCHAR(255),
  toOffice VARCHAR(255),
  toOfficeLine2 VARCHAR(255),
  toOfficeLine3 VARCHAR(255),
  wardNo VARCHAR(50),
  sabikWardNo VARCHAR(50),
  sabikWardNo2 VARCHAR(50),
  applicantName VARCHAR(255),
  industryName VARCHAR(255),
  industryAddress VARCHAR(500),
  locationMunicipality VARCHAR(255),
  locationWard VARCHAR(50),
  locationTole VARCHAR(255),
  kittaNo VARCHAR(100),
  area VARCHAR(100),
  boundaryEast VARCHAR(255),
  boundaryWest VARCHAR(255),
  boundarySouth VARCHAR(255),
  boundaryNorth VARCHAR(255),
  signerName VARCHAR(255),
  signerDesignation VARCHAR(255),
  applicantNameFooter VARCHAR(255),
  applicantAddress VARCHAR(500),
  applicantCitizenship VARCHAR(100),
  applicantPhone VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE OrganizationRenewRecommendation (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date VARCHAR(50),
  refLetterNo VARCHAR(255),
  chalaniNo VARCHAR(255),
  toOffice VARCHAR(255),
  toOfficeLine2 VARCHAR(255),
  wardNo VARCHAR(50),
  sabikWardNo VARCHAR(50),
  sabikWardNo2 VARCHAR(50),
  personName VARCHAR(255),
  orgName VARCHAR(500),
  orgAddress VARCHAR(500),
  signerName VARCHAR(255),
  signerDesignation VARCHAR(255),
  applicantName VARCHAR(255),
  applicantAddress VARCHAR(500),
  applicantCitizenship VARCHAR(100),
  applicantPhone VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE SocialOrganizationRenew (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date VARCHAR(50),
  refLetterNo VARCHAR(255),
  chalaniNo VARCHAR(255),
  toOffice VARCHAR(255),
  toOfficeCity VARCHAR(255),
  wardNo VARCHAR(50),
  sabikWardNo VARCHAR(50),
  palikaType VARCHAR(100),
  orgName VARCHAR(500),
  orgAddress VARCHAR(500),
  reasonText TEXT,
  signerName VARCHAR(255),
  signerDesignation VARCHAR(255),
  applicantName VARCHAR(255),
  applicantAddress VARCHAR(500),
  applicantCitizenship VARCHAR(100),
  applicantPhone VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- pages/business-recognition
CREATE TABLE IF NOT EXISTS BusinessClosed (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date VARCHAR(64),
  refLetterNo VARCHAR(128),
  chalaniNo VARCHAR(128),
  municipality VARCHAR(128),
  wardNo VARCHAR(64),
  toOfficePerson VARCHAR(255),
  introText TEXT,
  businesses TEXT, -- store JSON stringified rows
  applicantName VARCHAR(255),
  applicantAddress VARCHAR(512),
  applicantCitizenship VARCHAR(128),
  applicantPhone VARCHAR(64),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS BusinessExtensionPannumber (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date VARCHAR(64),
  refLetterNo VARCHAR(128),
  chalaniNo VARCHAR(128),
  toLine1 VARCHAR(255),
  toLine2 VARCHAR(255),
  wardNo VARCHAR(64),
  prevWardNo VARCHAR(64),
  applicantNameTop VARCHAR(255),
  panNo VARCHAR(128),
  addedPanNo VARCHAR(128),
  addedBusiness VARCHAR(512),
  details TEXT,
  signerName VARCHAR(255),
  signerPost VARCHAR(128),
  applicantName VARCHAR(255),
  applicantAddress VARCHAR(512),
  applicantCitizenship VARCHAR(128),
  applicantPhone VARCHAR(64),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS BusinessRegSummary (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date VARCHAR(64),
  refLetterNo VARCHAR(128),
  chalaniNo VARCHAR(128),
  addressee VARCHAR(255),
  municipality VARCHAR(128),
  mailTo VARCHAR(255),
  description TEXT,
  businessList TEXT,        -- JSON string of business rows
  applicantName VARCHAR(255),
  applicantAddress VARCHAR(512),
  applicantCitizenship VARCHAR(128),
  applicantPhone VARCHAR(64),
  positionTitle VARCHAR(128),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `industry_change` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `date` DATE DEFAULT NULL,
  `to_line1` VARCHAR(255) DEFAULT NULL,
  `to_line2` VARCHAR(255) DEFAULT NULL,
  `province` VARCHAR(128) DEFAULT NULL,
  `district` VARCHAR(128) DEFAULT NULL,
  `municipality` VARCHAR(128) DEFAULT NULL,
  `ward` VARCHAR(64) DEFAULT NULL,
  `industry_name` VARCHAR(255) DEFAULT NULL,
  `industry_other_info` VARCHAR(255) DEFAULT NULL,
  `signature` VARCHAR(255) DEFAULT NULL,
  `applicant_name` VARCHAR(255) DEFAULT NULL,
  `applicant_address` VARCHAR(512) DEFAULT NULL,
  `applicant_citizen_no` VARCHAR(128) DEFAULT NULL,
  `applicant_phone` VARCHAR(64) DEFAULT NULL,
  `applicant_email` VARCHAR(255) DEFAULT NULL,
  `table_rows` JSON DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `IndustryClosedNotify` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `date` VARCHAR(64) DEFAULT NULL,
  `to_line1` VARCHAR(255) DEFAULT NULL,
  `to_line2` VARCHAR(255) DEFAULT NULL,
  `place_text` VARCHAR(255) DEFAULT NULL,
  `place_extra` VARCHAR(255) DEFAULT NULL,
  `registered_date` VARCHAR(64) DEFAULT NULL,
  `registered_municipality` VARCHAR(255) DEFAULT NULL,
  `ward` VARCHAR(64) DEFAULT NULL,
  `industry_name` VARCHAR(255) DEFAULT NULL,
  `shown_reason` VARCHAR(255) DEFAULT NULL,
  `closure_from_date` VARCHAR(64) DEFAULT NULL,
  `closure_to_date` VARCHAR(64) DEFAULT NULL,
  `short_reason` VARCHAR(255) DEFAULT NULL,
  `detailed_description` TEXT DEFAULT NULL,
  `attached_docs` TEXT DEFAULT NULL,
  `signature` VARCHAR(255) DEFAULT NULL,
  `signer_name` VARCHAR(255) DEFAULT NULL,
  `signer_position` VARCHAR(255) DEFAULT NULL,
  `applicant_name` VARCHAR(255) DEFAULT NULL,
  `applicant_address` VARCHAR(500) DEFAULT NULL,
  `applicant_citizen_no` VARCHAR(128) DEFAULT NULL,
  `applicant_phone` VARCHAR(64) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `IndustryFormCancellation` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `date` VARCHAR(64) DEFAULT NULL,
  `to_line1` VARCHAR(255) DEFAULT NULL,
  `to_line2` VARCHAR(255) DEFAULT NULL,
  `reg_certificate_date` VARCHAR(64) DEFAULT NULL,
  `province` VARCHAR(128) DEFAULT NULL,
  `district` VARCHAR(128) DEFAULT NULL,
  `municipality` VARCHAR(128) DEFAULT NULL,
  `ward` VARCHAR(64) DEFAULT NULL,
  `industry_location` VARCHAR(255) DEFAULT NULL,
  `started_date` VARCHAR(64) DEFAULT NULL,
  `closed_date` VARCHAR(64) DEFAULT NULL,
  `reason_short` VARCHAR(255) DEFAULT NULL,
  `reason_long` TEXT DEFAULT NULL,
  `signature` VARCHAR(255) DEFAULT NULL,
  `signer_name` VARCHAR(255) DEFAULT NULL,
  `signer_position` VARCHAR(255) DEFAULT NULL,
  `applicant_name` VARCHAR(255) DEFAULT NULL,
  `applicant_address` VARCHAR(500) DEFAULT NULL,
  `applicant_citizen_no` VARCHAR(128) DEFAULT NULL,
  `applicant_phone` VARCHAR(64) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `IndustryPeriodSummary` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `industry_name` VARCHAR(500) DEFAULT NULL,
  `industry_address` VARCHAR(500) DEFAULT NULL,
  `period_from` VARCHAR(64) DEFAULT NULL,
  `period_to` VARCHAR(64) DEFAULT NULL,
  `fiscal_year` VARCHAR(64) DEFAULT NULL,
  `registration_date` VARCHAR(64) DEFAULT NULL,
  `industry_type` VARCHAR(255) DEFAULT NULL,
  `establishment_date` VARCHAR(64) DEFAULT NULL,
  `operation_duration` VARCHAR(128) DEFAULT NULL,
  `production_items` JSON DEFAULT NULL,    -- array of production rows (stringify from frontend if controller doesn't)
  `raw_materials` JSON DEFAULT NULL,      -- array of raw-material rows
  `export_country` VARCHAR(255) DEFAULT NULL,
  `export_amount` VARCHAR(128) DEFAULT NULL,
  `export_quantity` VARCHAR(128) DEFAULT NULL,
  `government_benefits` VARCHAR(500) DEFAULT NULL,
  `other_resources` JSON DEFAULT NULL,    -- array/text for water/electricity/others
  `manpower` JSON DEFAULT NULL,           -- array of manpower rows (female/male/total)
  `environmental_measures` TEXT DEFAULT NULL,
  `prepared_by` VARCHAR(255) DEFAULT NULL,
  `opened_by` VARCHAR(255) DEFAULT NULL,
  `prepared_by_role` VARCHAR(255) DEFAULT NULL,
  `applicant_name` VARCHAR(255) DEFAULT NULL,
  `applicant_address` VARCHAR(500) DEFAULT NULL,
  `applicant_citizen_no` VARCHAR(128) DEFAULT NULL,
  `applicant_phone` VARCHAR(64) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `IndustryRegistrationRecommendation` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `date` VARCHAR(64) DEFAULT NULL,
  `refLetterNo` VARCHAR(128) DEFAULT NULL,
  `chalaniNo` VARCHAR(128) DEFAULT NULL,
  `to_line1` VARCHAR(255) DEFAULT NULL,
  `to_line2` VARCHAR(255) DEFAULT NULL,
  `sabik_district` VARCHAR(255) DEFAULT NULL,
  `sabik_ward_no` VARCHAR(64) DEFAULT NULL,
  `current_residence` VARCHAR(255) DEFAULT NULL,
  `residence_from` VARCHAR(64) DEFAULT NULL,
  `residence_to` VARCHAR(64) DEFAULT NULL,
  `place_details` VARCHAR(500) DEFAULT NULL,
  `kitta_no` VARCHAR(128) DEFAULT NULL,
  `area_size` VARCHAR(128) DEFAULT NULL,
  `boundary_east` VARCHAR(255) DEFAULT NULL,
  `boundary_west` VARCHAR(255) DEFAULT NULL,
  `boundary_north` VARCHAR(255) DEFAULT NULL,
  `boundary_south` VARCHAR(255) DEFAULT NULL,
  `structure_types` VARCHAR(500) DEFAULT NULL,
  `inspection_notes` TEXT DEFAULT NULL,
  `sign_name` VARCHAR(255) DEFAULT NULL,
  `sign_position` VARCHAR(255) DEFAULT NULL,
  `applicant_name` VARCHAR(255) DEFAULT NULL,
  `applicant_address` VARCHAR(500) DEFAULT NULL,
  `applicant_citizenship` VARCHAR(128) DEFAULT NULL,
  `applicant_phone` VARCHAR(64) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `IndustryTransferAcceptanceLetter` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `date` VARCHAR(64) DEFAULT NULL,
  `to_line1` VARCHAR(255) DEFAULT NULL,
  `to_line2` VARCHAR(255) DEFAULT NULL,
  `original_reg_date` VARCHAR(64) DEFAULT NULL,
  `province` VARCHAR(128) DEFAULT NULL,
  `district` VARCHAR(128) DEFAULT NULL,
  `from_municipality` VARCHAR(255) DEFAULT NULL,
  `from_ward` VARCHAR(64) DEFAULT NULL,
  `industry_name` VARCHAR(255) DEFAULT NULL,
  `to_municipality` VARCHAR(255) DEFAULT NULL,
  `to_ward` VARCHAR(64) DEFAULT NULL,
  `decision_ref` VARCHAR(255) DEFAULT NULL,
  `signer_name` VARCHAR(255) DEFAULT NULL,
  `signer_position` VARCHAR(255) DEFAULT NULL,
  `comment` TEXT DEFAULT NULL,
  `applicant_name` VARCHAR(255) DEFAULT NULL,
  `applicant_address` VARCHAR(500) DEFAULT NULL,
  `applicant_citizenship` VARCHAR(128) DEFAULT NULL,
  `applicant_phone` VARCHAR(64) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `IndustryTransferAcceptanceReq` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `date` VARCHAR(64) DEFAULT NULL,
  `to_line1` VARCHAR(255) DEFAULT NULL,
  `to_line2` VARCHAR(255) DEFAULT NULL,
  `original_reg_date` VARCHAR(64) DEFAULT NULL,
  `province` VARCHAR(128) DEFAULT NULL,
  `district` VARCHAR(128) DEFAULT NULL,
  `municipality` VARCHAR(255) DEFAULT NULL,
  `ward` VARCHAR(64) DEFAULT NULL,
  `industry_name` VARCHAR(255) DEFAULT NULL,
  `reason_short` VARCHAR(255) DEFAULT NULL,
  `reason_long` TEXT DEFAULT NULL,
  `attached_docs_note` VARCHAR(500) DEFAULT NULL,
  `signer_signature` VARCHAR(255) DEFAULT NULL,
  `signer_name` VARCHAR(255) DEFAULT NULL,
  `signer_position` VARCHAR(255) DEFAULT NULL,
  `signer_address` VARCHAR(500) DEFAULT NULL,
  `signer_email` VARCHAR(255) DEFAULT NULL,
  `applicant_name` VARCHAR(255) DEFAULT NULL,
  `applicant_address` VARCHAR(500) DEFAULT NULL,
  `applicant_citizenship` VARCHAR(128) DEFAULT NULL,
  `applicant_phone` VARCHAR(64) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `NewBusinessPannumber` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `date` VARCHAR(64) DEFAULT NULL,
  `refLetterNo` VARCHAR(128) DEFAULT NULL,
  `chalaniNo` VARCHAR(128) DEFAULT NULL,
  `to_line1` VARCHAR(255) DEFAULT NULL,
  `to_line2` VARCHAR(255) DEFAULT NULL,
  `ward` VARCHAR(64) DEFAULT NULL,
  `sabik_ward` VARCHAR(64) DEFAULT NULL,
  `resident_name` VARCHAR(255) DEFAULT NULL,
  `resident_from` VARCHAR(64) DEFAULT NULL,
  `resident_to` VARCHAR(64) DEFAULT NULL,
  `firm_name` VARCHAR(500) DEFAULT NULL,
  `proprietor_name` VARCHAR(500) DEFAULT NULL,
  `proprietor_citizen_no` VARCHAR(128) DEFAULT NULL,
  `proprietor_address` VARCHAR(500) DEFAULT NULL,
  `firm_address` VARCHAR(500) DEFAULT NULL,
  `firm_capital` VARCHAR(128) DEFAULT NULL,
  `firm_purpose` VARCHAR(500) DEFAULT NULL,
  `notes` TEXT DEFAULT NULL,
  `sign_name` VARCHAR(255) DEFAULT NULL,
  `sign_position` VARCHAR(255) DEFAULT NULL,
  `applicant_name` VARCHAR(255) DEFAULT NULL,
  `applicant_address` VARCHAR(500) DEFAULT NULL,
  `applicant_citizenship` VARCHAR(128) DEFAULT NULL,
  `applicant_phone` VARCHAR(64) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `PartnershipRegistrationApplicationForm` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `date` VARCHAR(64) DEFAULT NULL,
  `to_line1` VARCHAR(255) DEFAULT NULL,
  `to_line2` VARCHAR(255) DEFAULT NULL,
  `firm_name_np` VARCHAR(500) DEFAULT NULL,
  `firm_name_en` VARCHAR(500) DEFAULT NULL,
  `firm_address_full` VARCHAR(1000) DEFAULT NULL,
  `firm_nature` VARCHAR(500) DEFAULT NULL,
  `partnership_duration_years` VARCHAR(64) DEFAULT NULL,
  `firm_phone` VARCHAR(64) DEFAULT NULL,
  `firm_email` VARCHAR(255) DEFAULT NULL,
  `firm_category` VARCHAR(64) DEFAULT NULL,
  `partners` JSON DEFAULT NULL,
  `partners_guardian_info` JSON DEFAULT NULL,
  `first_registration_info` VARCHAR(500) DEFAULT NULL,
  `representative_name` VARCHAR(255) DEFAULT NULL,
  `name_registered_date` VARCHAR(64) DEFAULT NULL,
  `firm_start_date` VARCHAR(64) DEFAULT NULL,
  `office_check_officer` VARCHAR(255) DEFAULT NULL,
  `report_received_date` VARCHAR(64) DEFAULT NULL,
  `inspection_table` JSON DEFAULT NULL,
  `deed_signature` VARCHAR(500) DEFAULT NULL,
  `deed_holder_name` VARCHAR(500) DEFAULT NULL,
  `deed_date` VARCHAR(64) DEFAULT NULL,
  `deed_year` VARCHAR(16) DEFAULT NULL,
  `deed_month` VARCHAR(16) DEFAULT NULL,
  `deed_day` VARCHAR(16) DEFAULT NULL,
  `applicant_name` VARCHAR(255) DEFAULT NULL,
  `applicant_address` VARCHAR(1000) DEFAULT NULL,
  `applicant_citizenship` VARCHAR(128) DEFAULT NULL,
  `applicant_phone` VARCHAR(64) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `ShopAgriculturalForm` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `province` VARCHAR(128) DEFAULT NULL,
  `district` VARCHAR(128) DEFAULT NULL,
  `municipality` VARCHAR(255) DEFAULT NULL,
  `ward` VARCHAR(64) DEFAULT NULL,
  `sabik` VARCHAR(255) DEFAULT NULL,
  `sabik_no` VARCHAR(64) DEFAULT NULL,
  `owner_age` VARCHAR(32) DEFAULT NULL,
  `owner_name` VARCHAR(255) DEFAULT NULL,
  `on_behalf_of` VARCHAR(255) DEFAULT NULL,
  `location_name` VARCHAR(500) DEFAULT NULL,
  `registration_no` VARCHAR(255) DEFAULT NULL,
  `operation_from` VARCHAR(64) DEFAULT NULL,
  `operation_to` VARCHAR(64) DEFAULT NULL,
  `period_year` VARCHAR(32) DEFAULT NULL,
  `period_month` VARCHAR(32) DEFAULT NULL,
  `boundary_east` VARCHAR(500) DEFAULT NULL,
  `boundary_west` VARCHAR(500) DEFAULT NULL,
  `boundary_north` VARCHAR(500) DEFAULT NULL,
  `boundary_south` VARCHAR(500) DEFAULT NULL,
  `rohabar_ward_no` VARCHAR(64) DEFAULT NULL,
  `rohabar_post` VARCHAR(128) DEFAULT NULL,
  `rohabar_person` VARCHAR(255) DEFAULT NULL,
  `applicant_name` VARCHAR(255) DEFAULT NULL,
  `applicant_address` VARCHAR(1000) DEFAULT NULL,
  `applicant_citizenship` VARCHAR(128) DEFAULT NULL,
  `applicant_phone` VARCHAR(64) DEFAULT NULL,
  `notes` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `ShopRegistrationForm` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `date` VARCHAR(64) DEFAULT NULL,
  `refLetterNo` VARCHAR(128) DEFAULT NULL,
  `chalaniNo` VARCHAR(128) DEFAULT NULL,
  `to_office` VARCHAR(255) DEFAULT NULL,
  `to_office_extra` VARCHAR(255) DEFAULT NULL,
  `district` VARCHAR(128) DEFAULT NULL,
  `municipality` VARCHAR(255) DEFAULT NULL,
  `ward` VARCHAR(64) DEFAULT NULL,
  `sabik` VARCHAR(255) DEFAULT NULL,
  `sabik_no` VARCHAR(64) DEFAULT NULL,
  `owner_age` VARCHAR(32) DEFAULT NULL,
  `resident_name` VARCHAR(255) DEFAULT NULL,
  `on_behalf_of` VARCHAR(255) DEFAULT NULL,
  `registration_no` VARCHAR(255) DEFAULT NULL,
  `land_kitta_no` VARCHAR(255) DEFAULT NULL,
  `land_place` VARCHAR(500) DEFAULT NULL,
  `operation_from` VARCHAR(64) DEFAULT NULL,
  `operation_to` VARCHAR(64) DEFAULT NULL,
  `short_ref` VARCHAR(255) DEFAULT NULL,   -- the short input used in paragraph
  `boundary_kitta` VARCHAR(255) DEFAULT NULL,
  `owner_cert_kitta` VARCHAR(255) DEFAULT NULL,
  `prev_ward_no` VARCHAR(64) DEFAULT NULL,
  `location_description` VARCHAR(500) DEFAULT NULL,
  `post_name` VARCHAR(255) DEFAULT NULL,   -- name/post for sign area
  `applicant_name` VARCHAR(255) DEFAULT NULL,
  `applicant_address` VARCHAR(1000) DEFAULT NULL,
  `applicant_citizenship` VARCHAR(128) DEFAULT NULL,
  `applicant_phone` VARCHAR(64) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE IF NOT EXISTS `TaxClearanceCertificate` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `date` VARCHAR(64) DEFAULT NULL,
  `refLetterNo` VARCHAR(128) DEFAULT NULL,
  `chalaniNo` VARCHAR(128) DEFAULT NULL,
  `to_line1` VARCHAR(255) DEFAULT NULL,
  `to_line2` VARCHAR(255) DEFAULT NULL,
  `subject_person_name` VARCHAR(255) DEFAULT NULL,  -- name shown inside main paragraph
  `fiscal_details` JSON DEFAULT NULL,                -- array of fiscal rows (see Postman sample)
  `officer_name` VARCHAR(255) DEFAULT NULL,
  `officer_post` VARCHAR(128) DEFAULT NULL,
  `applicant_name` VARCHAR(255) DEFAULT NULL,
  `applicant_address` VARCHAR(1000) DEFAULT NULL,
  `applicant_citizenship` VARCHAR(128) DEFAULT NULL,
  `applicant_phone` VARCHAR(64) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- /pages/business-reg
CREATE TABLE IF NOT EXISTS `BusinessIndustryRegistrationForm` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  -- header / meta
  `registration_no` VARCHAR(255) DEFAULT NULL,
  `certificate_date` VARCHAR(64) DEFAULT NULL,      -- the top-right date shown
  `copy_flag` VARCHAR(32) DEFAULT NULL,             -- "प्रतिलिपि □" if you want to store
  -- applicant / proprietor
  `full_name` VARCHAR(255) DEFAULT NULL,
  `citizenship_no` VARCHAR(128) DEFAULT NULL,
  `citizenship_issue_date` VARCHAR(64) DEFAULT NULL,
  `citizenship_issue_district` VARCHAR(128) DEFAULT NULL,
  -- residence
  `municipality` VARCHAR(255) DEFAULT 'नागार्जुन नगरपालिका',
  `ward` VARCHAR(64) DEFAULT NULL,
  `tole` VARCHAR(255) DEFAULT NULL,
  `residence_district` VARCHAR(128) DEFAULT NULL,
  -- family
  `father_name` VARCHAR(255) DEFAULT NULL,
  `spouse_name` VARCHAR(255) DEFAULT NULL,
  -- business
  `business_name` VARCHAR(500) DEFAULT NULL,
  `business_kind` VARCHAR(255) DEFAULT NULL,        -- व्यवसायको किसिम
  `business_nature` VARCHAR(500) DEFAULT NULL,      -- ख व्यवसायको किसिम/प्रकृति
  `business_road` VARCHAR(500) DEFAULT NULL,
  -- business address pieces
  `business_address_line` VARCHAR(500) DEFAULT NULL,
  `business_address_district` VARCHAR(128) DEFAULT NULL,
  `business_address_municipality` VARCHAR(255) DEFAULT NULL,
  `business_address_ward` VARCHAR(64) DEFAULT NULL,
  `business_address_tole` VARCHAR(255) DEFAULT NULL,
  -- contact
  `phone` VARCHAR(64) DEFAULT NULL,
  `mobile` VARCHAR(64) DEFAULT NULL,
  `email` VARCHAR(255) DEFAULT NULL,
  -- tax / online
  `pan_vat` VARCHAR(255) DEFAULT NULL,
  `website` VARCHAR(255) DEFAULT NULL,
  -- purpose and other registration
  `objective` VARCHAR(1000) DEFAULT NULL,
  `other_registration_no` VARCHAR(255) DEFAULT NULL,
  `other_registration_office` VARCHAR(255) DEFAULT NULL,
  -- landlord (if leased)
  `landlord_name` VARCHAR(255) DEFAULT NULL,
  `landlord_cit_no` VARCHAR(128) DEFAULT NULL,
  `landlord_issue_date` VARCHAR(64) DEFAULT NULL,
  `landlord_issue_district` VARCHAR(128) DEFAULT NULL,
  `landlord_address` VARCHAR(500) DEFAULT NULL,
  `landlord_district` VARCHAR(128) DEFAULT NULL,
  `landlord_municipality` VARCHAR(255) DEFAULT NULL,
  `landlord_ward` VARCHAR(64) DEFAULT NULL,
  `landlord_tole` VARCHAR(255) DEFAULT NULL,
  `landlord_phone` VARCHAR(64) DEFAULT NULL,
  -- capital fields (company)
  `authorized_capital` VARCHAR(128) DEFAULT NULL,
  `current_capital` VARCHAR(128) DEFAULT NULL,
  `issued_capital` VARCHAR(128) DEFAULT NULL,
  `fixed_capital` VARCHAR(128) DEFAULT NULL,
  `paidup_capital` VARCHAR(128) DEFAULT NULL,
  `total_capital` VARCHAR(128) DEFAULT NULL,
  -- remarks / declaration
  `kaifiyat` TEXT DEFAULT NULL,
  `declaration_text` TEXT DEFAULT NULL,
  -- signature/authorization block
  `issuing_signature` VARCHAR(255) DEFAULT NULL,
  `issuing_name` VARCHAR(255) DEFAULT NULL,
  `issuing_post` VARCHAR(255) DEFAULT NULL,
  `issuing_seal` VARCHAR(255) DEFAULT NULL,
  `issuing_date` VARCHAR(64) DEFAULT NULL,
  -- applicant detail box (bottom)
  `applicant_name` VARCHAR(255) DEFAULT NULL,
  `applicant_address` VARCHAR(1000) DEFAULT NULL,
  `applicant_citizenship` VARCHAR(128) DEFAULT NULL,
  `applicant_phone` VARCHAR(64) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `BusinessIndustryRegistrationNewList` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `sn` VARCHAR(64) DEFAULT NULL,
  `regDate` VARCHAR(64) DEFAULT NULL,
  `regNo` VARCHAR(128) DEFAULT NULL,
  `businessName` VARCHAR(500) DEFAULT NULL,
  `ownerName` VARCHAR(500) DEFAULT NULL,
  `address` VARCHAR(1000) DEFAULT NULL,
  `capital` VARCHAR(255) DEFAULT NULL,
  `renewDate` VARCHAR(128) DEFAULT NULL,
  `type` VARCHAR(64) DEFAULT NULL,
  `status` VARCHAR(64) DEFAULT NULL,
  -- optional metadata
  `notes` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `BusinessRegistrationCertificate` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `fullName` VARCHAR(255),
  `citizenshipNo` VARCHAR(200),
  `issuedDate` VARCHAR(200),
  `issuedDistrict` VARCHAR(200),
  `municipality` VARCHAR(255),
  `wardNo` VARCHAR(50),
  `tole` VARCHAR(255),
  `district` VARCHAR(255),
  `fatherName` VARCHAR(255),
  `spouseName` VARCHAR(255),
  `businessName` VARCHAR(255),
  `businessType` VARCHAR(255),
  `businessNature` VARCHAR(255),
  `roadName` VARCHAR(255),
  `businessAddress` VARCHAR(255),
  `businessDistrict` VARCHAR(255),
  `businessMunicipality` VARCHAR(255),
  `businessWard` VARCHAR(50),
  `businessTole` VARCHAR(255),
  `phone` VARCHAR(100),
  `mobile` VARCHAR(100),
  `email` VARCHAR(255),
  `panVatNo` VARCHAR(255),
  `website` VARCHAR(255),
  `objective` VARCHAR(500),
  `otherRegNo` VARCHAR(255),
  `otherOffice` VARCHAR(255),
  `landlordName` VARCHAR(255),
  `landlordCitizenship` VARCHAR(255),
  `landlordIssueDate` VARCHAR(255),
  `landlordDistrict` VARCHAR(255),
  `landlordAddress` VARCHAR(255),
  `landlordWard` VARCHAR(50),
  `landlordTole` VARCHAR(255),
  `landlordPhone` VARCHAR(255),
  `authorizedCapital` VARCHAR(255),
  `currentCapital` VARCHAR(255),
  `issuedCapital` VARCHAR(255),
  `fixedCapital` VARCHAR(255),
  `paidCapital` VARCHAR(255),
  `totalCapital` VARCHAR(255),
  `remarks` TEXT,
  `applicantName` VARCHAR(255),
  `applicantAddress` VARCHAR(255),
  `applicantCitizenship` VARCHAR(255),
  `applicantPhone` VARCHAR(255),
  `isClosed` TINYINT DEFAULT 0,
  `closeReason` TEXT,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `BusinessRegistrationRenewLeft` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `sn` INT DEFAULT NULL,
  `regDate` VARCHAR(50) DEFAULT NULL,
  `regNo` VARCHAR(150) DEFAULT NULL,
  `businessOwner` VARCHAR(255) DEFAULT NULL,
  `businessName` VARCHAR(255) DEFAULT NULL,
  `address` VARCHAR(500) DEFAULT NULL,
  `renewalLastDate` VARCHAR(255) DEFAULT NULL,
  `status` VARCHAR(50) DEFAULT 'active',  -- optional: active/closed/etc
  `notes` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `BusinessRegRenewCompleted` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `sn` INT DEFAULT NULL,
  `regDate` VARCHAR(50) DEFAULT NULL,
  `regNo` VARCHAR(100) DEFAULT NULL,
  `businessName` VARCHAR(255) DEFAULT NULL,
  `ownerName` VARCHAR(255) DEFAULT NULL,
  `address` VARCHAR(500) DEFAULT NULL,
  `lastRenewalDate` VARCHAR(50) DEFAULT NULL,
  `renewalPeriod` VARCHAR(100) DEFAULT NULL,
  `renewalRate` VARCHAR(100) DEFAULT NULL,
  `renewalVoucher` VARCHAR(100) DEFAULT NULL,
  `status` VARCHAR(50) DEFAULT 'active',
  `notes` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- /pages/daily-work-execute
CREATE TABLE IF NOT EXISTS `DailyWorkPerformanceList` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `report_date` VARCHAR(50) DEFAULT NULL,       -- store Nepali date string like २०८२-०८-०६
  `total_forms` INT DEFAULT 0,
  `total_amount` VARCHAR(100) DEFAULT NULL,     -- keep as string to allow comma/khas formatting
  `department` VARCHAR(255) DEFAULT NULL,
  `task` VARCHAR(255) DEFAULT NULL,
  `notes` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- pages/economic
CREATE TABLE IF NOT EXISTS `AdvancePaymentRequest` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `date` VARCHAR(50) DEFAULT NULL,               -- e.g. २०८२-०८-०६
  `letter_no` VARCHAR(128) DEFAULT NULL,         -- पत्र संख्या
  `chalani_no` VARCHAR(128) DEFAULT NULL,        -- चलानी नं.
  `addressee` VARCHAR(255) DEFAULT NULL,         -- addressee (input after 'श्री')
  `municipality` VARCHAR(128) DEFAULT NULL,      -- नगरपालिका text
  `fiscal_year` VARCHAR(50) DEFAULT NULL,        -- चालु आ.व. e.g. २०८२/८३
  `budget_program` VARCHAR(512) DEFAULT NULL,    -- program / description long
  `budget_title_no` VARCHAR(64) DEFAULT NULL,    -- budget title number
  `fund_type` VARCHAR(32) DEFAULT NULL,          -- संचालन / पूँजीगत
  `total_amount` VARCHAR(100) DEFAULT NULL,      -- total budget amount (string)
  `advance_amount` VARCHAR(100) DEFAULT NULL,    -- requested advance (string)
  `advance_amount_words` VARCHAR(512) DEFAULT NULL, -- amount in words
  `signature_name` VARCHAR(255) DEFAULT NULL,    -- name field under signature
  `designation` VARCHAR(128) DEFAULT NULL,       -- selected designation
  `applicant_name` VARCHAR(255) DEFAULT NULL,
  `applicant_address` VARCHAR(512) DEFAULT NULL,
  `applicant_citizenship` VARCHAR(128) DEFAULT NULL,
  `applicant_phone` VARCHAR(64) DEFAULT NULL,
  `notes` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `BankAccountForSocialSecurity` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `date` VARCHAR(50) DEFAULT NULL,                -- form date (e.g. २०८२-०८-०६)
  `letter_no` VARCHAR(128) DEFAULT NULL,          -- पत्र संख्या
  `chalani_no` VARCHAR(128) DEFAULT NULL,         -- चलानी नं.
  `former_vdc_mun` VARCHAR(64) DEFAULT NULL,      -- साविक गा.वि.स. / नगरपालिका marker
  `former_ward` VARCHAR(32) DEFAULT NULL,         -- साविक वडा नं
  `current_municipality` VARCHAR(128) DEFAULT NULL,-- e.g. नागार्जुन नगरपालिका
  `current_ward` VARCHAR(32) DEFAULT NULL,        -- current ward (e.g. 1)
  `person_name` VARCHAR(255) DEFAULT NULL,        -- person name (beneficiary)
  `relation_type` VARCHAR(64) DEFAULT NULL,       -- श्रीमान/श्रीमती/बुबा/आमा/छोरा/छोरी
  `relative_name` VARCHAR(255) DEFAULT NULL,      -- name of relative if present
  `social_security_type` VARCHAR(128) DEFAULT NULL, -- ज्येष्ठ नागरिक / अपाङ्गता / आदि
  `reason_text` TEXT DEFAULT NULL,                -- descriptive paragraph if needed
  `signature_name` VARCHAR(255) DEFAULT NULL,     -- name under signature
  `designation` VARCHAR(128) DEFAULT NULL,        -- पद selection
  `applicant_name` VARCHAR(255) DEFAULT NULL,
  `applicant_address` VARCHAR(512) DEFAULT NULL,
  `applicant_citizenship` VARCHAR(128) DEFAULT NULL,
  `applicant_phone` VARCHAR(64) DEFAULT NULL,
  `notes` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `FixedAssetValuation` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  -- Meta info
  `letter_no` VARCHAR(128) DEFAULT NULL,
  `chalani_no` VARCHAR(128) DEFAULT NULL,
  `date` VARCHAR(50) DEFAULT NULL,
  -- Main body (paragraph values)
  `former_area` VARCHAR(255) DEFAULT NULL,
  `former_vdc_mun` VARCHAR(64) DEFAULT NULL,
  `former_ward` VARCHAR(32) DEFAULT NULL,
  `current_municipality` VARCHAR(128) DEFAULT NULL,
  `current_ward` VARCHAR(32) DEFAULT NULL,
  `person_title` VARCHAR(64) DEFAULT NULL,
  `person_name` VARCHAR(255) DEFAULT NULL,
  `application_to` VARCHAR(128) DEFAULT NULL,
  `application_ward` VARCHAR(32) DEFAULT NULL,
  -- Tapashil table — ONE row only (your UI shows only one row)
  `owner_name` VARCHAR(255) DEFAULT NULL,
  `owner_sabik` VARCHAR(255) DEFAULT NULL,
  `owner_ward` VARCHAR(32) DEFAULT NULL,
  `owner_kitta_no` VARCHAR(32) DEFAULT NULL,
  `owner_area` VARCHAR(64) DEFAULT NULL,
  `owner_rate` VARCHAR(128) DEFAULT NULL,
  `owner_remarks` VARCHAR(255) DEFAULT NULL,
  -- Signature section
  `signature_name` VARCHAR(255) DEFAULT NULL,
  `designation` VARCHAR(128) DEFAULT NULL,
  -- Applicant details
  `applicant_name` VARCHAR(255) DEFAULT NULL,
  `applicant_address` VARCHAR(512) DEFAULT NULL,
  `applicant_citizenship` VARCHAR(128) DEFAULT NULL,
  `applicant_phone` VARCHAR(64) DEFAULT NULL,
  `notes` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE lekha_parikshyan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    chalani_no VARCHAR(100),
    subject_to VARCHAR(255),
    subject_org VARCHAR(255),
    office_name VARCHAR(255),
    ward_no VARCHAR(20),
    organization_name VARCHAR(255),
    organization_extra VARCHAR(255),
    fiscal_year VARCHAR(50),
    auditor_name VARCHAR(255),
    auditor_certificate_no VARCHAR(100),
    organization_reg_no VARCHAR(100),
    auditor_org_name VARCHAR(255),
    auditor_org_extra VARCHAR(255),
    bodartha VARCHAR(255),
    signature_name VARCHAR(255),
    designation VARCHAR(100),
    applicant_name VARCHAR(255),
    applicant_address VARCHAR(255),
    applicant_citizenship VARCHAR(100),
    applicant_phone VARCHAR(30),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE new_beneficiary_account (
  id INT AUTO_INCREMENT PRIMARY KEY,
  chalani_no VARCHAR(100),
  subject_to VARCHAR(255),
  subject_org VARCHAR(255),
  subject_location VARCHAR(255),
  former_area VARCHAR(255),
  fiscal_year VARCHAR(50),
  reason VARCHAR(255),
  citizenship_no VARCHAR(100),
  issue_date VARCHAR(100),
  beneficiary_name VARCHAR(255),
  signature_name VARCHAR(255),
  designation VARCHAR(100),
  applicant_name VARCHAR(255),
  applicant_address VARCHAR(255),
  applicant_citizenship VARCHAR(255),
  applicant_phone VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS req_for_help_in_health (
  id INT AUTO_INCREMENT PRIMARY KEY,
  chalani_no VARCHAR(128),
  letter_no VARCHAR(128),
  date VARCHAR(64),
  -- addressee / to whom the letter is addressed (two-line)
  addressee_line1 VARCHAR(255),
  addressee_line2 VARCHAR(255),
  -- location / ward / former area fields shown in form
  municipality VARCHAR(128) DEFAULT 'नागार्जुन नगरपालिका',
  former_area VARCHAR(255),        -- साविक (text)
  former_ward VARCHAR(64),
  -- person who needs help (title + name)
  person_title VARCHAR(32),        -- श्री / सुश्री / श्रीमती etc
  person_name VARCHAR(255),
  -- income & condition fields
  annual_income VARCHAR(64),       -- वार्षिक आम्दानी (string to allow formatted figures)
  relation VARCHAR(128),           -- e.g. 'पत्नी', 'श्री' etc (the select + name context)
  condition_description TEXT,      -- free text for illness / affected-by
  hospital_name VARCHAR(255),
  treatment_cost_estimate VARCHAR(128),
  -- signature / officer
  signature_name VARCHAR(255),
  designation VARCHAR(128),
  -- applicant details
  applicant_name VARCHAR(255),
  applicant_address VARCHAR(512),
  applicant_citizenship VARCHAR(128),
  applicant_phone VARCHAR(64),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS social_security_payment_closure (
  id INT AUTO_INCREMENT PRIMARY KEY,
  -- meta
  letter_no VARCHAR(128),
  chalani_no VARCHAR(128),
  date VARCHAR(64),
  -- addressee
  addressee_line1 VARCHAR(255),
  addressee_line2 VARCHAR(255),
  -- main body inputs
  current_area VARCHAR(255),
  current_ward VARCHAR(64),
  former_area VARCHAR(255),
  former_ward VARCHAR(64),
  fiscal_year VARCHAR(128),
  allowance_type VARCHAR(255),
  heir_citizenship_no VARCHAR(128),
  heir_name VARCHAR(255),
  -- table row (1-row only)
  row_name VARCHAR(255),
  row_citizenship VARCHAR(128),
  row_payable_amount VARCHAR(128),
  row_return_amount VARCHAR(128),
  row_beneficiary_no VARCHAR(128),
  -- signature
  signature_name VARCHAR(255),
  designation VARCHAR(128),
  -- applicant details
  applicant_name VARCHAR(255),
  applicant_address VARCHAR(512),
  applicant_citizenship VARCHAR(128),
  applicant_phone VARCHAR(64),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

 CREATE TABLE IF NOT EXISTS social_security_via_guardian (
  id INT AUTO_INCREMENT PRIMARY KEY,
  -- meta
  letter_no VARCHAR(128),
  chalani_no VARCHAR(128),
  date VARCHAR(64),
  -- addressee
  addressee_line1 VARCHAR(255),
  addressee_line2 VARCHAR(255),
  -- MAIN BODY
  applicant_name VARCHAR(255),
  ward_chairman_name VARCHAR(255),
  beneficiary_name VARCHAR(255),
  guardian_relation VARCHAR(64),
  guardian_name VARCHAR(255),
  -- BENEFICIARY DETAILS
  ben_name VARCHAR(255),
  ben_issue_district VARCHAR(255),
  ben_issue_date VARCHAR(64),
  ben_citizenship_no VARCHAR(128),
  ben_account_no VARCHAR(128),
  -- GUARDIAN DETAILS
  grd_name VARCHAR(255),
  grd_issue_district VARCHAR(255),
  grd_issue_date VARCHAR(64),
  grd_citizenship_no VARCHAR(128),
  grd_account_no VARCHAR(128),
  -- SIGNATURE
  signature_name VARCHAR(255),
  designation VARCHAR(128),
  -- applicant details box
  applicant_box_name VARCHAR(255),
  applicant_box_address VARCHAR(255),
  applicant_box_citizenship VARCHAR(128),
  applicant_box_phone VARCHAR(64),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS WorkPlanningCompleted (
  id INT AUTO_INCREMENT PRIMARY KEY,
  -- meta
  letter_no VARCHAR(128),
  chalani_no VARCHAR(128),
  date VARCHAR(64),
  -- addressee / recipient
  addressee_line1 VARCHAR(255),
  addressee_line2 VARCHAR(255),
  municipality VARCHAR(128),
  ward_no VARCHAR(64),
  fiscal_year VARCHAR(64),
  -- main content
  project_name VARCHAR(512),
  applicant_name VARCHAR(255),
  inspection_date VARCHAR(64),
  inspection_findings TEXT,        -- notes from site inspection
  technical_evaluation TEXT,       -- result of technical evaluation / remarks
  -- signature
  signature_name VARCHAR(255),
  designation VARCHAR(128),
  -- applicant box (replicate UI applicant fields)
  applicant_box_name VARCHAR(255),
  applicant_box_address VARCHAR(512),
  applicant_box_citizenship VARCHAR(128),
  applicant_box_phone VARCHAR(64),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- pages/educational
CREATE TABLE IF NOT EXISTS BackwardCommunityRecommendation (
  id INT AUTO_INCREMENT PRIMARY KEY,
  -- meta
  letter_no VARCHAR(128),
  chalani_no VARCHAR(128),
  date VARCHAR(64),
  -- location / subject
  municipality VARCHAR(128),
  ward_no VARCHAR(64),
  sabik_area VARCHAR(255),
  sabik_ward VARCHAR(64),
  -- person being recommended
  person_title VARCHAR(32),     -- श्री / सुश्री / श्रीमती
  person_name VARCHAR(255),
  reason_summary TEXT,          -- body paragraph / reason for recommendation
  -- signature / signer
  signature_name VARCHAR(255),
  designation VARCHAR(128),
  -- applicant box (UI applicant fields)
  applicant_name VARCHAR(255),
  applicant_address VARCHAR(512),
  applicant_citizenship VARCHAR(128),
  applicant_phone VARCHAR(64),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `NewClassRecommendation` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `letter_no` VARCHAR(100) DEFAULT NULL,
  `chalani_no` VARCHAR(100) DEFAULT NULL,
  `date` DATE DEFAULT NULL,
  `municipality` VARCHAR(200) DEFAULT NULL,
  `ward_no` VARCHAR(50) DEFAULT NULL,
  `school_location` VARCHAR(255) DEFAULT NULL,
  `applicant_name` VARCHAR(255) DEFAULT NULL,
  `class_requested` VARCHAR(50) DEFAULT NULL,
  `rule_title` VARCHAR(255) DEFAULT NULL,
  `rule_schedule` VARCHAR(100) DEFAULT NULL,
  `rule_section` VARCHAR(100) DEFAULT NULL,
  `infrastructure_summary` TEXT DEFAULT NULL,
  `signature_name` VARCHAR(255) DEFAULT NULL,
  `designation` VARCHAR(100) DEFAULT NULL,
  `applicant_name_final` VARCHAR(255) DEFAULT NULL,
  `applicant_address` VARCHAR(500) DEFAULT NULL,
  `applicant_citizenship` VARCHAR(100) DEFAULT NULL,
  `applicant_phone` VARCHAR(50) DEFAULT NULL,
  `notes` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `ScholarshipRecommendation` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `letter_no` VARCHAR(100) DEFAULT NULL,
  `chalani_no` VARCHAR(100) DEFAULT NULL,
  `date` DATE DEFAULT NULL,
  `sabik_place` VARCHAR(255) DEFAULT NULL,
  `ward_no` VARCHAR(50) DEFAULT NULL,
  `residency_type` VARCHAR(50) DEFAULT NULL,
  `father_name` VARCHAR(255) DEFAULT NULL,
  `mother_name` VARCHAR(255) DEFAULT NULL,
  `household_economic_status` VARCHAR(50) DEFAULT NULL,
  `child_relation` VARCHAR(20) DEFAULT NULL,
  `child_title` VARCHAR(10) DEFAULT NULL,
  `child_name` VARCHAR(255) DEFAULT NULL,
  `signature_name` VARCHAR(255) DEFAULT NULL,
  `designation` VARCHAR(100) DEFAULT NULL,
  `applicant_name` VARCHAR(255) DEFAULT NULL,
  `applicant_address` VARCHAR(500) DEFAULT NULL,
  `applicant_citizenship` VARCHAR(100) DEFAULT NULL,
  `applicant_phone` VARCHAR(50) DEFAULT NULL,
  `notes` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- pages/english-format
CREATE TABLE `address_verification` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `letterNo` VARCHAR(64) DEFAULT NULL,
  `refNo` VARCHAR(64) DEFAULT NULL,
  `date` DATE DEFAULT NULL,
  `govLocation` VARCHAR(255) DEFAULT NULL,
  `oldWardNo` VARCHAR(32) DEFAULT NULL,
  `newWardNo` VARCHAR(32) DEFAULT NULL,
  `newMunicipality` VARCHAR(128) DEFAULT NULL,
  `newDistrict` VARCHAR(128) DEFAULT NULL,
  `newProvince` VARCHAR(128) DEFAULT NULL,
  `designation` VARCHAR(64) DEFAULT NULL,
  `applicantName` VARCHAR(255) DEFAULT NULL,
  `applicantAddress` TEXT,
  `applicantCitizenship` VARCHAR(128) DEFAULT NULL,
  `applicantPhone` VARCHAR(32) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `annual_income_certificate` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `letterNo` VARCHAR(64) DEFAULT NULL,
  `refNo` VARCHAR(64) DEFAULT NULL,
  `date` DATE DEFAULT NULL,
  `applicantTitle` VARCHAR(16) DEFAULT NULL,
  `applicantNameBody` VARCHAR(255) DEFAULT NULL,
  `relation` VARCHAR(64) DEFAULT NULL,
  `guardianTitle` VARCHAR(16) DEFAULT NULL,
  `guardianName` VARCHAR(255) DEFAULT NULL,
  `guardianRelation` VARCHAR(64) DEFAULT NULL,
  `residencyType` VARCHAR(64) DEFAULT NULL,
  `municipality` VARCHAR(128) DEFAULT NULL,
  `wardNo` VARCHAR(32) DEFAULT NULL,
  `district` VARCHAR(128) DEFAULT NULL,
  `province` VARCHAR(128) DEFAULT NULL,
  `table_rows` JSON DEFAULT NULL,
  `totalIncomeNRs` DECIMAL(18,2) DEFAULT NULL,
  `totalIncomeWords` TEXT,
  `usdRate` DECIMAL(12,4) DEFAULT NULL,
  `equivalentUSD` DECIMAL(18,2) DEFAULT NULL,
  `equivalentUSDWords` TEXT,
  `designation` VARCHAR(64) DEFAULT NULL,
  `applicantName` VARCHAR(255) DEFAULT NULL,
  `applicantAddress` TEXT,
  `applicantCitizenship` VARCHAR(128) DEFAULT NULL,
  `applicantPhone` VARCHAR(64) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `birthdate_verification` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `letterNo` VARCHAR(64) DEFAULT NULL,
  `refNo` VARCHAR(64) DEFAULT NULL,
  `date` DATE DEFAULT NULL,
  `applicantTitle` VARCHAR(16) DEFAULT NULL,
  `applicantNameBody` VARCHAR(255) DEFAULT NULL,
  `relation` VARCHAR(64) DEFAULT NULL,
  `fatherTitle` VARCHAR(16) DEFAULT NULL,
  `fatherName` VARCHAR(255) DEFAULT NULL,
  `motherTitle` VARCHAR(16) DEFAULT NULL,
  `motherName` VARCHAR(255) DEFAULT NULL,
  `residencyType` VARCHAR(64) DEFAULT NULL,
  `municipality` VARCHAR(128) DEFAULT NULL,
  `wardNo1` VARCHAR(32) DEFAULT NULL,
  `district1` VARCHAR(128) DEFAULT NULL,
  `country1` VARCHAR(128) DEFAULT NULL,
  `vdc` VARCHAR(255) DEFAULT NULL,
  `wardNo2` VARCHAR(32) DEFAULT NULL,
  `district2` VARCHAR(128) DEFAULT NULL,
  `pronoun` VARCHAR(16) DEFAULT NULL,
  `certificateType` VARCHAR(64) DEFAULT NULL,
  `issuedBy` VARCHAR(128) DEFAULT NULL,
  `issuedDistrict` VARCHAR(128) DEFAULT NULL,
  `issuedCountry` VARCHAR(128) DEFAULT NULL,
  `pronoun2` VARCHAR(16) DEFAULT NULL,
  `dobBS` VARCHAR(64) DEFAULT NULL,
  `dobAD` DATE DEFAULT NULL,
  `designation` VARCHAR(64) DEFAULT NULL,
  `applicantName` VARCHAR(255) DEFAULT NULL,
  `applicantAddress` TEXT,
  `applicantCitizenship` VARCHAR(128) DEFAULT NULL,
  `applicantPhone` VARCHAR(64) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `certificate_of_occupation` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `letterNo` VARCHAR(64) DEFAULT NULL,
  `refNo` VARCHAR(64) DEFAULT NULL,
  `date` DATE DEFAULT NULL,
  `applicantTitle` VARCHAR(16) DEFAULT NULL,
  `applicantNameBody` VARCHAR(255) DEFAULT NULL,
  `relation` VARCHAR(64) DEFAULT NULL,
  `fatherTitle` VARCHAR(16) DEFAULT NULL,
  `fatherName` VARCHAR(255) DEFAULT NULL,
  `motherTitle` VARCHAR(16) DEFAULT NULL,
  `motherName` VARCHAR(255) DEFAULT NULL,
  `residencyType` VARCHAR(64) DEFAULT NULL,
  `municipality` VARCHAR(128) DEFAULT NULL,
  `wardNo` VARCHAR(32) DEFAULT NULL,
  `district` VARCHAR(128) DEFAULT NULL,
  `country` VARCHAR(128) DEFAULT NULL,
  `applicantNameAgain` VARCHAR(255) DEFAULT NULL,
  `table_rows` JSON DEFAULT NULL,
  `designation` VARCHAR(64) DEFAULT NULL,
  `applicantName` VARCHAR(255) DEFAULT NULL,
  `applicantAddress` TEXT,
  `applicantCitizenship` VARCHAR(128) DEFAULT NULL,
  `applicantPhone` VARCHAR(64) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `digital_verification` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `letterNo` VARCHAR(64) DEFAULT NULL,
  `refNo` VARCHAR(64) DEFAULT NULL,
  `date` DATE DEFAULT NULL,
  `applicantTitle` VARCHAR(16) DEFAULT NULL,
  `applicantNameBody` VARCHAR(255) DEFAULT NULL,
  `relation` VARCHAR(64) DEFAULT NULL,
  `guardianTitle` VARCHAR(16) DEFAULT NULL,
  `guardianName` VARCHAR(255) DEFAULT NULL,
  `motherName` VARCHAR(255) DEFAULT NULL,
  `residencyType` VARCHAR(64) DEFAULT NULL,
  `municipality` VARCHAR(128) DEFAULT NULL,
  `wardNo1` VARCHAR(32) DEFAULT NULL,
  `prevDesignation` VARCHAR(128) DEFAULT NULL,
  `prevWardNo` VARCHAR(32) DEFAULT NULL,
  `prevDistrict` VARCHAR(128) DEFAULT NULL,
  `district` VARCHAR(128) DEFAULT NULL,
  `city` VARCHAR(128) DEFAULT NULL,
  `country` VARCHAR(128) DEFAULT NULL,
  `purpose` VARCHAR(255) DEFAULT NULL,
  `destination` VARCHAR(255) DEFAULT NULL,
  `contactName` VARCHAR(255) DEFAULT NULL,
  `contactDesignation` VARCHAR(255) DEFAULT NULL,
  `contactNumber` VARCHAR(64) DEFAULT NULL,
  `contactEmail` VARCHAR(255) DEFAULT NULL,
  `designation` VARCHAR(64) DEFAULT NULL,
  `applicantName` VARCHAR(255) DEFAULT NULL,
  `applicantAddress` TEXT,
  `applicantCitizenship` VARCHAR(128) DEFAULT NULL,
  `applicantPhone` VARCHAR(64) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `economic_status` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `letterNo` VARCHAR(64) DEFAULT NULL,
  `refNo` VARCHAR(64) DEFAULT NULL,
  `date` DATE DEFAULT NULL,
  `applicantTitle` VARCHAR(16) DEFAULT NULL,
  `applicantNameBody` VARCHAR(255) DEFAULT NULL,
  `relation` VARCHAR(64) DEFAULT NULL,
  `grandFatherTitle` VARCHAR(16) DEFAULT NULL,
  `grandFatherName` VARCHAR(255) DEFAULT NULL,
  `sonOfTitle` VARCHAR(16) DEFAULT NULL,
  `sonOfName` VARCHAR(255) DEFAULT NULL,
  `motherTitle` VARCHAR(16) DEFAULT NULL,
  `motherName` VARCHAR(255) DEFAULT NULL,
  `residencyType` VARCHAR(64) DEFAULT NULL,
  `municipality` VARCHAR(128) DEFAULT NULL,
  `wardNo` VARCHAR(32) DEFAULT NULL,
  `district1` VARCHAR(128) DEFAULT NULL,
  `district2` VARCHAR(128) DEFAULT NULL,
  `province` VARCHAR(128) DEFAULT NULL,
  `country` VARCHAR(128) DEFAULT NULL,
  `retiredFrom` VARCHAR(255) DEFAULT NULL,
  `retirementDateBS` VARCHAR(64) DEFAULT NULL,
  `retirementDateAD` DATE DEFAULT NULL,
  `designation` VARCHAR(64) DEFAULT NULL,
  `applicantName` VARCHAR(255) DEFAULT NULL,
  `applicantAddress` TEXT,
  `applicantCitizenship` VARCHAR(128) DEFAULT NULL,
  `applicantPhone` VARCHAR(64) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `marriage_certificate` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `letterNo` VARCHAR(64) DEFAULT NULL,
  `refNo` VARCHAR(64) DEFAULT NULL,
  `date` DATE DEFAULT NULL,
  `groomTitle` VARCHAR(16) DEFAULT NULL,
  `groomName` VARCHAR(255) DEFAULT NULL,
  `groomRelation` VARCHAR(64) DEFAULT NULL,
  `groomGuardianTitle` VARCHAR(16) DEFAULT NULL,
  `groomGuardianName` VARCHAR(255) DEFAULT NULL,
  `groomMotherTitle` VARCHAR(16) DEFAULT NULL,
  `groomMotherName` VARCHAR(255) DEFAULT NULL,
  `residencyType` VARCHAR(64) DEFAULT NULL,
  `municipality` VARCHAR(128) DEFAULT NULL,
  `wardNo1` VARCHAR(32) DEFAULT NULL,
  `prevDesignation` VARCHAR(64) DEFAULT NULL,
  `prevWardNo` VARCHAR(32) DEFAULT NULL,
  `prevDistrict` VARCHAR(128) DEFAULT NULL,
  `district` VARCHAR(128) DEFAULT NULL,
  `brideTitle` VARCHAR(16) DEFAULT NULL,
  `brideName` VARCHAR(255) DEFAULT NULL,
  `brideRelation` VARCHAR(64) DEFAULT NULL,
  `brideGuardianTitle` VARCHAR(16) DEFAULT NULL,
  `brideGuardianName` VARCHAR(255) DEFAULT NULL,
  `brideMotherTitle` VARCHAR(16) DEFAULT NULL,
  `brideMotherName` VARCHAR(255) DEFAULT NULL,
  `marriageDateBS` VARCHAR(64) DEFAULT NULL,
  `marriageDateAD` DATE DEFAULT NULL,
  `groomCitizenship` VARCHAR(128) DEFAULT NULL,
  `brideCitizenship` VARCHAR(128) DEFAULT NULL,
  `designation` VARCHAR(64) DEFAULT NULL,
  `applicantName` VARCHAR(255) DEFAULT NULL,
  `applicantAddress` TEXT,
  `applicantCitizenship` VARCHAR(128) DEFAULT NULL,
  `applicantPhone` VARCHAR(64) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `occupation_verification` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `letterNo` VARCHAR(64) DEFAULT NULL,
  `refNo` VARCHAR(64) DEFAULT NULL,
  `date` DATE DEFAULT NULL,
  `applicantTitle` VARCHAR(16) DEFAULT NULL,
  `applicantNameBody` VARCHAR(255) DEFAULT NULL,
  `relation` VARCHAR(64) DEFAULT NULL,
  `fatherTitle` VARCHAR(16) DEFAULT NULL,
  `fatherName` VARCHAR(255) DEFAULT NULL,
  `motherTitle` VARCHAR(16) DEFAULT NULL,
  `motherName` VARCHAR(255) DEFAULT NULL,
  `residencyType` VARCHAR(64) DEFAULT NULL,
  `wardNo` VARCHAR(32) DEFAULT NULL,
  `municipality` VARCHAR(128) DEFAULT NULL,
  `district` VARCHAR(128) DEFAULT NULL,
  `prevVDC` VARCHAR(128) DEFAULT NULL,
  `prevWardNo` VARCHAR(32) DEFAULT NULL,
  `prevDistrict` VARCHAR(128) DEFAULT NULL,
  `occupation` TEXT,
  `designation` VARCHAR(64) DEFAULT NULL,
  `applicantName` VARCHAR(255) DEFAULT NULL,
  `applicantAddress` TEXT,
  `applicantCitizenship` VARCHAR(128) DEFAULT NULL,
  `applicantPhone` VARCHAR(64) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `power_of_attorney` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `letterNo` VARCHAR(64) DEFAULT NULL,
  `refNo` VARCHAR(64) DEFAULT NULL,
  `date` DATE DEFAULT NULL,
  `deceasedTitle` VARCHAR(16) DEFAULT NULL,
  `deceasedName` VARCHAR(255) DEFAULT NULL,
  `passportNo` VARCHAR(128) DEFAULT NULL,
  `expiredOn` DATE DEFAULT NULL,
  `dueTo` VARCHAR(255) DEFAULT NULL,
  `delegationLocation` VARCHAR(255) DEFAULT NULL,
  `issuedPowerOfAttorneyOn` DATE DEFAULT NULL,
  `table_rows` JSON DEFAULT NULL,
  `designation` VARCHAR(64) DEFAULT NULL,
  `applicantName` VARCHAR(255) DEFAULT NULL,
  `applicantAddress` TEXT,
  `applicantCitizenship` VARCHAR(128) DEFAULT NULL,
  `applicantPhone` VARCHAR(64) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `property_valuation_report` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `letterNo` VARCHAR(64) DEFAULT NULL,
  `refNo` VARCHAR(64) DEFAULT NULL,
  `date` DATE DEFAULT NULL,
  `applicantTitle` VARCHAR(16) DEFAULT NULL,
  `applicantNameBody` VARCHAR(255) DEFAULT NULL,
  `relation` VARCHAR(64) DEFAULT NULL,
  `guardianTitle` VARCHAR(16) DEFAULT NULL,
  `guardianName` VARCHAR(255) DEFAULT NULL,
  `residencyType` VARCHAR(64) DEFAULT NULL,
  `municipality` VARCHAR(128) DEFAULT NULL,
  `wardNo1` VARCHAR(32) DEFAULT NULL,
  `district1` VARCHAR(128) DEFAULT NULL,
  `propertyMunicipality` VARCHAR(128) DEFAULT NULL,
  `wardNo2` VARCHAR(32) DEFAULT NULL,
  `propertyDistrict` VARCHAR(128) DEFAULT NULL,
  `valuationNRs` VARCHAR(64) DEFAULT NULL,
  `valuationWords` TEXT,
  `usdRate` VARCHAR(64) DEFAULT NULL,
  `equivalentUSD` VARCHAR(64) DEFAULT NULL,
  `equivalentUSDWords` TEXT,
  `table_rows` JSON DEFAULT NULL,
  `designation` VARCHAR(64) DEFAULT NULL,
  `applicantName` VARCHAR(255) DEFAULT NULL,
  `applicantAddress` TEXT,
  `applicantCitizenship` VARCHAR(128) DEFAULT NULL,
  `applicantPhone` VARCHAR(64) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `relationship_verification` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  -- Meta
  `letterNo` VARCHAR(64),
  `refNo` VARCHAR(64),
  `date` DATE,
  -- Main person
  `mainPersonTitle` VARCHAR(16),
  `mainPersonName` VARCHAR(255),
  `relation` VARCHAR(64),
  -- Grand parent
  `grandTitle` VARCHAR(16),
  `grandsName` VARCHAR(255),
  -- Parents
  `fatherTitle` VARCHAR(16),
  `fatherName` VARCHAR(255),
  `motherRelation` VARCHAR(32),
  `motherTitle` VARCHAR(16),
  `motherName` VARCHAR(255),
  -- Address
  `residencyType` VARCHAR(32),
  `municipality` VARCHAR(128),
  `ward_number` INT NOT NULL,
  `district1` VARCHAR(128),
  `country1` VARCHAR(128),
  -- Previous address
  `prevWardNo` VARCHAR(32),
  `prevDistrict` VARCHAR(128),
  `prevCountry` VARCHAR(128),
  -- Relatives list
  `table_rows` JSON,
  -- Office
  `designation` VARCHAR(64),
  -- Applicant
  `applicantName` VARCHAR(255),
  `applicantAddress` TEXT,
  `applicantCitizenship` VARCHAR(128),
  `applicantPhone` VARCHAR(64),
  -- Audit
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_relationship_verification_ward` (`ward_number`)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `same_person_certificate` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `letterNo` VARCHAR(64) DEFAULT NULL,
  `refNo` VARCHAR(64) DEFAULT NULL,
  `date` DATE DEFAULT NULL,
  `applicantTitle` VARCHAR(16) DEFAULT NULL,
  `applicantNameBody` VARCHAR(255) DEFAULT NULL,
  `applicantRelation` VARCHAR(64) DEFAULT NULL,
  `applicantGuardianTitle` VARCHAR(16) DEFAULT NULL,
  `applicantGuardianName` VARCHAR(255) DEFAULT NULL,
  `municipality` VARCHAR(128) DEFAULT NULL,
  `wardNo` VARCHAR(32) DEFAULT NULL,
  `district` VARCHAR(128) DEFAULT NULL,
  `province` VARCHAR(128) DEFAULT NULL,
  `doc1Source` VARCHAR(255) DEFAULT NULL,
  `doc1NameTitle` VARCHAR(16) DEFAULT NULL,
  `doc1Name` VARCHAR(255) DEFAULT NULL,
  `doc2Source` VARCHAR(255) DEFAULT NULL,
  `doc2NameTitle` VARCHAR(16) DEFAULT NULL,
  `doc2Name` VARCHAR(255) DEFAULT NULL,
  `doc2Relation` VARCHAR(64) DEFAULT NULL,
  `doc2GuardianTitle` VARCHAR(16) DEFAULT NULL,
  `doc2GuardianName` VARCHAR(255) DEFAULT NULL,
  `doc3Source` VARCHAR(255) DEFAULT NULL,
  `doc4Source` VARCHAR(255) DEFAULT NULL,
  `doc4NameTitle` VARCHAR(16) DEFAULT NULL,
  `doc4Name` VARCHAR(255) DEFAULT NULL,
  `doc4Relation` VARCHAR(64) DEFAULT NULL,
  `doc4GuardianTitle` VARCHAR(16) DEFAULT NULL,
  `doc4GuardianName` VARCHAR(255) DEFAULT NULL,
  `finalName1Title` VARCHAR(16) DEFAULT NULL,
  `finalName1` VARCHAR(255) DEFAULT NULL,
  `finalName2Title` VARCHAR(16) DEFAULT NULL,
  `finalName2` VARCHAR(255) DEFAULT NULL,
  `designation` VARCHAR(64) DEFAULT NULL,
  `applicantName` VARCHAR(255) DEFAULT NULL,
  `applicantAddress` TEXT,
  `applicantCitizenship` VARCHAR(128) DEFAULT NULL,
  `applicantPhone` VARCHAR(64) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `scholarship_verification` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `letterNo` VARCHAR(64) DEFAULT NULL,
  `refNo` VARCHAR(64) DEFAULT NULL,
  `date` DATE DEFAULT NULL,
  `applicantTitle` VARCHAR(16) DEFAULT NULL,
  `applicantNameBody` VARCHAR(255) DEFAULT NULL,
  `relation` VARCHAR(64) DEFAULT NULL,
  `guardianTitle` VARCHAR(16) DEFAULT NULL,
  `guardianName` VARCHAR(255) DEFAULT NULL,
  `residentOf` VARCHAR(128) DEFAULT NULL,
  `district` VARCHAR(128) DEFAULT NULL,
  `previouslyKnownAs` VARCHAR(255) DEFAULT NULL,
  `wardNo1` VARCHAR(32) DEFAULT NULL,
  `municipality` VARCHAR(128) DEFAULT NULL,
  `wardNo2` VARCHAR(32) DEFAULT NULL,
  `annualIncome` VARCHAR(64) DEFAULT NULL,
  `pronounHeShe` VARCHAR(8) DEFAULT NULL,
  `pronounHimHer` VARCHAR(8) DEFAULT NULL,
  `pronounHisHer` VARCHAR(8) DEFAULT NULL,
  `designation` VARCHAR(64) DEFAULT NULL,
  `applicantName` VARCHAR(255) DEFAULT NULL,
  `applicantAddress` TEXT,
  `applicantCitizenship` VARCHAR(128) DEFAULT NULL,
  `applicantPhone` VARCHAR(64) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `tax_clear_basic` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `letterNo` VARCHAR(64) DEFAULT NULL,
  `refNo` VARCHAR(64) DEFAULT NULL,
  `date` DATE DEFAULT NULL,
  `applicantNameBody` VARCHAR(255) DEFAULT NULL,
  `residencyType` VARCHAR(64) DEFAULT NULL,
  `municipality` VARCHAR(128) DEFAULT NULL,
  `wardNo` VARCHAR(32) DEFAULT NULL,
  `prevWardNo` VARCHAR(32) DEFAULT NULL,
  `district` VARCHAR(128) DEFAULT NULL,
  `country` VARCHAR(128) DEFAULT NULL,
  `designation` VARCHAR(64) DEFAULT NULL,
  `applicantName` VARCHAR(255) DEFAULT NULL,
  `applicantAddress` TEXT,
  `applicantCitizenship` VARCHAR(128) DEFAULT NULL,
  `applicantPhone` VARCHAR(64) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `tax_clearance_certificate` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `letterNo` VARCHAR(64) DEFAULT NULL,
  `refNo` VARCHAR(64) DEFAULT NULL,
  `date` DATE DEFAULT NULL,
  `ownerTitle` VARCHAR(16) DEFAULT NULL,
  `ownerNameBody` VARCHAR(255) DEFAULT NULL,
  `municipality` VARCHAR(128) DEFAULT NULL,
  `wardNo` VARCHAR(32) DEFAULT NULL,
  `district` VARCHAR(128) DEFAULT NULL,
  `table_rows` JSON DEFAULT NULL,
  `designation` VARCHAR(64) DEFAULT NULL,
  `applicantName` VARCHAR(255) DEFAULT NULL,
  `applicantAddress` TEXT,
  `applicantCitizenship` VARCHAR(128) DEFAULT NULL,
  `applicantPhone` VARCHAR(64) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `unmarried_verification` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `letterNo` VARCHAR(64) DEFAULT NULL,
  `refNo` VARCHAR(64) DEFAULT NULL,
  `date` DATE DEFAULT NULL,
  `applicantTitle` VARCHAR(16) DEFAULT NULL,
  `applicantNameBody` VARCHAR(255) DEFAULT NULL,
  `relation` VARCHAR(64) DEFAULT NULL,
  `fatherTitle` VARCHAR(16) DEFAULT NULL,
  `fatherName` VARCHAR(255) DEFAULT NULL,
  `motherTitle` VARCHAR(16) DEFAULT NULL,
  `motherName` VARCHAR(255) DEFAULT NULL,
  `docType` VARCHAR(64) DEFAULT NULL,
  `docNo` VARCHAR(128) DEFAULT NULL,
  `residencyType` VARCHAR(64) DEFAULT NULL,
  `municipality` VARCHAR(128) DEFAULT NULL,
  `wardNo1` VARCHAR(32) DEFAULT NULL,
  `district1` VARCHAR(128) DEFAULT NULL,
  `country1` VARCHAR(128) DEFAULT NULL,
  `prevDesignation` VARCHAR(64) DEFAULT NULL,
  `prevWardNo` VARCHAR(32) DEFAULT NULL,
  `prevDistrict` VARCHAR(128) DEFAULT NULL,
  `pronoun` VARCHAR(8) DEFAULT NULL,
  `asOfDate` DATE DEFAULT NULL,
  `designation` VARCHAR(64) DEFAULT NULL,
  `applicantName` VARCHAR(255) DEFAULT NULL,
  `applicantAddress` TEXT,
  `applicantCitizenship` VARCHAR(128) DEFAULT NULL,
  `applicantPhone` VARCHAR(64) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `address_verification_new` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `letterNo` VARCHAR(64) DEFAULT NULL,
  `refNo` VARCHAR(64) DEFAULT NULL,
  `date` DATE DEFAULT NULL,
  `applicantNameBody` VARCHAR(255) DEFAULT NULL,
  `oldWardNo` VARCHAR(32) DEFAULT NULL,
  `oldMunicipality` VARCHAR(128) DEFAULT NULL,
  `oldProvince` VARCHAR(128) DEFAULT NULL,
  `newMunicipality` VARCHAR(128) DEFAULT NULL,
  `newWardNo` VARCHAR(32) DEFAULT NULL,
  `newProvince` VARCHAR(128) DEFAULT NULL,
  `newCountry` VARCHAR(128) DEFAULT NULL,
  `decisionSource` VARCHAR(255) DEFAULT NULL,
  `govSource` VARCHAR(255) DEFAULT NULL,
  `decisionDate` VARCHAR(64) DEFAULT NULL,
  `finalAddress1` TEXT,
  `finalAddress2` VARCHAR(255) DEFAULT NULL,
  `finalWardNo` VARCHAR(32) DEFAULT NULL,
  `finalProvince` VARCHAR(128) DEFAULT NULL,
  `finalCountry` VARCHAR(128) DEFAULT NULL,
  `designation` VARCHAR(64) DEFAULT NULL,
  `applicantName` VARCHAR(255) DEFAULT NULL,
  `applicantAddress` TEXT,
  `applicantCitizenship` VARCHAR(128) DEFAULT NULL,
  `applicantPhone` VARCHAR(64) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `annual_income_verification_new` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `letterNo` VARCHAR(100) NULL,
  `refNo` VARCHAR(100) NULL,
  `date` DATE NULL,
  `applicantNameBody` VARCHAR(255) NULL,
  `relation` VARCHAR(50) NULL,
  `guardianTitle` VARCHAR(50) NULL,
  `guardianName` VARCHAR(255) NULL,
  `municipality` VARCHAR(255) NULL,
  `wardNo` VARCHAR(20) NULL,
  `prevAddress` VARCHAR(255) NULL,
  `prevWardNo` VARCHAR(20) NULL,
  `district` VARCHAR(100) NULL,
  `province` VARCHAR(100) NULL,
  `country` VARCHAR(100) NULL,
  `totalNPR_fy1` DECIMAL(18,2) NULL,
  `totalNPR_fy2` DECIMAL(18,2) NULL,
  `totalNPR_fy3` DECIMAL(18,2) NULL,
  `currency` VARCHAR(10) NULL,
  `totalCurrency_fy1` DECIMAL(18,2) NULL,
  `totalCurrency_fy2` DECIMAL(18,2) NULL,
  `totalCurrency_fy3` DECIMAL(18,2) NULL,
  `usdRate` DECIMAL(12,6) NULL,
  `rateDate` DATE NULL,
  `designation` VARCHAR(150) NULL,
  `applicantName` VARCHAR(255) NULL,
  `applicantAddress` VARCHAR(255) NULL,
  `applicantCitizenship` VARCHAR(150) NULL,
  `applicantPhone` VARCHAR(50) NULL,
  `table_rows` TEXT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `birth_certificate_new` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `letterNo` VARCHAR(100) NULL,
  `refNo` VARCHAR(100) NULL,
  `date` DATE NULL,
  `childTitle` VARCHAR(50) NULL,
  `childName` VARCHAR(255) NULL,
  `relation` VARCHAR(50) NULL,
  `fatherTitle` VARCHAR(50) NULL,
  `fatherName` VARCHAR(255) NULL,
  `motherTitle` VARCHAR(50) NULL,
  `motherName` VARCHAR(255) NULL,
  `municipality` VARCHAR(255) NULL,
  `wardNo` VARCHAR(20) NULL,
  `prevAddress1` VARCHAR(255) NULL,
  `prevWardNo` VARCHAR(20) NULL,
  `prevAddress2` VARCHAR(255) NULL,
  `prevProvince` VARCHAR(100) NULL,
  `prevCountry` VARCHAR(100) NULL,
  `dobBS` VARCHAR(50) NULL,
  `dobAD` DATE NULL,
  `birthMunicipality` VARCHAR(255) NULL,
  `birthWardNo` VARCHAR(20) NULL,
  `birthPrevAddress1` VARCHAR(255) NULL,
  `birthPrevWardNo` VARCHAR(20) NULL,
  `birthPrevAddress2` VARCHAR(255) NULL,
  `birthPrevProvince` VARCHAR(100) NULL,
  `birthPrevCountry` VARCHAR(100) NULL,
  `recordLocation` VARCHAR(255) NULL,
  `recordWardNo` VARCHAR(20) NULL,
  `recordOffice` VARCHAR(255) NULL,
  `imageBoxTitle` VARCHAR(50) NULL,
  `designation` VARCHAR(150) NULL,
  `applicantName` VARCHAR(255) NULL,
  `applicantAddress` VARCHAR(255) NULL,
  `applicantCitizenship` VARCHAR(150) NULL,
  `applicantPhone` VARCHAR(50) NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `occupation_verification_new` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `letterNo` VARCHAR(100) NULL,
  `refNo` VARCHAR(100) NULL,
  `date` DATE NULL,
  `applicantTitle` VARCHAR(50) NULL,
  `applicantNameBody` VARCHAR(255) NULL,
  `relation` VARCHAR(50) NULL,
  `fatherTitle` VARCHAR(50) NULL,
  `fatherName` VARCHAR(255) NULL,
  `residencyType` VARCHAR(50) NULL,
  `municipality` VARCHAR(255) NULL,
  `wardNo` VARCHAR(20) NULL,
  `prevAddress1` VARCHAR(255) NULL,
  `prevWardNo` VARCHAR(20) NULL,
  `prevAddress2` VARCHAR(255) NULL,
  `prevProvince` VARCHAR(100) NULL,
  `prevCountry` VARCHAR(100) NULL,
  `description` TEXT NULL,
  `designation` VARCHAR(150) NULL,
  `applicantName` VARCHAR(255) NULL,
  `applicantAddress` VARCHAR(255) NULL,
  `applicantCitizenship` VARCHAR(150) NULL,
  `applicantPhone` VARCHAR(50) NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `surname_verification_after_marriage` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `letterNo` VARCHAR(100) NULL,
  `refNo` VARCHAR(100) NULL,
  `date` DATE NULL,
  `applicantNameBody` VARCHAR(255) NULL,
  `residencyType1` VARCHAR(100) NULL,
  `municipality1` VARCHAR(255) NULL,
  `wardNo1` VARCHAR(20) NULL,
  `district1` VARCHAR(100) NULL,
  `province1` VARCHAR(100) NULL,
  `country1` VARCHAR(100) NULL,
  `name1` VARCHAR(255) NULL,
  `name2` VARCHAR(255) NULL,
  `name3` VARCHAR(255) NULL,
  `name4` VARCHAR(255) NULL,
  `residencyType2` VARCHAR(100) NULL,
  `municipality2` VARCHAR(255) NULL,
  `wardNo2` VARCHAR(20) NULL,
  `district2` VARCHAR(100) NULL,
  `province2` VARCHAR(100) NULL,
  `country2` VARCHAR(100) NULL,
  `designation` VARCHAR(150) NULL,
  `applicantName` VARCHAR(255) NULL,
  `applicantAddress` VARCHAR(255) NULL,
  `applicantCitizenship` VARCHAR(150) NULL,
  `applicantPhone` VARCHAR(50) NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `surname_verification_certificate_new` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `letterNo` VARCHAR(100) NULL,
  `refNo` VARCHAR(100) NULL,
  `date` DATE NULL,
  `applicantTitle` VARCHAR(50) NULL,
  `applicantNameBody` VARCHAR(255) NULL,
  `surname1` VARCHAR(255) NULL,
  `applicantNameAgain` VARCHAR(255) NULL,
  `surname2` VARCHAR(255) NULL,
  `surnameContext` VARCHAR(100) NULL,
  `fatherName` VARCHAR(255) NULL,
  `surname3` VARCHAR(255) NULL,
  `surname4` VARCHAR(255) NULL,
  `relationship` VARCHAR(50) NULL,
  `designation` VARCHAR(150) NULL,
  `applicantName` VARCHAR(255) NULL,
  `applicantAddress` VARCHAR(255) NULL,
  `applicantCitizenship` VARCHAR(150) NULL,
  `applicantPhone` VARCHAR(50) NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `tax_clearance_new_format` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `letterNo` VARCHAR(100) NULL,
  `refNo` VARCHAR(100) NULL,
  `date` DATE NULL,
  `applicantTitle` VARCHAR(50) NULL,
  `applicantNameBody` VARCHAR(255) NULL,
  `relation` VARCHAR(50) NULL,
  `guardianTitle` VARCHAR(50) NULL,
  `guardianName` VARCHAR(255) NULL,
  `municipality` VARCHAR(255) NULL,
  `wardNo` VARCHAR(20) NULL,
  `prevAddress` VARCHAR(255) NULL,
  `prevWardNo` VARCHAR(20) NULL,
  `prevProvince` VARCHAR(100) NULL,
  `prevCountry` VARCHAR(100) NULL,
  `fiscalYear` VARCHAR(50) NULL,
  `designation` VARCHAR(150) NULL,
  `applicantName` VARCHAR(255) NULL,
  `applicantAddress` VARCHAR(255) NULL,
  `applicantCitizenship` VARCHAR(150) NULL,
  `applicantPhone` VARCHAR(50) NULL,
  `table_rows` TEXT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `verify_revised_emblem` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `letterNo` VARCHAR(100) NULL,
  `refNo` VARCHAR(100) NULL,
  `date` DATE NULL,
  `billName` VARCHAR(255) NULL,
  `amendmentName` VARCHAR(255) NULL,
  `mapLocation` VARCHAR(255) NULL,
  `stampLocation` VARCHAR(255) NULL,
  `villageName` VARCHAR(255) NULL,
  `stampMunicipality` VARCHAR(255) NULL,
  `stampWardNo` VARCHAR(20) NULL,
  `provinceNameLetterhead` VARCHAR(255) NULL,
  `provinceNameStamp` VARCHAR(255) NULL,
  `stampWardNo2` VARCHAR(20) NULL,
  `wardOfficeName1` VARCHAR(255) NULL,
  `wardOfficeName2` VARCHAR(255) NULL,
  `designation` VARCHAR(150) NULL,
  `applicantName` VARCHAR(255) NULL,
  `applicantAddress` VARCHAR(255) NULL,
  `applicantCitizenship` VARCHAR(150) NULL,
  `applicantPhone` VARCHAR(50) NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- pages/gov-organizations
CREATE TABLE IF NOT EXISTS `gov_organization_registration` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `date` VARCHAR(50) DEFAULT NULL,          -- store BS or AD strings safely
  `letterNo` VARCHAR(100) DEFAULT NULL,
  `refNo` VARCHAR(100) DEFAULT NULL,
  `proposalName` VARCHAR(255) DEFAULT NULL,
  `wardNo` VARCHAR(20) DEFAULT NULL,
  `purpose` TEXT DEFAULT NULL,
  `activities` TEXT DEFAULT NULL,
  `headOffice` VARCHAR(255) DEFAULT NULL,
  `branchOffice` VARCHAR(255) DEFAULT NULL,
  `liability` VARCHAR(255) DEFAULT NULL,
  `femaleMembers` INT DEFAULT NULL,
  `maleMembers` INT DEFAULT NULL,
  `totalShareCapital` DECIMAL(18,2) DEFAULT NULL,
  `entranceFee` DECIMAL(18,2) DEFAULT NULL,
  `applicantName` VARCHAR(255) DEFAULT NULL,
  `applicantAddress` VARCHAR(512) DEFAULT NULL,
  `applicantCitizenship` VARCHAR(150) DEFAULT NULL,
  `applicantPhone` VARCHAR(50) DEFAULT NULL,
  `status` ENUM('pending','approved','rejected') NOT NULL DEFAULT 'pending',
  `recommendation_note` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX (`date`),
  INDEX (`refNo`),
  INDEX (`proposalName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `gov_organization_registration_rejected` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `sn` INT NULL,
  `regDate` VARCHAR(50) DEFAULT NULL,
  `proposedName` VARCHAR(255) DEFAULT NULL,
  `address` VARCHAR(512) DEFAULT NULL,
  `purpose` TEXT DEFAULT NULL,
  `mainWork` TEXT DEFAULT NULL,
  `share` VARCHAR(100) DEFAULT NULL,
  `entryFee` DECIMAL(18,2) DEFAULT NULL,
  `rejectReason` TEXT DEFAULT NULL,
  `notes` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX (`regDate`),
  INDEX (`proposedName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- pages/house-land
CREATE TABLE IF NOT EXISTS `boundary_recommendations` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `letter_no` VARCHAR(64) DEFAULT NULL,
  `chalani_no` VARCHAR(64) DEFAULT NULL,
  `date_nep` VARCHAR(32) DEFAULT NULL,
  `municipality` VARCHAR(128) DEFAULT NULL,
  `ward_no` VARCHAR(16) DEFAULT NULL,
  `applicant_name` VARCHAR(255) DEFAULT NULL,
  `applicant_address` TEXT DEFAULT NULL,
  `applicant_citizenship_no` VARCHAR(64) DEFAULT NULL,
  `applicant_phone` VARCHAR(32) DEFAULT NULL,
  `old_district` VARCHAR(128) DEFAULT NULL,
  `old_municipality` VARCHAR(128) DEFAULT NULL,
  `old_ward_no` VARCHAR(16) DEFAULT NULL,
  `plot_number` VARCHAR(64) DEFAULT NULL,
  `area` VARCHAR(64) DEFAULT NULL,
  `east_boundary` TEXT DEFAULT NULL,
  `west_boundary` TEXT DEFAULT NULL,
  `north_boundary` TEXT DEFAULT NULL,
  `south_boundary` TEXT DEFAULT NULL,
  `signer_name` VARCHAR(255) DEFAULT NULL,
  `signer_designation` VARCHAR(128) DEFAULT NULL,
  `notes` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `char_killa_reloaded` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `letter_no` VARCHAR(64) DEFAULT NULL,
  `chalani_no` VARCHAR(64) DEFAULT NULL,
  `date_nep` VARCHAR(32) DEFAULT NULL,
  `addressee_line1` VARCHAR(255) DEFAULT NULL,
  `addressee_line2` VARCHAR(255) DEFAULT NULL,
  `applicant_name` VARCHAR(255) DEFAULT NULL,
  `malpot_office_place` VARCHAR(255) DEFAULT NULL,
  `registration_text` VARCHAR(255) DEFAULT NULL,
  `place_type` VARCHAR(64) DEFAULT NULL,
  `declaration_person` VARCHAR(64) DEFAULT NULL,
  `declaration_relation` VARCHAR(64) DEFAULT NULL,
  `declaration_name` VARCHAR(255) DEFAULT NULL,
  `plots` LONGTEXT DEFAULT NULL,
  `signer_name` VARCHAR(255) DEFAULT NULL,
  `signer_designation` VARCHAR(128) DEFAULT NULL,
  `applicant_address` TEXT DEFAULT NULL,
  `applicant_citizenship_no` VARCHAR(64) DEFAULT NULL,
  `applicant_phone` VARCHAR(32) DEFAULT NULL,
  `notes` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `ghar_kayam_new_format` (
`id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
`letter_no` VARCHAR(64) DEFAULT NULL,
`chalani_no` VARCHAR(64) DEFAULT NULL,
`date_nep` VARCHAR(32) DEFAULT NULL,
`malpot_office_place` VARCHAR(255) DEFAULT NULL,
`district` VARCHAR(255) DEFAULT NULL,
`ward_no` VARCHAR(32) DEFAULT NULL,
`owner_name` VARCHAR(255) DEFAULT NULL,
`registration_date` VARCHAR(32) DEFAULT NULL,
`certificate_taken_from` VARCHAR(255) DEFAULT NULL,
`plot_gb_np` VARCHAR(255) DEFAULT NULL,
`plot_ward_no` VARCHAR(64) DEFAULT NULL,
`plot_seat_no` VARCHAR(64) DEFAULT NULL,
`plot_plot_no` VARCHAR(64) DEFAULT NULL,
`plot_area` VARCHAR(64) DEFAULT NULL,
`signer_name` VARCHAR(255) DEFAULT NULL,
`signer_designation` VARCHAR(128) DEFAULT NULL,
`applicant_address` TEXT DEFAULT NULL,
`applicant_citizenship_no` VARCHAR(64) DEFAULT NULL,
`applicant_phone` VARCHAR(32) DEFAULT NULL,
`notes` TEXT DEFAULT NULL,
`created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (`id`),
KEY (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `governmental_land_utilization_recommendation` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `letter_no` VARCHAR(64) DEFAULT NULL,
  `chalani_no` VARCHAR(64) DEFAULT NULL,
  `date_nep` VARCHAR(32) DEFAULT NULL,
  `addressee_type` VARCHAR(128) DEFAULT NULL,
  `addressee_line1` VARCHAR(255) DEFAULT NULL,
  `addressee_line2` VARCHAR(255) DEFAULT NULL,
  `municipality` VARCHAR(128) DEFAULT NULL,
  `ward_no` VARCHAR(16) DEFAULT NULL,
  `applicant_name` VARCHAR(255) DEFAULT NULL,
  `applicant_prefix` VARCHAR(16) DEFAULT NULL,
  `applicant_name_secondary` VARCHAR(255) DEFAULT NULL,
  `child_prefix` VARCHAR(16) DEFAULT NULL,
  `child_name` VARCHAR(255) DEFAULT NULL,
  `old_place_text` VARCHAR(255) DEFAULT NULL,
  `old_place_type` VARCHAR(64) DEFAULT NULL,
  `old_ward_no` VARCHAR(16) DEFAULT NULL,
  `plot_number` VARCHAR(64) DEFAULT NULL,
  `area` VARCHAR(64) DEFAULT NULL,
  `current_municipality` VARCHAR(128) DEFAULT NULL,
  `current_ward_no` VARCHAR(16) DEFAULT NULL,
  `boundary_east` TEXT DEFAULT NULL,
  `boundary_west` TEXT DEFAULT NULL,
  `boundary_north` TEXT DEFAULT NULL,
  `boundary_south` TEXT DEFAULT NULL,
  `signer_name` VARCHAR(255) DEFAULT NULL,
  `signer_designation` VARCHAR(128) DEFAULT NULL,
  `applicant_address` TEXT DEFAULT NULL,
  `applicant_citizenship_no` VARCHAR(64) DEFAULT NULL,
  `applicant_phone` VARCHAR(32) DEFAULT NULL,
  `notes` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `house_construction_completed_certificate` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `letter_no` VARCHAR(64) DEFAULT NULL,
  `chalani_no` VARCHAR(64) DEFAULT NULL,
  `date_nep` VARCHAR(32) DEFAULT NULL,
  `municipality` VARCHAR(128) DEFAULT NULL,
  `ward_no` VARCHAR(16) DEFAULT NULL,
  `applicant_name` VARCHAR(255) DEFAULT NULL,
  `previous_district` VARCHAR(255) DEFAULT NULL,
  `previous_type` VARCHAR(64) DEFAULT NULL,
  `previous_ward_no` VARCHAR(16) DEFAULT NULL,
  `plot_number` VARCHAR(64) DEFAULT NULL,
  `plot_area` VARCHAR(64) DEFAULT NULL,
  `house_type` VARCHAR(128) DEFAULT NULL,
  `house_storeys` VARCHAR(64) DEFAULT NULL,
  `map_approval_date` VARCHAR(32) DEFAULT NULL,
  `map_approval_type` VARCHAR(255) DEFAULT NULL,
  `signer_name` VARCHAR(255) DEFAULT NULL,
  `signer_designation` VARCHAR(128) DEFAULT NULL,
  `applicant_address` TEXT DEFAULT NULL,
  `applicant_citizenship_no` VARCHAR(64) DEFAULT NULL,
  `applicant_phone` VARCHAR(32) DEFAULT NULL,
  `notes` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `house_destroyed_recommendation` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `letter_no` VARCHAR(64) DEFAULT NULL,
  `chalani_no` VARCHAR(64) DEFAULT NULL,
  `date_nep` VARCHAR(32) DEFAULT NULL,
  `addressee_name` VARCHAR(255) DEFAULT NULL,
  `addressee_line2` VARCHAR(255) DEFAULT NULL,
  `municipality` VARCHAR(128) DEFAULT NULL,
  `ward_no` VARCHAR(16) DEFAULT NULL,
  `owner_prefix` VARCHAR(16) DEFAULT NULL,
  `owner_name` VARCHAR(255) DEFAULT NULL,
  `plot_number` VARCHAR(64) DEFAULT NULL,
  `plot_area` VARCHAR(64) DEFAULT NULL,
  `signer_name` VARCHAR(255) DEFAULT NULL,
  `signer_designation` VARCHAR(128) DEFAULT NULL,
  `applicant_address` TEXT DEFAULT NULL,
  `applicant_citizenship_no` VARCHAR(64) DEFAULT NULL,
  `applicant_phone` VARCHAR(32) DEFAULT NULL,
  `notes` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `house_maintain_recommendation` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `letter_no` VARCHAR(64) DEFAULT NULL,
  `chalani_no` VARCHAR(64) DEFAULT NULL,
  `date_nep` VARCHAR(32) DEFAULT NULL,
  `addressee_office` VARCHAR(128) DEFAULT NULL,
  `addressee_location` VARCHAR(255) DEFAULT NULL,
  `district` VARCHAR(128) DEFAULT NULL,
  `municipality` VARCHAR(128) DEFAULT NULL,
  `ward_no` VARCHAR(16) DEFAULT NULL,
  `previous_gb_np` VARCHAR(64) DEFAULT NULL,
  `previous_ward_no` VARCHAR(16) DEFAULT NULL,
  `owner_prefix` VARCHAR(16) DEFAULT NULL,
  `owner_name` VARCHAR(255) DEFAULT NULL,
  `ownership_type` VARCHAR(32) DEFAULT NULL,
  `properties` LONGTEXT DEFAULT NULL,
  `signer_name` VARCHAR(255) DEFAULT NULL,
  `signer_designation` VARCHAR(128) DEFAULT NULL,
  `applicant_address` TEXT DEFAULT NULL,
  `applicant_citizenship_no` VARCHAR(64) DEFAULT NULL,
  `applicant_phone` VARCHAR(32) DEFAULT NULL,
  `notes` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `house_road_verification` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `letter_no` VARCHAR(64) DEFAULT NULL,
  `chalani_no` VARCHAR(64) DEFAULT NULL,
  `date_nep` VARCHAR(32) DEFAULT NULL,
  `addressee_office` VARCHAR(128) DEFAULT NULL,
  `addressee_location` VARCHAR(255) DEFAULT NULL,
  `municipality` VARCHAR(128) DEFAULT NULL,
  `ward_no` VARCHAR(16) DEFAULT NULL,
  `previous_type` VARCHAR(64) DEFAULT NULL,
  `prev_ward_no` VARCHAR(16) DEFAULT NULL,
  `owner_prefix` VARCHAR(16) DEFAULT NULL,
  `owner_name` VARCHAR(255) DEFAULT NULL,
  `roads` LONGTEXT DEFAULT NULL,
  `notes` TEXT DEFAULT NULL,
  `signer_name` VARCHAR(255) DEFAULT NULL,
  `signer_designation` VARCHAR(128) DEFAULT NULL,
  `applicant_address` TEXT DEFAULT NULL,
  `applicant_citizenship_no` VARCHAR(64) DEFAULT NULL,
  `applicant_phone` VARCHAR(32) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `house_verification_recommendation` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `letter_no` VARCHAR(64) DEFAULT NULL,
  `chalani_no` VARCHAR(64) DEFAULT NULL,
  `date_nep` VARCHAR(32) DEFAULT NULL,
  `addressee_type` VARCHAR(128) DEFAULT NULL,
  `addressee_location` VARCHAR(255) DEFAULT NULL,
  `municipality` VARCHAR(128) DEFAULT NULL,
  `ward_no` VARCHAR(16) DEFAULT NULL,
  `applicant_fullname` VARCHAR(255) DEFAULT NULL,
  `previous_place_text` VARCHAR(255) DEFAULT NULL,
  `previous_place_type` VARCHAR(64) DEFAULT NULL,
  `previous_ward_no` VARCHAR(16) DEFAULT NULL,
  `current_place_text` VARCHAR(255) DEFAULT NULL,
  `current_ward_no` VARCHAR(16) DEFAULT NULL,
  `plot_number` VARCHAR(64) DEFAULT NULL,
  `area` VARCHAR(64) DEFAULT NULL,
  `notes` TEXT DEFAULT NULL,
  `signer_name` VARCHAR(255) DEFAULT NULL,
  `signer_designation` VARCHAR(128) DEFAULT NULL,
  `applicant_address` TEXT DEFAULT NULL,
  `applicant_citizenship_no` VARCHAR(64) DEFAULT NULL,
  `applicant_phone` VARCHAR(32) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `kitta_kat_recommendation` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `letter_no` VARCHAR(64) DEFAULT NULL,
  `chalani_no` VARCHAR(64) DEFAULT NULL,
  `date_nep` VARCHAR(32) DEFAULT NULL,
  `addressee_type` VARCHAR(128) DEFAULT NULL,
  `addressee_location` VARCHAR(255) DEFAULT NULL,
  `district` VARCHAR(128) DEFAULT NULL,
  `municipality` VARCHAR(128) DEFAULT NULL,
  `ward_no` VARCHAR(16) DEFAULT NULL,
  `previous_place_text` VARCHAR(255) DEFAULT NULL,
  `previous_ward_no` VARCHAR(16) DEFAULT NULL,
  `applicant_prefix` VARCHAR(16) DEFAULT NULL,
  `applicant_name` VARCHAR(255) DEFAULT NULL,
  `requested_for` VARCHAR(255) DEFAULT NULL,
  `split_area` VARCHAR(64) DEFAULT NULL,
  `split_area_unit` VARCHAR(64) DEFAULT NULL,
  `plots` LONGTEXT DEFAULT NULL,
  `built_plot_area` VARCHAR(64) DEFAULT NULL,
  `total_house_area` VARCHAR(64) DEFAULT NULL,
  `ground_floor_area` VARCHAR(64) DEFAULT NULL,
  `paune_far` VARCHAR(255) DEFAULT NULL,
  `reason_for_recommendation` TEXT DEFAULT NULL,
  `recommender` VARCHAR(255) DEFAULT NULL,
  `technician_name` VARCHAR(255) DEFAULT NULL,
  `technician_signature` VARCHAR(255) DEFAULT NULL,
  `signer_name` VARCHAR(255) DEFAULT NULL,
  `signer_designation` VARCHAR(128) DEFAULT NULL,
  `applicant_address` TEXT DEFAULT NULL,
  `applicant_citizenship_no` VARCHAR(64) DEFAULT NULL,
  `applicant_phone` VARCHAR(32) DEFAULT NULL,
  `notes` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `land_classification_recommendation` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `letter_no` VARCHAR(64) DEFAULT NULL,
  `chalani_no` VARCHAR(64) DEFAULT NULL,
  `date_nep` VARCHAR(32) DEFAULT NULL,
  `decision_date` VARCHAR(32) DEFAULT NULL,
  `standard_version` VARCHAR(32) DEFAULT NULL,
  `entries` LONGTEXT DEFAULT NULL,
  `signer_name` VARCHAR(255) DEFAULT NULL,
  `signer_designation` VARCHAR(128) DEFAULT NULL,
  `applicant_name` VARCHAR(255) DEFAULT NULL,
  `applicant_address` TEXT DEFAULT NULL,
  `applicant_citizenship_no` VARCHAR(64) DEFAULT NULL,
  `applicant_phone` VARCHAR(32) DEFAULT NULL,
  `notes` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `land_consolidation_recommendation` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `letter_no` VARCHAR(64) DEFAULT NULL,
  `chalani_no` VARCHAR(64) DEFAULT NULL,
  `date_nep` VARCHAR(32) DEFAULT NULL,
  `municipality_text` VARCHAR(255) DEFAULT NULL,
  `ward_no` VARCHAR(16) DEFAULT NULL,
  `applicant_relation_name` VARCHAR(255) DEFAULT NULL,
  `relation_type` VARCHAR(64) DEFAULT NULL,
  `relation_name` VARCHAR(255) DEFAULT NULL,
  `entries` LONGTEXT DEFAULT NULL,
  `signer_name` VARCHAR(255) DEFAULT NULL,
  `signer_designation` VARCHAR(128) DEFAULT NULL,
  `applicant_name` VARCHAR(255) DEFAULT NULL,
  `applicant_address` TEXT DEFAULT NULL,
  `applicant_citizenship_no` VARCHAR(64) DEFAULT NULL,
  `applicant_phone` VARCHAR(32) DEFAULT NULL,
  `notes` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `onsite_inspection_recommendation` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `letter_no` VARCHAR(64) DEFAULT NULL,
  `chalani_no` VARCHAR(64) DEFAULT NULL,
  `date_nep` VARCHAR(32) DEFAULT NULL,
  `addressee_name` VARCHAR(255) DEFAULT NULL,
  `addressee_line2` VARCHAR(255) DEFAULT NULL,
  `previous_municipality` VARCHAR(255) DEFAULT NULL,
  `previous_type` VARCHAR(32) DEFAULT NULL,
  `previous_ward_no` VARCHAR(16) DEFAULT NULL,
  `applicant_name` VARCHAR(255) DEFAULT NULL,
  `applicant_current_municipality` VARCHAR(255) DEFAULT NULL,
  `applicant_current_ward_no` VARCHAR(16) DEFAULT NULL,
  `plot_prev_municipality` VARCHAR(255) DEFAULT NULL,
  `plot_prev_ward_no` VARCHAR(16) DEFAULT NULL,
  `plot_details` TEXT DEFAULT NULL,
  `signer_name` VARCHAR(255) DEFAULT NULL,
  `signer_designation` VARCHAR(128) DEFAULT NULL,
  `applicant_address` TEXT DEFAULT NULL,
  `applicant_citizenship_no` VARCHAR(64) DEFAULT NULL,
  `applicant_phone` VARCHAR(32) DEFAULT NULL,
  `notes` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `partial_house_construction_completed_certificate` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `letter_no` VARCHAR(64) DEFAULT NULL,
  `chalani_no` VARCHAR(64) DEFAULT NULL,
  `date_nep` VARCHAR(32) DEFAULT NULL,
  `municipality_text` VARCHAR(255) DEFAULT NULL,
  `ward_no` VARCHAR(16) DEFAULT NULL,
  `resident_name` VARCHAR(255) DEFAULT NULL,
  `previous_place_text` VARCHAR(255) DEFAULT NULL,
  `previous_place_type` VARCHAR(64) DEFAULT NULL,
  `previous_ward_no` VARCHAR(16) DEFAULT NULL,
  `plot_number` VARCHAR(64) DEFAULT NULL,
  `area` VARCHAR(64) DEFAULT NULL,
  `floors_approved` VARCHAR(64) DEFAULT NULL,
  `completion_date` VARCHAR(32) DEFAULT NULL,
  `completion_type` VARCHAR(32) DEFAULT NULL,
  `signer_name` VARCHAR(255) DEFAULT NULL,
  `signer_designation` VARCHAR(128) DEFAULT NULL,
  `applicant_name` VARCHAR(255) DEFAULT NULL,
  `applicant_address` TEXT DEFAULT NULL,
  `applicant_citizenship_no` VARCHAR(64) DEFAULT NULL,
  `applicant_phone` VARCHAR(32) DEFAULT NULL,
  `notes` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `peski_anurodh_sifaris` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `letter_no` VARCHAR(64) DEFAULT NULL,
  `chalani_no` VARCHAR(64) DEFAULT NULL,
  `date_nep` VARCHAR(32) DEFAULT NULL,
  `budget_year` VARCHAR(32) DEFAULT NULL,
  `budget_head_title` VARCHAR(255) DEFAULT NULL,
  `budget_head_number` VARCHAR(128) DEFAULT NULL,
  `operation_or_program` VARCHAR(64) DEFAULT NULL,
  `total_amount` VARCHAR(64) DEFAULT NULL,
  `requested_amount` VARCHAR(64) DEFAULT NULL,
  `amount_in_words` TEXT DEFAULT NULL,
  `signer_name` VARCHAR(255) DEFAULT NULL,
  `signer_designation` VARCHAR(128) DEFAULT NULL,
  `applicant_name` VARCHAR(255) DEFAULT NULL,
  `applicant_address` TEXT DEFAULT NULL,
  `applicant_citizenship_no` VARCHAR(64) DEFAULT NULL,
  `applicant_phone` VARCHAR(32) DEFAULT NULL,
  `notes` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `property_owner_certificate_copy_recommendation` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `letter_no` VARCHAR(64) DEFAULT NULL,
  `chalani_no` VARCHAR(64) DEFAULT NULL,
  `date_nep` VARCHAR(32) DEFAULT NULL,
  `addressee_office` VARCHAR(128) DEFAULT NULL,
  `addressee_place` VARCHAR(255) DEFAULT NULL,
  `owner_prefix` VARCHAR(32) DEFAULT NULL,
  `owner_name` VARCHAR(255) DEFAULT NULL,
  `previous_muni_name` VARCHAR(255) DEFAULT NULL,
  `previous_muni_type` VARCHAR(64) DEFAULT NULL,
  `previous_ward_no` VARCHAR(16) DEFAULT NULL,
  `plot_no` VARCHAR(64) DEFAULT NULL,
  `area` VARCHAR(64) DEFAULT NULL,
  `request_district` VARCHAR(255) DEFAULT NULL,
  `request_local_body` VARCHAR(255) DEFAULT NULL,
  `request_local_body_type` VARCHAR(64) DEFAULT NULL,
  `request_local_body_ward_no` VARCHAR(16) DEFAULT NULL,
  `certificates` LONGTEXT DEFAULT NULL,
  `footer_applicants` LONGTEXT DEFAULT NULL,
  `signer_name` VARCHAR(255) DEFAULT NULL,
  `signer_designation` VARCHAR(128) DEFAULT NULL,
  `notes` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `property_owner_certificate_house_maintain_recommendation` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `letter_no` VARCHAR(64) DEFAULT NULL,
  `chalani_no` VARCHAR(64) DEFAULT NULL,
  `date_nep` VARCHAR(32) DEFAULT NULL,
  `applicant_type` VARCHAR(32) DEFAULT NULL,
  `previous_place_text` VARCHAR(255) DEFAULT NULL,
  `previous_place_type` VARCHAR(64) DEFAULT NULL,
  `previous_ward_no` VARCHAR(16) DEFAULT NULL,
  `plot_number` VARCHAR(64) DEFAULT NULL,
  `area` VARCHAR(64) DEFAULT NULL,
  `signer_name` VARCHAR(255) DEFAULT NULL,
  `signer_designation` VARCHAR(128) DEFAULT NULL,
  `applicant_name` VARCHAR(255) DEFAULT NULL,
  `applicant_address` TEXT DEFAULT NULL,
  `applicant_citizenship_no` VARCHAR(64) DEFAULT NULL,
  `applicant_phone` VARCHAR(32) DEFAULT NULL,
  `notes` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `property_ownership_transfer_kitani` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `letter_no` VARCHAR(64) DEFAULT NULL,
  `chalani_no` VARCHAR(64) DEFAULT NULL,
  `date_nep` VARCHAR(32) DEFAULT NULL,
  `addressee_place` VARCHAR(255) DEFAULT NULL,
  `previous_type` VARCHAR(64) DEFAULT NULL,
  `previous_ward_no` VARCHAR(16) DEFAULT NULL,
  `current_ward_no` VARCHAR(16) DEFAULT NULL,
  `deceased_person_name` VARCHAR(255) DEFAULT NULL,
  `deceased_person_relation` VARCHAR(64) DEFAULT NULL,
  `deceased_person_spouse` VARCHAR(255) DEFAULT NULL,
  `deceased_death_date` VARCHAR(32) DEFAULT NULL,
  `deceased_prev_type` VARCHAR(64) DEFAULT NULL,
  `deceased_prev_ward_no` VARCHAR(16) DEFAULT NULL,
  `plot_no` VARCHAR(64) DEFAULT NULL,
  `jb_no` VARCHAR(64) DEFAULT NULL,
  `jb_area` VARCHAR(64) DEFAULT NULL,
  `deceased_heirs` LONGTEXT DEFAULT NULL,
  `living_heirs` LONGTEXT DEFAULT NULL,
  `transfer_heirs` LONGTEXT DEFAULT NULL,
  `sarjimin_village_no` VARCHAR(32) DEFAULT NULL,
  `sarjimin_ward_no` VARCHAR(32) DEFAULT NULL,
  `sarjimin_year` VARCHAR(32) DEFAULT NULL,
  `sarjimin_extra` TEXT DEFAULT NULL,
  `signature_name` VARCHAR(255) DEFAULT NULL,
  `signature_designation` VARCHAR(128) DEFAULT NULL,
  `applicant_name` VARCHAR(255) DEFAULT NULL,
  `applicant_address` TEXT DEFAULT NULL,
  `applicant_citizenship_no` VARCHAR(64) DEFAULT NULL,
  `applicant_phone` VARCHAR(32) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `property_ownership_transfer_recommendation` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `letter_no` VARCHAR(64) DEFAULT NULL,
  `chalani_no` VARCHAR(64) DEFAULT NULL,
  `date_nep` VARCHAR(32) DEFAULT NULL,
  `previous_type` VARCHAR(64) DEFAULT NULL,
  `previous_ward_no` VARCHAR(16) DEFAULT NULL,
  `current_local` VARCHAR(128) DEFAULT NULL,
  `current_municipality` VARCHAR(128) DEFAULT NULL,
  `current_ward_no` VARCHAR(16) DEFAULT NULL,
  `deceased_indicator` VARCHAR(255) DEFAULT NULL,
  `applicant_prefix` VARCHAR(32) DEFAULT NULL,
  `applicant_name` VARCHAR(255) DEFAULT NULL,
  `requested_by` VARCHAR(255) DEFAULT NULL,
  `other_heirs` LONGTEXT DEFAULT NULL,
  `property_details` LONGTEXT DEFAULT NULL,
  `signature_name` VARCHAR(255) DEFAULT NULL,
  `signature_designation` VARCHAR(128) DEFAULT NULL,
  `applicant_address` TEXT DEFAULT NULL,
  `applicant_citizenship_no` VARCHAR(64) DEFAULT NULL,
  `applicant_phone` VARCHAR(32) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `property_verification_recommendation` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `letter_no` VARCHAR(64) DEFAULT NULL,
  `chalani_no` VARCHAR(64) DEFAULT NULL,
  `date_nep` VARCHAR(32) DEFAULT NULL,
  `prev_district` VARCHAR(128) DEFAULT NULL,
  `prev_type` VARCHAR(64) DEFAULT NULL,
  `prev_ward_no` VARCHAR(16) DEFAULT NULL,
  `resident_local` VARCHAR(128) DEFAULT NULL,
  `resident_ward_no` VARCHAR(16) DEFAULT NULL,
  `applicant_relation_prefix` VARCHAR(32) DEFAULT NULL,
  `applicant_relation_name` VARCHAR(255) DEFAULT NULL,
  `applicant_child_prefix` VARCHAR(32) DEFAULT NULL,
  `applicant_child_name` VARCHAR(255) DEFAULT NULL,
  `house_present` VARCHAR(32) DEFAULT NULL,
  `house_type` VARCHAR(64) DEFAULT NULL,
  `length` VARCHAR(64) DEFAULT NULL,
  `length_unit` VARCHAR(16) DEFAULT NULL,
  `width` VARCHAR(64) DEFAULT NULL,
  `width_unit` VARCHAR(16) DEFAULT NULL,
  `additional_measure_1` VARCHAR(128) DEFAULT NULL,
  `additional_measure_2` VARCHAR(128) DEFAULT NULL,
  `road_included` VARCHAR(64) DEFAULT NULL,
  `tapashil` LONGTEXT DEFAULT NULL,   -- JSON string of rows
  `signature_name` VARCHAR(255) DEFAULT NULL,
  `signature_designation` VARCHAR(128) DEFAULT NULL,
  `applicant_name` VARCHAR(255) DEFAULT NULL,
  `applicant_address` TEXT DEFAULT NULL,
  `applicant_citizenship_no` VARCHAR(64) DEFAULT NULL,
  `applicant_phone` VARCHAR(32) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `bhawan_nirman_sampanna` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `date_nep` VARCHAR(32) DEFAULT NULL,
  `owner_name` VARCHAR(255) DEFAULT NULL,
  `municipality` VARCHAR(128) DEFAULT NULL,
  `ward_no` VARCHAR(16) DEFAULT NULL,
  `tole` VARCHAR(255) DEFAULT NULL,
  `construction_note` VARCHAR(512) DEFAULT NULL,
  `land_prev_local` VARCHAR(255) DEFAULT NULL,
  `land_prev_ward` VARCHAR(32) DEFAULT NULL,
  `land_prev_halqa` VARCHAR(255) DEFAULT NULL,
  `land_tol` VARCHAR(255) DEFAULT NULL,
  `land_kitta` VARCHAR(64) DEFAULT NULL,
  `land_area` VARCHAR(64) DEFAULT NULL,
  `land_region` VARCHAR(128) DEFAULT NULL,
  `land_subregion` VARCHAR(128) DEFAULT NULL,
  `boundary_east` VARCHAR(255) DEFAULT NULL,
  `boundary_west` VARCHAR(255) DEFAULT NULL,
  `boundary_north` VARCHAR(255) DEFAULT NULL,
  `boundary_south` VARCHAR(255) DEFAULT NULL,
  `land_owner` VARCHAR(255) DEFAULT NULL,
  `house_owner` VARCHAR(255) DEFAULT NULL,
  `owner_parent` VARCHAR(255) DEFAULT NULL,
  `construction_type` VARCHAR(255) DEFAULT NULL,
  `map_pass_no` VARCHAR(128) DEFAULT NULL,
  `map_pass_date` VARCHAR(32) DEFAULT NULL,
  `regularized_date` VARCHAR(32) DEFAULT NULL,
  `regularized_floor_count` VARCHAR(32) DEFAULT NULL,
  `purpose` VARCHAR(255) DEFAULT NULL,
  `floor_details` LONGTEXT DEFAULT NULL,  -- JSON string
  `height` VARCHAR(64) DEFAULT NULL,
  `setback_distance` VARCHAR(64) DEFAULT NULL,
  `setback_value` VARCHAR(64) DEFAULT NULL,
  `electric_distance` VARCHAR(64) DEFAULT NULL,
  `electric_left` VARCHAR(64) DEFAULT NULL,
  `electric_volt` VARCHAR(64) DEFAULT NULL,
  `river_distance` VARCHAR(64) DEFAULT NULL,
  `river_left` VARCHAR(64) DEFAULT NULL,
  `river_name` VARCHAR(255) DEFAULT NULL,
  `septic` TEXT DEFAULT NULL,
  `remarks` TEXT DEFAULT NULL,
  `transfers1` LONGTEXT DEFAULT NULL, -- JSON string
  `transfers2` LONGTEXT DEFAULT NULL, -- JSON string
  `applicant_name` VARCHAR(255) DEFAULT NULL,
  `applicant_address` TEXT DEFAULT NULL,
  `applicant_citizenship_no` VARCHAR(64) DEFAULT NULL,
  `applicant_phone` VARCHAR(32) DEFAULT NULL,
  `signature_owner` VARCHAR(255) DEFAULT NULL,
  `signature_faatwala` VARCHAR(255) DEFAULT NULL,
  `signature_inspector` VARCHAR(255) DEFAULT NULL,
  `signature_engineer` VARCHAR(255) DEFAULT NULL,
  `signature_issuer` VARCHAR(255) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS consumer_committee_registrations (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  sn VARCHAR(32) DEFAULT NULL,
  reg_no VARCHAR(64) DEFAULT NULL,
  committee_name VARCHAR(255) DEFAULT NULL,
  reg_date DATE DEFAULT NULL,
  owner_name VARCHAR(255) DEFAULT NULL,
  address TEXT DEFAULT NULL,
  phone VARCHAR(64) DEFAULT NULL,
  notes TEXT DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_reg_no (reg_no),
  INDEX idx_committee_name (committee_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS dclass_construction_business_licenses (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  license_no VARCHAR(64) DEFAULT NULL,
  fiscal_year VARCHAR(32) DEFAULT NULL,
  issue_date DATE DEFAULT NULL,
  business_name VARCHAR(255) DEFAULT NULL,
  office_address TEXT DEFAULT NULL,
  firm_or_company VARCHAR(255) DEFAULT NULL,
  applicant_name VARCHAR(255) DEFAULT NULL,
  applicant_address TEXT DEFAULT NULL,
  applicant_citizenship_no VARCHAR(128) DEFAULT NULL,
  applicant_phone VARCHAR(64) DEFAULT NULL,
  signatory_name VARCHAR(255) DEFAULT NULL,
  signatory_position VARCHAR(255) DEFAULT NULL,
  signatory_seal VARCHAR(255) DEFAULT NULL,
  signatory_date DATE DEFAULT NULL,
  notes TEXT DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_license_no (license_no)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS drinking_water_committees (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  reg_no VARCHAR(64) DEFAULT NULL,
  reg_date DATE DEFAULT NULL,
  committee_name VARCHAR(255) DEFAULT NULL,
  committee_location VARCHAR(255) DEFAULT NULL,
  reference_date DATE DEFAULT NULL,        -- the date referenced in paragraph (if any)
  water_source_name VARCHAR(255) DEFAULT NULL,
  water_source_east VARCHAR(255) DEFAULT NULL,
  water_source_north VARCHAR(255) DEFAULT NULL,
  water_source_west VARCHAR(255) DEFAULT NULL,
  water_source_south VARCHAR(255) DEFAULT NULL,
  water_use_description TEXT DEFAULT NULL,
  water_result_description TEXT DEFAULT NULL,
  service_type VARCHAR(255) DEFAULT NULL,
  service_area VARCHAR(255) DEFAULT NULL,
  beneficiary_info VARCHAR(255) DEFAULT NULL,
  future_expansion_info VARCHAR(255) DEFAULT NULL,
  signatory_name VARCHAR(255) DEFAULT NULL,
  signatory_designation VARCHAR(128) DEFAULT NULL,
  applicant_name VARCHAR(255) DEFAULT NULL,
  applicant_address TEXT DEFAULT NULL,
  applicant_citizenship_no VARCHAR(128) DEFAULT NULL,
  applicant_phone VARCHAR(64) DEFAULT NULL,
  notes TEXT DEFAULT NULL,
  INDEX idx_reg_no (reg_no),
  INDEX idx_committee_name (committee_name(100))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS farmer_group_committees (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  reg_no VARCHAR(64) DEFAULT NULL,
  reg_date DATE DEFAULT NULL,
  group_name VARCHAR(255) DEFAULT NULL,
  address TEXT DEFAULT NULL,
  purpose VARCHAR(255) DEFAULT NULL,
  main_activity VARCHAR(255) DEFAULT NULL,
  service_area VARCHAR(255) DEFAULT NULL,
  authority_name VARCHAR(255) DEFAULT NULL,
  authority_position VARCHAR(128) DEFAULT NULL,
  signature TEXT DEFAULT NULL,
  signing_date DATE DEFAULT NULL,
  applicant_name VARCHAR(255) DEFAULT NULL,
  applicant_address TEXT DEFAULT NULL,
  applicant_citizenship_no VARCHAR(128) DEFAULT NULL,
  applicant_phone VARCHAR(64) DEFAULT NULL,
  notes TEXT DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_reg_no (reg_no),
  INDEX idx_group_name (group_name(100))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS passbook_construction_works (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  reg_date DATE DEFAULT NULL,
  business_name VARCHAR(255) DEFAULT NULL,
  owner_name VARCHAR(255) DEFAULT NULL,
  phone VARCHAR(64) DEFAULT NULL,
  work_description TEXT DEFAULT NULL,
  remarks TEXT DEFAULT NULL,
  scan_filename VARCHAR(255) DEFAULT NULL,   -- store filename or uploaded file URL
  notes TEXT DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_business_name (business_name(100)),
  INDEX idx_owner_name (owner_name(100))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- pages/MRP
CREATE TABLE IF NOT EXISTS passport_recommendations (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  letter_no VARCHAR(128) DEFAULT NULL,
  ref_no VARCHAR(128) DEFAULT NULL,
  date_of_letter DATE DEFAULT NULL,
  day_text VARCHAR(255) DEFAULT NULL,
  header_to VARCHAR(255) DEFAULT NULL,
  header_district VARCHAR(128) DEFAULT NULL,
  main_district VARCHAR(128) DEFAULT NULL,
  prev_location_type VARCHAR(64) DEFAULT NULL,
  prev_ward_no VARCHAR(32) DEFAULT NULL,
  current_municipality VARCHAR(255) DEFAULT NULL,
  current_ward_no VARCHAR(32) DEFAULT NULL,
  resident_address_type VARCHAR(64) DEFAULT NULL,
  resident_district VARCHAR(128) DEFAULT NULL,
  citizen_issue_date DATE DEFAULT NULL,
  citizen_no VARCHAR(128) DEFAULT NULL,
  applicant_name VARCHAR(255) DEFAULT NULL,
  designation VARCHAR(128) DEFAULT NULL,
  detail_applicant_name VARCHAR(255) DEFAULT NULL,
  detail_applicant_address TEXT DEFAULT NULL,
  detail_applicant_citizenship VARCHAR(128) DEFAULT NULL,
  detail_applicant_phone VARCHAR(64) DEFAULT NULL,
  notes TEXT DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_letter_no (letter_no),
  INDEX idx_applicant_name (applicant_name(100))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
 
 -- pages/nepali-citizenship
 CREATE TABLE IF NOT EXISTS citizenship_angkrits (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  reg_no VARCHAR(64) DEFAULT NULL,
  reg_date DATE DEFAULT NULL,
  target_group VARCHAR(128) DEFAULT NULL,
  applicant_name VARCHAR(255) DEFAULT NULL,
  father_name VARCHAR(255) DEFAULT NULL,
  mother_name VARCHAR(255) DEFAULT NULL,
  gender VARCHAR(32) DEFAULT NULL,
  birth_date DATE DEFAULT NULL,
  age_reach_date DATE DEFAULT NULL,
  address TEXT DEFAULT NULL,
  issue_district VARCHAR(128) DEFAULT NULL,
  citizenship_no VARCHAR(128) DEFAULT NULL,
  contact_phone VARCHAR(64) DEFAULT NULL,
  signature_text TEXT DEFAULT NULL,
  decision_date DATE DEFAULT NULL,
  allowance_type VARCHAR(128) DEFAULT NULL,
  id_card_no VARCHAR(128) DEFAULT NULL,
  allowance_start_fy VARCHAR(32) DEFAULT NULL,
  allowance_quarter VARCHAR(32) DEFAULT NULL,
  notes TEXT DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_applicant_name (applicant_name(100)),
  INDEX idx_citizenship_no (citizenship_no)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS citizenship_certificate_recommendations (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  full_name_np VARCHAR(255) DEFAULT NULL,
  full_name_en VARCHAR(255) DEFAULT NULL,
  sex VARCHAR(32) DEFAULT NULL,
  dob_bs VARCHAR(32) DEFAULT NULL,
  dob_ad DATE DEFAULT NULL,
  birth_district_np VARCHAR(128) DEFAULT NULL,
  birth_municipality_np VARCHAR(128) DEFAULT NULL,
  birth_ward_np VARCHAR(32) DEFAULT NULL,
  birth_district_en VARCHAR(128) DEFAULT NULL,
  birth_municipality_en VARCHAR(128) DEFAULT NULL,
  birth_ward_en VARCHAR(32) DEFAULT NULL,
  permanent_district_np VARCHAR(128) DEFAULT NULL,
  permanent_municipality_np VARCHAR(128) DEFAULT NULL,
  permanent_ward_np VARCHAR(32) DEFAULT NULL,
  grandfather_name VARCHAR(255) DEFAULT NULL,
  grandfather_relation VARCHAR(128) DEFAULT NULL,
  father_name VARCHAR(255) DEFAULT NULL,
  father_address TEXT DEFAULT NULL,
  father_citizenship_no VARCHAR(128) DEFAULT NULL,
  husband_name VARCHAR(255) DEFAULT NULL,
  husband_address TEXT DEFAULT NULL,
  husband_citizenship_no VARCHAR(128) DEFAULT NULL,
  mother_name VARCHAR(255) DEFAULT NULL,
  mother_citizenship_no VARCHAR(128) DEFAULT NULL,
  witness_name VARCHAR(255) DEFAULT NULL,
  witness_address TEXT DEFAULT NULL,
  witness_citizenship_no VARCHAR(128) DEFAULT NULL,
  witness_signature VARCHAR(255) DEFAULT NULL,
  declaration_text TEXT DEFAULT NULL,
  recommender_name VARCHAR(255) DEFAULT NULL,
  recommender_designation VARCHAR(128) DEFAULT NULL,
  recommender_date DATE DEFAULT NULL,
  applicant_name VARCHAR(255) DEFAULT NULL,
  applicant_address TEXT DEFAULT NULL,
  applicant_citizenship_no VARCHAR(128) DEFAULT NULL,
  applicant_phone VARCHAR(64) DEFAULT NULL,
  notes TEXT DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_applicant_name (applicant_name(100)),
  INDEX idx_applicant_citizenship (applicant_citizenship_no)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS citizenship_certificate_copies (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  prpn_no VARCHAR(128) DEFAULT NULL,
  issue_district VARCHAR(128) DEFAULT NULL,
  issue_date DATE DEFAULT NULL,
  certificate_type VARCHAR(64) DEFAULT NULL,
  full_name_np VARCHAR(255) DEFAULT NULL,
  full_name_en VARCHAR(255) DEFAULT NULL,
  sex VARCHAR(32) DEFAULT NULL,
  dob_bs VARCHAR(32) DEFAULT NULL,
  dob_ad DATE DEFAULT NULL,
  permanent_address TEXT DEFAULT NULL,
  temporary_address TEXT DEFAULT NULL,
  municipality VARCHAR(128) DEFAULT NULL,
  ward_no VARCHAR(32) DEFAULT NULL,
  tol VARCHAR(128) DEFAULT NULL,
  father_name VARCHAR(255) DEFAULT NULL,
  father_dob_bs VARCHAR(32) DEFAULT NULL,
  father_relation VARCHAR(128) DEFAULT NULL,
  father_address TEXT DEFAULT NULL,
  father_citizenship_no VARCHAR(128) DEFAULT NULL,
  husband_name VARCHAR(255) DEFAULT NULL,
  husband_address TEXT DEFAULT NULL,
  husband_citizenship_no VARCHAR(128) DEFAULT NULL,
  mother_name VARCHAR(255) DEFAULT NULL,
  mother_citizenship_no VARCHAR(128) DEFAULT NULL,
  grandfather_name VARCHAR(255) DEFAULT NULL,
  grandfather_relation VARCHAR(128) DEFAULT NULL,
  recommender_name VARCHAR(255) DEFAULT NULL,
  recommender_position VARCHAR(128) DEFAULT NULL,
  witness_name VARCHAR(255) DEFAULT NULL,
  witness_relation VARCHAR(128) DEFAULT NULL,
  reason_for_copy TEXT DEFAULT NULL,
  office_recommendation TEXT DEFAULT NULL,
  recommender_date DATE DEFAULT NULL,
  applicant_name VARCHAR(255) DEFAULT NULL,
  applicant_address TEXT DEFAULT NULL,
  applicant_citizenship_no VARCHAR(128) DEFAULT NULL,
  applicant_phone VARCHAR(64) DEFAULT NULL,
  notes TEXT DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_prpn_no (prpn_no),
  INDEX idx_applicant_citizenship (applicant_citizenship_no)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS citizenship_mujulkas (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  municipality VARCHAR(255) DEFAULT NULL,
  district VARCHAR(128) DEFAULT NULL,
  ward_no VARCHAR(32) DEFAULT NULL,
  written_date DATE DEFAULT NULL,
  permanent_place VARCHAR(255) DEFAULT NULL,
  previous_local_unit VARCHAR(255) DEFAULT NULL,
  applicant_name VARCHAR(255) DEFAULT NULL,
  applicant_citizenship_no VARCHAR(128) DEFAULT NULL,
  applicant_address TEXT DEFAULT NULL,
  table_rows JSON DEFAULT NULL,
  signer_district VARCHAR(128) DEFAULT NULL,
  signer_local_unit VARCHAR(255) DEFAULT NULL,
  signer_role VARCHAR(128) DEFAULT NULL,
  footer_date DATE DEFAULT NULL,
  footer_role_person VARCHAR(255) DEFAULT NULL,
  footer_signature VARCHAR(255) DEFAULT NULL,
  notes TEXT DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_applicant_name (applicant_name(100)),
  INDEX idx_applicant_citizenship (applicant_citizenship_no)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS citizenship_proof_copy_requests (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  letter_no VARCHAR(64) DEFAULT NULL,
  reference_no VARCHAR(128) DEFAULT NULL,
  date DATE DEFAULT NULL,
  recipient_name VARCHAR(255) DEFAULT NULL,
  recipient_address VARCHAR(255) DEFAULT NULL,
  recipient_district VARCHAR(128) DEFAULT NULL,
  municipality VARCHAR(128) DEFAULT NULL,
  ward_no VARCHAR(32) DEFAULT NULL,
  permanent_municipality VARCHAR(128) DEFAULT NULL,
  permanent_ward VARCHAR(32) DEFAULT NULL,
  applicant_relation_to VARCHAR(255) DEFAULT NULL,
  applicant_name VARCHAR(255) DEFAULT NULL,
  applicant_relation_title VARCHAR(64) DEFAULT NULL,
  subject_prpn_no VARCHAR(128) DEFAULT NULL,
  subject_issue_district VARCHAR(128) DEFAULT NULL,
  subject_issue_date DATE DEFAULT NULL,
  certificate_kind VARCHAR(64) DEFAULT NULL,
  permanent_address TEXT DEFAULT NULL,
  temporary_address TEXT DEFAULT NULL,
  municipality_name VARCHAR(128) DEFAULT NULL,
  ward_number VARCHAR(32) DEFAULT NULL,
  tol VARCHAR(128) DEFAULT NULL,
  father_name VARCHAR(255) DEFAULT NULL,
  father_dob_bs VARCHAR(32) DEFAULT NULL,
  father_relation VARCHAR(128) DEFAULT NULL,
  mother_name VARCHAR(255) DEFAULT NULL,
  mother_name_citizenship VARCHAR(128) DEFAULT NULL,
  recommender_name VARCHAR(255) DEFAULT NULL,
  recommender_position VARCHAR(128) DEFAULT NULL,
  recommender_date DATE DEFAULT NULL,
  applicant_name_footer VARCHAR(255) DEFAULT NULL,
  applicant_address_footer TEXT DEFAULT NULL,
  applicant_citizenship_no VARCHAR(128) DEFAULT NULL,
  applicant_phone VARCHAR(64) DEFAULT NULL,
  notes TEXT DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_citizenship_no (applicant_citizenship_no),
  INDEX idx_subject (subject_prpn_no)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS citizenship_recommendations (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  letter_no VARCHAR(64) DEFAULT NULL,
  reference_no VARCHAR(128) DEFAULT NULL,
  date DATE DEFAULT NULL,
  recipient_office VARCHAR(255) DEFAULT NULL,
  recipient_district VARCHAR(128) DEFAULT NULL,
  husband_name VARCHAR(255) DEFAULT NULL,
  husband_prpn_no VARCHAR(128) DEFAULT NULL,
  father_name VARCHAR(255) DEFAULT NULL,
  mother_name VARCHAR(255) DEFAULT NULL,
  permanent_local_unit VARCHAR(255) DEFAULT NULL,
  ward_no VARCHAR(32) DEFAULT NULL,
  local_citizenship_type VARCHAR(128) DEFAULT NULL,
  marriage_date DATE DEFAULT NULL,
  local_witness_citizenship_type VARCHAR(128) DEFAULT NULL,
  relation_to_recommendee VARCHAR(128) DEFAULT NULL,
  local_second_name VARCHAR(255) DEFAULT NULL,
  photo_filename VARCHAR(255) DEFAULT NULL,
  recommender_name VARCHAR(255) DEFAULT NULL,
  recommender_position VARCHAR(128) DEFAULT NULL,
  recommender_date DATE DEFAULT NULL,
  signatory_name VARCHAR(255) DEFAULT NULL,
  signatory_date DATE DEFAULT NULL,
  signatory_position VARCHAR(128) DEFAULT NULL,
  applicant_name VARCHAR(255) DEFAULT NULL,
  applicant_address TEXT DEFAULT NULL,
  applicant_citizenship_no VARCHAR(128) DEFAULT NULL,
  applicant_phone VARCHAR(64) DEFAULT NULL,
  notes TEXT DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_applicant_citizenship (applicant_citizenship_no),
  INDEX idx_husband_prpn (husband_prpn_no)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS citizenship_recommendation_husband_details (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  letter_no VARCHAR(64) DEFAULT NULL,
  reference_no VARCHAR(128) DEFAULT NULL,
  date DATE DEFAULT NULL,
  pre_marriage_district VARCHAR(128) DEFAULT NULL,
  pre_marriage_office VARCHAR(255) DEFAULT NULL,
  pre_marriage_ward VARCHAR(32) DEFAULT NULL,
  pre_marriage_prpn_no VARCHAR(128) DEFAULT NULL,
  marriage_district VARCHAR(128) DEFAULT NULL,
  marriage_municipality VARCHAR(255) DEFAULT NULL,
  marriage_ward VARCHAR(32) DEFAULT NULL,
  marriage_date DATE DEFAULT NULL,
  applicant_title VARCHAR(32) DEFAULT NULL,
  applicant_name VARCHAR(255) DEFAULT NULL,
  wife_name VARCHAR(255) DEFAULT NULL,
  husband_name VARCHAR(255) DEFAULT NULL,
  husband_address TEXT DEFAULT NULL,
  recommender_name VARCHAR(255) DEFAULT NULL,
  recommender_position VARCHAR(128) DEFAULT NULL,
  recommender_date DATE DEFAULT NULL,
  signatory_name VARCHAR(255) DEFAULT NULL,
  signatory_position VARCHAR(128) DEFAULT NULL,
  applicant_name_footer VARCHAR(255) DEFAULT NULL,
  applicant_address_footer TEXT DEFAULT NULL,
  applicant_citizenship_no VARCHAR(128) DEFAULT NULL,
  applicant_phone VARCHAR(64) DEFAULT NULL,
  notes TEXT DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_applicant_citizenship (applicant_citizenship_no),
  INDEX idx_pre_prpn (pre_marriage_prpn_no)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS sthalagat_sarjimin_mujulkas (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  letter_date DATE DEFAULT NULL,
  district VARCHAR(128) DEFAULT NULL,
  office VARCHAR(255) DEFAULT NULL,
  municipality VARCHAR(128) DEFAULT NULL,
  ward_no VARCHAR(32) DEFAULT NULL,
  applicant_title VARCHAR(32) DEFAULT NULL,
  applicant_name VARCHAR(255) DEFAULT NULL,
  claim_reason TEXT DEFAULT NULL,
  certificate_details TEXT DEFAULT NULL,
  tapsil TEXT DEFAULT NULL,         -- stores JSON string of rows
  signatory_name VARCHAR(255) DEFAULT NULL,
  signatory_position VARCHAR(128) DEFAULT NULL,
  signatory_date DATE DEFAULT NULL,
  applicant_name_footer VARCHAR(255) DEFAULT NULL,
  applicant_address_footer TEXT DEFAULT NULL,
  applicant_citizenship_no VARCHAR(128) DEFAULT NULL,
  applicant_phone VARCHAR(64) DEFAULT NULL,
  notes TEXT DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_applicant_citizenship (applicant_citizenship_no)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- pages/official-use
CREATE TABLE IF NOT EXISTS acting_ward_officer_assigned_records (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  letter_no VARCHAR(64) DEFAULT NULL,
  reference_no VARCHAR(64) DEFAULT NULL,
  date DATE DEFAULT NULL,
  subject VARCHAR(255) DEFAULT NULL,
  assigned_member_name VARCHAR(255) DEFAULT NULL,
  assigned_member_address VARCHAR(255) DEFAULT NULL,
  assigned_ward_no VARCHAR(32) DEFAULT NULL,
  assign_from_date DATE DEFAULT NULL,
  assign_to_date DATE DEFAULT NULL,
  bodartha_text TEXT DEFAULT NULL,
  signatory_name VARCHAR(255) DEFAULT NULL,
  signatory_position VARCHAR(255) DEFAULT NULL,
  applicant_name_footer VARCHAR(255) DEFAULT NULL,
  applicant_address_footer TEXT DEFAULT NULL,
  applicant_citizenship_no VARCHAR(128) DEFAULT NULL,
  applicant_phone VARCHAR(64) DEFAULT NULL,
  notes TEXT DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS inter_local_transfer_recommendations (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  letter_no VARCHAR(64) DEFAULT NULL,
  reference_no VARCHAR(64) DEFAULT NULL,
  date DATE DEFAULT NULL,
  subject VARCHAR(255) DEFAULT NULL,
  requested_person_name VARCHAR(255) DEFAULT NULL,
  requested_person_position VARCHAR(255) DEFAULT NULL,
  requested_person_position_code VARCHAR(64) DEFAULT NULL,
  transfer_to_local VARCHAR(255) DEFAULT NULL,
  transfer_to_position VARCHAR(255) DEFAULT NULL,
  employee_name VARCHAR(255) DEFAULT NULL,
  employee_post_title VARCHAR(255) DEFAULT NULL,
  service_group VARCHAR(255) DEFAULT NULL,
  appointing_local VARCHAR(255) DEFAULT NULL,
  transfer_local VARCHAR(255) DEFAULT NULL,
  permanent_address TEXT DEFAULT NULL,
  phone VARCHAR(64) DEFAULT NULL,
  dob DATE DEFAULT NULL,
  citizenship_no VARCHAR(128) DEFAULT NULL,
  citizenship_issue_date DATE DEFAULT NULL,
  citizenship_issue_district VARCHAR(128) DEFAULT NULL,
  signatory_name VARCHAR(255) DEFAULT NULL,
  signatory_position VARCHAR(255) DEFAULT NULL,
  applicant_name_footer VARCHAR(255) DEFAULT NULL,
  applicant_address_footer TEXT DEFAULT NULL,
  applicant_citizenship_no VARCHAR(128) DEFAULT NULL,
  applicant_phone VARCHAR(64) DEFAULT NULL,
  notes TEXT DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_citizenship_no (citizenship_no),
  INDEX idx_employee_name (employee_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS ramana_patras (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  letter_no VARCHAR(64) DEFAULT NULL,
  reference_no VARCHAR(64) DEFAULT NULL,
  date DATE DEFAULT NULL,
  addressee_name VARCHAR(255) DEFAULT NULL,
  addressee_line2 VARCHAR(255) DEFAULT NULL,
  decision_no VARCHAR(128) DEFAULT NULL,
  decision_date DATE DEFAULT NULL,
  permit_for VARCHAR(255) DEFAULT NULL,
  permit_quantity VARCHAR(128) DEFAULT NULL,
  contractor_name VARCHAR(255) DEFAULT NULL,
  contractor_contact VARCHAR(128) DEFAULT NULL,
  amount_total VARCHAR(128) DEFAULT NULL,
  amount_to_withdraw VARCHAR(128) DEFAULT NULL,
  amount_in_words TEXT DEFAULT NULL,
  deadline_days INT DEFAULT NULL,
  remarks TEXT DEFAULT NULL,
  signatory_name VARCHAR(255) DEFAULT NULL,
  signatory_position VARCHAR(128) DEFAULT NULL,
  applicant_name_footer VARCHAR(255) DEFAULT NULL,
  applicant_address_footer TEXT DEFAULT NULL,
  applicant_citizenship_no VARCHAR(128) DEFAULT NULL,
  applicant_phone VARCHAR(64) DEFAULT NULL,
  notes TEXT DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_applicant_citizenship (applicant_citizenship_no)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE notice_details (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  notice_no VARCHAR(100),
  issue_date DATE,
  approve_date DATE,
  type VARCHAR(100),
  purpose VARCHAR(255),
  subject VARCHAR(255),
  location VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS open_format_documents (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  letter_no VARCHAR(64) DEFAULT NULL,
  reference_no VARCHAR(64) DEFAULT NULL,
  date DATE DEFAULT NULL,
  subject VARCHAR(255) DEFAULT NULL,
  addressee_name VARCHAR(255) DEFAULT NULL,
  addressee_line2 VARCHAR(255) DEFAULT NULL,
  body_text LONGTEXT DEFAULT NULL,
  archive TINYINT DEFAULT 0,
  bodartha VARCHAR(255) DEFAULT NULL,
  signatory_name VARCHAR(255) DEFAULT NULL,
  signatory_position VARCHAR(128) DEFAULT NULL,
  applicant_name VARCHAR(255) DEFAULT NULL,
  applicant_address TEXT DEFAULT NULL,
  applicant_citizenship_no VARCHAR(128) DEFAULT NULL,
  applicant_phone VARCHAR(64) DEFAULT NULL,
  notes TEXT DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_letter_no (letter_no),
  INDEX idx_date (date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS nepali_language_recommendations (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  applicant_full_name VARCHAR(255) DEFAULT NULL,
  issued_date_ad DATE DEFAULT NULL,
  issued_date_nepali VARCHAR(64) DEFAULT NULL,
  issued_date_nepali_ascii VARCHAR(64) DEFAULT NULL,
  issue_district VARCHAR(128) DEFAULT NULL,
  sex VARCHAR(32) DEFAULT NULL,
  birth_date_ad DATE DEFAULT NULL,
  birth_date_nepali VARCHAR(64) DEFAULT NULL,
  birth_date_nepali_ascii VARCHAR(64) DEFAULT NULL,
  birth_place VARCHAR(255) DEFAULT NULL,
  permanent_district VARCHAR(128) DEFAULT NULL,
  permanent_municipality VARCHAR(255) DEFAULT NULL,
  permanent_ward VARCHAR(32) DEFAULT NULL,
  temporary_district VARCHAR(128) DEFAULT NULL,
  temporary_municipality VARCHAR(255) DEFAULT NULL,
  temporary_ward VARCHAR(32) DEFAULT NULL,
  father_name VARCHAR(255) DEFAULT NULL,
  mother_name VARCHAR(255) DEFAULT NULL,
  husband_name VARCHAR(255) DEFAULT NULL,
  angikrit_reason TEXT DEFAULT NULL,
  marriage_date_ad DATE DEFAULT NULL,
  marriage_date_nepali VARCHAR(64) DEFAULT NULL,
  marriage_date_nepali_ascii VARCHAR(64) DEFAULT NULL,
  notes TEXT DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_applicant_name (applicant_full_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS open_applications (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  letter_no VARCHAR(64) DEFAULT NULL,
  reference_no VARCHAR(128) DEFAULT NULL,
  date DATE DEFAULT NULL,
  subject TEXT DEFAULT NULL,
  addressee_name VARCHAR(255) DEFAULT NULL,
  addressee_line2 VARCHAR(255) DEFAULT NULL,
  body_text LONGTEXT DEFAULT NULL,
  signature_designation VARCHAR(128) DEFAULT NULL,
  applicant_name VARCHAR(255) DEFAULT NULL,
  applicant_address TEXT DEFAULT NULL,
  applicant_citizenship_no VARCHAR(128) DEFAULT NULL,
  applicant_phone VARCHAR(64) DEFAULT NULL,
  notes TEXT DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_letter_no (letter_no),
  INDEX idx_date (date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS open_format_tippani (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  date DATE DEFAULT NULL,
  addressee VARCHAR(255) DEFAULT NULL,
  subject VARCHAR(255) DEFAULT NULL,
  body_text LONGTEXT DEFAULT NULL,
  archive BOOLEAN DEFAULT 0,
  approve BOOLEAN DEFAULT 0,
  signature_name VARCHAR(255) DEFAULT NULL,
  signature_designation VARCHAR(255) DEFAULT NULL,
  applicant_name VARCHAR(255) DEFAULT NULL,
  applicant_address TEXT DEFAULT NULL,
  applicant_citizenship_no VARCHAR(128) DEFAULT NULL,
  applicant_phone VARCHAR(128) DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS partial_information (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  full_name_np VARCHAR(255) DEFAULT NULL,
  full_name_en VARCHAR(255) DEFAULT NULL,
  sex VARCHAR(32) DEFAULT NULL,
  dob_bs VARCHAR(32) DEFAULT NULL,        -- keep BS string if you want
  dob_ad DATE DEFAULT NULL,               -- store AD as DATE (ISO)
  birth_district_np VARCHAR(255) DEFAULT NULL,
  birth_municipality_np VARCHAR(255) DEFAULT NULL,
  birth_ward_np VARCHAR(64) DEFAULT NULL,
  birth_district_en VARCHAR(255) DEFAULT NULL,
  birth_municipality_en VARCHAR(255) DEFAULT NULL,
  birth_ward_en VARCHAR(64) DEFAULT NULL,
  permanent_district VARCHAR(255) DEFAULT NULL,
  permanent_municipality VARCHAR(255) DEFAULT NULL,
  permanent_ward VARCHAR(64) DEFAULT NULL,
  grandfather_name VARCHAR(255) DEFAULT NULL,
  grandfather_relation VARCHAR(128) DEFAULT NULL,
  father_name VARCHAR(255) DEFAULT NULL,
  father_address TEXT DEFAULT NULL,
  father_citizenship_no VARCHAR(128) DEFAULT NULL,
  husband_name VARCHAR(255) DEFAULT NULL,
  husband_address TEXT DEFAULT NULL,
  husband_citizenship_no VARCHAR(128) DEFAULT NULL,
  mother_name VARCHAR(255) DEFAULT NULL,
  mother_citizenship_no VARCHAR(128) DEFAULT NULL,
  witness1_name VARCHAR(255) DEFAULT NULL,
  witness1_address TEXT DEFAULT NULL,
  witness1_citizenship_no VARCHAR(128) DEFAULT NULL,
  witness1_signature VARCHAR(255) DEFAULT NULL,
  witness2_name VARCHAR(255) DEFAULT NULL,
  witness2_address TEXT DEFAULT NULL,
  witness2_citizenship_no VARCHAR(128) DEFAULT NULL,
  witness2_signature VARCHAR(255) DEFAULT NULL,
  declaration_text TEXT DEFAULT NULL,
  recommender_name VARCHAR(255) DEFAULT NULL,
  recommender_designation VARCHAR(255) DEFAULT NULL,
  recommender_date DATE DEFAULT NULL,
  applicant_name_footer VARCHAR(255) DEFAULT NULL,
  applicant_address_footer TEXT DEFAULT NULL,
  applicant_citizenship_footer VARCHAR(128) DEFAULT NULL,
  applicant_phone_footer VARCHAR(64) DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_fullname (full_name_np(100), full_name_en(100))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- pages/others 
CREATE TABLE IF NOT EXISTS different_dob_certification (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  municipality VARCHAR(255) DEFAULT NULL,
  previous_unit_type VARCHAR(64) DEFAULT NULL,
  previous_ward VARCHAR(64) DEFAULT NULL,
  salutation VARCHAR(32) DEFAULT NULL,
  applicant_name VARCHAR(255) DEFAULT NULL,
  applicant_address TEXT DEFAULT NULL,
  reason_text TEXT DEFAULT NULL,
  -- store docs as JSON so multiple rows are supported:
  docs JSON DEFAULT NULL,
  recommender_name VARCHAR(255) DEFAULT NULL,
  recommender_designation VARCHAR(128) DEFAULT NULL,
  applicant_name_footer VARCHAR(255) DEFAULT NULL,
  applicant_address_footer TEXT DEFAULT NULL,
  applicant_citizenship_footer VARCHAR(128) DEFAULT NULL,
  applicant_phone_footer VARCHAR(64) DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_applicant (applicant_name(120))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS different_english_spelling_certification (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  municipality VARCHAR(255) DEFAULT NULL,
  previous_unit_type VARCHAR(64) DEFAULT NULL,
  previous_ward VARCHAR(64) DEFAULT NULL,
  salutation VARCHAR(32) DEFAULT NULL,
  applicant_name VARCHAR(255) DEFAULT NULL,
  english_spelling_basis VARCHAR(255) DEFAULT NULL,
  reason_text TEXT DEFAULT NULL,
  docs JSON DEFAULT NULL, -- array of {doc_name, diff_name}
  recommender_name VARCHAR(255) DEFAULT NULL,
  recommender_designation VARCHAR(128) DEFAULT NULL,
  applicant_name_footer VARCHAR(255) DEFAULT NULL,
  applicant_address_footer TEXT DEFAULT NULL,
  applicant_citizenship_footer VARCHAR(128) DEFAULT NULL,
  applicant_phone_footer VARCHAR(64) DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_applicant_name (applicant_name(120))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS different_name_certification (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  letter_no VARCHAR(64) DEFAULT NULL,
  reference_no VARCHAR(128) DEFAULT NULL,
  date_bs VARCHAR(32) DEFAULT NULL,             -- keep BS (Nepali) as string
  municipality VARCHAR(255) DEFAULT NULL,
  previous_unit_type VARCHAR(64) DEFAULT NULL,
  previous_ward VARCHAR(64) DEFAULT NULL,
  salutation VARCHAR(32) DEFAULT NULL,
  applicant_name VARCHAR(255) DEFAULT NULL,
  reason_text TEXT DEFAULT NULL,
  rows_json JSON DEFAULT NULL,                  -- array of {doc, name_on_doc, diff_doc, diff_name}
  recommender_name VARCHAR(255) DEFAULT NULL,
  recommender_designation VARCHAR(128) DEFAULT NULL,
  applicant_name_footer VARCHAR(255) DEFAULT NULL,
  applicant_address_footer TEXT DEFAULT NULL,
  applicant_citizenship_footer VARCHAR(128) DEFAULT NULL,
  applicant_phone_footer VARCHAR(64) DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_applicant (applicant_name(120))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS leave_request_application (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  letter_no VARCHAR(64) DEFAULT NULL,
  date_bs VARCHAR(32) DEFAULT NULL,       -- store Bikram Sambat as string
  employee_id VARCHAR(64) DEFAULT NULL,
  employee_name VARCHAR(255) DEFAULT NULL,
  position VARCHAR(255) DEFAULT NULL,
  phone VARCHAR(64) DEFAULT NULL,
  leave_from_bs VARCHAR(32) DEFAULT NULL,
  leave_to_bs VARCHAR(32) DEFAULT NULL,
  leave_days INT DEFAULT NULL,
  reason TEXT,
  leave_choices_json JSON DEFAULT NULL,   -- selected leave types + requested_days
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_employee_name (employee_name(120))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- pages/physical-development
CREATE TABLE electricity_capacity_increase (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    letter_no VARCHAR(50),
    reference_no VARCHAR(100),
    date_bs VARCHAR(20),         -- BS date like २०८२-०८-०६
    date_ad DATE NULL,           -- Optional AD date, can remain NULL
    recipient_name VARCHAR(200),
    recipient_address VARCHAR(255),
    municipality VARCHAR(200),
    ward_no VARCHAR(10),
    location VARCHAR(255),
    business_name VARCHAR(255),
    business_owner VARCHAR(255),
    reason TEXT,
    applicant_name VARCHAR(200),
    applicant_address VARCHAR(255),
    applicant_citizenship_no VARCHAR(100),
    applicant_phone VARCHAR(50),
    notes TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE electricity_installation (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  -- meta
  letter_no VARCHAR(50),
  reference_no VARCHAR(100),
  date_bs VARCHAR(20),        -- store Nepali BS like '२०८२-०८-०६'
  date_ad DATE NULL,          -- optional AD date
  -- recipient / company
  recipient_company VARCHAR(255),
  recipient_city VARCHAR(100),
  -- applicant / location
  applicant_municipality VARCHAR(200),   -- नगर/गा.पा.
  applicant_municipality_type VARCHAR(50), -- 'नगरपालिका' / 'गा.वि.स.' etc.
  applicant_ward VARCHAR(20),
  applicant_title VARCHAR(20),           -- श्री / सुश्री / श्रीमती
  applicant_name VARCHAR(255),
  -- family details (father/husband and others)
  relation1_type VARCHAR(50),   -- e.g. पति/बाबु
  relation1_name VARCHAR(255),
  relation1_address VARCHAR(255),
  relation2_type VARCHAR(50),   -- e.g. ससुरा/बाजे
  relation2_name VARCHAR(255),
  relation2_address VARCHAR(255),
  -- property details
  previous_local_body_type VARCHAR(50), -- 'गा.वि.स.' / 'नगरपालिका' etc
  previous_local_body_name VARCHAR(200),
  previous_ward VARCHAR(20),
  ki_no VARCHAR(100),        -- कि.नं.
  area_size VARCHAR(100),    -- क्षेत्रफल
  -- current address / tole
  tole VARCHAR(200),
  basti VARCHAR(200),
  current_ward VARCHAR(20),
  -- four boundaries (चार किल्ला)
  boundary_east VARCHAR(255),
  boundary_west VARCHAR(255),
  boundary_north VARCHAR(255),
  boundary_south VARCHAR(255),
  -- house description
  house_built_by VARCHAR(200),
  house_floors VARCHAR(50),
  house_type VARCHAR(200),
  property_registered_to VARCHAR(255),
  -- declarations / notes
  declaration_text TEXT,
  additional_notes TEXT,
  -- signature
  signature_name VARCHAR(200),
  signature_designation VARCHAR(100),
  -- footer applicant details
  applicant_footer_name VARCHAR(200),
  applicant_footer_address VARCHAR(255),
  applicant_footer_citizenship_no VARCHAR(100),
  applicant_footer_phone VARCHAR(50),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS electricity_installation_recommendation (
  id INT AUTO_INCREMENT PRIMARY KEY,
  letter_no VARCHAR(64),
  reference_no VARCHAR(64),
  date_bs VARCHAR(32),            -- if using Nepali BS, keep as varchar; otherwise use DATE for AD
  date_ad DATE,                   -- AD date
  recipient_company VARCHAR(200),
  recipient_location VARCHAR(200),
  previous_district VARCHAR(100),
  previous_local_body VARCHAR(200),
  previous_ward VARCHAR(32),
  current_district VARCHAR(100),
  current_municipality VARCHAR(200),
  current_ward VARCHAR(32),
  applicant_title VARCHAR(20),
  applicant_name VARCHAR(200),
  body_text TEXT,
  signature_name VARCHAR(200),
  signature_designation VARCHAR(100),
  applicant_footer_name VARCHAR(200),
  applicant_footer_address TEXT,
  applicant_footer_citizenship_no VARCHAR(64),
  applicant_footer_phone VARCHAR(64),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_letter_no (letter_no)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS free_electricity_connection_recommendation (
  id INT AUTO_INCREMENT PRIMARY KEY,
  letter_no VARCHAR(64),
  reference_no VARCHAR(64),
  date_bs VARCHAR(32),           -- Nepali BS (if used)
  date_ad DATE,                  -- AD equivalent (if available)
  recipient_company VARCHAR(200), -- e.g., "नेपाल विद्युत प्राधिकरण"
  recipient_location VARCHAR(200),-- e.g., "काठमाडौँ"
  district VARCHAR(100),         -- "काठमाडौँ"
  municipality VARCHAR(200),     -- "नागार्जुन नगरपालिका" (current municipality)
  sabik_local_body_type VARCHAR(50), -- e.g., "गा.वि.स." or "नगरपालिका"
  sabik_local_body_name VARCHAR(200), -- name of previous local body text input
  sabik_ward_no VARCHAR(32),     -- previous ward number
  ward_no VARCHAR(32),           -- current ward no (if distinct)
  applicant_role_in_plot VARCHAR(200), -- text input referring to applicant's relation in form (e.g., "निजको छोरा")
  applicant_name VARCHAR(200),
  applicant_citizenship_no VARCHAR(64),
  applicant_phone VARCHAR(64),
  kitta_no VARCHAR(100),         -- main kitta number from form
  new_kitta_no VARCHAR(100),     -- second repeated/kitta field in form (if present)
  plot_description TEXT,         -- any long text describing plot / new building
  neighbors_east VARCHAR(200),
  neighbors_west VARCHAR(200),
  neighbors_north VARCHAR(200),
  neighbors_south VARCHAR(200),
  family_status VARCHAR(200),    -- e.g., "जुद्ध विपन्न दलित परिवार"
  recommendation_text TEXT,      -- full composed body_text if you want to store rendered text
  signature_name VARCHAR(200),
  signature_designation VARCHAR(100),
  applicant_footer_name VARCHAR(200),
  applicant_footer_address TEXT,
  applicant_footer_citizenship_no VARCHAR(64),
  applicant_footer_phone VARCHAR(64),
  notes TEXT,
  created_by VARCHAR(100),       -- optional: user id or username who created record
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_kitta_no (kitta_no),
  INDEX idx_applicant_citizenship (applicant_footer_citizenship_no)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS irrigation_electric_meter_installation_recommendation (
  id INT AUTO_INCREMENT PRIMARY KEY,
  letter_no VARCHAR(64),
  reference_no VARCHAR(64),
  date_bs VARCHAR(32),            -- store Nepali BS if used
  date_ad DATE,                   -- AD date (optional)
  recipient_company VARCHAR(200),
  recipient_location VARCHAR(200),
  sabik_local_body_name VARCHAR(200),
  sabik_local_body_type VARCHAR(50), -- e.g., 'गा.वि.स.' or 'नगरपालिका'
  sabik_ward_no VARCHAR(32),
  ward_no VARCHAR(32),
  district VARCHAR(100),
  applicant_name VARCHAR(200),
  applicant_role VARCHAR(200),
  kitta_no VARCHAR(100),
  area_size VARCHAR(100),
  purpose_of_meter VARCHAR(255),
  meter_capacity VARCHAR(100),
  neighbors_east VARCHAR(200),
  neighbors_west VARCHAR(200),
  neighbors_north VARCHAR(200),
  neighbors_south VARCHAR(200),
  tapashil_text TEXT,            -- optional composed summary
  signature_name VARCHAR(200),
  signature_designation VARCHAR(100),
  applicant_footer_name VARCHAR(200),
  applicant_footer_address TEXT,
  applicant_footer_citizenship_no VARCHAR(64),
  applicant_footer_phone VARCHAR(64),
  notes TEXT,
  created_by VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_kitta_no (kitta_no),
  INDEX idx_applicant_citizenship (applicant_footer_citizenship_no),
  INDEX idx_created_by (created_by)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `land_kittakat_for_road` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `chalan_no` VARCHAR(255) DEFAULT NULL,
  `date_nepali` VARCHAR(50) DEFAULT NULL,
  `subject_number` VARCHAR(100) DEFAULT NULL,
  `subject_text` VARCHAR(255) DEFAULT NULL,
  `addressee` VARCHAR(255) DEFAULT NULL,
  `addressee_place` VARCHAR(255) DEFAULT NULL,
  `district` VARCHAR(255) DEFAULT NULL,
  `municipality_name` VARCHAR(255) DEFAULT NULL,
  `ward_no` VARCHAR(50) DEFAULT NULL,
  `previous_address_type` VARCHAR(100) DEFAULT NULL,
  `previous_ward_no` VARCHAR(50) DEFAULT NULL,
  `parcel_kitta_no` VARCHAR(100) DEFAULT NULL,
  `area` VARCHAR(100) DEFAULT NULL,
  `owner_name` VARCHAR(255) DEFAULT NULL,
  `owner_relation` VARCHAR(100) DEFAULT NULL,
  `owner_relation_name` VARCHAR(255) DEFAULT NULL,
  `applicant_name` VARCHAR(255) DEFAULT NULL,
  `applicant_address` VARCHAR(255) DEFAULT NULL,
  `applicant_citizenship_no` VARCHAR(100) DEFAULT NULL,
  `applicant_phone` VARCHAR(50) DEFAULT NULL,
  `designation` VARCHAR(100) DEFAULT NULL,
  `recommendation_text` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `road_excavation_approval` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `chalan_no` VARCHAR(255) DEFAULT NULL,
  `date_nepali` VARCHAR(50) DEFAULT NULL,
  `addressee_prefix` VARCHAR(50) DEFAULT NULL,
  `addressee_name` VARCHAR(255) DEFAULT NULL,
  `addressee_place` VARCHAR(255) DEFAULT NULL,
  `subject_text` VARCHAR(255) DEFAULT NULL,
  `place_for_excavation` VARCHAR(255) DEFAULT NULL,
  `completion_days` VARCHAR(50) DEFAULT NULL,
  `approved_road` VARCHAR(255) DEFAULT NULL,
  `approved_unit` VARCHAR(100) DEFAULT NULL,
  `approved_unit_value` VARCHAR(100) DEFAULT NULL,
  `deposit_amount` VARCHAR(100) DEFAULT NULL,
  `applicant_previous_address` VARCHAR(255) DEFAULT NULL,
  `applicant_name` VARCHAR(255) DEFAULT NULL,
  `applicant_designation` VARCHAR(100) DEFAULT NULL,
  `recommendation_notes` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `road_maintain_recommendation` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `chalan_no` VARCHAR(255) DEFAULT NULL,
  `date_nepali` VARCHAR(50) DEFAULT NULL,
  `district` VARCHAR(255) DEFAULT NULL,
  `municipality` VARCHAR(255) DEFAULT NULL,
  `ward_no` VARCHAR(50) DEFAULT NULL,
  `previous_address_type` VARCHAR(100) DEFAULT NULL,
  `previous_ward_no` VARCHAR(50) DEFAULT NULL,
  `kitta_no` VARCHAR(100) DEFAULT NULL,
  `area` VARCHAR(100) DEFAULT NULL,
  `side` VARCHAR(50) DEFAULT NULL,
  `width_ft` VARCHAR(50) DEFAULT NULL,
  `length_ft` VARCHAR(50) DEFAULT NULL,
  `owner_title` VARCHAR(50) DEFAULT NULL,
  `owner_name` VARCHAR(255) DEFAULT NULL,
  `technical_report_attached` VARCHAR(10) DEFAULT NULL,
  `applicant_name` VARCHAR(255) DEFAULT NULL,
  `applicant_address` VARCHAR(255) DEFAULT NULL,
  `applicant_citizenship_no` VARCHAR(100) DEFAULT NULL,
  `applicant_phone` VARCHAR(50) DEFAULT NULL,
  `designation` VARCHAR(100) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `tap_installation_recommendation` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `chalan_no` VARCHAR(255) DEFAULT NULL,
  `date_nepali` VARCHAR(50) DEFAULT NULL,
  `addressee_prefix` VARCHAR(50) DEFAULT NULL,
  `addressee_name` VARCHAR(255) DEFAULT NULL,
  `addressee_place` VARCHAR(255) DEFAULT NULL,
  `ward_no` VARCHAR(50) DEFAULT NULL,
  `previous_address` VARCHAR(255) DEFAULT NULL,
  `owner_name` VARCHAR(255) DEFAULT NULL,
  `kitta_main_no` VARCHAR(100) DEFAULT NULL,
  `construction_type` VARCHAR(50) DEFAULT NULL,
  `tap_count` VARCHAR(50) DEFAULT NULL,
  `kitta_list` TEXT DEFAULT NULL,
  `signature_name` VARCHAR(255) DEFAULT NULL,
  `signature_designation` VARCHAR(100) DEFAULT NULL,
  `bodartha_text` VARCHAR(255) DEFAULT NULL,
  `applicant_name` VARCHAR(255) DEFAULT NULL,
  `applicant_address` VARCHAR(255) DEFAULT NULL,
  `applicant_citizenship_no` VARCHAR(100) DEFAULT NULL,
  `applicant_phone` VARCHAR(50) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `agreement_of_plan` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `project_code_or_id` VARCHAR(255) DEFAULT NULL,
  `implement_unit` VARCHAR(255) DEFAULT NULL,
  `district` VARCHAR(255) DEFAULT NULL,
  `fiscal_year` VARCHAR(50) DEFAULT NULL,
  `project_title` VARCHAR(512) DEFAULT NULL,
  `agreement_amount` VARCHAR(255) DEFAULT NULL,
  `allocated_amount` VARCHAR(255) DEFAULT NULL,
  `allocated_amount_in_words` VARCHAR(512) DEFAULT NULL,
  `party_a` VARCHAR(255) DEFAULT NULL,
  `party_b` VARCHAR(255) DEFAULT NULL,
  `tapsil` TEXT DEFAULT NULL,
  `signatory_name` VARCHAR(255) DEFAULT NULL,
  `signatory_designation` VARCHAR(100) DEFAULT NULL,
  `applicant_name` VARCHAR(255) DEFAULT NULL,
  `applicant_address` VARCHAR(255) DEFAULT NULL,
  `applicant_citizenship_no` VARCHAR(100) DEFAULT NULL,
  `applicant_phone` VARCHAR(50) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `withdrawal_fund_recommendation` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `project_code_or_id` VARCHAR(255) DEFAULT NULL,
  `requested_amount` VARCHAR(255) DEFAULT NULL,
  `committee_chair` VARCHAR(255) DEFAULT NULL,
  `consumer_committee_name` VARCHAR(255) DEFAULT NULL,
  `implement_unit_name` VARCHAR(255) DEFAULT NULL,
  `tapsil` TEXT DEFAULT NULL,
  `signatory_name` VARCHAR(255) DEFAULT NULL,
  `signatory_designation` VARCHAR(100) DEFAULT NULL,
  `applicant_name` VARCHAR(255) DEFAULT NULL,
  `applicant_address` VARCHAR(255) DEFAULT NULL,
  `applicant_citizenship_no` VARCHAR(100) DEFAULT NULL,
  `applicant_phone` VARCHAR(50) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE submissions (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  form_key VARCHAR(255),
  category VARCHAR(100),
  sub_category VARCHAR(100),
  summary VARCHAR(500),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `certificate_renewals` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `sn` VARCHAR(50) DEFAULT NULL,
  `renew_date` VARCHAR(50) DEFAULT NULL,    -- store Nepali date or use DATE if storing Gregorian
  `name` VARCHAR(255) DEFAULT NULL,
  `type` VARCHAR(255) DEFAULT NULL,
  `district` VARCHAR(255) DEFAULT NULL,
  `address` VARCHAR(512) DEFAULT NULL,
  `phone` VARCHAR(50) DEFAULT NULL,
  `card_no` VARCHAR(100) DEFAULT NULL,
  `issue_date` VARCHAR(50) DEFAULT NULL,
  `officer` VARCHAR(255) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX idx_renew_date (`renew_date`),
  INDEX idx_name (`name`),
  INDEX idx_type (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `disability_cards` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `date` VARCHAR(50) DEFAULT NULL,       -- store Nepali date string, or use DATE if you store Gregorian
  `name` VARCHAR(255) DEFAULT NULL,
  `invoice` VARCHAR(100) DEFAULT NULL,
  `type` VARCHAR(255) DEFAULT NULL,
  `officer` VARCHAR(255) DEFAULT NULL,
  `citizenship` VARCHAR(100) DEFAULT NULL,
  `phone` VARCHAR(50) DEFAULT NULL,
  `remarks` TEXT DEFAULT NULL,
  `status` VARCHAR(100) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX idx_name (`name`),
  INDEX idx_invoice (`invoice`),
  INDEX idx_date (`date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `senior_cards` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `date` VARCHAR(50) DEFAULT NULL,            -- store Nepali date string or use DATE if Gregorian
  `name` VARCHAR(255) DEFAULT NULL,
  `father_name` VARCHAR(255) DEFAULT NULL,
  `grandfather_name` VARCHAR(255) DEFAULT NULL,
  `officer` VARCHAR(255) DEFAULT NULL,
  `remarks` TEXT DEFAULT NULL,
  `status` VARCHAR(100) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX idx_name (`name`),
  INDEX idx_date (`date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- pages/social-family
CREATE TABLE `behavior_recommendations` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `chalani_no` VARCHAR(255) DEFAULT NULL,
  `municipality` VARCHAR(255) DEFAULT NULL,
  `applicant_relation_name` VARCHAR(255) DEFAULT NULL,
  `applicant_relation_type` VARCHAR(100) DEFAULT NULL,
  `relative_name` VARCHAR(255) DEFAULT NULL,
  `relative_gender` VARCHAR(50) DEFAULT NULL,
  `relative_of` VARCHAR(255) DEFAULT NULL,
  `signatory_name` VARCHAR(255) DEFAULT NULL,
  `signatory_designation` VARCHAR(100) DEFAULT NULL,
  `applicant_name` VARCHAR(255) DEFAULT NULL,
  `applicant_address` VARCHAR(512) DEFAULT NULL,
  `applicant_citizenship_no` VARCHAR(100) DEFAULT NULL,
  `applicant_phone` VARCHAR(50) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `beneficiary_allowance_transfers` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `chalani_no` VARCHAR(255) DEFAULT NULL,
  `fiscal_year_from` VARCHAR(100) DEFAULT NULL,
  `fiscal_year_to` VARCHAR(100) DEFAULT NULL,
  `target_local_level` VARCHAR(255) DEFAULT NULL,
  `target_ward_no` VARCHAR(50) DEFAULT NULL,
  `beneficiary` TEXT DEFAULT NULL,   -- JSON string of beneficiary details
  `transfer` TEXT DEFAULT NULL,      -- JSON string of transfer details (old/new)
  `applicant` TEXT DEFAULT NULL,     -- JSON string of applicant details
  `notes` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `birth_settlement_recommendations` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `chalani_no` VARCHAR(255) DEFAULT NULL,
  `municipality` VARCHAR(255) DEFAULT NULL,
  `ward_no` VARCHAR(50) DEFAULT NULL,
  `subject` VARCHAR(255) DEFAULT NULL,
  `birth` TEXT DEFAULT NULL,               -- JSON string of birth details
  `current_residence` TEXT DEFAULT NULL,   -- JSON string
  `parent` TEXT DEFAULT NULL,              -- JSON string
  `applicant` TEXT DEFAULT NULL,           -- JSON string
  `signatory_name` VARCHAR(255) DEFAULT NULL,
  `signatory_designation` VARCHAR(100) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `birth_verifications_nepali` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `chalani_no` VARCHAR(255) DEFAULT NULL,
  `municipality` VARCHAR(255) DEFAULT NULL,
  `ward_no` VARCHAR(50) DEFAULT NULL,
  `birth` TEXT DEFAULT NULL,       -- JSON string
  `person` TEXT DEFAULT NULL,      -- JSON string
  `applicant` TEXT DEFAULT NULL,   -- JSON string
  `signatory_name` VARCHAR(255) DEFAULT NULL,
  `signatory_designation` VARCHAR(100) DEFAULT NULL,
  `meta_date` VARCHAR(100) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `demised_heir_recommendations` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `chalani_no` VARCHAR(255) DEFAULT NULL,
  `municipality` VARCHAR(255) DEFAULT NULL,
  `ward_no` VARCHAR(50) DEFAULT NULL,
  `deceased` TEXT DEFAULT NULL,   -- JSON string
  `heirs` TEXT DEFAULT NULL,      -- JSON string (array of heir objects)
  `applicant` TEXT DEFAULT NULL,  -- JSON string
  `signatory_name` VARCHAR(255) DEFAULT NULL,
  `signatory_designation` VARCHAR(100) DEFAULT NULL,
  `meta_date` VARCHAR(100) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX idx_municipality (municipality),
  INDEX idx_ward_no (ward_no)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `demised_security_allowance_to_heir` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `chalani_no` VARCHAR(255) DEFAULT NULL,
  `addressee_name` VARCHAR(255) DEFAULT NULL,
  `addressee_line2` VARCHAR(255) DEFAULT NULL,
  `addressee_line3` VARCHAR(255) DEFAULT NULL,
  `address` TEXT DEFAULT NULL,           -- JSON string {province,district,local_unit_type,local_unit_name,ward_no}
  `deceasedBenefit` TEXT DEFAULT NULL,   -- JSON string with deceased & bank/beneficiary details
  `applicant` TEXT DEFAULT NULL,         -- JSON string with applicant fields
  `signatory_name` VARCHAR(255) DEFAULT NULL,
  `signatory_designation` VARCHAR(100) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `destitute_recommendations` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `chalani_no` VARCHAR(255) DEFAULT NULL,
  `municipality_display` VARCHAR(255) DEFAULT NULL,
  `location` TEXT DEFAULT NULL,    -- JSON string: {district, municipality, old_unit_type, old_unit_ward, ward_no}
  `subject` TEXT DEFAULT NULL,     -- JSON string for relation/child details
  `applicant` TEXT DEFAULT NULL,   -- JSON string with applicant fields
  `signatory_name` VARCHAR(255) DEFAULT NULL,
  `signatory_designation` VARCHAR(100) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `disability_identity_card_recommendations` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `chalani_no` VARCHAR(255) DEFAULT NULL,
  `addressee` TEXT DEFAULT NULL,    -- JSON string {office, local, district}
  `location` TEXT DEFAULT NULL,     -- JSON string {old_unit_name, old_unit_type, old_unit_ward, current_ward}
  `disability` TEXT DEFAULT NULL,   -- JSON string {title, name, disability_type, registered_unit}
  `applicant` TEXT DEFAULT NULL,    -- JSON string {name, address, citizenship_no, phone}
  `signatory_name` VARCHAR(255) DEFAULT NULL,
  `signatory_designation` VARCHAR(100) DEFAULT NULL,
  `meta_date` VARCHAR(100) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX idx_created_at (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `disable_identity_card_renew` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `chalani_no` VARCHAR(100) DEFAULT NULL,
  `certificate_type` VARCHAR(100) DEFAULT NULL,
  `previous_unit_name` VARCHAR(255) DEFAULT NULL,
  `previous_unit_ward` VARCHAR(50) DEFAULT NULL,
  `relation_text` VARCHAR(255) DEFAULT NULL,
  `relation_child_type` VARCHAR(50) DEFAULT NULL,
  `relation_child_name` VARCHAR(255) DEFAULT NULL,
  `certificate_date` VARCHAR(50) DEFAULT NULL,
  `certificate_number` VARCHAR(100) DEFAULT NULL,
  `renewal_type` VARCHAR(200) DEFAULT NULL,
  `applicant_name` VARCHAR(255) DEFAULT NULL,
  `applicant_address` VARCHAR(500) DEFAULT NULL,
  `applicant_citizenship_no` VARCHAR(100) DEFAULT NULL,
  `applicant_phone` VARCHAR(50) DEFAULT NULL,
  `signatory_name` VARCHAR(255) DEFAULT NULL,
  `signatory_designation` VARCHAR(200) DEFAULT NULL,
  `municipality_display` VARCHAR(200) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `electricity_connection_recommendation` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `chalani_no` VARCHAR(100) DEFAULT NULL,
  `addressee_company` VARCHAR(255) DEFAULT NULL,
  `addressee_location` VARCHAR(255) DEFAULT NULL,
  `addressee_city` VARCHAR(100) DEFAULT NULL,
  `municipality_display` VARCHAR(200) DEFAULT NULL,
  `applicant_person` VARCHAR(255) DEFAULT NULL,
  `applicant_ward` VARCHAR(50) DEFAULT NULL,
  `family_husband_father` VARCHAR(500) DEFAULT NULL,
  `family_sasura` VARCHAR(500) DEFAULT NULL,
  `land_old_unit_type` VARCHAR(50) DEFAULT NULL,
  `land_old_unit_ward` VARCHAR(50) DEFAULT NULL,
  `land_kitta_no` VARCHAR(100) DEFAULT NULL,
  `land_area` VARCHAR(100) DEFAULT NULL,
  `land_tol` VARCHAR(255) DEFAULT NULL,
  `bound_east` VARCHAR(255) DEFAULT NULL,
  `bound_west` VARCHAR(255) DEFAULT NULL,
  `bound_north` VARCHAR(255) DEFAULT NULL,
  `bound_south` VARCHAR(255) DEFAULT NULL,
  `house_type` VARCHAR(255) DEFAULT NULL,
  `house_floors` VARCHAR(50) DEFAULT NULL,
  `house_owner_name` VARCHAR(255) DEFAULT NULL,
  `applicant_name` VARCHAR(255) DEFAULT NULL,
  `applicant_address` TEXT DEFAULT NULL,
  `applicant_citizenship_no` VARCHAR(100) DEFAULT NULL,
  `applicant_phone` VARCHAR(50) DEFAULT NULL,
  `signatory_name` VARCHAR(255) DEFAULT NULL,
  `signatory_designation` VARCHAR(200) DEFAULT NULL,
  `meta` JSON DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `ethnic_identity_recommendation` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `chalani_no` VARCHAR(100) DEFAULT NULL,
  `addressee_office` VARCHAR(255) DEFAULT NULL,
  `addressee_district` VARCHAR(100) DEFAULT NULL,
  `residence_district` VARCHAR(255) DEFAULT NULL,
  `residence_municipality` VARCHAR(255) DEFAULT NULL,
  `residence_ward_no` VARCHAR(50) DEFAULT NULL,
  `person_title` VARCHAR(50) DEFAULT NULL,
  `person_name` VARCHAR(255) DEFAULT NULL,
  `relation_title` VARCHAR(50) DEFAULT NULL,
  `relation_name` VARCHAR(255) DEFAULT NULL,
  `relation_child_type` VARCHAR(50) DEFAULT NULL,
  `relation_child_title` VARCHAR(50) DEFAULT NULL,
  `relation_child_name` VARCHAR(255) DEFAULT NULL,
  `na_pr_no` VARCHAR(150) DEFAULT NULL,
  `requested_ethnicity` VARCHAR(255) DEFAULT NULL,
  `applicant_name` VARCHAR(255) DEFAULT NULL,
  `applicant_address` TEXT DEFAULT NULL,
  `applicant_citizenship_no` VARCHAR(100) DEFAULT NULL,
  `applicant_phone` VARCHAR(50) DEFAULT NULL,
  `signatory_name` VARCHAR(255) DEFAULT NULL,
  `signatory_designation` VARCHAR(200) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `free_health_insurance_requests` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `chalani_no` VARCHAR(120) DEFAULT NULL,
  `fiscal_year` VARCHAR(50) DEFAULT NULL,
  `addressee` JSON DEFAULT NULL,               -- { "local": "...", "district": "..." }
  `family_members` JSON DEFAULT NULL,          -- array of objects
  `employment` JSON DEFAULT NULL,              -- array of objects
  `land_ownership` JSON DEFAULT NULL,          -- array of objects
  `financial` JSON DEFAULT NULL,               -- { family_annual_income, family_debt, poverty, level, other_notes }
  `applicant` JSON DEFAULT NULL,               -- { name, signature, address, citizenship_no, phone }
  `meta_date` DATETIME DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_chalani_no` (`chalani_no`),
  INDEX `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `income_source_certifications` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `chalani_no` VARCHAR(120) DEFAULT NULL,
  `residence_district` VARCHAR(200) DEFAULT NULL,
  `residence_municipality` VARCHAR(200) DEFAULT NULL,
  `residence_ward_no` VARCHAR(50) DEFAULT NULL,
  `incomes` JSON DEFAULT NULL,               -- array of {seq, description, annual_amount, remarks}
  `total_income` DECIMAL(15,2) DEFAULT NULL,
  `applicant_name` VARCHAR(255) DEFAULT NULL,
  `applicant_address` VARCHAR(500) DEFAULT NULL,
  `applicant_citizenship_no` VARCHAR(100) DEFAULT NULL,
  `applicant_phone` VARCHAR(50) DEFAULT NULL,
  `signatory_name` VARCHAR(255) DEFAULT NULL,
  `signatory_designation` VARCHAR(120) DEFAULT NULL,
  `meta_date` DATETIME DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_chalani_no` (`chalani_no`),
  INDEX `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `internal_migration_recommendation` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `reference_no` VARCHAR(100) DEFAULT NULL,
  `chalani_no` VARCHAR(100) DEFAULT NULL,
  `date` DATE DEFAULT NULL,
  `subject` VARCHAR(255) DEFAULT NULL,
  `addressee_line1` VARCHAR(255) DEFAULT NULL,
  `addressee_line2` VARCHAR(255) DEFAULT NULL,
  `from_location` VARCHAR(255) DEFAULT NULL,
  `migration_type` VARCHAR(50) DEFAULT NULL,
  `from_date` DATE DEFAULT NULL,
  `to_date` DATE DEFAULT NULL,
  `from_district` VARCHAR(100) DEFAULT NULL,
  `from_municipality_type` VARCHAR(50) DEFAULT NULL,
  `from_ward_no` VARCHAR(20) DEFAULT NULL,
  `to_district` VARCHAR(100) DEFAULT NULL,
  `to_municipality` VARCHAR(100) DEFAULT NULL,
  `to_ward_no` VARCHAR(20) DEFAULT NULL,
  `details` JSON DEFAULT NULL,
  `signatory_name` VARCHAR(150) DEFAULT NULL,
  `signatory_designation` VARCHAR(150) DEFAULT NULL,
  `applicant_name` VARCHAR(150) DEFAULT NULL,
  `applicant_address` VARCHAR(255) DEFAULT NULL,
  `applicant_citizenship_no` VARCHAR(100) DEFAULT NULL,
  `applicant_phone` VARCHAR(50) DEFAULT NULL,
  `municipality_name` VARCHAR(150) DEFAULT NULL,
  `ward_title` VARCHAR(150) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `jestha_nagarik_sifaris_wada` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `chalani_no` VARCHAR(100) DEFAULT NULL,
  `date` DATE DEFAULT NULL,
  `subject` VARCHAR(255) DEFAULT NULL,
  `addressee_line1` VARCHAR(255) DEFAULT NULL,
  `addressee_line2` VARCHAR(255) DEFAULT NULL,
  `addressee_line3` VARCHAR(255) DEFAULT NULL,
  `from_district` VARCHAR(150) DEFAULT NULL,
  `from_place` VARCHAR(150) DEFAULT NULL,
  `from_ward_no` VARCHAR(20) DEFAULT NULL,
  `current_municipality` VARCHAR(150) DEFAULT NULL,
  `applicant_reason_text` TEXT DEFAULT NULL,
  `signatory_name` VARCHAR(150) DEFAULT NULL,
  `signatory_designation` VARCHAR(150) DEFAULT NULL,
  `applicant_name` VARCHAR(150) DEFAULT NULL,
  `applicant_address` VARCHAR(255) DEFAULT NULL,
  `applicant_citizenship_no` VARCHAR(100) DEFAULT NULL,
  `applicant_phone` VARCHAR(50) DEFAULT NULL,
  `municipality_name` VARCHAR(150) DEFAULT NULL,
  `ward_title` VARCHAR(150) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `marriage_certificate` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `reference_no` VARCHAR(100) DEFAULT NULL,
  `chalani_no` VARCHAR(100) DEFAULT NULL,
  `date` DATE DEFAULT NULL,
  `prev_district` VARCHAR(150) DEFAULT NULL,
  `prev_unit_type` VARCHAR(50) DEFAULT NULL,
  `prev_ward_no` VARCHAR(20) DEFAULT NULL,
  `resident_municipality` VARCHAR(150) DEFAULT NULL,
  `resident_ward_no` VARCHAR(20) DEFAULT NULL,
  `groom_name` VARCHAR(255) DEFAULT NULL,
  `groom_parent_relation` VARCHAR(255) DEFAULT NULL,
  `bride_name` VARCHAR(255) DEFAULT NULL,
  `bride_parent_relation` VARCHAR(255) DEFAULT NULL,
  `registration_no` VARCHAR(100) DEFAULT NULL,
  `marriage_date` DATE DEFAULT NULL,
  `marriage_place` VARCHAR(255) DEFAULT NULL,
  `remarks` TEXT DEFAULT NULL,
  `signatory_name` VARCHAR(150) DEFAULT NULL,
  `signatory_designation` VARCHAR(150) DEFAULT NULL,
  `applicant_name` VARCHAR(150) DEFAULT NULL,
  `applicant_address` VARCHAR(255) DEFAULT NULL,
  `applicant_citizenship_no` VARCHAR(100) DEFAULT NULL,
  `applicant_phone` VARCHAR(50) DEFAULT NULL,
  `municipality_name` VARCHAR(150) DEFAULT NULL,
  `ward_title` VARCHAR(150) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `minor_identity_card` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `chalani_no` VARCHAR(100) DEFAULT NULL,
  `date` DATE DEFAULT NULL,
  `addressee_type` VARCHAR(50) DEFAULT NULL,
  `addressee_office` VARCHAR(255) DEFAULT NULL,
  `addressee_place1` VARCHAR(255) DEFAULT NULL,
  `addressee_place2` VARCHAR(255) DEFAULT NULL,
  `child_name_ne` VARCHAR(255) DEFAULT NULL,
  `child_gender` VARCHAR(50) DEFAULT NULL,
  `child_fullname_en` VARCHAR(255) DEFAULT NULL,
  `birth_district` VARCHAR(150) DEFAULT NULL,
  `birth_rm` VARCHAR(150) DEFAULT NULL,
  `birth_ward_no` VARCHAR(20) DEFAULT NULL,
  `permanent_district` VARCHAR(150) DEFAULT NULL,
  `permanent_rm` VARCHAR(150) DEFAULT NULL,
  `permanent_ward_no` VARCHAR(20) DEFAULT NULL,
  `birth_date_bs` VARCHAR(30) DEFAULT NULL,
  `birth_date_ad` DATE DEFAULT NULL,
  `father_name` VARCHAR(255) DEFAULT NULL,
  `father_address` VARCHAR(255) DEFAULT NULL,
  `mother_name` VARCHAR(255) DEFAULT NULL,
  `mother_address` VARCHAR(255) DEFAULT NULL,
  `parent_citizenship_no` VARCHAR(100) DEFAULT NULL,
  `guardian_name` VARCHAR(255) DEFAULT NULL,
  `guardian_address` VARCHAR(255) DEFAULT NULL,
  `applicant_thumb_right` VARCHAR(50) DEFAULT NULL,
  `applicant_thumb_left` VARCHAR(50) DEFAULT NULL,
  `applicant_name` VARCHAR(255) DEFAULT NULL,
  `applicant_address` VARCHAR(255) DEFAULT NULL,
  `applicant_citizenship_no` VARCHAR(100) DEFAULT NULL,
  `applicant_phone` VARCHAR(50) DEFAULT NULL,
  `recommender_date` DATE DEFAULT NULL,
  `recommender_name` VARCHAR(255) DEFAULT NULL,
  `recommender_designation` VARCHAR(150) DEFAULT NULL,
  `recommender_office_seal` VARCHAR(255) DEFAULT NULL,
  `municipality_name` VARCHAR(150) DEFAULT NULL,
  `ward_title` VARCHAR(150) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `minor_identity_card_recommendation` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `chalani_no` VARCHAR(100) DEFAULT NULL,
  `date` DATE DEFAULT NULL,
  `addressee_type` VARCHAR(50) DEFAULT NULL,
  `addressee_office` VARCHAR(255) DEFAULT NULL,
  `addressee_place` VARCHAR(255) DEFAULT NULL,
  `child_type` VARCHAR(50) DEFAULT NULL,
  `child_name_ne` VARCHAR(255) DEFAULT NULL,
  `child_fullname_en` VARCHAR(255) DEFAULT NULL,
  `child_gender` VARCHAR(50) DEFAULT NULL,
  `birth_country` VARCHAR(150) DEFAULT NULL,
  `birth_province` VARCHAR(150) DEFAULT NULL,
  `birth_district` VARCHAR(150) DEFAULT NULL,
  `birth_rm_mun` VARCHAR(150) DEFAULT NULL,
  `father_name` VARCHAR(255) DEFAULT NULL,
  `father_citizenship` VARCHAR(100) DEFAULT NULL,
  `mother_name` VARCHAR(255) DEFAULT NULL,
  `mother_citizenship` VARCHAR(100) DEFAULT NULL,
  `guardian_name` VARCHAR(255) DEFAULT NULL,
  `guardian_address` VARCHAR(255) DEFAULT NULL,
  `permanent_district` VARCHAR(150) DEFAULT NULL,
  `permanent_mun` VARCHAR(150) DEFAULT NULL,
  `permanent_ward` VARCHAR(20) DEFAULT NULL,
  `birth_date_bs` VARCHAR(30) DEFAULT NULL,
  `birth_date_ad` DATE DEFAULT NULL,
  `grandfather_name` VARCHAR(255) DEFAULT NULL,
  `grandmother_name` VARCHAR(255) DEFAULT NULL,
  `applicant_signature_name` VARCHAR(255) DEFAULT NULL,
  `applicant_relationship` VARCHAR(150) DEFAULT NULL,
  `applicant_date` DATE DEFAULT NULL,
  `recommender_name` VARCHAR(255) DEFAULT NULL,
  `recommender_designation` VARCHAR(150) DEFAULT NULL,
  `recommender_office_seal` VARCHAR(255) DEFAULT NULL,
  `applicant_name` VARCHAR(255) DEFAULT NULL,
  `applicant_address` VARCHAR(255) DEFAULT NULL,
  `applicant_citizenship_no` VARCHAR(100) DEFAULT NULL,
  `applicant_phone` VARCHAR(50) DEFAULT NULL,
  `municipality_name` VARCHAR(150) DEFAULT NULL,
  `ward_title` VARCHAR(150) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `birth_verification` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `letter_no` VARCHAR(100) DEFAULT NULL,
  `ref_no` VARCHAR(100) DEFAULT NULL,
  `date_bs` VARCHAR(30) DEFAULT NULL,
  `applicant_prefix` VARCHAR(20) DEFAULT NULL,
  `applicant_name` VARCHAR(255) DEFAULT NULL,
  `subject_person_prefix` VARCHAR(20) DEFAULT NULL,
  `subject_person_name` VARCHAR(255) DEFAULT NULL,
  `full_name_np` VARCHAR(255) DEFAULT NULL,
  `full_name_en` VARCHAR(255) DEFAULT NULL,
  `dob_bs` VARCHAR(30) DEFAULT NULL,
  `dob_ad` DATE DEFAULT NULL,
  `sex` VARCHAR(20) DEFAULT NULL,
  `perm_province` VARCHAR(150) DEFAULT NULL,
  `perm_district` VARCHAR(150) DEFAULT NULL,
  `perm_palika` VARCHAR(255) DEFAULT NULL,
  `perm_ward` VARCHAR(50) DEFAULT NULL,
  `perm_palika_en` VARCHAR(255) DEFAULT NULL,
  `perm_ward_en` VARCHAR(50) DEFAULT NULL,
  `birth_province` VARCHAR(150) DEFAULT NULL,
  `birth_district` VARCHAR(150) DEFAULT NULL,
  `birth_palika` VARCHAR(255) DEFAULT NULL,
  `birth_ward` VARCHAR(50) DEFAULT NULL,
  `birth_place_name` VARCHAR(255) DEFAULT NULL,
  `birth_palika_en` VARCHAR(255) DEFAULT NULL,
  `birth_ward_en` VARCHAR(50) DEFAULT NULL,
  `father_full_name_np` VARCHAR(255) DEFAULT NULL,
  `father_full_name_en` VARCHAR(255) DEFAULT NULL,
  `father_document_type` VARCHAR(150) DEFAULT NULL,
  `father_document_no` VARCHAR(255) DEFAULT NULL,
  `mother_full_name_np` VARCHAR(255) DEFAULT NULL,
  `mother_full_name_en` VARCHAR(255) DEFAULT NULL,
  `mother_document_type` VARCHAR(150) DEFAULT NULL,
  `mother_document_no` VARCHAR(255) DEFAULT NULL,
  `signatory_designation` VARCHAR(150) DEFAULT NULL,
  `signatory_name` VARCHAR(255) DEFAULT NULL,
  `municipality_name` VARCHAR(150) DEFAULT NULL,
  `ward_title` VARCHAR(150) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `no_second_marriage_recommendation` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `reference_no` VARCHAR(100) DEFAULT NULL,
  `chalani_no` VARCHAR(100) DEFAULT NULL,
  `date` DATE DEFAULT NULL,
  `subject` VARCHAR(255) DEFAULT NULL,
  `district` VARCHAR(150) DEFAULT NULL,
  `municipality` VARCHAR(150) DEFAULT NULL,
  `ward_no` VARCHAR(20) DEFAULT NULL,
  `resident_name` VARCHAR(255) DEFAULT NULL,
  `relative_name` VARCHAR(255) DEFAULT NULL,
  `daughter_name` VARCHAR(255) DEFAULT NULL,
  `wife_name` VARCHAR(255) DEFAULT NULL,
  `spouse_npr_no` VARCHAR(100) DEFAULT NULL,
  `spouse_npr_issue_date` DATE DEFAULT NULL,
  `spouse_death_date` DATE DEFAULT NULL,
  `application_date` DATE DEFAULT NULL,
  `recommended_until_date` DATE DEFAULT NULL,
  `witness_text` TEXT DEFAULT NULL,
  `signatory_name` VARCHAR(255) DEFAULT NULL,
  `signatory_designation` VARCHAR(150) DEFAULT NULL,
  `applicant_name` VARCHAR(255) DEFAULT NULL,
  `applicant_address` VARCHAR(255) DEFAULT NULL,
  `applicant_citizenship_no` VARCHAR(100) DEFAULT NULL,
  `applicant_phone` VARCHAR(50) DEFAULT NULL,
  `municipality_name` VARCHAR(150) DEFAULT NULL,
  `ward_title` VARCHAR(150) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `old_age_allowance_applications` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `municipality` VARCHAR(150) DEFAULT NULL,
  `ward_no` VARCHAR(20) DEFAULT NULL,
  `date_bs` VARCHAR(30) DEFAULT NULL,
  `subject` VARCHAR(255) DEFAULT NULL,
  `target_group` VARCHAR(150) DEFAULT NULL,
  `applicant_name` VARCHAR(255) DEFAULT NULL,
  `father_name` VARCHAR(255) DEFAULT NULL,
  `mother_name` VARCHAR(255) DEFAULT NULL,
  `address` VARCHAR(255) DEFAULT NULL,
  `npr_no` VARCHAR(100) DEFAULT NULL,
  `npr_issue_district` VARCHAR(150) DEFAULT NULL,
  `gender` VARCHAR(20) DEFAULT NULL,
  `dob_bs` VARCHAR(30) DEFAULT NULL,
  `age_reach_date` DATE DEFAULT NULL,
  `municipality_name` VARCHAR(150) DEFAULT NULL,
  `ward_title` VARCHAR(150) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `permanent_residence_recommendation` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `reference_no` VARCHAR(100) DEFAULT NULL,
  `chalani_no` VARCHAR(100) DEFAULT NULL,
  `date_bs` VARCHAR(30) DEFAULT NULL,
  `salutation_person_prefix` VARCHAR(50) DEFAULT NULL,
  `applicant_name` VARCHAR(255) DEFAULT NULL,
  `current_municipality` VARCHAR(150) DEFAULT NULL,
  `current_municipality_display` VARCHAR(150) DEFAULT NULL,
  `ward_no` VARCHAR(20) DEFAULT NULL,
  `previous_unit` VARCHAR(255) DEFAULT NULL,
  `since_date_bs` VARCHAR(30) DEFAULT NULL,
  `npr_no` VARCHAR(100) DEFAULT NULL,
  `npr_issue_district` VARCHAR(150) DEFAULT NULL,
  `npr_issue_date_bs` VARCHAR(30) DEFAULT NULL,
  `locations` JSON DEFAULT NULL,
  `signatory_name` VARCHAR(255) DEFAULT NULL,
  `signatory_designation` VARCHAR(150) DEFAULT NULL,
  `applicant_name_box` VARCHAR(255) DEFAULT NULL,
  `applicant_address_box` VARCHAR(255) DEFAULT NULL,
  `applicant_citizenship_no` VARCHAR(100) DEFAULT NULL,
  `applicant_phone` VARCHAR(50) DEFAULT NULL,
  `municipality_name` VARCHAR(150) DEFAULT NULL,
  `ward_title` VARCHAR(150) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `relationship_verification_form` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `reference_no` VARCHAR(100) DEFAULT NULL,
  `chalani_no` VARCHAR(100) DEFAULT NULL,
  `date_bs` VARCHAR(30) DEFAULT NULL,
  `addressee_line1` VARCHAR(255) DEFAULT NULL,
  `addressee_line2` VARCHAR(255) DEFAULT NULL,
  `ward_no` VARCHAR(20) DEFAULT NULL,
  `applicant_prefix` VARCHAR(20) DEFAULT NULL,
  `applicant_name` VARCHAR(255) DEFAULT NULL,
  `applicant_relation_to_subject` VARCHAR(255) DEFAULT NULL,
  `subject_prefix` VARCHAR(20) DEFAULT NULL,
  `subject_name` VARCHAR(255) DEFAULT NULL,
  `subject_role` VARCHAR(50) DEFAULT NULL,
  `relations` JSON DEFAULT NULL,
  `signatory_name` VARCHAR(255) DEFAULT NULL,
  `signatory_designation` VARCHAR(150) DEFAULT NULL,
  `applicant_name_box` VARCHAR(255) DEFAULT NULL,
  `applicant_address_box` VARCHAR(255) DEFAULT NULL,
  `applicant_citizenship_no` VARCHAR(100) DEFAULT NULL,
  `applicant_phone` VARCHAR(50) DEFAULT NULL,
  `municipality_name` VARCHAR(150) DEFAULT NULL,
  `ward_title` VARCHAR(150) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `relation_temporary_residence` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `reference_no` VARCHAR(100) DEFAULT NULL,
  `chalani_no` VARCHAR(100) DEFAULT NULL,
  `date_bs` VARCHAR(30) DEFAULT NULL,
  `subject_prefix` VARCHAR(100) DEFAULT NULL,
  `applicant_name` VARCHAR(255) DEFAULT NULL,
  `permanent_district` VARCHAR(150) DEFAULT NULL,
  `permanent_prev_unit` VARCHAR(255) DEFAULT NULL,
  `permanent_prev_unit_type` VARCHAR(50) DEFAULT NULL,
  `permanent_ward_no` VARCHAR(20) DEFAULT NULL,
  `current_municipality` VARCHAR(150) DEFAULT NULL,
  `current_ward_no` VARCHAR(20) DEFAULT NULL,
  `person_name` VARCHAR(255) DEFAULT NULL,
  `person_family_head` VARCHAR(255) DEFAULT NULL,
  `family_origin_district` VARCHAR(150) DEFAULT NULL,
  `family_origin_unit` VARCHAR(255) DEFAULT NULL,
  `family_origin_ward_no` VARCHAR(20) DEFAULT NULL,
  `residence_since_bs` VARCHAR(30) DEFAULT NULL,
  `family_details` JSON DEFAULT NULL,
  `residence_locations` JSON DEFAULT NULL,
  `signatory_name` VARCHAR(255) DEFAULT NULL,
  `signatory_designation` VARCHAR(150) DEFAULT NULL,
  `applicant_name_box` VARCHAR(255) DEFAULT NULL,
  `applicant_address_box` VARCHAR(255) DEFAULT NULL,
  `applicant_citizenship_no` VARCHAR(100) DEFAULT NULL,
  `applicant_phone` VARCHAR(50) DEFAULT NULL,
  `municipality_name` VARCHAR(150) DEFAULT NULL,
  `ward_title` VARCHAR(150) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `social_security_allowance_recommendation` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `reference_no` VARCHAR(100) DEFAULT NULL,
  `chalani_no` VARCHAR(100) DEFAULT NULL,
  `date_bs` VARCHAR(30) DEFAULT NULL,
  `addressee_line1` VARCHAR(255) DEFAULT NULL,
  `addressee_line2` VARCHAR(255) DEFAULT NULL,
  `bank_name` VARCHAR(255) DEFAULT NULL,
  `bank_branch` VARCHAR(255) DEFAULT NULL,
  `beneficiary_name` VARCHAR(255) DEFAULT NULL,
  `beneficiary_address` VARCHAR(255) DEFAULT NULL,
  `beneficiary_citizenship_no` VARCHAR(100) DEFAULT NULL,
  `beneficiary_phone` VARCHAR(50) DEFAULT NULL,
  `allowance_type` VARCHAR(150) DEFAULT NULL,
  `fiscal_year` VARCHAR(50) DEFAULT NULL,
  `quarter` VARCHAR(50) DEFAULT NULL,
  `serial_no` VARCHAR(100) DEFAULT NULL,
  `signatory_name` VARCHAR(255) DEFAULT NULL,
  `signatory_designation` VARCHAR(150) DEFAULT NULL,
  `applicant_name` VARCHAR(255) DEFAULT NULL,
  `applicant_address` VARCHAR(255) DEFAULT NULL,
  `applicant_citizenship_no` VARCHAR(100) DEFAULT NULL,
  `applicant_phone` VARCHAR(50) DEFAULT NULL,
  `municipality_name` VARCHAR(150) DEFAULT NULL,
  `ward_title` VARCHAR(150) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `temporary_residence_recommendation` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `reference_no` VARCHAR(100) DEFAULT NULL,
  `chalani_no` VARCHAR(100) DEFAULT NULL,
  `date_bs` VARCHAR(30) DEFAULT NULL,
  `salutation_prefix` VARCHAR(20) DEFAULT NULL,
  `applicant_name_full` VARCHAR(255) DEFAULT NULL,
  `current_municipality` VARCHAR(150) DEFAULT NULL,
  `previous_admin_type` VARCHAR(50) DEFAULT NULL,
  `previous_ward_no` VARCHAR(20) DEFAULT NULL,
  `house_owner_prefix` VARCHAR(20) DEFAULT NULL,
  `house_owner_name` VARCHAR(255) DEFAULT NULL,
  `plot_no` VARCHAR(100) DEFAULT NULL,
  `since_date_bs` VARCHAR(30) DEFAULT NULL,
  `is_foreigner` TINYINT(1) DEFAULT 0,
  `resident_napr_no` VARCHAR(150) DEFAULT NULL,
  `resident_district` VARCHAR(150) DEFAULT NULL,
  `resident_issue_date` VARCHAR(30) DEFAULT NULL,
  `signatory_name` VARCHAR(255) DEFAULT NULL,
  `signatory_designation` VARCHAR(150) DEFAULT NULL,
  `applicant_name` VARCHAR(255) DEFAULT NULL,
  `applicant_address` VARCHAR(255) DEFAULT NULL,
  `applicant_citizenship_no` VARCHAR(100) DEFAULT NULL,
  `applicant_phone` VARCHAR(50) DEFAULT NULL,
  `municipality_name` VARCHAR(150) DEFAULT NULL,
  `ward_title` VARCHAR(150) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `three_generation_certificate` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `reference_no` VARCHAR(100) DEFAULT NULL,
  `chalani_no` VARCHAR(100) DEFAULT NULL,
  `date_bs` VARCHAR(30) DEFAULT NULL,
  `previous_admin_type` VARCHAR(50) DEFAULT NULL,
  `previous_ward_no` VARCHAR(20) DEFAULT NULL,
  `resident_prefix` VARCHAR(20) DEFAULT NULL,
  `resident_name` VARCHAR(255) DEFAULT NULL,
  `lands` JSON DEFAULT NULL,
  `generations` JSON DEFAULT NULL,
  `signatory_name` VARCHAR(255) DEFAULT NULL,
  `signatory_designation` VARCHAR(150) DEFAULT NULL,
  `applicant_name` VARCHAR(255) DEFAULT NULL,
  `applicant_address` VARCHAR(255) DEFAULT NULL,
  `applicant_citizenship_no` VARCHAR(100) DEFAULT NULL,
  `applicant_phone` VARCHAR(50) DEFAULT NULL,
  `municipality_name` VARCHAR(150) DEFAULT NULL,
  `ward_title` VARCHAR(150) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `tribal_recommendation` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `reference_no` VARCHAR(100) DEFAULT NULL,
  `chalani_no` VARCHAR(100) DEFAULT NULL,
  `date_bs` VARCHAR(30) DEFAULT NULL,
  `subject` VARCHAR(255) DEFAULT NULL,
  `person_name` VARCHAR(255) DEFAULT NULL,
  `person_relation_type` VARCHAR(50) DEFAULT NULL,
  `person_role` VARCHAR(50) DEFAULT NULL,
  `previous_admin_type` VARCHAR(50) DEFAULT NULL,
  `previous_ward_no` VARCHAR(20) DEFAULT NULL,
  `current_municipality` VARCHAR(150) DEFAULT NULL,
  `current_ward_no` VARCHAR(20) DEFAULT NULL,
  `citizenship_no` VARCHAR(100) DEFAULT NULL,
  `citizenship_issue_date` VARCHAR(50) DEFAULT NULL,
  `requester_name` VARCHAR(255) DEFAULT NULL,
  `claimed_type` VARCHAR(50) DEFAULT NULL,
  `registered_list_name` VARCHAR(255) DEFAULT NULL,
  `registered_list_name_2` VARCHAR(255) DEFAULT NULL,
  `claimed_caste` VARCHAR(255) DEFAULT NULL,
  `claimed_caste_confirm` VARCHAR(255) DEFAULT NULL,
  `signatory_name` VARCHAR(255) DEFAULT NULL,
  `signatory_designation` VARCHAR(150) DEFAULT NULL,
  `applicant_name` VARCHAR(255) DEFAULT NULL,
  `applicant_address` VARCHAR(255) DEFAULT NULL,
  `applicant_citizenship_no` VARCHAR(100) DEFAULT NULL,
  `applicant_phone` VARCHAR(50) DEFAULT NULL,
  `municipality_name` VARCHAR(150) DEFAULT NULL,
  `ward_title` VARCHAR(150) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `unmarried_verification_form` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `reference_no` VARCHAR(100) DEFAULT NULL,
  `chalani_no` VARCHAR(100) DEFAULT NULL,
  `date_bs` VARCHAR(30) DEFAULT NULL,
  `district` VARCHAR(150) DEFAULT NULL,
  `municipality` VARCHAR(150) DEFAULT NULL,
  `previous_admin` VARCHAR(50) DEFAULT NULL,
  `previous_ward_no` VARCHAR(20) DEFAULT NULL,
  `resident_name` VARCHAR(255) DEFAULT NULL,
  `spouse_name` VARCHAR(255) DEFAULT NULL,
  `child_relation` VARCHAR(50) DEFAULT NULL,
  `child_name` VARCHAR(255) DEFAULT NULL,
  `signatory_name` VARCHAR(255) DEFAULT NULL,
  `signatory_designation` VARCHAR(150) DEFAULT NULL,
  `applicant_name` VARCHAR(255) DEFAULT NULL,
  `applicant_address` VARCHAR(255) DEFAULT NULL,
  `applicant_citizenship_no` VARCHAR(100) DEFAULT NULL,
  `applicant_phone` VARCHAR(50) DEFAULT NULL,
  `municipality_name` VARCHAR(150) DEFAULT NULL,
  `ward_title` VARCHAR(150) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- admin panel
CREATE TABLE admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20),
    ward_number INT,
    position VARCHAR(50),
    username VARCHAR(50) UNIQUE,
    password VARCHAR(255),
    role ENUM('superadmin', 'admin') DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO admins 
(name, email, phone, ward_number, position, username, password, role)
VALUES 
(
  'Super Admin',
  'super@admin.com',
  '9800000000',
  0,
  'System Admin',
  'superadmin',
  '$2b$10$j17Uij3sEwDWHCqRGsin1uSwdVKaahRx7kSYpw/TInm9FC1Z8exQe',
  'superadmin'
);

SELECT username, role FROM admins;






INSERT INTO BusinessIndustryRegistrationForm (full_name) VALUES ("Test 1");
INSERT INTO BusinessIndustryRegistrationNewList (businessName) VALUES ("Biz 1");
INSERT INTO BusinessRegistrationCertificate (fullName) VALUES ("Cert 1");
INSERT INTO BusinessRegRenewCompleted (businessName) VALUES ("Renew 1");
INSERT INTO BusinessRegRenewCompleted (businessName) VALUES ("Renew 2");
INSERT INTO BusinessRegRenewCompleted (businessName) VALUES ("Renew 3");
INSERT INTO BusinessRegRenewCompleted (businessName) VALUES ("Renew 4");



SELECT * FROM DomesticAnimalInsuranceClaimRecommendation where id=4;
SELECT * FROM DomesticAnimalMaternityNutritionAllowance where id=1;
SELECT * FROM BusinessClosed;