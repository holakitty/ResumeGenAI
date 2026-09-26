import { ResumeData, JobConnector, TemplateConfig } from '../types/resume';

export const INITIAL_RESUME: ResumeData = {
  personalInfo: {
    fullName: 'Ranjana Guha',
    headline: 'Lead Data Analyst & Statistical Modeling Specialist (9+ Yrs Exp)',
    email: 'ranjana.guha@gmail.com',
    phone: '+91 98301 45678',
    location: 'Kolkata, West Bengal (Open to Remote / Hybrid)',
    linkedin: 'linkedin.com/in/ranjana-guha-969a9a30b/',
    github: 'github.com/ranjana-guha',
    portfolio: 'ranjanaguha-analytics.dev'
  },
  summary: 'Accomplished and results-oriented Lead Data Analyst with 9+ years of extensive experience specializing in statistical modeling, quantitative research, and end-to-end survey data analytics. Proven track record of designing rigorous statistical frameworks, multivariate models, and predictive algorithms that improved client retention by 34% and reduced survey sampling bias by 45%. Expert in Python, R, SQL, advanced survey weighting methodologies, and translating complex quantitative findings into high-impact executive strategies.',
  experiences: [
    {
      id: 'exp-1',
      company: 'Global Analytics & Research Partners',
      role: 'Lead Data Analyst & Statistical Modeler',
      location: 'Kolkata / Hybrid',
      startDate: '2021-03',
      endDate: 'Present',
      current: true,
      description: 'Heads statistical modeling, customer intelligence, and cross-functional survey analytics initiatives.',
      bullets: [
        'Spearheaded predictive statistical modeling initiatives utilizing Python, R, and SQL, developing customer churn and propensity models that boosted annual client retention by 34%.',
        'Architected end-to-end survey analytics infrastructure for global customer experience studies (NPS, CSAT, CES), processing over 250,000+ respondent datasets with automated weighting and stratified sampling adjustments.',
        'Engineered multivariate regression and ANOVA experimental designs that pinpointed key product satisfaction drivers, guiding $3.2M in roadmap investments.',
        'Built executive Power BI dashboards with DAX and advanced statistical summaries, delivering weekly automated telemetry and variance tracking to C-suite leadership.',
        'Mentored a high-performing team of 6 junior data analysts in statistical rigor, hypothesis testing, survey validation, and data storytelling.'
      ]
    },
    {
      id: 'exp-2',
      company: 'DataSphere Research Solutions',
      role: 'Senior Statistical Analyst - Consumer Insights & Surveys',
      location: 'Kolkata, India',
      startDate: '2017-06',
      endDate: '2021-02',
      current: false,
      description: 'Delivered quantitative research, statistical sampling, and survey analytics for enterprise clients.',
      bullets: [
        'Formulated statistical methodologies for multi-country market research surveys, applying factor analysis, principal component analysis (PCA), and conjoint modeling on 100K+ respondent records.',
        'Reduced sampling bias and non-response errors by 45% through post-stratification weighting, raking, and iterative proportional fitting techniques in R and SPSS.',
        'Automated cross-tabulation (crosstabs), Chi-square significance testing, and z-test calculations, reducing quarterly report generation turnaround from 12 days to 36 hours.',
        'Collaborated with product and marketing stakeholders to design reliable Likert scale surveys, testing internal consistency using Cronbach\'s alpha (>0.88).'
      ]
    },
    {
      id: 'exp-3',
      company: 'Bengal Statistical Analytics',
      role: 'Quantitative Data Analyst',
      location: 'Kolkata, India',
      startDate: '2015-01',
      endDate: '2017-05',
      current: false,
      description: 'Conducted exploratory data analysis, hypothesis testing, and statistical econometric modeling.',
      bullets: [
        'Conducted exploratory data analysis (EDA), hypothesis testing, and time-series forecasting across demographic, econometric, and retail survey datasets.',
        'Cleaned, transformed, and queried complex relational data using advanced SQL (PostgreSQL, MySQL, window functions, CTEs) and Python (Pandas, SciPy).',
        'Produced comprehensive statistical research dossiers and regression diagnostic reports adopted by regional enterprise clients.'
      ]
    }
  ],
  education: [
    {
      id: 'edu-1',
      school: 'University of Calcutta',
      degree: 'Master of Science (M.Sc.)',
      fieldOfStudy: 'Statistics',
      location: 'Kolkata, India',
      startDate: '2012',
      endDate: '2014',
      gpa: 'First Class Honors (8.6 / 10.0)',
      highlights: [
        'Specialization in Advanced Statistical Modeling, Multivariate Analysis, and Sample Surveys',
        'Academic Dissertation on Non-parametric Regression & Survey Weighting Methodologies'
      ]
    },
    {
      id: 'edu-2',
      school: 'Presidency College / University',
      degree: 'Bachelor of Science (B.Sc. Hons.)',
      fieldOfStudy: 'Statistics with Mathematics & Computer Science',
      location: 'Kolkata, India',
      startDate: '2009',
      endDate: '2012',
      gpa: 'First Class Honors',
      highlights: [
        'Coursework: Probability Theory, Statistical Inference, Design of Experiments, Sampling Techniques'
      ]
    }
  ],
  skills: [
    {
      category: 'Statistical Modeling & Analytics',
      items: ['Linear & Logistic Regression', 'Multivariate Analysis', 'ANOVA / MANOVA', 'Hypothesis Testing (t-test, Chi-square, z-test)', 'Time Series Forecasting (ARIMA)', 'Factor Analysis & PCA', 'Clustering (K-Means)', 'Propensity Score Matching']
    },
    {
      category: 'Survey Analytics & Research Design',
      items: ['Survey Design & Sampling', 'Stratified Sampling', 'Post-Stratification Weighting & Raking', 'Likert Scale Analysis', 'NPS & CSAT Measurement', 'Cross-Tabulation', 'Conjoint Analysis', 'Qualtrics / SurveyMonkey', 'Non-response Imputation']
    },
    {
      category: 'Programming & Statistical Tools',
      items: ['Python (Pandas, NumPy, SciPy, Statsmodels, Scikit-learn)', 'R (tidyverse, ggplot2, caret)', 'SQL (PostgreSQL, MySQL, Window Functions, CTEs)', 'SPSS', 'SAS', 'Stata']
    },
    {
      category: 'BI, Visualization & Tools',
      items: ['Power BI (DAX, Data Modeling)', 'Tableau', 'Advanced Excel (VBA, Pivot Tables, Solver)', 'Looker Studio', 'Git', 'Data Storytelling & Executive Reporting']
    }
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'Global Customer Experience & NPS Survey Modeling Framework',
      subtitle: 'Multivariate Survey Analytics Pipeline',
      link: 'github.com/ranjana-guha/survey-nps-framework',
      startDate: '2023',
      endDate: '2024',
      description: 'Longitudinal statistical survey engine processing 250K+ multi-channel respondent feedbacks.',
      bullets: [
        'Designed automated post-stratification sampling weight pipeline in Python and R, calibrating demographic skews and non-response bias.',
        'Constructed binomial logistic regression model isolating top 5 driver attributes predicting brand churn with 86% accuracy.'
      ]
    },
    {
      id: 'proj-2',
      title: 'Automated Statistical Significance & Cross-Tabulation Suite',
      subtitle: 'Open Source Python/R Research Tool',
      link: 'github.com/ranjana-guha/stats-crosstab-engine',
      startDate: '2022',
      endDate: '2023',
      description: 'Automated survey tabulation engine with automatic Chi-square and z-test calculations.',
      bullets: [
        'Built automated cross-tabulation generator producing formatted statistical summaries and significance flags in seconds.',
        'Adopted by market research teams to process 50+ enterprise survey waves with zero computational errors.'
      ]
    }
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'Advanced Statistical Modeling & Quantitative Methods with Python',
      issuer: 'DeepLearning.AI / Coursera',
      issueDate: '2022-11',
      credentialUrl: 'coursera.org/verify'
    },
    {
      id: 'cert-2',
      name: 'Certified Analytics Professional (CAP)',
      issuer: 'INFORMS',
      issueDate: '2021-08',
      credentialUrl: 'informs.org/cap'
    }
  ]
};

