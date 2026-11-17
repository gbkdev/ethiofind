import type { Category, Website } from '@/types';

/**
 * Real, researched Ethiopian organizations. Every entry carries a `source`
 * record — this is the internal "research/source record" the product spec
 * calls for, surfaced to admins in /admin/research and to everyone on each
 * website's detail page. Descriptions are written fresh, not copied from
 * any source. Phone/email are omitted rather than guessed wherever they
 * could not be confirmed.
 *
 * In production this file is replaced by real queries against the
 * `websites` / `categories` tables defined in schema.sql — see
 * lib/repository/websites.ts for the swap point.
 */

export const CATEGORIES: Category[] = [
  { slug: 'government', name: 'Government & Public Services', icon: '🏛️' },
  { slug: 'finance-banking', name: 'Banks & Financial Services', icon: '🏦' },
  { slug: 'insurance', name: 'Insurance', icon: '🛡️' },
  { slug: 'jobs-careers', name: 'Jobs & Careers', icon: '💼' },
  { slug: 'education', name: 'Universities & Education', icon: '🎓' },
  { slug: 'healthcare', name: 'Healthcare', icon: '🏥' },
  { slug: 'news-media', name: 'News & Media', icon: '📰' },
  { slug: 'business', name: 'Business & Companies', icon: '🏢' },
  { slug: 'technology', name: 'Technology & Startups', icon: '💻' },
  { slug: 'shopping', name: 'E-commerce & Shopping', icon: '🛍️' },
  { slug: 'real-estate', name: 'Real Estate', icon: '🏠' },
  { slug: 'agriculture', name: 'Agriculture', icon: '🌾' },
  { slug: 'travel-tourism', name: 'Travel, Tourism & Aviation', icon: '✈️' },
  { slug: 'hotels', name: 'Hotels & Accommodation', icon: '🛏️' },
  { slug: 'food-restaurants', name: 'Restaurants & Food', icon: '🍽️' },
  { slug: 'transportation', name: 'Transportation', icon: '🚌' },
  { slug: 'telecommunications', name: 'Telecommunications', icon: '📡' },
  { slug: 'legal', name: 'Legal Services', icon: '⚖️' },
  { slug: 'ngos', name: 'NGOs & Nonprofits', icon: '🤝' },
  { slug: 'research', name: 'Research & Publications', icon: '🔬' },
  { slug: 'entertainment', name: 'Entertainment', icon: '🎬' },
  { slug: 'sports', name: 'Sports', icon: '⚽' },
  { slug: 'diaspora', name: 'Ethiopian Diaspora', icon: '🌍' },
  { slug: 'other', name: 'Other Services', icon: '✨' },
];

export const REGIONS = [
  'Addis Ababa', 'Oromia', 'Amhara', 'Tigray', 'Somali', 'Afar', 'Harari',
  'Dire Dawa', 'Benishangul-Gumuz', 'Gambela', 'Sidama', 'Central Ethiopia',
  'South Ethiopia', 'South West Ethiopia',
];

function w(partial: Omit<Website, 'tags' | 'region' | 'city' | 'status' | 'verification' | 'featured'> & Partial<Pick<Website, 'tags' | 'region' | 'city' | 'status' | 'verification' | 'featured'>>): Website {
  return {
    tags: [],
    region: 'Addis Ababa',
    city: 'Addis Ababa',
    status: 'active',
    verification: 'researched',
    featured: false,
    ...partial,
  };
}

