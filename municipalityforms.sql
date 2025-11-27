CREATE DATABASE IF NOT EXISTS MunicipalityForms
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
USE MunicipalityForms;

CREATE TABLE IF NOT EXISTS DomesticAnimalInsuranceClaimRecommendation (
    id INT AUTO_INCREMENT PRIMARY KEY,
    -- Applicant Section
    applicant_full_name VARCHAR(100),
    applicant_address VARCHAR(255),
    subject VARCHAR(100),
    -- Business Information
    business_name_nepali VARCHAR(255),
    business_name_english VARCHAR(255),
    business_address VARCHAR(255),
    business_district VARCHAR(100),
    business_ward INT,
    business_tole VARCHAR(100),
    business_phone VARCHAR(20),
    -- Investment
    investment_amount DECIMAL(18,2),
    investment_amount_words VARCHAR(255),
    business_type VARCHAR(100),
    main_products TEXT,
    -- Proprietor Details
    proprietor_full_name VARCHAR(100),
    -- Permanent Address (Citizenship)
    permanent_district VARCHAR(100),
    permanent_ward INT,
    permanent_tole VARCHAR(100),
    permanent_phone VARCHAR(20),
    -- Citizenship Information
    citizenship_no VARCHAR(50),
    citizenship_district VARCHAR(100),
    citizenship_issue_date DATE,
    -- Current Address
    current_district VARCHAR(100),
    current_ward INT,
    current_tole VARCHAR(100),
    -- Family Information
    grandfather_name VARCHAR(100),
    grandfather_address VARCHAR(255),
    father_name VARCHAR(100),
    father_address VARCHAR(255),
    -- Proprietor Signatures
    proprietor_signature_right VARCHAR(255),
    proprietor_signature_left VARCHAR(255),
    -- Applicant Relation
    applicant_relation VARCHAR(100),
    relation_type VARCHAR(50),
    applicant_father_name VARCHAR(100),
    -- Applicant Details
    age INT,
    applicant_address_confirmation VARCHAR(255),
    agreement_status BOOLEAN,
    -- Ward Office Section
    decision_date_bs DATE,
    ward_approval_comment TEXT,
    registered_business_name VARCHAR(255),
    registered_owner_name VARCHAR(255),
    approved_amount_numeric DECIMAL(18,2),
    approved_amount_words VARCHAR(255),
    decision_taken_by VARCHAR(100),
    submitted_by VARCHAR(100),
    approved_by VARCHAR(100),
    -- Final Summary Data
    applicant_name_final VARCHAR(100),
    applicant_final_address VARCHAR(255),
    applicant_citizenship_no VARCHAR(50),
    applicant_final_phone VARCHAR(20),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