export const SAMPLE_JOB_CONNECTORS: Record<string, JobConnector> = {
  naukri_senior_data_analyst: {
    platform: 'naukri',
    jobTitle: 'Lead / Senior Data Analyst - Statistical Modeling & Survey Insights',
    company: 'Fractal Analytics (via Naukri.com)',
    location: 'Kolkata / Remote / Hybrid',
    experienceLevel: '8-12 Years',
    jobUrl: 'https://www.naukri.com/job-listings-lead-data-analyst-statistical-modeling',
    extractedKeywords: [
      'Statistical Modeling', 'Survey Data Analysis', 'Python (Pandas, SciPy, Statsmodels)',
      'R (tidyverse)', 'Advanced SQL', 'Hypothesis Testing', 'Linear & Logistic Regression',
      'ANOVA / MANOVA', 'Sampling & Weighting', 'NPS / CSAT Analytics', 'Power BI / Tableau',
      'Multivariate Analysis', 'Factor Analysis & PCA'
    ],
    rawDescription: `Role: Lead / Senior Data Analyst - Statistical Modeling & Survey Insights
Company: Fractal Analytics
Location: Kolkata / Remote / Hybrid
Experience: 8 to 12 Years

About the Role:
Fractal Analytics is seeking an experienced Lead Data Analyst with deep expertise in statistics, predictive econometric modeling, and quantitative survey research. You will lead analytical problem-solving for Fortune 500 consumer brands, designing sampling methodologies, analyzing complex multi-wave survey data, and delivering actionable strategic insights.

Key Responsibilities:
- Design and execute advanced statistical models including multivariate regression, logistic regression, factor analysis, ANOVA, and time series forecasting.
- Oversee end-to-end survey data analytics pipelines: questionnaire design review, sample size estimation, post-stratification weighting, raking, and non-response imputation.
- Analyze customer experience metrics (NPS, CSAT, brand health) across large longitudinal datasets (200k+ records).
- Extract and manipulate complex data structures using advanced SQL and Python / R.
- Develop interactive, executive-ready dashboards in Power BI and Tableau with automated variance and significance testing flags.
- Present statistical findings, predictive models, and strategic recommendations to enterprise clients and executive leadership.

Requirements:
- Master’s or Bachelor’s degree in Statistics, Econometrics, Applied Mathematics, or a quantitative discipline.
- 8+ years hands-on experience in statistical analysis, predictive modeling, and quantitative survey data processing.
- Expert-level proficiency in Python (Statsmodels, SciPy, Pandas), R, SQL, and SPSS/SAS.
- Strong knowledge of experimental design, hypothesis testing (z-test, t-test, Chi-square), and survey weighting techniques.
- Proven track record mentoring junior analysts and presenting data stories to senior management.`
  },
  indeed_lead_analytics: {
    platform: 'indeed',
    jobTitle: 'Senior Quantitative Data Analyst - Survey Science & Modeling',
    company: 'Ipsos Global Research (via Indeed)',
    location: 'Remote / Kolkata / Hybrid',
    experienceLevel: '7+ Years',
    jobUrl: 'https://www.indeed.com/viewjob?jk=indeed_ipsos_quant_analytics',
    extractedKeywords: [
      'Survey Science', 'Quantitative Analytics', 'Multivariate Statistics',
      'Python', 'R Programming', 'SQL Queries', 'Likert Scale Modeling',
      'Cross-Tabulation & Weighting', 'Conjoint Analysis', 'Power BI Dashboards'
    ],
    rawDescription: `Job Title: Senior Quantitative Data Analyst - Survey Science & Modeling
Employer: Ipsos Global Research
Location: Kolkata, West Bengal or Remote (India)

Job Overview:
Ipsos is looking for a Senior Quantitative Data Analyst to lead our statistical survey analytics division. In this role, you will apply rigorous statistical methods, cross-tabulations, and predictive models to understand consumer attitudes and market trends.

What You Will Do:
- Architect quantitative survey analysis workflows across multi-country consumer studies.
- Perform statistical significance testing, margin of error calculations, and statistical weighting (rim weighting, cell weighting).
- Build predictive algorithms and regression models to determine customer driver importance and satisfaction elasticity.
- Build clean, automated Power BI and Tableau visualization decks summarizing quantitative findings.
- Work with survey platforms (Qualtrics, Decipher) and relational databases via SQL.

Qualifications:
- 7+ years of experience in survey analytics, market research, or quantitative data modeling.
- Solid background in Statistics (M.Sc. or B.Sc. in Statistics preferred).
- Deep expertise in R, Python, SQL, and Excel/VBA.
- Experience with cross-tabulation software and statistical packages (SPSS, R, Python Statsmodels).`
  },
  naukri_lead_statistician: {
    platform: 'naukri',
    jobTitle: 'Principal Statistical Modeler - Customer Intelligence & Analytics',
    company: 'Kantar Insights (via Naukri.com)',
    location: 'Kolkata / Bangalore / Hybrid',
    experienceLevel: '9-14 Years',
    jobUrl: 'https://www.naukri.com/job-listings-principal-statistician',
    extractedKeywords: [
      'Advanced Statistics', 'Predictive Modeling', 'Propensity Scoring',
      'Customer Churn Modeling', 'Python & R', 'SQL Window Functions',
      'Design of Experiments (DoE)', 'Survey Methodology', 'SPSS / SAS'
    ],
    rawDescription: `Company: Kantar Insights
Role: Principal Statistical Modeler - Customer Intelligence
Location: Kolkata / Bangalore / Remote
Experience: 9 to 14 Years

Key Responsibilities:
- Lead the advanced statistical modeling team, developing propensity models, clustering algorithms, and customer lifetime value frameworks.
- Formulate sampling plans, survey weighting methodologies, and measurement frameworks for enterprise clients.
- Perform ANOVA, regression diagnostics, time series forecasts, and segmentation models using Python, R, and SAS.
- Translate statistical findings into executive presentations, ROI models, and growth roadmaps.
- Drive best practices in automated statistical quality control and code reusability.

Requirements:
- Postgraduate degree in Statistics, Economics, or Data Science.
- 9+ years of progressive experience in statistical data analysis and predictive modeling.
- Mastery of statistical inference, hypothesis testing, and regression analysis.`
  },
  linkedin_survey_statistician: {
    platform: 'linkedin',
    jobTitle: 'Staff Data Analyst - Survey Research & Product Analytics',
    company: 'SurveyMonkey / Momentive (via LinkedIn)',
    location: 'Kolkata / Remote (India)',
    experienceLevel: '8+ Years',
    jobUrl: 'https://www.linkedin.com/jobs/view/momentive-staff-analyst',
    extractedKeywords: [
      'Survey Methodology', 'Product Analytics', 'Data Modeling',
      'SQL & Python', 'Rake Weighting', 'Hypothesis Testing',
      'A/B Testing & Experimentation', 'Power BI / Looker', 'CSAT / NPS'
    ],
    rawDescription: `Position: Staff Data Analyst - Survey Research & Product Analytics
Company: Momentive (SurveyMonkey)
Location: Remote / Kolkata

About the Role:
We are seeking an exceptional Staff Data Analyst to drive product intelligence and survey research analytics. You will partner with product managers, research scientists, and data engineers to analyze user behavior, survey response patterns, and product telemetry.

Responsibilities:
- Conduct rigorous statistical analysis on survey datasets and product telemetry.
- Build statistical models to identify key product satisfaction drivers and reduce survey drop-off rates.
- Establish best practices for survey sampling, weighting, and data validation across global user segments.
- Construct SQL queries and Python data pipelines for executive telemetry dashboards.`
  }
};

