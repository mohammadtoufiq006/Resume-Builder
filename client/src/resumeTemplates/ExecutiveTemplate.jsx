import React from 'react'

const ExecutiveTemplate = ({resume}) => {
  return (
    <div className="p-10 bg-white shadow-lg rounded">

      <h1 className="text-4xl font-semibold mb-4">
        {resume.personalInfo?.name}
      </h1>

      <p className="text-gray-600 mb-6">
        {resume.personalInfo?.email} | {resume.personalInfo?.phone} | {resume.personalInfo?.location}
      </p>

      <div>

        <h2 className="text-xl font-medium mb-2">
          Executive Summary
        </h2>

        <p className="whitespace-pre-wrap">{resume.summary}</p>

      </div>

      <div className="mt-6">

        <h2 className="text-xl font-medium mb-2">
          Key Skills
        </h2>

        <ul className="list-disc ml-5">
          {(Array.isArray(resume.skills) ? resume.skills : resume.skills?.split(",") || []).map((skill, i) => (
            <li key={i}>{skill}</li>
          ))}
        </ul>

      </div>

      <div className="mt-6">
        <h2 className="text-xl font-medium mb-2">Work Experience</h2>

        {resume.experience?.map((exp, i) => (

          <div key={i} className="mb-3">

            <p className="font-semibold">
              {exp.role} — {exp.company}
            </p>

            <p className="text-sm text-gray-500">
              {exp.startDate} - {exp.endDate}
            </p>

            <p className="text-sm">
              {exp.description}
            </p>

          </div>

        ))}

      </div>

      <div className="mt-6">

        <h2 className="text-xl font-medium mb-2">
          Education
        </h2>

        {resume.education?.map((edu, i) => (

          <div key={i} className="mb-3">

            <p className="font-semibold">
              {edu.degree}
            </p>

            <p className="text-sm text-gray-500">
              {edu.college} • {edu.year}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default ExecutiveTemplate