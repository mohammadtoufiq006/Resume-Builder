import React from 'react'

const ClassicTemplate = ({resume}) => {
  return (
    <div className="p-8 bg-white shadow rounded-lg">

      <h1 className="text-3xl font-semibold">
        {resume.personalInfo?.name}
      </h1>

      <p className="text-gray-600">
        Email: {resume.personalInfo?.email} <br />
        Phone No.: {resume.personalInfo?.phone} <br />
        Location: {resume.personalInfo?.location}
      </p>

      <div className="mt-6">

        <h2 className="text-xl font-medium mb-2">
          Career Overview
        </h2>

        <p className="whitespace-pre-wrap">{resume.summary}</p>

      </div>

      <div className="mt-6">

        <h2 className="text-xl font-medium mb-2">
          Skills
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
  )
}

export default ClassicTemplate