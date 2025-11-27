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

SELECT * FROM DomesticAnimalInsuranceClaimRecommendation;