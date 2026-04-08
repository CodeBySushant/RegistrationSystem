// src/utils/fetchInterceptor.js
// ─────────────────────────────────────────────────────────────────────────────
// This file intercepts ALL fetch() calls in the app.
// When any form POSTs to /api/forms/..., it automatically saves a record
// to localStorage so DailyWorkPerformanceList can show it.
// NO changes needed in any form file.
// ─────────────────────────────────────────────────────────────────────────────

import { trackSubmission } from './submissionTracker';

// Map from API endpoint → Nepali form name
// This tells us what to label each form in the daily list
const FORM_NAMES = {
  'allowance-form':                           'वृद्ध भत्ताको निवेदन',
  'business-registration':                    'व्यवसाय दर्ता दरखास्त फारम',
  'tribal-verification-recommendation':       'आदिवासी प्रमाणित सिफारिस',
  'land-boundary-verification':               'जग्गाको साँध सिमाङ्कन',
  'business-deregistration':                  'फर्म खारेजी',
  'impoverished-citizen-application':         'विपन्न नागरिक आवेदन तथा सिफारिस',
  'citizenship-husband-surname':              'पतिको वतन कायम नागरिकताको प्रतिलिपि',
  'citizenship-remove-husband':               'पतिको नाम थर वतन कायम नागरिकताको प्रतिलिपि',
  'indigenous-certification':                 'जनजाति प्रमाणित',
  'dalit-caste-certification':                'दलित जाति प्रमाणित',
  'khas-arya-certification':                  'खस आर्य जाति प्रमाणित',
  'request-for-certification':                'नागरिकता प्रमाणपत्र शैक्षिक योग्यताको फरक',
  'request-for-certification-mf':             'नागरिकता प्रमाणपत्र बुवा/आमाको नागरिकतामा फरक',
  'business-industry-registration-form':      'व्यवसाय दर्ता (नयाँ)',
  'business-registration-certificate':        'व्यवसाय दर्ता (पुरानो)',
  'business-closed':                          'व्यवसाय बन्द',
  'business-extension-pan':                   'कारोबार थप स्थायी लेखा नं',
  'business-reg-summary':                     'व्यवसाय दर्ताको विवरण पठाइदिने बारे',
  'shop-agricultural-form':                   'पसल कृषि पक्षी फर्म/दर्ता मुचुल्का',
  'shop-registration-form':                   'पसल तथा फर्म दर्ता सिफारिस',
  'industry-change':                          'उद्योगको क्षमता परिवर्तन',
  'industry-closed-notify':                   'उद्योग बन्द भएको जानकारी पत्र',
  'industry-form-cancellation':               'उद्योगको दर्ता खारेजी',
  'industry-period-summary':                  'उद्योग आवधिक विवरण',
  'industry-registration-recommendation':     'उद्योग दर्ता सिफारिस',
  'industry-transfer-acceptance-letter':      'उद्योग स्थान्तरण स्वीकृति पत्र',
  'industry-transfer-acceptance-req':         'उद्योग स्थानन्तरण स्वीकृति अनुरोध',
  'new-business-pannumber':                   'नयाँ स्थायी लेखा नं',
  'partnership-registration-application-form':'साझेदारी दर्ता आवेदन',
  'tax-clear-certificate':                    'कर चुक्ता प्रमाणपत्र',
  'citizenship-certificate-recommendation':   'नागरिकता प्रमाणपत्र सिफारिस',
  'citizenship-certificate-copy':             'नागरिकताको प्रमाण-पत्र प्रतिलिपि',
  'citizenship-mujulka':                      'नागरिकताको लागि मुचुल्का',
  'citizenship-proof-copy':                   'नागरिकता प्रतिलिपि सिफारिस',
  'citizenship-recommendation':               'नागरिकता सिफारिस',
  'citizenship-recommendation-husband':       'पतिको नाममा नेपाली नागरिकताको प्रमाण-पत्र',
  'citizenship-angkrit':                      'नेपाली अंगीकृत नागरिकता',
  'sthalagat-sarjimin-mujulka':               'स्थलगत सर्जमिन मुचुल्का',
  'bulk-loan-recommendation':                 'थोक कर्जा सिफारिस',
  'club-registration':                        'क्लब दर्ता सिफारिस',
  'committee-registration':                   'समिति दर्ता सिफारिस',
  'new-bank-account-recommendation':          'खाता खोली दिने',
  'new-organization-registration':            'संस्था दर्ता',
  'non-profit-org-registration-certificate':  'गैर नाफामुलुक संस्था दर्ता',
  'old-non-profit-org-certificate':           'गैर नाफामुलुक संस्था दर्ता पुरानो',
  'organization-registered':                  'संस्था दर्ता गरिएको',
  'organization-registration-punishment':     'सजाय पाए नपाएको',
  'organization-registration-recommendation': 'घरेलु तथा साना उद्योग दर्ता',
  'organization-renew-recommendation':        'संस्था नबिकरण सिफारिस',
  'social-organization-renew':                'सामाजिक संस्था नविकरण',
  'gov-organization-registration':            'सहकारी संस्था दर्ता सिफारिस',
  'backward-community-recommendation':        'विपन्नता सिफारिस',
  'new-class-recommendation':                 'कक्षा थप सिफारिस',
  'scholarship-recommendation':               'छात्रवृत्ति सिफारिस',
  'tap-installation-recommendation':          'धारा जडान सिफारिस',
  'electricity-installation-recommendation':  'बिजुली जडान सिफारिस',
  'electricity-installation':                 'नयाँ बिजुली जडान सिफारिस',
  'electricity-capacity-increase':            'विद्युत् क्षमता बढाउन सिफारिस',
  'road-excavation-approval':                 'सडक खन्ने स्वीकृतिको सिफारिस',
  'road-maintain-recommendation':             'नेपाल सरकारको नाममा बाटो कायम सिफारिस',
  'land-kittakat-for-road':                   'सडक सिफारिसको लागि भूमि कित्ताकाट',
  'irrigation-electric-meter':                'ससिचार विद्युत् मिटर जडान सिफारिस',
  'free-electricity-connection':              'निशुल्क विद्युत् जडान',
  'address-verification':                     'Address Verification',
  'annual-income-certificate':                'Annual Income Certificate',
  'birthdate-verification':                   'Birth Date Verification',
  'certificate-of-occupation':                'Certification of Occupation',
  'digital-verification':                     'Digital Verification',
  'economic-status':                          'Economic Status',
  'marriage-certificate-english':             'Marriage Certificate',
  'occupation-verification':                  'Occupation Verification',
  'power-of-attorney':                        'Power of Attorney',
  'property-valuation-report':                'Property Valuation Report',
  'relationship-verification':                'Relationship Verification',
  'same-person-certificate':                  'Same Person Certificate',
  'scholarship-verification':                 'Scholarship Verification',
  'tax-clear-basic':                          'Tax Clear Basic',
  'tax-clearance-certificate':                'Tax Clearance Certificate',
  'unmarried-verification':                   'Unmarried Verification',
  'address-verification-new':                 'Address Verification New',
  'annual-income-verification-new':           'Annual Income Verification New',
  'birth-certificate-new':                    'Birth Certification New',
  'occupation-verification-new':              'Occupation Verification New',
  'surname-verification-after-marriage':      'Surname Verification After Marriage',
  'surname-verification-certificate-new':     'Surname Verification Certificate',
  'tax-clearance-new-format':                 'Tax Clearance New Format',
  'verify-revised-emblem':                    'Verify Revised Emblem New',
  'advance-payment-request':                  'पेश्की अनुरोध सिफारिस',
  'bank-account-for-social-security':         'सामाजिक सुरक्षाको बैंक खाता',
  'fixed-asset-valuation':                    'अचल सम्पत्ति मुल्यांकन',
  'lekha-parikshyan':                         'लेखा परीक्षण',
  'new-beneficiary-account':                  'नयाँ लाभग्राहीको खाता खोल्न',
  'req-for-help-in-health':                   'उपचारमा आर्थिक सहायता सिफारिस',
  'social-security-payment-closure':          'सामाजिक सुरक्षा भत्ता रकम भुक्तानी गरि खाता बन्द',
  'social-security-via-guardian':             'संरक्षक मार्फत सामाजिक सुरक्षा भत्ता',
  'work-planning-completed':                  'कार्य योजना पूरा भयो सिफारिस',
  'behavior-recommendation':                  'चालचलन सिफारिस',
  'beneficiary-allowance-transfer':           'लाभग्राहीको लगत स्थानान्तरण',
  'birth-settlement-recommendation':          'जन्म / बसोबास प्रमाणित',
  'birth-verification-nepali':                'जन्म मिति प्रमाणित',
  'demised-heir-recommendation':              'मृतकका हकदारको सिफारिस',
  'demised-security-allowance-to-heir':       'मृतकको सामाजिक सुरक्षा भत्ता हकदारलाई',
  'destitute-recommendation':                 'विपन्न सिफारिस',
  'disability-identity-card-recommendation':  'अपांग परिचय पत्र सिफारिस',
  'disable-identity-card-renew':              'परिचय पत्र नविकरण',
  'electricity-connection-recommendation':    'निशुल्क विद्युत् जडान सिफारिस',
  'ethnic-identity-recommendation':           'जातीय पहिचान सिफारिस',
  'free-health-insurance-request':            'निशुल्क स्वास्थ्य बिमा',
  'income-source-certification':              'आय श्रोत प्रमाणित',
  'internal-migration-recommendation':        'आन्तरिक बसाईँसराई सिफारिस',
  'jestha-nagarik-sifaris-wada':              'जेष्ठ नागरिक सिफारिस',
  'marriage-certificate':                     'विवाह प्रमाणित',
  'minor-identity-card':                      'नाबालक परिचय पत्र',
  'minor-identity-card-recommendation':       'नाबालक परिचयपत्रको अनुसूची',
  'new-birth-verification':                   'जन्म प्रमाणिकरण new',
  'no-second-marriage-recommendation':        'दोश्रो विवाह नगरेको सिफारिस',
  'old-age-allowance':                        'पारिवारिक विवरण',
  'permanent-residence-recommendation':       'स्थायी बसोवास सिफारिस',
  'relationship-verification_form':           'नाता प्रमाणित प्रमाण पत्र new',
  'relation-temporary-residence':             'नाता प्रमाणित',
  'social-security-allowance-recommendation': 'सामाजिक सुरक्षा भत्ता',
  'temporary-residence-recommendation':       'अस्थायी बसोवास सिफारिस',
  'three-generation-certificate':             'तीन पुस्ते प्रमाणित',
  'tribal-recommendation':                    'आदिवासी सिफारिस',
  'unmarried-verification_form':              'अविवाहित प्रमाणित',
  'passport-recommendation':                  'राहदानी प्रमाण पत्र',
  'different-dob-certification':              'फरक फरक जन्म मिति प्रमाणित',
  'different-english-spelling-certification': 'फरक फरक अंग्रेजी हिज्जे प्रमाणित',
  'different-name-certification':             'फरक फरक नाम र थर सिफारिस',
  'leave-request-application':               'बिदाको निवेदन',
  'domestic-animal':                          'पशु बिमा पाउँ',
  'animal-maternity-allowance':               'गाई/भैंसी सुत्केरी पोषण भत्ता',
  'agreement-of-plan':                        'योजना सम्झौताकॊ सिफारिस',
  'withdrawal-fund-recommendation':           'रकम निकाशाको सिफारिस',
  'open-format-nepali':                       'नेपाली भाषामा',
  'nepali-language':                          'नेपाली भाषामा (नागरिकता)',
  'open-application':                         'खुल्ला निवेदन',
  'open-format-tippani':                      'टिप्पणी new',
  'partial-information':                      'सूचना अध्यावधिक',
  'acting-ward-officer-assigned':             'कार्यवाहक तोकिएको सिफारिस',
  'inter-local-transfer-recommendation':      'अन्तर स्थानीय सरुवा new',
  'ramana-patra':                             'रमाना पत्र new',
  'bhawan-nirman-sampanna':                   'भवन निर्माण प्रमाण–पत्र',
  'd-class-construction-business-license':    'घ वर्गको निर्माण व्यवसाय इजाजत पत्र',
  'drinking-water-committee-registration':    'खानेपानी उपभोक्ता संस्था दर्ता प्रमाण पत्र',
  'farmer-group-committee-registration':      'कृषक समूह/समिति दर्ता प्रमाण–पत्र',
  'boundary-recommendation':                  'चौहद्दी सिफारिस',
  'char-killa-reloaded':                      'चार किल्ला खुलाई सिफारिस new',
  'ghar-kayam-new-format':                    'घर कायम New Format',
  'governmental-land-utilization-recommendation': 'जोत भोग चलनको सिफारिस',
  'house-construction-completed-certificate': 'भुकम्प प्रतिरोधि घर निर्माण सम्पन्न प्रमाणपत्र',
  'house-destroyed-recommendation':           'घर पाताल भएको सिफारिस',
  'house-maintain-recommendation':            'घर कायम सिफारिस',
  'house-road-verification':                  'घरबाटो प्रमाणित',
  'house-verification-recommendation':        'घर जनाउने सिफारिस',
  'kitta-kat-recommendation':                 'कित्ताकाट सिफारिस',
  'land-classification-recommendation':       'जग्गा वर्गीकरण new',
  'land-consolidation-recommendation':        'जग्गा एकिकृत सिफारिस',
  'onsite-inspection-recommendation':         'स्थलगत निरीक्षण new',
  'partial-house-construction-completed-certificate': 'आंशिक / पूर्ण घर निर्माण सम्पन्न प्रमाणपत्र',
  'peski-anurodh-sifaris':                    'चार किल्ला सिफारिस',
  'property-owner-certificate-copy-recommendation':  'लालपुर्जाको प्रतिलिपि सिफारिस',
  'property-owner-certificate-house-maintain-recommendation': 'जग्गाधनी प्रमाण पुर्जामा घर कायम सिफारिस',
  'property-ownership-transfer-kitani':       'घर जग्गा नामसारी सिफारिस (किटानी)',
  'property-ownership-transfer-recommendation': 'घर जग्गा नामसारी सिफारिस',
  'property-verification-recommendation':     'सम्पत्ति प्रमाणीकरण सिफारिस',
};

