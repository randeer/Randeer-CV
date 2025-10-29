import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { Section } from './components/Section';
import { ExperienceItem } from './components/ExperienceItem';
import { SkillsCloud } from './components/SkillsCloud';
import { GeminiHub } from './components/GeminiHub';
import { Footer } from './components/Footer';
import { ProjectFilters } from './components/ProjectFilters';
import type { Experience, Project, Certification } from './types';

const App: React.FC = () => {

  const summary = `With over 7 years of experience as a Systems, Cloud, and DevOps Engineer, I have gained strong expertise in both Windows and Linux environments, cloud infrastructure, and disaster recovery. Throughout my career, I have successfully designed, deployed, optimized, and configured both Windows and Linux servers, cloud environments, and infrastructure. In addition to my technical expertise, I bring a strong set of analytical and troubleshooting skills. My adaptability and strong communication abilities have allowed me to effectively collaborate with diverse teams and contribute to the success of various projects. I am always eager to take on new challenges and drive success in innovative environments.`;

  const expertise = [
      "Cloud Platforms & Infrastructure: Proficient in Azure, developing and optimizing solutions for cloud deployments, automation, and scalability.",
      "Containerization & Orchestration: Extensive hands-on experience with Kubernetes and Docker.",
      "Automation & CI/CD: Skilled in implementing robust CI/CD pipelines using Jenkins, Azure DevOps, Ansible, Terraform.",
      "Backup & Disaster Recovery: Expertise in disaster recovery solutions including Veeam, ShadowProtect, Datto BCDR.",
      "Virtualization: Adept in managing VMware and Hyper-V environments.",
      "Scripting & Automation: Proficient in Powershell and Bash for automating administrative tasks."
  ];

  const experiences: Experience[] = [
    {
      date: "August 2024 – Current",
      title: "Senior Systems Support Engineer",
      company: "Halexo",
      location: "Colombo, Sri Lanka",
      points: [
        "Configured and onboarded devices to Datto RMM, applying, creating, and fine-tuning RMM policies and monitors.",
        "Resolved backup issues primarily within Datto BCDR, restoring files and performing server restoration tasks.",
        "Configured and set up Datto SaaS Protection and Spanning Backup to safeguard M365 applications.",
        "Managed Meraki devices (Firewalls, Switches, Access Points) ensuring network performance and security.",
        "Managed user and admin requests for resetting MFA, assigned roles using PIM, and managed user groups and conditional access policies.",
      ]
    },
    {
      date: "January 2023 – August 2024",
      title: "Systems Support Engineer",
      company: "Uptime Global",
      location: "Colombo, Sri Lanka",
      points: [
        "Created and managed over 100 support tickets with Microsoft and other vendors.",
        "Designed, Created and managed Terraform modules using Azure, Azure DevOps, and Microsoft Entra ID providers.",
        "Implemented security measures using SonarQube, Burp Suite, WhiteSource Mend, and Aqua Security.",
        "Deployed continuous monitoring solutions with Microsoft Defender for Cloud, Prometheus, and Grafana.",
      ]
    },
    {
        date: "June 2020 – December 2022",
        title: "Associate Systems Support Engineer",
        company: "Uptime Global",
        location: "Colombo, Sri Lanka",
        points: [
            "In-depth expertise in Windows Server (2008-2022).",
            "Experienced in managing Kubernetes clusters, including deployment, scaling of pods, and ingress controllers.",
            "Configured and deployed Docker applications.",
            "Wide-ranging experience with cloud platforms: AWS, Azure, GCP, DigitalOcean, Linode."
        ]
    },
     {
        date: "June 2017 – June 2020",
        title: "NOC Analyst",
        company: "Uptime Global",
        location: "Colombo, Sri Lanka",
        points: [
            "Proficient in managing, maintaining, and troubleshooting Windows servers, workstations, and network devices.",
            "Skilled in analyzing system logs to provide effective technical solutions (Level 1 & 2 support).",
            "Utilized RMM platforms for proactive identification, management, and maintenance of client-side servers.",
        ]
    }
  ];

  const projects: Project[] = [
      {
          title: "Implementations Project",
          points: [
              "Successfully designed, configured, and deployed scalable Windows RDS session-based and VDI-based farms.",
              "Implemented Password Hash Sync with Azure AD Connect, synchronizing on-premises Active Directory with Azure AD.",
              "Led the implementation and configuration of AVD, focusing on optimizing user profile management with FSLogix.",
              "Configured and automated the deployment of WordPress sites to Kubernetes (K8s/AKS) and Docker environments."
          ],
          technologies: ["Windows RDS", "Azure AD", "AVD", "Kubernetes", "Docker"]
      },
      {
          title: "Other Migration Project",
          points: [
              "Completed a smooth migration of GoDaddy O365 mailboxes and on-prem Exchange mailboxes using Bittitan.",
              "Migrated servers from CentOS 8 to AlmaLinux 8.",
              "Utilized Azure Site Recovery (ASR) and Hyper-V Replica for migrating on-premises Hyper-V VM servers to Azure."
          ],
          technologies: ["Azure", "Migration", "Hyper-V", "Linux"]
      },
      {
          title: "Other DevOps Project",
          points: [
              "Implemented an on-premises Kubernetes Ubuntu cluster with MetalLB.",
              "Deployed AKS (Azure Kubernetes Service) cluster on Azure.",
              "Implemented Nginx, Traefik Ingress with Cert Manager for Kubernetes.",
              "Deployed ArgoCD on Kubernetes for GitOps.",
              "Recreated CI/CD pipelines using Jenkins, Circle CI, GitHub Actions, and Azure DevOps."
          ],
          technologies: ["Kubernetes", "Azure DevOps", "AKS", "GitOps", "Jenkins", "CI/CD"]
      }
  ];

  const skills = ["Azure", "AWS", "Windows Server", "Linux", "Kubernetes", "Docker", "Terraform", "Ansible", "Jenkins", "Azure DevOps", "PowerShell", "Bash", "VMware", "Hyper-V", "GitOps", "CI/CD", "Datto", "Veeam", "Meraki", "Intune", "Microsoft 365", "SQL Server"];
  
  const certifications: Certification[] = [
    "CKA: Certified Kubernetes Administrator",
    "Microsoft Certified: Azure Security",
    "Microsoft Certified: Azure Architect",
    "Microsoft Certified: Azure Administrator Associate",
    "Red Hat Certified System Administrator",
    "HashiCorp Certified: Terraform Associate (003)",
    "Datto Technical Specialists I and II",
    "Fortinet Network Security Associate (NSE)",
  ];

  const fullResumeText = `
Randeer Lalanga
RHCSA | Azure | Windows | DevOps | Kubernetes
${summary}

Key areas of expertise:
${expertise.join('\n')}

Experience:
${experiences.map(e => `${e.date}\n${e.title} | ${e.company} | ${e.location}\n${e.points.map(p => `- ${p}`).join('\n')}`).join('\n\n')}

Project Tasks:
${projects.map(p => `${p.title}\n${p.points.map(pt => `- ${pt}`).join('\n')}`).join('\n\n')}

Skills: ${skills.join(', ')}

Education:
2021 Bachelor of Science | Network & Network Security | Kingston University London | Esoft

Certifications:
${certifications.join('\n')}
  `.trim();

  const projectFilterTags = ["All", "Kubernetes", "Azure DevOps", "Azure", "CI/CD", "Docker", "GitOps", "Migration"];
  const [selectedProjectFilter, setSelectedProjectFilter] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);

  useEffect(() => {
    if (selectedProjectFilter === 'All') {
        setFilteredProjects(projects);
    } else {
        const filtered = projects.filter(proj => 
            proj.technologies.some(tech => tech.toLowerCase().includes(selectedProjectFilter.toLowerCase()))
        );
        setFilteredProjects(filtered);
    }
  }, [selectedProjectFilter, projects]);

  // Scroll animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-fade-in-up');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);


  return (
    <div className="min-h-screen bg-gray-900/50 text-gray-300 font-sans">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
        <Header />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
          <div className="lg:col-span-2 space-y-12">
            <div className="animate-fade-in-up">
                <Section title="About Me">
                    <p className="leading-relaxed text-gray-400">{summary}</p>
                </Section>
            </div>

            <div className="animate-fade-in-up">
                <Section title="Key Areas of Expertise">
                    <ul className="space-y-4">
                        {expertise.map((item, index) => (
                            <li key={index} className="flex items-start">
                                <svg className="flex-shrink-0 h-5 w-5 text-sky-400 mt-1 mr-3" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="text-gray-400">{item}</span>
                            </li>
                        ))}
                    </ul>
                </Section>
            </div>
            
            <div className="animate-fade-in-up">
                <Section title="Work Experience">
                <div className="space-y-8">
                    {experiences.map((exp, index) => (
                    <ExperienceItem key={index} experience={exp} />
                    ))}
                </div>
                </Section>
            </div>

            <div className="animate-fade-in-up">
                 <Section title="Project Highlights">
                    <ProjectFilters 
                        tags={projectFilterTags}
                        selectedTag={selectedProjectFilter}
                        onSelectTag={setSelectedProjectFilter}
                    />
                    <div className="space-y-8">
                        {filteredProjects.length > 0 ? filteredProjects.map((proj, index) => (
                            <div key={index} className="bg-gray-800/50 p-6 rounded-lg ring-1 ring-white/10 transition-all duration-300 hover:ring-sky-400/50 hover:shadow-lg hover:shadow-sky-500/10">
                                <h3 className="font-semibold text-lg text-sky-300">{proj.title}</h3>
                                <ul className="mt-3 list-disc list-inside space-y-2 text-gray-400">
                                    {proj.points.map((point, i) => <li key={i}>{point}</li>)}
                                </ul>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {proj.technologies.map(tech => (
                                        <span key={tech} className="text-xs font-semibold bg-sky-900/50 text-sky-300 px-2 py-1 rounded-full">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )) : (
                            <p className="text-gray-500 text-center py-8">No projects match the selected filter.</p>
                        )}
                    </div>
                </Section>
            </div>
            
            <div className="animate-fade-in-up">
                <Section title="Education">
                    <div className="bg-gray-800/50 p-6 rounded-lg ring-1 ring-white/10">
                        <p className="font-semibold text-sky-300">2021</p>
                        <h3 className="font-bold text-lg text-white">Bachelor of Science in Network & Network Security</h3>
                        <p className="text-gray-400">Kingston University London | Esoft</p>
                    </div>
                </Section>
            </div>

          </div>
          <div className="space-y-12">
            <div className="animate-fade-in-up">
                 <Section title="Skills">
                    <SkillsCloud skills={skills} />
                </Section>
            </div>
            
            <div className="animate-fade-in-up">
                <Section title="Certifications">
                    <ul className="space-y-3">
                        {certifications.map((cert, index) => (
                            <li key={index} className="flex items-center text-gray-400 bg-gray-800/50 p-3 rounded-md ring-1 ring-white/10 transition-transform duration-200 hover:scale-102 hover:bg-gray-800">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-sky-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                <path fillRule="evenodd" d="M4 5a2 2 0 012-2h8a2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h.01a1 1 0 100-2H10zm3 0a1 1 0 000 2h.01a1 1 0 100-2H13z" clipRule="evenodd" />
                                </svg>
                            {cert}
                            </li>
                        ))}
                    </ul>
                </Section>
            </div>
            
            <div className="sticky top-12 animate-fade-in-up stagger-delay-1">
                <GeminiHub fullResumeText={fullResumeText} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;