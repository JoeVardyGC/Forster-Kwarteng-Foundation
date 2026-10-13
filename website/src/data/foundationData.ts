import type { CoreValue, ProgramPillar, BeneficiaryStory, DonationTier, FinancialMetric, FoundationProgram } from '../types';

export const FOUNDATION_INFO = {
  name: 'FORSTER KWARTENG FOUNDATION',
  shortName: 'FKF',
  motto: 'Empowering Lives, Building Futures.',
  brandStatement:
    'FORSTER KWARTENG FOUNDATION is a non profit organization established to empower individuals and communities through education, mentorship, skills development and sustainable social interventions.',
  vision:
    'To build empowered communities where every individual has the opportunity, skills and support to achieve their fullest potential.',
  mission:
    'To empower lives and build futures through education, mentorship, skills development, and sustainable community impact.',
  hqLocation: 'Accra, Ghana',
  address: 'Ring Road Central, Greater Accra Region, Ghana',
  phones: ['+233 546732812', '+233 556727083'],
  email: 'info@forsterkwartengfoundation.org',
  secondaryEmail: 'contact@forsterkwartengfoundation.org',
  website: 'www.forsterkwartengfoundation.org',
  registrationNo: 'CG098232024 / DSW/1042',
  operatingHours: 'Monday – Friday: 8:00 AM – 5:00 PM GMT',
};

export const CORE_VALUES: CoreValue[] = [
  {
    id: 1,
    name: 'Integrity',
    tagline: 'Uncompromising Truth & Ethics',
    description:
      'We operate with unwavering honesty, uprightness, and moral clarity. Every resource entrusted to us is managed with total fidelity to our beneficiaries and supporters.',
    iconName: 'ShieldCheck',
  },
  {
    id: 2,
    name: 'Compassion',
    tagline: 'Empathy in Direct Action',
    description:
      'We approach human challenges with deep empathy, walking alongside vulnerable children and families with genuine care, dignity, and active listening.',
    iconName: 'HeartHandshake',
  },
  {
    id: 3,
    name: 'Empowerment',
    tagline: 'Igniting Self-Reliance',
    description:
      'We do not simply offer temporary relief; we unlock inherent human agency by providing tools, knowledge, and confidence to build self-sustaining futures.',
    iconName: 'Sparkles',
  },
  {
    id: 4,
    name: 'Excellence',
    tagline: 'World-Class Stewardship',
    description:
      'We pursue the highest standard in every school outreach, youth training workshop, and community intervention, measuring real outcomes with diligence.',
    iconName: 'Award',
  },
  {
    id: 5,
    name: 'Accountability',
    tagline: 'Radical Transparency',
    description:
      'We take full ownership of our commitments, providing clear, open public reporting on financial allocations, project progress, and measurable social return.',
    iconName: 'FileText',
  },
  {
    id: 6,
    name: 'Collaboration',
    tagline: 'Stronger Together',
    description:
      'We forge trusted partnerships with local community chiefs, educators, faith leaders, government agencies, and global donors to amplify collective impact.',
    iconName: 'Users',
  },
  {
    id: 7,
    name: 'Sustainability',
    tagline: 'Generational Impact',
    description:
      'We design long-term solutions that continue to flourish and empower generations long after our direct interventions are successfully established.',
    iconName: 'Leaf',
  },
];

