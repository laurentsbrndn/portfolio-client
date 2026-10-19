import { useMemo } from 'react';
import { NAV_ITEMS, type SectionId } from './constants/navigation';
import { usePortfolioData } from './hooks/usePortfolioData';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollProgress } from './components/common/ScrollProgress';
import { BackToTop } from './components/common/BackToTop';
import { PageLoader } from './components/common/PageLoader';
import { ErrorState } from './components/common/ErrorState';
import { HeroSection } from './components/sections/HeroSection';
import { WorkSection } from './components/sections/WorkSection';
import { EducationSection } from './components/sections/EducationSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { OrganizationSection } from './components/sections/OrganizationSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { CertificationSection } from './components/sections/CertificationSection';
import { ContactSection } from './components/sections/ContactSection';
import { SkillMarquee } from './components/sections/SkillMarquee';

export const App = () => {
  const { data, status, retry } = usePortfolioData();

  const work = data?.workExperience ?? [];
  const education = data?.education ?? [];
  const projects = data?.projects ?? [];
  const organizations = data?.organizationExperience ?? [];
  const skills = data?.skills ?? [];
  const languages = data?.languages ?? [];
  const certifications = data?.certifications ?? [];

  // Hide empty sections from both the page and the navbar
  const visible = useMemo<Record<SectionId, boolean>>(
    () => ({
      about: true,
      work: work.length > 0,
      education: education.length > 0,
      projects: projects.length > 0,
      organization: organizations.length > 0,
      skills: skills.length + languages.length > 0,
      credentials: certifications.length > 0,
    }),
    [work.length, education.length, projects.length, organizations.length, skills.length, languages.length, certifications.length],
  );

  const navItems = useMemo(() => NAV_ITEMS.filter((item) => visible[item.id]), [visible]);

  if (status === 'loading' && !data) return <PageLoader />;
  if (status === 'error' && !data) return <ErrorState onRetry={retry} />;

  const profile = data?.profile ?? null;

  return (
    <div className="relative min-h-dvh overflow-x-clip bg-background font-sans text-primary">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-background"
      >
        Skip to content
      </a>

      <ScrollProgress />
      <Navbar profile={profile} items={navItems} />

      <main id="main" className="mx-auto max-w-7xl px-6 md:px-8">
        <HeroSection profile={profile} />
        {skills.length > 0 && <SkillMarquee skills={skills} />}
        {visible.work && <WorkSection work={work} />}
        {visible.education && <EducationSection education={education} />}
        {visible.projects && <ProjectsSection projects={projects} />}
        {visible.organization && <OrganizationSection organizations={organizations} />}
        {visible.skills && <SkillsSection skills={skills} languages={languages} />}
        {visible.credentials && <CertificationSection certifications={certifications} />}
        <ContactSection profile={profile} />
      </main>

      <Footer profile={profile} />
      <BackToTop />
    </div>
  );
};

export default App;