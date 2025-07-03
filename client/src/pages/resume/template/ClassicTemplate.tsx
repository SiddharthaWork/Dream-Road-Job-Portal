"use client";
import { ResumeData } from "@/types/resume";

interface ClassicTemplateProps {
  data: ResumeData;
}

export const ClassicTemplate = ({ data }: ClassicTemplateProps) => {
  const { personalInfo, experience, education, projects, skills, languages, certifications } = data;

  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <div style={{ backgroundColor: '#ffffff', color: '#000000' }} className="font-serif leading-relaxed">
      {/* Header */}
      <div style={{ borderBottom: '2px solid #2d3748' }} className="text-center pb-4 mb-6">
        <h1 style={{ color: '#1a202c' }} className="text-3xl font-bold mb-2">{personalInfo.fullName}</h1>
        <h2 style={{ color: '#4a5568' }} className="text-xl mb-3">{personalInfo.jobTitle}</h2>
        <div style={{ color: '#718096' }} className="text-sm space-x-3">
          <span>{personalInfo.email}</span>
          <span>•</span>
          <span>{personalInfo.phone}</span>
          <span>•</span>
          <span>{personalInfo.address}</span>
        </div>
        {(personalInfo.linkedin || personalInfo.website) && (
          <div style={{ color: '#718096' }} className="text-sm mt-1 space-x-3">
            {personalInfo.linkedin && <span>LinkedIn: {personalInfo.linkedin}</span>}
            {personalInfo.website && (
              <>
                {personalInfo.linkedin && <span>•</span>}
                <span>Website: {personalInfo.website}</span>
              </>
            )}
          </div>
        )}
      </div>

      {/* Professional Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <h3 style={{ color: '#1a202c' }} className="text-lg font-bold mb-3 uppercase tracking-wide">
            Professional Summary
          </h3>
          <p style={{ color: '#4a5568' }} className="leading-relaxed text-justify">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h3 style={{ color: '#1a202c' }} className="text-lg font-bold mb-3 uppercase tracking-wide">
            Professional Experience
          </h3>
          <div className="space-y-5">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 style={{ color: '#1a202c' }} className="font-bold">{exp.jobTitle}</h4>
                    <p style={{ color: '#4a5568' }} className="italic">{exp.company}, {exp.location}</p>
                  </div>
                  <span style={{ color: '#718096' }} className="text-sm font-medium">
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>
                <p style={{ color: '#4a5568' }} className="text-sm leading-relaxed ml-4">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h3 style={{ color: '#1a202c' }} className="text-lg font-bold mb-3 uppercase tracking-wide">
            Education
          </h3>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h4 style={{ color: '#1a202c' }} className="font-bold">{edu.degree}</h4>
                    <p style={{ color: '#4a5568' }} className="italic">{edu.school}, {edu.location}</p>
                    {edu.gpa && <p style={{ color: '#718096' }} className="text-sm">GPA: {edu.gpa}</p>}
                  </div>
                  <span style={{ color: '#718096' }} className="text-sm font-medium">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                {edu.description && <p style={{ color: '#4a5568' }} className="text-sm ml-4">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h3 style={{ color: '#1a202c' }} className="text-lg font-bold mb-3 uppercase tracking-wide">
            Notable Projects
          </h3>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-start mb-1">
                  <h4 style={{ color: '#1a202c' }} className="font-bold">{project.title}</h4>
                  {project.link && (
                    <span style={{ color: '#718096' }} className="text-sm underline">
                      {project.link}
                    </span>
                  )}
                </div>
                <p style={{ color: '#4a5568' }} className="text-sm mb-1 ml-4">{project.description}</p>
                <p style={{ color: '#718096' }} className="text-sm ml-4">
                  <strong>Technologies:</strong> {Array.isArray(project.technologies) ? project.technologies.join(', ') : project.technologies}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h3 style={{ color: '#1a202c' }} className="text-lg font-bold mb-3 uppercase tracking-wide">
            Technical Skills
          </h3>
          <div className="space-y-2">
            {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
              <div key={category} className="flex">
                <span style={{ color: '#1a202c' }} className="font-bold w-32 flex-shrink-0">{category}:</span>
                <span style={{ color: '#4a5568' }}>
                  {categorySkills.map(skill => skill.name).join(', ')}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-2 gap-8">
        {/* Languages */}
        {languages.length > 0 && (
          <section className="mb-6">
            <h3 style={{ color: '#1a202c' }} className="text-lg font-bold mb-3 uppercase tracking-wide">
              Languages
            </h3>
            <div className="space-y-1">
              {languages.map((lang) => (
                <div key={lang.id} className="flex justify-between">
                  <span style={{ color: '#1a202c' }}>{lang.language}</span>
                  <span style={{ color: '#718096' }} className="text-sm">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <section className="mb-6">
            <h3 style={{ color: '#1a202c' }} className="text-lg font-bold mb-3 uppercase tracking-wide">
              Certifications
            </h3>
            <div className="space-y-2">
              {certifications.map((cert) => (
                <div key={cert.id}>
                  <h4 style={{ color: '#1a202c' }} className="font-bold">{cert.name}</h4>
                  <p style={{ color: '#718096' }} className="text-sm">{cert.issuer}, {cert.date}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};