export const PROGRAM_PILLARS: ProgramPillar[] = [
  {
    id: 'education',
    title: 'Quality Education & Scholarships',
    subtitle: 'Removing Barriers to Classroom Learning',
    description:
      'Every child deserves access to inspiring learning spaces, books, and essential educational support regardless of socioeconomic background.',
    impactMetric: '1,850+ Students Supported with Scholarships & Supplies',
    iconName: 'GraduationCap',
    image: '/assets/bd FKF.png',
    keyInitiatives: [
      'Comprehensive scholarships covering term fees and exam costs',
      'Annual "Back to School" drives with backpacks, uniforms, and textbooks',
      'Rural classroom refurbishment and desk distribution programs',
      'School reading clubs and foundational literacy development',
    ],
    goals: [
      'Zero classroom dropouts due to lack of uniforms or stationery',
      'Establish 10 community library centers across underserved districts',
      'Increase basic education pass rates by 35% in partner schools',
    ],
  },
  {
    id: 'mentorship',
    title: 'Mentorship & Youth Leadership',
    subtitle: 'Nurturing Character, Vision & Purpose',
    description:
      'Guiding young minds through life transitions with structured personal guidance, career coaching, ethical leadership development, and visionary role models.',
    impactMetric: '820+ Youth Actively Mentored',
    iconName: 'Compass',
    image: '/assets/FKF mockup 1.png',
    keyInitiatives: [
      'High school and tertiary peer-to-peer mentorship circles',
      'Executive leadership masterclasses featuring Ghanaian industry leaders',
      'Character development, emotional resilience, and ethics bootcamps',
      'University entrance and career navigation counseling',
    ],
    goals: [
      'Build a nationwide alumni network of ethical young changemakers',
      'Pair 1,000 promising teenagers with certified professional mentors',
      'Host annual National Youth Leadership Summit in Accra',
    ],
  },
  {
    id: 'skills',
    title: 'Skills Acquisition & Vocational Training',
    subtitle: 'Practical Pathways to Economic Independence',
    description:
      'Equipping youth with in-demand technical, vocational, and digital skills to eradicate youth unemployment and launch scalable micro-enterprises.',
    impactMetric: '650+ Youth Trained in High-Demand Trades',
    iconName: 'Wrench',
    image: '/assets/FKF Color G.png',
    keyInitiatives: [
      'Digital literacy, web fundamentals, and smartphone graphic design',
      'Vocational masterclasses in sustainable fashion, baking, and cosmetology',
      'Hands-on apprentice toolkits distributed upon course graduation',
      'Entrepreneurship incubator: business plan pitching and starter grants',
    ],
    goals: [
      '80% post-training employment or self-employment rate within 6 months',
      'Train 500 young women in vocational technology and trade skills annually',
      'Facilitate seed capital micro-grants for top graduate ventures',
    ],
  },
  {
    id: 'community',
    title: 'Sustainable Community Interventions',
    subtitle: 'Health, Nutrition & Grassroots Resilience',
    description:
      'Addressing foundational health, maternal and child welfare, water access, and emergency social safety nets for resilient, thriving communities.',
    impactMetric: '12+ Communities Reached with Health & Welfare Interventions',
    iconName: 'HeartHandshake',
    image: '/assets/bd FKF.png',
    keyInitiatives: [
      'Free community health screenings (eye tests, blood pressure, dental)',
      'Childhood nutrition outreach and clean school water tanks',
      'Menstrual hygiene management workshops with sanitary kit distribution',
      'Emergency relief food packages for vulnerable widowed mothers and orphans',
    ],
    goals: [
      'Provide clean drinking water installations for 15 rural schools',
      'Screen 3,000 vulnerable children for preventative health annually',
      'Eradicate period poverty absenteeism in targeted primary schools',
    ],
  },
];

export const IMPACT_STATS = [
  { value: '5,000+', label: 'Lives Directly Empowered', description: 'Across Greater Accra, Eastern & Ashanti regions' },
  { value: '24+', label: 'School & Community Outreaches', description: 'Renovations, book distributions, and clinics' },
  { value: '150+', label: 'Academic Scholarships Awarded', description: 'Keeping vulnerable children consistently in school' },
  { value: '100%', label: 'Governance Transparency', description: 'Audited allocations and dedicated donor reporting' },
];

export const DONATION_TIERS: DonationTier[] = [
  {
    id: 'tier-1',
    amountGHS: 60,
    amountUSD: 5,
    label: 'Learning Essentials',
    impactDescription: 'Provides notebooks, pens, pencils, and mathematical sets for 2 school pupils for an academic term.',
  },
  {
    id: 'tier-2',
    amountGHS: 180,
    amountUSD: 15,
    label: 'School Uniform & Books',
    impactDescription: 'Funds a tailored school uniform, school bag, and required government curriculum textbooks.',
    popular: true,
  },
  {
    id: 'tier-3',
    amountGHS: 420,
    amountUSD: 35,
    label: 'Nutrition & Health',
    impactDescription: 'Covers comprehensive medical screening and daily subsidized hot meals for a vulnerable student for 3 months.',
  },
  {
    id: 'tier-4',
    amountGHS: 900,
    amountUSD: 75,
    label: 'Semester Scholarship',
    impactDescription: 'Sponsors full tuition fees, examination registration, and learning materials for an entire semester.',
  },
  {
    id: 'tier-5',
    amountGHS: 2400,
    amountUSD: 200,
    label: 'Vocational Tool-Kit',
    impactDescription: 'Equips a youth vocational graduate with a professional starter kit (sewing machine, beauty kit, or electronics set).',
  },
];

