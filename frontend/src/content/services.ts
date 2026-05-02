import { GraduationCap, Stamp, Compass, Award, Handshake, Languages, type LucideIcon } from "lucide-react";

export type ProcessStep = { title: string; description: string };

export type ServiceData = {
  slug: string;
  icon: LucideIcon;
  emoji: string;
  title: string;
  overviewTitle?: string;
  whyTitle?: string;
  metaTitle: string;
  metaDescription: string;
  heroDescription: string;
  overview: string;
  benefits: string[];
  whyChooseUs: string;
  stat: { value: string; label: string };
  process: ProcessStep[];
};

export const SERVICES: ServiceData[] = [
  {
    slug: "admission-guidance",
    icon: GraduationCap,
    emoji: "🎓",
    title: "Admission Guidance",
    metaTitle: "Expert University Admission Guidance – Care2 Training",
    metaDescription:
      "Care2 Training provides personalized university admission guidance, helping students select the best programs, prepare documents, SOPs, and recommendations.",
    heroDescription:
      "Care2 Training provides personalized university admission guidance, helping students select the best programs, prepare documents, SOPs, and recommendations, and submit applications on time. We also offer ongoing support through interviews, scholarships, acceptance, and pre-departure preparation to ensure a smooth study journey.",
    overview:
      "We guide students through profiling, university selection, document preparation, SOPs, interviews, and acceptance to make the admission process stress-free.",
    benefits: [
      "Smooth and Stress-Free University Admission",
      "Get Expert Help to Secure Your Spot",
      "Hassle-Free Application Process from Start to Finish",
      "Maximize Your Admission Success",
    ],
    whyChooseUs:
      "We guide students through profiling, university selection, document preparation, SOPs, interviews, and acceptance to make the admission process stress-free.",
    stat: { value: "95%", label: "Admission success with top universities" },
    process: [
      { title: "Student Profiling", description: "We assess your background and goals to create a clear study profile." },
      { title: "University Selection", description: "We match you with the best-fit programs and institutions." },
      { title: "Application Support", description: "Our team helps prepare and review all admission documents." },
      { title: "Follow-Up & Updates", description: "We track applications and keep you updated at every step." },
    ],
  },
  {
    slug: "visa-support",
    icon: Stamp,
    emoji: "🛂",
    title: "Visa Application Support",
    metaTitle: "Expert Visa Application Support – Care2 Training",
    metaDescription:
      "Care2 Training provides complete visa application support, guiding students through document preparation, application forms, and embassy procedures.",
    heroDescription:
      "Care2 Training provides complete visa application support, guiding students through document preparation, application forms, and embassy procedures. We also offer interview tips and follow-ups to increase the chances of a successful visa approval.",
    overview:
      "Care2 Training assists students in completing their visa applications efficiently and confidently.",
    benefits: [
      "Hassle-Free Visa Approval with Expert Assistance",
      "Step-by-Step Guidance for Successful Visa Processing",
      "Avoid Delays with Professional Visa Support",
      "Smooth Travel Preparation for Your Study Abroad Journey",
    ],
    whyChooseUs:
      "We help prepare documents, fill out applications, conduct mock interviews, and track progress for a smooth visa approval.",
    stat: { value: "97%", label: "Visa approval rate" },
    process: [
      { title: "Document Preparation", description: "We ensure all papers are complete and accurate." },
      { title: "Application Guidance", description: "Step-by-step help with forms and embassy requirements." },
      { title: "Interview Preparation", description: "Mock sessions and tips to build your confidence." },
      { title: "Approval Tracking", description: "We monitor progress and update you until approval." },
    ],
  },
  {
    slug: "career-pathway",
    icon: Compass,
    emoji: "💼",
    title: "Career Counseling",
    metaTitle: "Personalized Career Counseling – Care2 Training",
    metaDescription:
      "Care2 Training offers personalized career counseling to help students and professionals identify strengths, explore education and training options, and map out career paths.",
    heroDescription:
      "Care2 Training offers personalized career counseling to help students and professionals identify strengths, explore education and training options, and map out career paths. We also provide employment guidance, resume support, interview preparation, and continuous mentorship for long-term success.",
    overview:
      "We provide personalized career guidance to help students and professionals make informed decisions.",
    benefits: [
      "Find Your Perfect Career Path with Expert Guidance",
      "Make Informed Career Decisions with Confidence",
      "Explore Opportunities That Match Your Strengths",
      "Personalized Support for Your Future Goals",
    ],
    whyChooseUs:
      "From understanding strengths to mapping career paths and employment guidance, we help individuals achieve long-term career success.",
    stat: { value: "92%", label: "Career satisfaction rate" },
    process: [
      { title: "Interest Assessment", description: "We analyze your strengths, interests, and long-term goals." },
      { title: "Education Options", description: "Explore higher education, vocational training, or skill programs." },
      { title: "Career Mapping", description: "Get a personalized roadmap with short and long-term targets." },
      { title: "Employment Guidance", description: "Resume, interview, and job strategy support for your career." },
    ],
  },
  {
    slug: "scholarship-assistance",
    icon: Award,
    emoji: "🏅",
    title: "Scholarship Assistance",
    metaTitle: "Scholarship Assistance for Students – Care2 Training",
    metaDescription:
      "Care2 Training helps students identify suitable scholarships and guides them through the application process to maximize chances of receiving financial aid.",
    heroDescription:
      "Care2 Training helps students identify suitable scholarships and guides them through the application process. We provide tips, document review, and follow-ups to maximize the chances of receiving financial aid.",
    overview:
      "We help students identify, apply for, and secure scholarships for local and international studies.",
    benefits: [
      "Increase Your Chances of Receiving Scholarships",
      "Expert Guidance to Secure Financial Aid",
      "Find and Apply for the Best Scholarships",
      "Maximize Opportunities for Tuition Support",
    ],
    whyChooseUs:
      "From searching to application submission and follow-ups, we ensure students have the best chance to receive financial aid.",
    stat: { value: "90%", label: "Scholarship success rate" },
    process: [
      { title: "Scholarship Search", description: "Find the best opportunities that match your profile." },
      { title: "Eligibility Check", description: "We guide you on requirements and application criteria." },
      { title: "Application Support", description: "Assistance with forms, essays, and recommendation letters." },
      { title: "Follow-Up", description: "Regular updates to maximize your scholarship chances." },
    ],
  },
  {
    slug: "job-placement",
    icon: Handshake,
    emoji: "🤝",
    title: "Job Placement Service",
    metaTitle: "Job Placement Services – Care2 Training Support",
    metaDescription:
      "Care2 Training supports students and professionals in finding suitable job opportunities with resume building, interview preparation, and job search strategies.",
    heroDescription:
      "Care2 Training supports students and professionals in finding suitable job opportunities. We assist with resume building, interview preparation, and job search strategies to ensure successful placement.",
    overview:
      "Care2 Training provides career support to help students and professionals find suitable job opportunities.",
    benefits: [
      "Land Your Dream Job with Professional Support",
      "Resume and Interview Guidance for Success",
      "Explore Career Opportunities Confidently",
      "Personalized Job Placement Assistance",
    ],
    whyChooseUs:
      "We help with profile building, skill training, interview prep, and connecting candidates with employers.",
    stat: { value: "93%", label: "Placement success rate" },
    process: [
      { title: "Profile Building", description: "Create a strong CV and professional portfolio." },
      { title: "Skill Training", description: "Guidance on key skills to match job requirements." },
      { title: "Interview Prep", description: "Practice sessions and tips for job interviews." },
      { title: "Placement Support", description: "Connecting you with employers and opportunities." },
    ],
  },
  {
    slug: "language-coaching",
    icon: Languages,
    emoji: "🗣️",
    title: "Language Coaching",
    metaTitle: "Language Coaching for Students – Care2 Training",
    metaDescription:
      "Care2 Training offers language coaching to help students improve communication skills for academic and professional success.",
    heroDescription:
      "Care2 Training offers language coaching to help students improve communication skills for academic and professional success. We provide personalized lessons, practice sessions, and exam preparation support.",
    overview:
      "We provide language training to improve communication skills and academic performance.",
    benefits: [
      "Improve Your Communication Skills for Success",
      "Personalized Lessons to Boost Language Confidence",
      "Prepare for Academic and Professional Exams",
      "Master the Language Needed for Studies Abroad",
    ],
    whyChooseUs:
      "From assessment to exam prep and real-life practice, we help students gain confidence in speaking and writing effectively.",
    stat: { value: "95%", label: "Student confidence improvement" },
    process: [
      { title: "Language Assessment", description: "Identify your current language skills and needs." },
      { title: "Customized Lessons", description: "Tailored sessions to improve weak areas." },
      { title: "Exam Preparation", description: "Training for IELTS, TOEFL, and other tests." },
      { title: "Fluency Practice", description: "Real-life practice for confidence in speaking." },
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