// Fields to extract per form for display in the daily list
// Key = API endpoint, Value = array of field names to pick from the body
const FORM_FIELDS = {
  'allowance-form':                         ['fullName', 'ward', 'allowanceType', 'mobileNo'],
  'business-registration':                  ['proprietorName', 'businessNameNp', 'wardNo'],
  'tribal-verification-recommendation':     ['residentTitle', 'guardianName', 'tribeName'],
  'land-boundary-verification':             ['sigName', 'kittaNo', 'mainWardNo1'],
  'business-deregistration':                ['applicantName', 'firmName'],
  'impoverished-citizen-application':       ['patientName', 'applicantSigName'],
  'citizenship-husband-surname':            ['sigName', 'husbandName', 'date'],
  'citizenship-remove-husband':             ['sigName', 'currentHusbandName'],
  'indigenous-certification':               ['residentName', 'tribeName', 'wardNo'],
  'dalit-caste-certification':              ['residentName', 'casteName', 'wardNo'],
  'khas-arya-certification':                ['residentName', 'casteName', 'wardNo'],
  'request-for-certification':              ['residentName', 'sigName'],
  'request-for-certification-mf':          ['residentName', 'sigName'],
  'business-industry-registration-form':    ['full_name', 'business_name', 'ward_no'],
  'business-registration-certificate':      ['fullName', 'businessName', 'wardNo'],
  'business-closed':                        ['applicantName', 'wardNo'],
  'shop-registration-form':                 ['resident_name', 'registration_no', 'ward'],
  'industry-registration-recommendation':   ['applicant_name', 'sign_name'],
  'tax-clear-certificate':                  ['applicant_name', 'officer_name'],
  'citizenship-certificate-recommendation': ['full_name_np', 'applicant_name'],
  'citizenship-mujulka':                    ['applicant_name', 'ward_no'],
  'citizenship-recommendation':             ['applicant_name', 'date'],
  'citizenship-recommendation-husband':     ['applicant_name', 'wife_name', 'husband_name'],
  'citizenship-angkrit':                    ['applicant_name', 'citizenship_no'],
  'bulk-loan-recommendation':               ['applicantName', 'cooperativeName'],
  'club-registration':                      ['applicantName', 'clubName'],
  'committee-registration':                 ['applicantName', 'municipalityWardNo'],
  'new-organization-registration':          ['applicantName', 'organizationName'],
  'non-profit-org-registration-certificate':['applicantName', 'organizationName'],
  'organization-renew-recommendation':      ['applicantName', 'orgName'],
  'gov-organization-registration':          ['applicantName', 'proposalName'],
  'backward-community-recommendation':      ['applicant_name', 'ward_no'],
  'scholarship-recommendation':             ['applicant_name', 'child_name'],
  'tap-installation-recommendation':        ['applicant_name', 'ward_no'],
  'electricity-installation':               ['applicant_footer_name', 'applicant_municipality'],
  'electricity-capacity-increase':          ['applicant_name', 'business_name'],
  'road-excavation-approval':               ['applicant_name', 'place_for_excavation'],
  'address-verification':                   ['applicantName', 'newWardNo'],
  'annual-income-certificate':              ['applicantName', 'totalIncomeNRs'],
  'birthdate-verification':                 ['applicantName', 'dobBS'],
  'marriage-certificate-english':           ['applicantName', 'groomName', 'brideName'],
  'occupation-verification':                ['applicantName', 'occupation'],
  'tax-clearance-certificate':              ['applicantName', 'date'],
  'birth-certificate-new':                  ['applicantName', 'childName', 'dobBS'],
  'advance-payment-request':                ['applicant_name', 'total_amount'],
  'bank-account-for-social-security':       ['applicant_name', 'person_name'],
  'req-for-help-in-health':                 ['applicant_name', 'hospital_name'],
  'social-security-allowance-recommendation':['applicant_name', 'beneficiary_name', 'allowance_type'],
  'behavior-recommendation':                ['applicant_name', 'relative_name'],
  'birth-verification-nepali':              ['applicant', 'ward_no'],
  'demised-heir-recommendation':            ['applicant', 'ward_no'],
  'disability-identity-card-recommendation':['applicant_name'],
  'marriage-certificate':                   ['applicant_name', 'groom_name', 'bride_name'],
  'minor-identity-card':                    ['applicant_name', 'child_name_ne'],
  'new-birth-verification':                 ['applicant_name', 'full_name_np', 'dob_bs'],
  'passport-recommendation':                ['applicant_name', 'citizen_no'],
  'different-name-certification':           ['applicant_name_footer', 'applicant_name'],
  'domestic-animal':                        ['applicant_name', 'animal_type'],
  'animal-maternity-allowance':             ['applicant_name', 'animal_count'],
  'agreement-of-plan':                      ['applicant_name', 'project_title'],
  'open-format-nepali':                     ['applicant_name', 'subject'],
  'open-application':                       ['applicant_name', 'subject'],
  'inter-local-transfer-recommendation':    ['applicant_name_footer', 'employee_name'],
  'house-construction-completed-certificate':['applicant_name', 'ward_no'],
  'kitta-kat-recommendation':               ['applicant_name', 'ward_no'],
  'property-ownership-transfer-recommendation':['applicant_address', 'applicant_name'],
  'three-generation-certificate':           ['applicant_name', 'resident_name'],
  'permanent-residence-recommendation':     ['applicant_name_box', 'ward_no'],
  'temporary-residence-recommendation':     ['applicant_name', 'applicant_name_full'],
};