export const BENEFICIARY_STORIES: BeneficiaryStory[] = [
  {
    id: 'story-1',
    name: 'Kofi Mensah',
    role: 'Primary 5 Student, Accra',
    location: 'Chorkor, Accra',
    program: 'Quality Education & Scholarships',
    story:
      'Kofi was on the verge of dropping out when his mother lost her fish-smoking kiosk in a coastal storm. The Forster Kwarteng Foundation stepped in with a complete scholarship package, brand-new uniform, and textbooks. Today, Kofi ranks 2nd in his class and aspires to become a civil engineer.',
    quote:
      '"FKF gave me back my school uniform and made my mother smile again. I know I will finish school and build bridges for Ghana."',
    image: '/assets/FKF mockup 1.png',
    outcome: 'Maintained 88% academic average; zero days missed from school',
  },
  {
    id: 'story-2',
    name: 'Akua Serwaa',
    role: 'Youth Vocational Graduate',
    location: 'Madina, Greater Accra',
    program: 'Skills Acquisition & Vocational Training',
    story:
      'Akua completed FKF’s 4-month intensive fashion craftsmanship and business management course. Upon graduation, she received an industrial sewing starter kit. Today, she runs her own boutique and currently trains two other young teenage girls from her neighborhood.',
    quote:
      '"Before FKF, I felt stuck after high school. Now I am financially independent and employing others in my community."',
    image: '/assets/bd FKF.png',
    outcome: 'Earns sustainable monthly income; employs 2 apprentices',
  },
  {
    id: 'story-3',
    name: 'Emmanuel Boateng',
    role: 'Peer Mentor & High School Prefect',
    location: 'Tema, Ghana',
    program: 'Mentorship & Youth Leadership',
    story:
      'Through FKF’s youth leadership bootcamps, Emmanuel discovered his voice and passion for community organization. He spearheaded a peer tutoring club in his school that has helped over 40 struggling students improve their basic mathematics scores.',
    quote:
      '"Leadership is about lifting others as you climb. FKF taught me that true strength comes from integrity and service."',
    image: '/assets/foster logo main VERTICAL.png',
    outcome: 'Founded campus peer-study network with 40+ members',
  },
];

export const FINANCIAL_METRICS: FinancialMetric[] = [
  {
    category: 'Direct Frontline Programs',
    percentage: 84,
    amount: '₵ 840,000',
    color: '#000080',
    description: 'Scholarships, learning kits, vocational starter tools, and community health interventions.',
  },
  {
    category: 'Community Outreach & Logistics',
    percentage: 11,
    amount: '₵ 110,000',
    color: '#F5BD02',
    description: 'Transportation to rural areas, student monitoring, volunteer coordination, and field assessments.',
  },
  {
    category: 'Administrative & Governance',
    percentage: 5,
    amount: '₵ 50,000',
    color: '#9696CB',
    description: 'Statutory compliance, independent auditing, secure digital donor platforms, and reporting.',
  },
];

export const OUR_PROGRAMS: FoundationProgram[] = [
  {
    id: 'mental-health',
    title: 'Mental Health Awareness',
    description:
      'Providing education, resources, and support to promote mental wellness and break down stigmas surrounding mental health issues.',
    image: '/assets/program_mental_health.jpg',
  },
  {
    id: 'skills-training',
    title: 'Skills Training & Empowerment',
    description:
      'Equipping individuals with practical skills and knowledge to improve their livelihoods and achieve economic independence.',
    image: '/assets/program_skills_training.jpg',
  },
  {
    id: 'capacity-building',
    title: 'Capacity Building',
    description:
      'Strengthening organizational capabilities and community infrastructure to create sustainable, long-term impact.',
    image: '/assets/program_capacity_building.jpg',
  },
  {
    id: 'stem-tvet',
    title: 'STEM/TVET Programs',
    description:
      'Empowering youth through practical technical, vocational, and scientific training for future-ready careers.',
    image: '/assets/program_stem_tvet.jpg',
  },
  {
    id: 'community-outreach',
    title: 'Community Outreach & Charity',
    description:
      'Providing essential welfare support, nutritional aid, and emergency relief packages to vulnerable families.',
    image: '/assets/program_community_outreach.jpg',
  },
];

