import type {
  CoreValue,
  ProgramPillar,
  BeneficiaryStory,
  DonationTier,
  FinancialMetric,
  FoundationProgram,
  ProgramArticle,
  UpcomingProjectEvent,
  MomoAccount,
  BankAccount,
} from '../types';

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
  address: 'Greater Accra, Ghana',
  phones: ['+233 546732812', '+233 556727083'],
  email: 'info@forsterkwartengfoundation.org',
  secondaryEmail: 'contact@forsterkwartengfoundation.org',
  website: 'www.forsterkwartengfoundation.org',
  registrationNo: '000000000000000000000',
  operatingHours: 'Monday – Friday: 8:00 AM – 5:00 PM GMT',
};

export const DEFAULT_MOMO_ACCOUNTS: MomoAccount[] = [
  {
    id: 'momo-1',
    network: 'MTN Mobile Money',
    badge: 'MTN MoMo',
    badgeColor: 'bg-[#FFCB05] text-slate-950 border border-amber-400',
    logo: '/assets/mtn_momo_logo.svg',
    number: '0546732812',
    formatted: '054 673 2812',
    accountName: 'Forster Kwarteng Foundation',
    reference: 'FKF Donation',
    isPrimary: true,
  },
  {
    id: 'momo-2',
    network: 'Telecel Cash',
    badge: 'Telecel Cash',
    badgeColor: 'bg-red-500 text-white',
    logo: null,
    number: '0556727083',
    formatted: '055 672 7083',
    accountName: 'Forster Kwarteng Foundation',
    reference: 'FKF Donation',
    isPrimary: false,
  },
];