export const WEBSITES: Website[] = [
  w({ slug: 'national-bank-of-ethiopia', name: 'National Bank of Ethiopia', url: 'https://nbe.gov.et', category: 'government', organization: 'National Bank of Ethiopia', description: "Ethiopia's central bank — regulates the financial sector and sets monetary policy.", longDescription: "The National Bank of Ethiopia (NBE) is the country's central bank and financial regulator, responsible for monetary policy, licensing and supervising banks and insurers, and foreign-exchange directives.", tags: ['central-bank', 'regulator', 'monetary-policy'], featured: true, source: { name: 'nbe.gov.et (official site) + NBE public notices', url: 'https://nbe.gov.et/' } }),
  w({ slug: 'prime-ministers-office', name: "Prime Minister's Office", url: 'https://www.pmo.gov.et', category: 'government', organization: 'Government of Ethiopia', description: 'Official site of the Office of the Prime Minister of Ethiopia.', tags: ['government', 'executive'], source: { name: 'pmo.gov.et (official site)', url: 'https://www.pmo.gov.et/' } }),
  w({ slug: 'ministry-of-foreign-affairs', name: 'Ministry of Foreign Affairs', url: 'https://mfa.gov.et', category: 'government', organization: 'Government of Ethiopia', description: "Federal ministry handling Ethiopia's diplomatic relations, consular and visa information.", tags: ['government', 'diplomacy', 'visa'], source: { name: 'mfa.gov.et (official site)', url: 'https://mfa.gov.et/' } }),
  w({ slug: 'ministry-of-planning-and-development', name: 'Ministry of Planning and Development', url: 'https://mopd.gov.et/en/', category: 'government', organization: 'Government of Ethiopia', description: 'Ministry coordinating national development planning and policy analysis.', tags: ['government', 'planning'], source: { name: 'mopd.gov.et (official site)', url: 'https://mopd.gov.et/en/' } }),
  w({ slug: 'ethiopian-government-eservices', name: 'Ethiopian Government Electronic Services', url: 'https://eservices.gov.et/en', category: 'government', organization: 'Government of Ethiopia', description: 'Central e-government portal for applying to and tracking public services online.', tags: ['e-government', 'online-services'], featured: true, source: { name: 'eservices.gov.et (official portal)', url: 'https://eservices.gov.et/en' } }),
  w({ slug: 'ethiopian-communications-authority', name: 'Ethiopian Communications Authority', url: 'https://eca.et', category: 'telecommunications', organization: 'Ethiopian Communications Authority', description: 'Regulator overseeing telecommunications and postal services in Ethiopia.', tags: ['telecom-regulator'], source: { name: 'Wikipedia — Ethiopian Telecommunication Agency (website field)', url: 'https://en.wikipedia.org/wiki/Ethiopian_Telecommunication_Agency' } }),

  w({ slug: 'commercial-bank-of-ethiopia', name: 'Commercial Bank of Ethiopia', url: 'https://www.combanketh.et', category: 'finance-banking', organization: 'Commercial Bank of Ethiopia', description: "Ethiopia's largest, state-owned bank, with the country's widest branch network.", longDescription: "Founded in 1942, CBE is Ethiopia's dominant commercial bank by assets and deposits, offering retail banking, trade finance, and the CBE Birr mobile banking app.", tags: ['banking', 'state-owned', 'mobile-banking'], featured: true, source: { name: 'Wikipedia — Commercial Bank of Ethiopia', url: 'https://en.wikipedia.org/wiki/Commercial_Bank_of_Ethiopia' } }),
  w({ slug: 'bank-of-abyssinia', name: 'Bank of Abyssinia', url: 'https://www.bankofabyssinia.com', category: 'finance-banking', organization: 'Bank of Abyssinia', description: "Ethiopia's oldest modern bank (est. 1905), now a major private commercial bank.", tags: ['banking', 'private-bank'], source: { name: 'Wikipedia — Bank of Abyssinia', url: 'https://en.wikipedia.org/wiki/Bank_of_Abyssinia' } }),
  w({ slug: 'awash-bank', name: 'Awash Bank', url: 'https://www.awashbank.com', category: 'finance-banking', organization: 'Awash International Bank', description: "One of Ethiopia's largest and most profitable private commercial banks.", tags: ['banking', 'private-bank'], source: { name: 'finance.ng — Complete List of Banks in Ethiopia', url: 'https://www.finance.ng/complete-list-of-banks-in-ethiopia/' } }),
  w({ slug: 'dashen-bank', name: 'Dashen Bank', url: 'https://www.dashenbanksc.com', category: 'finance-banking', organization: 'Dashen Bank S.C.', description: 'Large private bank known for its retail branch network and card services.', tags: ['banking', 'private-bank'], source: { name: 'finance.ng — Complete List of Banks in Ethiopia', url: 'https://www.finance.ng/complete-list-of-banks-in-ethiopia/' } }),
  w({ slug: 'nib-international-bank', name: 'Nib International Bank', url: 'https://www.nibbanksc.com', category: 'finance-banking', organization: 'Nib International Bank S.C.', description: 'Private commercial bank established in 1999, offering retail and forex services.', tags: ['banking', 'private-bank'], source: { name: 'Wikipedia — Nib International Bank', url: 'https://en.wikipedia.org/wiki/Nib_International_Bank' } }),
  w({ slug: 'tsedey-bank', name: 'Tsedey Bank', url: 'https://tsedeybank-sc.com', category: 'finance-banking', organization: 'Tsedey Bank S.C.', description: 'Full-service commercial bank that grew out of the Amhara Credit & Savings Institution.', tags: ['banking', 'microfinance-heritage'], source: { name: 'Wikipedia — Tsedey Bank', url: 'https://en.wikipedia.org/wiki/Tsedey_Bank' } }),
  w({ slug: 'cooperative-bank-of-oromia', name: 'Cooperative Bank of Oromia', url: 'https://coopbankoromia.com.et', category: 'finance-banking', organization: 'Cooperative Bank of Oromia', description: 'Cooperative-rooted commercial bank with one of the largest branch footprints in Ethiopia.', tags: ['banking', 'cooperative'], source: { name: 'finance.ng — Complete List of Banks in Ethiopia', url: 'https://www.finance.ng/complete-list-of-banks-in-ethiopia/' } }),
  w({ slug: 'wegagen-bank', name: 'Wegagen Bank', url: 'https://www.wegagen.com', category: 'finance-banking', organization: 'Wegagen Bank S.C.', description: 'Established private bank offering retail, trade finance and interest-free banking.', tags: ['banking', 'private-bank'], source: { name: 'finance.ng — Complete List of Banks in Ethiopia', url: 'https://www.finance.ng/complete-list-of-banks-in-ethiopia/' } }),
  w({ slug: 'hibret-bank', name: 'Hibret Bank', url: 'https://www.hibretbank.com.et', category: 'finance-banking', organization: 'Hibret Bank S.C.', description: 'Private commercial bank with a fast-growing retail balance sheet.', tags: ['banking', 'private-bank'], source: { name: 'finance.ng — Complete List of Banks in Ethiopia', url: 'https://www.finance.ng/complete-list-of-banks-in-ethiopia/' } }),

  w({ slug: 'ethio-telecom', name: 'Ethio Telecom', url: 'https://www.ethiotelecom.et', category: 'telecommunications', organization: 'Ethio Telecom', description: "Ethiopia's national telecom operator — mobile, fixed line, broadband and the Telebirr mobile-money service.", longDescription: "State-owned Ethio Telecom has historically been the country's dominant internet, telephony and digital-services provider, offering mobile and fixed connectivity plus the Telebirr mobile money platform.", tags: ['telecom', 'mobile-money', 'internet'], featured: true, source: { name: 'Wikipedia — Ethio Telecom', url: 'https://en.wikipedia.org/wiki/Ethio_Telecom' } }),

  w({ slug: 'fana-broadcasting-corporate', name: 'Fana Broadcasting Corporate', url: 'https://www.fanabc.com', category: 'news-media', organization: 'Fana Broadcasting Corporate S.C.', description: 'Radio and television broadcaster covering national news, politics and current affairs.', tags: ['news', 'broadcast', 'radio'], source: { name: 'Wikipedia — Fana Broadcasting Corporate', url: 'https://en.wikipedia.org/wiki/Fana_Broadcasting_Corporate' } }),
  w({ slug: 'ethiopian-broadcasting-corporation', name: 'Ethiopian Broadcasting Corporation (EBC)', url: 'https://www.ebc.et', category: 'news-media', organization: 'Ethiopian Broadcasting Corporation', description: "Ethiopia's oldest and largest public broadcaster, operating multiple TV and radio channels.", tags: ['news', 'tv', 'public-broadcaster'], featured: true, source: { name: 'Wikipedia — Ethiopian Broadcasting Corporation', url: 'https://en.wikipedia.org/wiki/Ethiopian_Broadcasting_Corporation' } }),
  w({ slug: 'walta-media', name: 'Walta Media and Communication Corporate', url: 'https://www.waltainfo.com', category: 'news-media', organization: 'Walta Media and Communication Corporate S.C.', description: 'State-affiliated media outlet producing news and TV programming since 1994.', tags: ['news', 'media'], source: { name: 'Wikipedia — Walta', url: 'https://en.wikipedia.org/wiki/Walta' } }),
  w({ slug: 'ethiopian-news-agency', name: 'Ethiopian News Agency', url: 'https://www.ena.et', category: 'news-media', organization: 'Ethiopian News Agency', description: "Ethiopia's oldest news organization and the government's official wire service.", tags: ['news', 'wire-service'], source: { name: 'Wikipedia — Ethiopian News Agency', url: 'https://en.wikipedia.org/wiki/Ethiopian_News_Agency' } }),

  w({ slug: 'addis-ababa-university', name: 'Addis Ababa University', url: 'https://www.aau.edu.et', category: 'education', organization: 'Addis Ababa University', description: "Ethiopia's oldest and largest higher-education and research institution.", longDescription: 'Established in 1950, AAU spans thirteen campuses and offers undergraduate through PhD programs across natural sciences, engineering, medicine, law, business and the humanities.', tags: ['university', 'research'], featured: true, source: { name: 'Wikipedia — Addis Ababa University', url: 'https://en.wikipedia.org/wiki/Addis_Ababa_University' } }),
  w({ slug: 'jimma-university', name: 'Jimma University', url: 'https://www.ju.edu.et', category: 'education', organization: 'Jimma University', description: 'Public research university known for its community-based health sciences education model.', tags: ['university', 'health-sciences'], region: 'Oromia', city: 'Jimma', source: { name: 'Ministry of Education — Universities list', url: 'https://moe.gov.et/sector-institutions-universties' } }),
  w({ slug: 'bahir-dar-university', name: 'Bahir Dar University', url: 'https://www.bdu.edu.et', category: 'education', organization: 'Bahir Dar University', description: 'Comprehensive public university offering engineering, education and natural-science programs.', tags: ['university'], region: 'Amhara', city: 'Bahir Dar', source: { name: 'Ministry of Education — Universities list', url: 'https://moe.gov.et/sector-institutions-universties' } }),
  w({ slug: 'mekelle-university', name: 'Mekelle University', url: 'https://www.mu.edu.et', category: 'education', organization: 'Mekelle University', description: "One of Ethiopia's largest public universities, based in Tigray region.", tags: ['university'], region: 'Tigray', city: 'Mekelle', source: { name: 'FAO AGRIS registry — Mekelle University', url: 'https://www.fao.org/agris/ru/node/125728' } }),
  w({ slug: 'addis-ababa-science-and-technology-university', name: 'Addis Ababa Science and Technology University', url: 'https://www.aastu.edu.et', category: 'education', organization: 'AASTU', description: "One of Ethiopia's two specialized science-and-technology universities, focused on applied engineering.", tags: ['university', 'engineering'], source: { name: 'AASTU official site + Wikipedia', url: 'https://www.aastu.edu.et/' } }),
  w({ slug: 'debre-berhan-university', name: 'Debre Berhan University', url: 'https://www.dbu.edu.et', category: 'education', organization: 'Debre Berhan University', description: 'Public university offering undergraduate and graduate programs north of Addis Ababa.', tags: ['university'], region: 'Amhara', city: 'Debre Berhan', source: { name: 'Ministry of Education — Universities list', url: 'https://moe.gov.et/sector-institutions-universties' } }),

  w({ slug: 'ethiojobs', name: 'EthioJobs', url: 'https://ethiojobs.net', category: 'jobs-careers', organization: 'Info Mind Solutions PLC', description: "Ethiopia's longest-running online job board, listing vacancies across NGOs, private sector and government.", longDescription: 'Launched in 2004, Ethiojobs.net is a widely used e-recruitment platform in Ethiopia, connecting employers with job seekers across sectors including NGOs, finance, IT and health.', tags: ['jobs', 'recruitment'], featured: true, source: { name: 'Ethiojobs.net (official) + LinkedIn company page', url: 'https://ethiojobs.net/' } }),
  w({ slug: 'ezega', name: 'Ezega.com', url: 'https://www.ezega.com', category: 'jobs-careers', organization: 'Ezega.com', description: 'Long-running Ethiopian community site with a large job-listings section alongside news and directories.', tags: ['jobs', 'community-site'], source: { name: 'Ezega.com Jobs section', url: 'https://www.ezega.com/Jobs/index' } }),

  w({ slug: 'ethiopian-airlines', name: 'Ethiopian Airlines', url: 'https://www.ethiopianairlines.com', category: 'travel-tourism', organization: 'Ethiopian Airlines Group', description: "Africa's largest airline group by fleet and destinations, headquartered in Addis Ababa.", tags: ['flights', 'aviation'], featured: true, source: { name: 'Ethiopian Airlines official site', url: 'https://www.ethiopianairlines.com/' } }),

  w({ slug: 'iceaddis', name: 'iceaddis', url: 'https://www.iceaddis.com', category: 'technology', organization: 'iceAddis', description: 'Innovation hub and co-creation space supporting Ethiopian tech founders and startups.', tags: ['startups', 'innovation-hub'], source: { name: 'iceaddis.com (official site)', url: 'https://www.iceaddis.com/' } }),

  w({ slug: 'st-pauls-hospital-millennium-medical-college', name: "St. Paul's Hospital Millennium Medical College", url: 'https://sphmmc.edu.et', category: 'healthcare', organization: "St. Paul's Hospital Millennium Medical College", description: "One of Ethiopia's largest public hospitals and a major medical training institution.", tags: ['hospital', 'medical-college'], source: { name: 'Wikipedia + Ministry of Health facility page', url: 'https://www.moh.gov.et/St_Pauls_Hospital_Millennium_Medical_College' } }),

  w({ slug: 'bio-and-emerging-technology-institute', name: 'Bio and Emerging Technology Institute', url: 'https://www.betin.gov.et', category: 'research', organization: 'BETin', description: 'Government research institute working on biotechnology policy and genomics research partnerships.', tags: ['research', 'biotechnology'], source: { name: 'Wikipedia — Ethiopian Biotechnology Institute', url: 'https://en.wikipedia.org/wiki/Ethiopian_Biotechnology_Institute' } }),
];
