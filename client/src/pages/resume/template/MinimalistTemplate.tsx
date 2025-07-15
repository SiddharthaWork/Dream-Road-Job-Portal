import { ResumeData } from "@/types/resume";

interface MinimalistTemplateProps {
  data: ResumeData;
}

export default function MinimalistTemplate({ data }: MinimalistTemplateProps) {
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
      <div className="mb-8">
        <h1 style={{ color: '#111827' }} className="text-4xl font-light mb-2">{personalInfo?.fullName}</h1>
        <h2 style={{ color: '#4b5563' }} className="text-xl mb-4">{personalInfo?.jobTitle}</h2>
        
        <div style={{ color: '#4b5563' }} className="flex flex-wrap gap-4 text-sm">
          <span>{personalInfo?.email}</span>
          <span>{personalInfo?.phone}</span>
          <span>{personalInfo?.address}</span>
          {personalInfo?.linkedin && <span>{personalInfo?.linkedin}</span>}
          {personalInfo?.website && <span>{personalInfo?.website}</span>}
        </div>
      </div>

      {/* Professional Summary */}
      {personalInfo?.summary && (
        <section className="mb-8">
          <p style={{ color: '#374151' }} className="leading-relaxed text-sm">{personalInfo?.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience?.length > 0 && (
        <section className="mb-8">
          <h3 style={{ color: '#111827' }} className="text-sm font-semibold mb-4 uppercase tracking-wider">
            Experience
          </h3>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 style={{ color: '#111827' }} className="font-medium">{exp.jobTitle}</h4>
                  <span style={{ color: '#6b7280' }} className="text-xs">
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>
                <p style={{ color: '#4b5563' }} className="text-sm mb-2">{exp.company} • {exp.location}</p>
                <p style={{ color: '#374151' }} className="text-sm leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-8">
          <h3 style={{ color: '#111827' }} className="text-sm font-semibold mb-4 uppercase tracking-wider">
            Education
          </h3>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 style={{ color: '#111827' }} className="font-medium">{edu.degree}</h4>
                  <span style={{ color: '#6b7280' }} className="text-xs">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                <p style={{ color: '#4b5563' }} className="text-sm">{edu.school} • {edu.location}</p>
                {edu.gpa && <p style={{ color: '#6b7280' }} className="text-xs">GPA: {edu.gpa}</p>}
                {edu.description && <p style={{ color: '#374151' }} className="text-sm mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-8">
          <h3 style={{ color: '#111827' }} className="text-sm font-semibold mb-4 uppercase tracking-wider">
            Projects
          </h3>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 style={{ color: '#111827' }} className="font-medium">{project.title}</h4>
                  {project.link && (
                    <span style={{ color: '#6b7280' }} className="text-xs underline">
                      View
                    </span>
                  )}
                </div>
                <p style={{ color: '#374151' }} className="text-sm mb-1">{project.description}</p>
                <p style={{ color: '#6b7280' }} className="text-xs">
                  {Array.isArray(project.technologies) ? project.technologies.join(' • ') : project.technologies}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-8">
          <h3 style={{ color: '#111827' }} className="text-sm font-semibold mb-4 uppercase tracking-wider">
            Skills
          </h3>
          <div className="space-y-3">
            {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
              <div key={category}>
                <h4 style={{ color: '#4b5563' }} className="text-xs mb-1 uppercase tracking-wider">{category}</h4>
                <p style={{ color: '#374151' }} className="text-sm">
                  {categorySkills.map(skill => skill.name).join(' • ')}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-2 gap-8">
        {/* Languages */}
        {languages.length > 0 && (
          <section className="mb-8">
            <h3 style={{ color: '#111827' }} className="text-sm font-semibold mb-4 uppercase tracking-wider">
              Languages
            </h3>
            <div className="space-y-1">
              {languages.map((lang) => (
                <div key={lang.id} className="flex justify-between text-sm">
                  <span style={{ color: '#374151' }} className="">{lang.language}</span>
                  <span style={{ color: '#6b7280' }} className="">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <section className="mb-8">
            <h3 style={{ color: '#111827' }} className="text-sm font-semibold mb-4 uppercase tracking-wider">
              Certifications
            </h3>
            <div className="space-y-2">
              {certifications.map((cert) => (
                <div key={cert.id}>
                  <h4 style={{ color: '#111827' }} className="text-sm font-medium">{cert.name}</h4>
                  <p style={{ color: '#6b7280' }} className="text-xs">{cert.issuer} • {cert.date}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  return {
    notFound: true,
  };
};