export const DEFAULT_BANK_ACCOUNTS: BankAccount[] = [
  {
    id: 'bank-1',
    bankName: 'GCB Bank PLC / Ecobank Ghana',
    accountName: 'Forster Kwarteng Foundation',
    accountNumber: '1041009823420',
    branch: 'High Street Branch, Accra',
    swiftCode: 'GCBLGHAC',
    routingCode: '040101',
    currency: 'GHS & USD / Multi-Currency',
    country: 'Ghana',
    isPrimary: true,
  },
];

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
    iconName: 'Zap',
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
  {
    value: '5,000+',
    label: 'Lives Directly Empowered',
    description: 'Across Greater Accra, Eastern & Ashanti regions',
  },
  {
    value: '9',
    label: 'Schools & Communities Reached',
    description: 'Direct grassroots educational & social interventions',
  },
  {
    value: '100%',
    label: 'Governance Transparency',
    description: 'Audited allocations and dedicated donor reporting',
  },
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
    role: 'Primary 5 Student & Scholar',
    location: 'Chorkor, Accra',
    program: 'Quality Education & Scholarships',
    story:
      'Kofi was on the verge of dropping out when his mother lost her fish-smoking kiosk in a coastal storm. The Forster Kwarteng Foundation stepped in with a complete scholarship package, brand-new uniform, and textbooks. Today, Kofi ranks 2nd in his class and aspires to become a civil engineer.',
    quote:
      '"FKF gave me back my school uniform and made my mother smile again. I know I will finish school and build bridges for Ghana."',
    image: '/assets/orphan_boy_classroom.jpg',
    outcome: 'Maintained 88% academic average; zero days missed from school',
  },
  {
    id: 'story-2',
    name: 'Akua Serwaa',
    role: 'Youth Vocational Graduate & Boutique Owner',
    location: 'Madina, Greater Accra',
    program: 'Skills Acquisition & Vocational Training',
    story:
      'Akua completed FKF’s 4-month intensive fashion craftsmanship and business management course. Upon graduation, she received an industrial sewing starter kit. Today, she runs her own boutique and currently trains two other young teenage girls from her neighborhood.',
    quote:
      '"Before FKF, I felt stuck after high school. Now I am financially independent and employing others in my community."',
    image: '/assets/about_story_photo.png',
    outcome: 'Earns sustainable monthly income; employs 2 local apprentices',
  },
  {
    id: 'story-3',
    name: 'Emmanuel Boateng',
    role: 'Peer Mentor & High School Prefect',
    location: 'Tema, Greater Accra',
    program: 'Mentorship & Youth Leadership',
    story:
      'Through FKF’s youth leadership bootcamps, Emmanuel discovered his voice and passion for community organization. He spearheaded a peer tutoring club in his school that has helped over 40 struggling students improve their basic mathematics scores.',
    quote:
      '"Leadership is about lifting others as you climb. FKF taught me that true strength comes from integrity and service."',
    image: '/assets/orphan_community_outreach.jpg',
    outcome: 'Founded campus peer-study network with 40+ active members',
  },
  {
    id: 'story-4',
    name: 'Abena Osei',
    role: 'Reading Club Leader & BECE Graduate',
    location: 'Ashaiman, Greater Accra',
    program: 'Girl-Child Literacy & Mentorship',
    story:
      'Abena struggled with reading confidence and was at risk of leaving junior high. Through the FKF Saturday reading circles and dedicated girl-child mentors, she not only passed her BECE with distinction but now leads reading sessions for younger girls in her community.',
    quote:
      '"FKF showed me that my voice matters. Today, I stand tall knowing I can read, write, and inspire younger girls in Ashaiman."',
    image: '/assets/orphan_girls_reading.jpg',
    outcome: 'Passed BECE with distinction; leads weekly reading circle',
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
    title: 'STEM/TVET Projects',
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

export const PROGRAM_ARTICLES: Record<string, ProgramArticle> = {
  'mental-health': {
    id: 'mental-health',
    title: 'Mental Health Awareness & Psycho-Social Support',
    category: 'Health & Emotional Wellbeing',
    readTime: '4 min read',
    publishedDate: 'October 2024 Edition',
    location: 'Greater Accra & Eastern Regions',
    summary:
      'The Mental Health Awareness and Psycho-Social Support project is a pioneering grassroots initiative dedicated to breaking deep-rooted cultural stigma surrounding psychological wellbeing across Ghanaian basic schools and community hubs. By integrating trauma-informed psycho-educational workshops into local schools and youth groups, we equip adolescents, teachers, and young caregivers with practical emotional resilience tools and stress-coping strategies. The program establishes confidential safe-space counseling centers staffed by licensed psychological practitioners and trained peer counselors, offering free one-on-one therapy sessions, peer debriefing circles, and early crisis intervention. Through community-wide town hall forums, community radio broadcasts, and youth-led awareness rallies, we are actively shifting community mindsets from isolation to empathy, ensuring every young person has access to compassionate mental healthcare without fear of judgment.',
    coverImage: '/assets/program_mental_health.jpg',
    coverImageCaption: 'FKF peer counselors facilitating a youth emotional wellness circle in Kasoa.',
    impactStats: [
      {
        value: '1,450+',
        label: 'Youth Screened',
        description: 'Received free psycho-social assessment and confidential counseling support.',
      },
      {
        value: '18',
        label: 'Partner Schools',
        description: 'Equipped with active student-led peer wellness and empathy ambassador clubs.',
      },
      {
        value: '100%',
        label: 'Free Community Care',
        description: 'Zero cost barrier for all students and caregivers accessing clinical psychologists.',
      },
      {
        value: '89%',
        label: 'Reported Progress',
        description: 'Participants reporting reduced anxiety, improved emotional resilience, and academic focus.',
      },
    ],
    challenge: {
      headline: 'The Silent Crisis Across Ghanaian Classrooms & Communities',
      body: [
        'In many Ghanaian communities, psychological distress, chronic depression, and trauma are deeply misunderstood—frequently dismissed as spiritual afflictions or personal weaknesses. Because of the intense fear of social ostracization, adolescents suffer in isolation.',
        'Vulnerable teenagers in peri-urban public schools shoulder heavy emotional burdens: extreme family poverty, grief, domestic disruption, and mounting academic pressure. Without accessible counselors or compassionate listeners, unresolved distress manifests in chronic absenteeism, self-harm, and early school dropout.',
      ],
      statHighlight: {
        number: '1 in 4',
        text: 'West African youth experience persistent anxiety or depressive symptoms, yet less than 3% have access to professional mental health support.',
      },
    },
    intervention: {
      title: 'Our 3-Pillar Community Mental Wellness Model',
      description:
        'We bridge the public health gap by embedding preventative, empathetic, and culturally grounded care directly into schools, youth groups, and community hubs.',
      phases: [
        {
          phase: '01',
          title: 'School-Wide Townhalls & Stigma Eradication',
          description:
            'Interactive workshops and storytelling sessions that demystify mental wellness, equip students with vocabulary for emotional regulation, and normalize seeking help.',
        },
        {
          phase: '02',
          title: 'Confidential Safe Spaces & One-on-One Counseling',
          description:
            'Licensed volunteer psychologists and certified social workers conduct free, private therapy sessions for students navigating trauma, grief, and severe stress.',
        },
        {
          phase: '03',
          title: 'Student Wellness Ambassador Clubs',
          description:
            'We train student peer leaders in basic active listening, conflict mediation, and crisis identification so every school maintains an everyday safety net.',
        },
      ],
    },
    beneficiaryQuote: {
      quote:
        'Before FKF came to our school, I suffered panic attacks and felt like I was losing my mind. Having someone listen to me without judgment gave me the courage to breathe and believe in myself again.',
      author: 'Eunice Mensah',
      role: 'SHS Finalist & Peer Wellness Ambassador',
      location: 'Kasoa, Central Region',
      image: '/assets/hero_girls_right.jpg',
      outcome: 'Overcame panic disorder; now mentors 25 junior peers in her school club.',
    },
    video: {
      title: 'Inside Our Youth Wellness Circles: Breaking the Stigma in Accra',
      duration: '3:45 mins',
      thumbnail: '/assets/program_mental_health.jpg',
      description:
        'Step inside an FKF school outreach session and witness students breaking the silence around mental health and discovering hope together.',
    },
    sdgBadges: [
      { number: 'SDG 3', title: 'Good Health & Well-being', color: '#4C9F38' },
      { number: 'SDG 4', title: 'Quality Education', color: '#C5192D' },
      { number: 'SDG 10', title: 'Reduced Inequalities', color: '#DD1367' },
    ],
    donationTiers: [
      {
        amountGHS: 120,
        amountUSD: 10,
        label: 'Student Wellness Journal',
        impact: 'Provides 3 students with guided mental health self-reflection notebooks and coping toolkits.',
      },
      {
        amountGHS: 350,
        amountUSD: 30,
        label: '1-on-1 Counseling Session',
        impact: 'Funds 2 confidential sessions with a licensed clinical psychologist for a vulnerable youth.',
        popular: true,
      },
      {
        amountGHS: 1200,
        amountUSD: 100,
        label: 'School Townhall Sponsorship',
        impact: 'Funds a full-day destigmatization workshop reaching 200+ students and teachers.',
      },
    ],
    relatedProgramIds: ['skills-training', 'capacity-building', 'community-outreach'],
  },

  'skills-training': {
    id: 'skills-training',
    title: 'Skills Training & Economic Empowerment',
    category: 'Livelihoods & Enterprise',
    readTime: '5 min read',
    publishedDate: 'September 2024 Edition',
    location: 'Ashanti & Greater Accra Regions',
    summary:
      'Our Skills Training and Economic Empowerment initiative is engineered to break chronic cycles of poverty by equipping out-of-school youth, young mothers, and vulnerable school-leavers with practical, market-aligned vocational craftsmanship. Operating across peri-urban communities in Accra and the Ashanti Region, the program provides comprehensive hands-on training in high-demand trades—including fashion design, precision carpentry, cosmetic technology, and electronics servicing—under the guidance of certified master artisans. Beyond technical competence, trainees complete rigorous modules in financial literacy, digital commerce, bookkeeping, and customer relations. Upon graduation, each participant receives an industrial-grade starter toolkit and six months of dedicated commercial mentorship, transforming vulnerable job-seekers into confident micro-enterprise owners who generate sustainable household incomes and create employment opportunities for others in their neighborhoods.',
    coverImage: '/assets/program_skills_training.jpg',
    coverImageCaption: 'Trainees in an intensive fashion craftsmanship and garment technology masterclass.',
    impactStats: [
      {
        value: '820+',
        label: 'Artisans Certified',
        description: 'Graduated from our hands-on vocational modules with government-aligned certifications.',
      },
      {
        value: '76%',
        label: 'Micro-Businesses Launched',
        description: 'Graduates currently operating viable independent enterprises within 6 months of completion.',
      },
      {
        value: '450+',
        label: 'Toolkits Distributed',
        description: 'Equipped graduates with industrial starter machines, tools, and work stations.',
      },
      {
        value: '3.2x',
        label: 'Household Income Growth',
        description: 'Average verified rise in monthly earnings among program beneficiaries.',
      },
    ],
    challenge: {
      headline: 'Bridging the Vocational Unemployment Divide for Vulnerable Youth',
      body: [
        'Each year, over 280,000 Ghanaian youth complete basic or secondary school without the financial means to enroll in tertiary universities or direct entry points into formal salaried positions.',
        'Without market-relevant trade competencies, young people find themselves trapped in informal precarious work. Traditional apprenticeship systems often charge steep non-refundable registration and equipment fees, systematically shutting out children from underprivileged households.',
      ],
      statHighlight: {
        number: '72%',
        text: 'of youth in peri-urban settlements identify lack of startup tools as the primary barrier preventing them from earning a sustainable livelihood.',
      },
    },
    intervention: {
      title: 'Accelerated Craftsmanship to Sustainable Enterprise',
      description:
        'A comprehensive 4-month vocational incubation pathway blending technical mastery, bookkeeping, digital commerce, and capital equipment provision.',
      phases: [
        {
          phase: '01',
          title: 'High-Demand Practical Apprenticeship',
          description:
            'Direct training in fashion design, advanced tailoring, cosmetic technology, modern barbering, and electronics servicing led by master craftspeople.',
        },
        {
          phase: '02',
          title: 'Financial Literacy & Mobile Commerce',
          description:
            'Modules on cashflow accounting, mobile money bookkeeping, customer negotiation, and utilizing social media to market artisanal services.',
        },
        {
          phase: '03',
          title: 'Graduation Starter Toolkits & Mentorship',
          description:
            'Upon practical examination, every graduate receives an industrial-grade starter kit and is paired with an experienced commercial mentor for 6 months.',
        },
      ],
    },
    beneficiaryQuote: {
      quote:
        'When I received my industrial sewing machine upon graduation, my whole life transformed. Today I have my own workshop and I pay the school fees for my two younger brothers.',
      author: 'Akua Serwaa',
      role: 'Fashion Entrepreneur & FKF Alumna',
      location: 'Madina, Greater Accra',
      image: '/assets/bd FKF.png',
      outcome: 'Employs 2 apprentices; runs a sustainable fashion kiosk.',
    },
    video: {
      title: 'From Trainees to Business Owners: The 2024 Vocational Showcase',
      duration: '4:10 mins',
      thumbnail: '/assets/program_skills_training.jpg',
      description:
        'Step inside our training workshops and hear direct testimonies from young women and men reclaiming their economic futures.',
    },
    gallery: [
      {
        url: '/assets/program_skills_training.jpg',
        caption: 'Apprentices mastering precision pattern cutting and industrial sewing.',
      },
      {
        url: '/assets/bd FKF.png',
        caption: 'Graduation day: receiving professional sewing starter toolkits.',
      },
      {
        url: '/assets/hero_boy_right.jpg',
        caption: 'Practical electronics and appliance servicing workshop in session.',
      },
      {
        url: '/assets/hero_group_right.jpg',
        caption: 'Class of 2024 youth artisans presenting their final commercial projects.',
      },
    ],
    sdgBadges: [
      { number: 'SDG 1', title: 'No Poverty', color: '#E5243B' },
      { number: 'SDG 8', title: 'Decent Work & Economic Growth', color: '#A21942' },
      { number: 'SDG 5', title: 'Gender Equality', color: '#FF3A21' },
    ],
    donationTiers: [
      {
        amountGHS: 250,
        amountUSD: 20,
        label: 'Training Materials Bundle',
        impact: 'Covers fabrics, cutting shears, and practical consumables for 1 trainee for a month.',
      },
      {
        amountGHS: 950,
        amountUSD: 80,
        label: 'Vocational Tuition Sponsor',
        impact: 'Full 4-month tuition and business management masterclass for 1 vulnerable youth.',
        popular: true,
      },
      {
        amountGHS: 2400,
        amountUSD: 200,
        label: 'Complete Starter Toolkit',
        impact: 'Gifts a brand new industrial sewing machine or electronics toolkit to an honor graduate.',
      },
    ],
    relatedProgramIds: ['stem-tvet', 'capacity-building', 'community-outreach'],
  },

  'capacity-building': {
    id: 'capacity-building',
    title: 'Capacity Building & Community Resilience',
    category: 'Institutional Growth',
    readTime: '4 min read',
    publishedDate: 'August 2024 Edition',
    location: 'National Reach (Ghana)',
    summary:
      'Our Capacity Building and Community Resilience initiative focuses on institutional strengthening, civic empowerment, and sustainable local leadership across peri-urban settlements in Ghana. Recognizing that enduring progress must be community-driven, this program conducts intensive governance masterclasses, project management bootcamps, and grassroots leadership workshops for local youth organizers, assembly members, and non-profit volunteers. Participants learn transparent resource allocation, grant accountability, participatory community needs assessment, and ethical public administration. By establishing neighborhood monitoring committees and collaborative action taskforces, we empower community members to take collective ownership of their local schools, sanitation infrastructure, and social amenities, fostering self-reliance and ensuring development interventions deliver transparent, measurable, and lasting results for generations to come.',
    coverImage: '/assets/program_capacity_building.jpg',
    coverImageCaption: 'Community leaders and grassroots volunteers participating in strategic planning.',
    impactStats: [
      {
        value: '48',
        label: 'Grassroots Groups Trained',
        description: 'Community-based organizations mentored in governance and statutory compliance.',
      },
      {
        value: '320+',
        label: 'Leaders Certified',
        description: 'Civic leaders, teachers, and youth organizers certified in project management.',
      },
      {
        value: '15',
        label: 'Civic Projects Launched',
        description: 'Community-financed sanitation, education, and water maintenance initiatives.',
      },
      {
        value: '94%',
        label: 'Sustainability Rate',
        description: 'Trained projects remaining actively operational 12+ months post-intervention.',
      },
    ],
    challenge: {
      headline: 'Moving Beyond Short-Lived Philanthropic Hand-outs',
      body: [
        'Top-down philanthropic hand-outs often fail to produce enduring transformation because local leaders are rarely equipped with governance, financial accountability, and project execution frameworks.',
        'Without strong grassroots institutional muscle, newly built facilities fall into disrepair, donor funds lack transparent oversight, and promising community initiatives collapse once external sponsors depart.',
      ],
      statHighlight: {
        number: '60%',
        text: 'of community non-profits in developing regions fold within 3 years due to governance gaps, not lack of passion.',
      },
    },
    intervention: {
      title: 'Building Enduring Local Institutions & Leaders',
      description:
        'We train local organizers, teachers, and parent-teacher associations with professional governance and accountability frameworks.',
      phases: [
        {
          phase: '01',
          title: 'Governance & Financial Accountability',
          description:
            'Rigorous modules on transparent donor reporting, ethical record-keeping, statutory registration, and dual-authorization finances.',
        },
        {
          phase: '02',
          title: 'Grant Writing & Resource Mobilization',
          description:
            'Coaching grassroots organizers to craft compelling proposals, pitch domestic philanthropists, and crowdsource sustainably.',
        },
        {
          phase: '03',
          title: 'Monitoring, Evaluation & Peer Auditing',
          description:
            'Implementing real-time data collection tools to track program outcomes and maintain community trust.',
        },
      ],
    },
    beneficiaryQuote: {
      quote:
        'FKF taught our association how to manage funds with strict transparency. That credibility enabled us to secure community counterpart funding to renovate our town library.',
      author: 'Kwame Owusu-Ansah',
      role: 'Chairman, Community Development Committee',
      location: 'Ejisu, Ashanti Region',
      image: '/assets/orphan_community_outreach.jpg',
      outcome: 'Mobilized community matching funds for 2 local civic projects.',
    },
    gallery: [
      {
        url: '/assets/program_capacity_building.jpg',
        caption: 'Leadership workshop on transparent budget allocation and grant compliance.',
      },
      {
        url: '/assets/orphan_community_outreach.jpg',
        caption: 'Field session evaluating local water access and youth facility maintenance.',
      },
      {
        url: '/assets/hero_outreach_right.jpg',
        caption: 'Collaborative group breakout on community stakeholder engagement.',
      },
      {
        url: '/assets/hero_group_right.jpg',
        caption: 'Graduation of certified community development officers.',
      },
    ],
    sdgBadges: [
      { number: 'SDG 16', title: 'Peace, Justice & Strong Institutions', color: '#00689D' },
      { number: 'SDG 17', title: 'Partnerships for the Goals', color: '#19486A' },
      { number: 'SDG 11', title: 'Sustainable Communities', color: '#FD9D24' },
    ],
    donationTiers: [
      {
        amountGHS: 200,
        amountUSD: 17,
        label: 'Leader Training Kit',
        impact: 'Equips 1 local community organizer with governance manuals, templates, and digital toolkits.',
      },
      {
        amountGHS: 600,
        amountUSD: 50,
        label: 'NGO Compliance Workshop',
        impact: 'Sponsors a full weekend governance workshop for 5 grassroots youth club leaders.',
        popular: true,
      },
      {
        amountGHS: 1800,
        amountUSD: 150,
        label: 'Civic Incubator Seed Grant',
        impact: 'Provides micro-grant funding for an audited, community-led clean water or school renovation project.',
      },
    ],
    relatedProgramIds: ['stem-tvet', 'mental-health', 'skills-training'],
  },

  'stem-tvet': {
    id: 'stem-tvet',
    title: 'STEM/TVET Projects & Digital Literacy',
    category: 'Science, Technology & Vocational',
    readTime: '5 min read',
    publishedDate: 'October 2024 Edition',
    location: 'Greater Accra, Central & Volta Regions',
    summary:
      'The STEM & TVET Innovation Labs program bridges the widening digital divide by democratizing access to high-impact science, technology, engineering, and vocational apprenticeship for underprivileged basic and junior high students across underserved Ghanaian districts. Through mobile experiential tech labs and subsidized weekend masterclasses, students gain direct hands-on immersion in block and text coding, algorithmic logic, renewable solar installation, and interactive robotics problem-solving. We partner with local schools to establish maker-spaces equipped with laptop workstations, microcontroller kits, and electronics testing gear, breaking theoretical educational barriers. By pairing students with industry mentors in computing and engineering, the program sparks technological curiosity, equips teenagers with future-ready skills, and prepares them to build home-grown solutions to pressing national infrastructure and environmental challenges.',
    coverImage: '/assets/program_stem_tvet.jpg',
    coverImageCaption: 'Students collaborating on electronic circuit design and robotics programming.',
    impactStats: [
      {
        value: '1,600+',
        label: 'Students in STEM',
        description: 'Trained in block coding, physical computing, and fundamental engineering.',
      },
      {
        value: '24',
        label: 'Mobile Tech Labs',
        description: 'Deployed solar-powered STEM trunks to schools lacking IT infrastructure.',
      },
      {
        value: '48%',
        label: 'Female Enrollment',
        description: 'Promoting gender equity in robotics, programming, and technical crafts.',
      },
      {
        value: '12',
        label: 'National Finalists',
        description: 'Student teams qualifying for Ghana’s National Youth Robotics Tournament.',
      },
    ],
    challenge: {
      headline: 'Democratizing the Digital Frontier for Underserved Ghanaian Youth',
      body: [
        'While the global economy accelerates into software engineering, artificial intelligence, and automation, thousands of Ghanaian public school students have never touched a keyboard or wired an electronic circuit.',
        'Rote theoretical science memorization in schools fails to prepare youth for high-wage technological careers, deepening existing socio-economic divides between privileged private schools and under-resourced public institutions.',
      ],
      statHighlight: {
        number: '< 15%',
        text: 'of public basic schools in peri-urban Ghana have functional, internet-connected computer laboratories.',
      },
    },
    intervention: {
      title: 'Experiential STEM Without Physical Boundaries',
      description:
        'We bring experiential engineering and coding into classrooms using mobile, self-powered tech trunks.',
      phases: [
        {
          phase: '01',
          title: 'Mobile STEM Discovery Labs',
          description:
            'Deploying solar-powered laptops and micro-controller hardware kits directly to public school classrooms.',
        },
        {
          phase: '02',
          title: 'Code, Circuitry & Problem Solving',
          description:
            'Project-based curricula teaching block coding, Python, sensor wiring, and renewable energy modeling.',
        },
        {
          phase: '03',
          title: 'Innovation Hackathons & TVET Pathways',
          description:
            'Annual competitions where students solve localized community issues (e.g., smart agriculture sensors, solar lamps).',
        },
      ],
    },
    beneficiaryQuote: {
      quote:
        'I used to think computer programming was only for students in expensive private schools. Building my first solar battery circuit with FKF made me realize that I can be a computer engineer.',
      author: 'Priscilla Boadi',
      role: 'JHS 3 Student & Hackathon Winner',
      location: 'Pokuase, Greater Accra',
      image: '/assets/orphan_girls_reading.jpg',
      outcome: 'Built solar-powered study lamp; received Senior High STEM scholarship.',
    },
    video: {
      title: 'Igniting the Spark: The Next Generation of Ghanaian Inventors',
      duration: '4:02 mins',
      thumbnail: '/assets/program_stem_tvet.jpg',
      description:
        'See primary and junior high school students code their first robots and build clean energy prototypes.',
    },
    gallery: [
      {
        url: '/assets/program_stem_tvet.jpg',
        caption: 'Young coders building sensor-driven robotics prototypes.',
      },
      {
        url: '/assets/orphan_girls_reading.jpg',
        caption: 'Girls in Tech cohort mastering digital design and research.',
      },
      {
        url: '/assets/orphan_boy_classroom.jpg',
        caption: 'Hands-on basic circuitry and renewable electronics workshop.',
      },
      {
        url: '/assets/hero_boy_right.jpg',
        caption: 'Student demonstrating automated flood warning sensor at annual showcase.',
      },
    ],
    sdgBadges: [
      { number: 'SDG 4', title: 'Quality Education', color: '#C5192D' },
      { number: 'SDG 9', title: 'Industry, Innovation & Infrastructure', color: '#F36D25' },
      { number: 'SDG 5', title: 'Gender Equality', color: '#FF3A21' },
    ],
    donationTiers: [
      {
        amountGHS: 180,
        amountUSD: 15,
        label: 'Student Robotics Kit',
        impact: 'Supplies 1 student with an Arduino micro-controller, sensors, and breadboard.',
      },
      {
        amountGHS: 600,
        amountUSD: 50,
        label: 'Tech Bootcamp Seat',
        impact: 'Funds 1 student for a full 6-week weekend software coding and robotics camp.',
        popular: true,
      },
      {
        amountGHS: 3000,
        amountUSD: 250,
        label: 'Refurbished Mobile Laptop',
        impact: 'Donates a ruggedized learning laptop to our travelling school STEM trunk.',
      },
    ],
    relatedProgramIds: ['skills-training', 'mental-health', 'community-outreach'],
  },

  'community-outreach': {
    id: 'community-outreach',
    title: 'Community Outreach, Nutrition & Emergency Charity',
    category: 'Frontline Welfare & Relief',
    readTime: '4 min read',
    publishedDate: 'October 2024 Edition',
    location: 'Greater Accra, Central & Eastern Regions',
    summary:
      'Our Grassroots Community Care and Relief outreach serves as a rapid-response humanitarian lifeline for vulnerable families, orphans, and single mothers living in underserved informal settlements throughout Ghana. During seasonal floods, socio-economic crises, and back-to-school enrollment periods, our volunteer field teams mobilize door-to-door to deliver targeted social safety nets—including emergency dry food baskets, water purification supplies, infant nutritional packs, and fully furnished educational backpacks. Working alongside trusted community elders and faith leaders, we conduct household vulnerability verifications to ensure direct, dignified aid delivery to those most at risk. Beyond emergency relief, our outreach teams facilitate medical screening referrals, welfare support case management, and family livelihood assistance, restoring dignity, safeguarding child education, and bringing tangible hope directly to the doorsteps of those who need it most.',
    coverImage: '/assets/program_community_outreach.jpg',
    coverImageCaption: 'Volunteers distributing essential nutritional supplies and school hampers.',
    impactStats: [
      {
        value: '4,200+',
        label: 'Relief Packs Delivered',
        description: 'Wholesome food parcels and hygiene kits provided to families in crisis.',
      },
      {
        value: '950+',
        label: 'Children Retained',
        description: 'Students supported with school supplies to prevent dropout and child labor.',
      },
      {
        value: '8',
        label: 'Health Caravans',
        description: 'Mobile community medical screenings detecting pediatric illnesses early.',
      },
      {
        value: '100%',
        label: 'Emergency Direct Reach',
        description: 'Direct door-to-door frontline distribution with full community audit trail.',
      },
    ],
    challenge: {
      headline: 'When Hunger & Destitution Threaten a Child’s Right to Learn',
      body: [
        'A child cannot learn on an empty stomach. In underserved coastal fishing towns and peri-urban centers, economic shocks often force families to pull children out of school to hawk in street traffic.',
        'Sudden medical emergencies or inflationary spikes leave widowed mothers and elderly caregivers with zero safety net, putting infant nutrition and childhood development at grave risk.',
      ],
      statHighlight: {
        number: '18%',
        text: 'of children in rural Ghana suffer from stunting and chronic malnutrition affecting cognitive potential.',
      },
    },
    intervention: {
      title: 'Frontline Compassion Where Needs Are Greatest',
      description:
        'A rapid, dignified community relief network ensuring no child goes hungry or misses school due to poverty.',
      phases: [
        {
          phase: '01',
          title: 'Targeted Vulnerability Mapping',
          description:
            'Partnering with local assembly members and school heads to identify families at imminent risk of destitution.',
        },
        {
          phase: '02',
          title: 'Nutritional Aid & Health Caravans',
          description:
            'Distributing wholesome food staples, vitamin supplements, and basic pediatric check-ups directly to doorsteps.',
        },
        {
          phase: '03',
          title: 'Back-to-School Dignity Packages',
          description:
            'Gifting brand-new school uniforms, leather footwear, exercise books, and bags so children return to class with pride.',
        },
      ],
    },
    beneficiaryQuote: {
      quote:
        'When the market fire destroyed my food stall, I could not feed my grandchildren. FKF arrived with rice, oil, and paid their school registration. They were our angels in the darkest hour.',
      author: 'Madam Beatrice Darko',
      role: 'Grandmother & Petty Trader',
      location: 'Chorkor, Accra',
      image: '/assets/orphan_boy_classroom.jpg',
      outcome: '3 grandchildren returned to school; received micro-grant to restock kiosk.',
    },
    sdgBadges: [
      { number: 'SDG 2', title: 'Zero Hunger', color: '#DDA63A' },
      { number: 'SDG 1', title: 'No Poverty', color: '#E5243B' },
      { number: 'SDG 3', title: 'Good Health & Well-being', color: '#4C9F38' },
    ],
    donationTiers: [
      {
        amountGHS: 150,
        amountUSD: 12,
        label: 'Family Nutrition Hamper',
        impact: 'Feeds a family of 4 with essential staples (rice, oil, grains, legumes) for 2 weeks.',
      },
      {
        amountGHS: 450,
        amountUSD: 40,
        label: 'Back-to-School Dignity Pack',
        impact: 'Equips 1 child with custom uniform, sturdy shoes, school bag, and year’s books.',
        popular: true,
      },
      {
        amountGHS: 1500,
        amountUSD: 125,
        label: 'Emergency Medical & Food Relief',
        impact: 'Covers urgent medication and 2 months of nutritional support for an impoverished household.',
      },
    ],
    relatedProgramIds: ['mental-health', 'skills-training', 'stem-tvet'],
  },
};

export const UPCOMING_PROJECTS: UpcomingProjectEvent[] = [
  {
    id: 'back-to-school-rural-outreach',
    title: 'Annual Back-to-School Rural Outreach & Textbook Distribution',
    category: 'Education Sponsorship',
    targetDate: '2026-11-05T09:00:00',
    formattedDate: 'Thursday, November 5, 2026',
    time: '9:00 AM – 3:00 PM GMT',
    location: 'Prampram & Kpone Basic Schools, Greater Accra',
    summary:
      'Our flagship annual educational distribution mobilizes field educators and volunteer teams to equip over 500 orphaned and economically vulnerable primary pupils across peri-urban Prampram and Kpone with comprehensive educational packages. Each child receives government-approved syllabus textbooks, custom-tailored school uniforms, sturdy backpacks, mathematical geometry instruments, and essential writing stationery, removing economic barriers to classroom attendance and giving every child the confidence to thrive throughout the academic year.',
    image: '/assets/orphan_boy_classroom.jpg',
    status: 'Featured',
    highlightMetric: {
      value: '500+ Pupils',
      label: 'Target Beneficiaries',
    },
    tags: ['Education', 'Textbooks', 'Rural Outreach'],
  },
  {
    id: 'youth-tvet-skills-summit',
    title: 'Youth TVET & Vocational Apprenticeship Summit',
    category: 'Skills Development',
    targetDate: '2026-11-22T10:00:00',
    formattedDate: 'Sunday, November 22, 2026',
    time: '10:00 AM – 4:30 PM GMT',
    location: 'Madina Community Center, Greater Accra',
    summary:
      'A full-day intensive skills exhibition and apprenticeship matching summit bringing together over 120 out-of-school youth, vocational educators, and certified commercial master artisans. Participants engage in interactive live masterclasses across electrical wiring, solar repair, garment construction, and mobile money bookkeeping, culminating in direct enrollment into subsidized six-month apprenticeship programs equipped with commercial starter toolkits upon certification.',
    image: '/assets/program_skills_training.jpg',
    status: 'Upcoming',
    highlightMetric: {
      value: '120 Youth',
      label: 'Apprentices Enrolled',
    },
    tags: ['Vocational', 'Youth Jobs', 'Starter Kits'],
  },
  {
    id: 'community-health-mental-wellness-camp',
    title: 'Community Health Screening & Mental Wellness Camp',
    category: 'Healthcare & Wellness',
    targetDate: '2026-12-12T08:30:00',
    formattedDate: 'Saturday, December 12, 2026',
    time: '8:30 AM – 4:00 PM GMT',
    location: 'Pokuase Community Clinic, Greater Accra',
    summary:
      'A community-wide wellness outreach providing comprehensive, zero-cost preventive healthcare and psychological support to over 800 underserved residents. Licensed medical practitioners deliver diagnostic vital screenings, optical examinations, and malaria tests alongside confidential one-on-one psycho-social counseling sessions led by mental health specialists to address stress, depression, and family trauma in a safe, compassionate environment.',
    image: '/assets/program_community_outreach.jpg',
    status: 'Upcoming',
    highlightMetric: {
      value: '800+ Care Sessions',
      label: 'Projected Reach',
    },
    tags: ['Health Camp', 'Mental Health', 'Free Medical'],
  },
];


