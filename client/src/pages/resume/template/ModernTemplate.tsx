"use client";
import { ResumeData } from "@/types/resume";

interface ModernTemplateProps {
  data: ResumeData;
}

export const ModernTemplate = ({ data }: ModernTemplateProps) => {
  const { personalInfo, experience, education, projects, skills, languages, certifications } = data;

  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <div style={{ backgroundColor: '#ffffff', color: '#000000' }} className="font-sans leading-relaxed">
      {/* Header */}
      <div style={{ backgroundColor: '#2563eb', color: '#ffffff' }} className="p-6 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-1">{personalInfo.fullName}</h1>
            <h2 className="text-xl opacity-90 mb-3">{personalInfo.jobTitle}</h2>
            <div className="text-sm space-y-1">
              <p>{personalInfo.email} • {personalInfo.phone}</p>
              <p>{personalInfo.address}</p>
              {personalInfo.linkedin && <p>LinkedIn: {personalInfo.linkedin}</p>}
              {personalInfo.website && <p>Website: {personalInfo.website}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Professional Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <h3 style={{ color: '#2563eb', borderBottomColor: '#bfdbfe' }} className="text-lg font-semibold border-b-2 pb-1 mb-3">
            Professional Summary
          </h3>
          <p style={{ color: '#374151' }} className="leading-relaxed">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h3 style={{ color: '#2563eb', borderBottomColor: '#bfdbfe' }} className="text-lg font-semibold border-b-2 pb-1 mb-3">
            Professional Experience
          </h3>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="relative">
                <div className="flex justify-between items-start mb-1">
                  <h4 style={{ color: '#111827' }} className="font-semibold">{exp.jobTitle}</h4>
                  <span style={{ color: '#4b5563' }} className="text-sm">
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>
                <p style={{ color: '#2563eb' }} className="font-medium mb-1">{exp.company} • {exp.location}</p>
                <p style={{ color: '#374151' }} className="text-sm leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h3 style={{ color: '#2563eb', borderBottomColor: '#bfdbfe' }} className="text-lg font-semibold border-b-2 pb-1 mb-3">
            Education
          </h3>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start mb-1">
                  <h4 style={{ color: '#111827' }} className="font-semibold">{edu.degree}</h4>
                  <span style={{ color: '#4b5563' }} className="text-sm">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                <p style={{ color: '#2563eb' }} className="font-medium">{edu.school} • {edu.location}</p>
                {edu.gpa && <p style={{ color: '#4b5563' }} className="text-sm">GPA: {edu.gpa}</p>}
                {edu.description && <p style={{ color: '#374151' }} className="text-sm mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h3 style={{ color: '#2563eb', borderBottomColor: '#bfdbfe' }} className="text-lg font-semibold border-b-2 pb-1 mb-3">
            Projects
          </h3>
          <div className="space-y-3">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-start mb-1">
                  <h4 style={{ color: '#111827' }} className="font-semibold">{project.title}</h4>
                  {project.link && (
                    <a href={project.link} style={{ color: '#2563eb' }} className="text-sm hover:underline">
                      View Project
                    </a>
                  )}
                </div>
                <p style={{ color: '#374151' }} className="text-sm mb-1">{project.description}</p>
                <p style={{ color: '#2563eb' }} className="text-sm">
                  <strong>Technologies:</strong> {Array.isArray(project.technologies) ? project.technologies.join(', ') : project.technologies}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-2 gap-6">
        {/* Skills */}
        {skills.length > 0 && (
          <section className="mb-6">
            <h3 style={{ color: '#2563eb', borderBottomColor: '#bfdbfe' }} className="text-lg font-semibold border-b-2 pb-1 mb-3">
              Skills & Technologies
            </h3>
            <div className="space-y-3">
              {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                <div key={category}>
                  <h4 style={{ color: '#111827' }} className="font-medium mb-1">{category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {categorySkills.map((skill) => (
                      <span 
                        key={skill.id}
                        style={{ backgroundColor: '#dbeafe', color: '#1e40af' }} className="px-2 py-1 rounded text-xs"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Languages & Certifications */}
        <div>
          {languages.length > 0 && (
            <section className="mb-6">
              <h3 style={{ color: '#2563eb', borderBottomColor: '#bfdbfe' }} className="text-lg font-semibold border-b-2 pb-1 mb-3">
                Languages
              </h3>
              <div className="space-y-1">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between">
                    <span style={{ color: '#111827' }} className="">{lang.language}</span>
                    <span style={{ color: '#4b5563' }} className="text-sm">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {certifications.length > 0 && (
            <section className="mb-6">
              <h3 style={{ color: '#2563eb', borderBottomColor: '#bfdbfe' }} className="text-lg font-semibold border-b-2 pb-1 mb-3">
                Certifications
              </h3>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <h4 style={{ color: '#111827' }} className="font-medium">{cert.name}</h4>
                    <p style={{ color: '#666666' }} className="text-sm">{cert.issuer} • {cert.date}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  return {
    notFound: true,
  };
};

export default ModernTemplate;