/**
 * Install the interceptor.
 * Call this ONCE in main.jsx / index.jsx before the app renders.
 */
export const installFetchInterceptor = () => {
  const originalFetch = window.fetch;

  window.fetch = async function (url, options = {}) {
    // Run the real fetch first
    const response = await originalFetch(url, options);

    try {
      // Only track POST requests to /api/forms/
      const isPost = (options.method || 'GET').toUpperCase() === 'POST';
      const isFormApi = typeof url === 'string' && url.includes('/api/forms/');

      if (isPost && isFormApi && response.ok) {
        // Extract the endpoint name from the URL
        // e.g. '/api/forms/allowance-form' → 'allowance-form'
        const endpoint = url.split('/api/forms/')[1]?.split('?')[0] ?? '';

        // Skip the daily-work-performance-list endpoint itself
        if (endpoint && endpoint !== 'daily-work-performance-list') {
          const formName = FORM_NAMES[endpoint] ?? endpoint;

          // Parse the request body to extract useful fields
          let bodyData = {};
          try {
            bodyData = JSON.parse(options.body || '{}');
          } catch {
            bodyData = {};
          }

          // Pick the relevant display fields for this form
          const fieldKeys = FORM_FIELDS[endpoint] ?? [];
          const fields = {};
          fieldKeys.forEach(key => {
            if (bodyData[key] !== undefined && bodyData[key] !== null && bodyData[key] !== '') {
              // Use Nepali-friendly label if possible, else use key as-is
              fields[key] = bodyData[key];
            }
          });

          // Also always try to capture applicant name generically
          const genericNameKey = ['applicant_name', 'applicantName', 'fullName', 'full_name',
            'sigName', 'residentName', 'employee_name'].find(k => bodyData[k]);
          if (genericNameKey) {
            fields['आवेदकको_नाम'] = bodyData[genericNameKey];
          }

          trackSubmission({ formName, fields });
        }
      }
    } catch (e) {
      // Never break the app — interceptor errors are silent
      console.warn('fetchInterceptor error (non-critical):', e);
    }

    return response;
  };
};