export const TEMPLATES: TemplateConfig[] = [
  {
    id: 'harvard',
    name: 'Harvard Ivy Standard',
    tagline: 'Classic Academic & Wall St. Single-Column ATS',
    atsScoreRating: '99% ATS Parsable',
    fontFamily: 'serif',
    previewColor: '#991b1b', // Harvard Crimson
    description: 'Gold standard for applicant tracking systems. Clean horizontal rules, zero unparseable graphics, crisp serif typography, maximum readability.'
  },
  {
    id: 'modern-tech',
    name: 'Modern Tech Pro',
    tagline: 'Vibrant Electric Blue & Modern Tech Badges',
    atsScoreRating: '98% ATS Parsable',
    fontFamily: 'sans',
    previewColor: '#2563eb', // Electric Tech Blue
    description: 'Engineered for Software Engineers, Tech Leads, and Data Analysts. Clean tags for skills, prominent metrics, and modern hierarchy.'
  },
  {
    id: 'executive-slate',
    name: 'Executive Slate & Indigo',
    tagline: 'Refined Leadership & Director Hierarchy',
    atsScoreRating: '97% ATS Parsable',
    fontFamily: 'sans',
    previewColor: '#4f46e5', // Royal Indigo
    description: 'Commanding header banner, distinguished typography, and highlighted competency cards tailored for Senior, Staff, and Director-level candidates.'
  },
  {
    id: 'corporate-pro',
    name: 'Corporate Navy',
    tagline: 'Banking, Enterprise & Fortune 500 Standard',
    atsScoreRating: '98% ATS Parsable',
    fontFamily: 'sans',
    previewColor: '#1e3a8a', // Deep Royal Navy
    description: 'Deep navy section headings with structured dividers and bold action-oriented bullet points that stand out to corporate recruiters.'
  },
  {
    id: 'nordic-compact',
    name: 'Nordic Mint & Emerald',
    tagline: 'High-Density 1-Page Precision & Fresh Mint Accents',
    atsScoreRating: '96% ATS Parsable',
    fontFamily: 'sans',
    previewColor: '#059669', // Emerald Mint
    description: 'Minimalist Scandinavian aesthetic with pastel skill cards, optimizing every square millimeter for high information density.'
  },
  {
    id: 'creative-serif',
    name: 'Editorial Rose & Burgundy',
    tagline: 'Sophisticated Typography for PMs, Analysts & Strategists',
    atsScoreRating: '97% ATS Parsable',
    fontFamily: 'serif',
    previewColor: '#881337', // Luxurious Rose Burgundy
    description: 'Warm editorial Garamond styling with refined letter-spacing, executive quote-style summary, and polished editorial layout.'
  }
];
