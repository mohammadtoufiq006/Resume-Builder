import {useState, useEffect, useRef} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {createResume, getResumes, getResumeById, updateResume} from '../services/resumeService.js';
import TemplatePreview from '../components/TemplatePreview.jsx';
import { useReactToPrint } from 'react-to-print';
import generateSummary  from "../services/aiService.js";

const ResumeEditor = () => {
  const {id} = useParams();
  const navigate = useNavigate();

  const [template, setTemplate] = useState("classic");
  const [isPremium, setIsPremium] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      location: ""
    },
    summary: "",
    skills: "",
    experience: [
    {
      company: "",
      role: "",
      startDate: "",
      endDate: "",
      description: ""
    }
  ],
  education: [
    {
      college: "",
      degree: "",
      year: ""
    }
  ]
  });

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `${formData.personalInfo.name || "My"}_Resume`,
  });

  useEffect(() => {
    if(id) fetchResume();
  }, []);

  const fetchResume = async() => {
    try {
      const res = await getResumeById(id);
      const data = res.data;
      setFormData({
        ...data,
        skills: data.skills.join(",")
      });
    } catch(err){
      console.log(err);
    }
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      personalInfo: {
        ...formData.personalInfo,
        [name]: value,
      },
    })
  }

  const handleExperienceChange = (index, e) => {
    const { name, value } = e.target;

    const updatedExperience = [...formData.experience];

    updatedExperience[index][name] = value;

    setFormData({
      ...formData,
      experience: updatedExperience
    });
  };

  const handleEducationChange = (index, e) => {

    const { name, value } = e.target;

    const updatedEducation = [...formData.education];

    updatedEducation[index][name] = value;

    setFormData({
      ...formData,
      education: updatedEducation
    });

  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const data = {
      ...formData,
      skills: formData.skills.split(",")
    };
    try {
      if(id) await updateResume(id, data);
      else await createResume(data);
      navigate("/");
    } catch(err) {
      console.log(err);
    }
  };

  const handleGenerateSummary = async () => {
    try {
      const res = await generateSummary({
        name: formData.personalInfo.name,
        skills: formData.skills,
        experience: formData.experience,
        education: formData.education
      });

      setFormData({
        ...formData,
        summary: res.data.summary
      });

    } catch(err) {
      console.log(err);
    }

  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [
        ...formData.experience,
        {
          company: "",
          role: "",
          startDate: "",
          endDate: "",
          description: ""
        }
      ]
    });
  };

  const addEducation = () => {

    setFormData({
      ...formData,
      education: [
        ...formData.education,
        {
          college: "",
          degree: "",
          year: ""
        }
      ]
    });

  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center p-10 gap-8">
      <h2 className="text-2xl font-bold">Choose a Template</h2>
      <div className="flex gap-4 mb-6">
        
        <button className="hover:underline cursor-pointer" onClick={() => setTemplate("classic")}> Classic </button>

        <button className="hover:underline cursor-pointer" onClick={() => setTemplate("modern")}> Modern </button>

        <button className="hover:underline cursor-pointer"
          onClick={() => {
            if (!isPremium)  alert("Upgrade to access this template");
            else setTemplate("executive");
          }}> Executive </button>

        <button className="hover:underline cursor-pointer" onClick={() => {
          setIsPremium(true);
          alert("Upgrade successful! Executive template unlocked.");
          }}> Upgrade </button>

      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full max-w-6xl">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow max-w-xl w-full space-y-4"
        >

          <h2 className="text-2xl font-bold">
            {id ? "Edit Resume" : "Create Resume"}
          </h2>

          <input
            placeholder="Resume Title"
            className="w-full border p-2 rounded"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />

          <input
            name="name"
            placeholder="Name"
            className="w-full border p-2 rounded"
            value={formData.personalInfo.name}
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email"
            className="w-full border p-2 rounded"
            value={formData.personalInfo.email}
            onChange={handleChange}
          />

          <input
            name="phone"
            placeholder="Phone"
            className="w-full border p-2 rounded"
            value={formData.personalInfo.phone}
            onChange={handleChange}
          />

          <input
            name="location"
            placeholder="Location"
            className="w-full border p-2 rounded"
            value={formData.personalInfo.location}
            onChange={handleChange}
          />

          <input
            placeholder="Skills (comma separated)"
            className="w-full border p-2 rounded"
            value={formData.skills}
            onChange={(e) =>
              setFormData({ ...formData, skills: e.target.value })
            }
          />

          <h3 className="text-lg font-semibold mt-4">Work Experience</h3>

          {formData.experience.map((exp, index) => (

            <div key={index} className="space-y-2 border p-3 rounded-lg">

              <input
                name="company"
                placeholder="Company"
                value={exp.company}
                onChange={(e) => handleExperienceChange(index, e)}
                className="w-full border p-2 rounded"
              />

              <input
                name="role"
                placeholder="Role"
                value={exp.role}
                onChange={(e) => handleExperienceChange(index, e)}
                className="w-full border p-2 rounded"
              />

              <input
                name="startDate"
                placeholder="Start Date"
                value={exp.startDate}
                onChange={(e) => handleExperienceChange(index, e)}
                className="w-full border p-2 rounded"
              />

              <input
                name="endDate"
                placeholder="End Date"
                value={exp.endDate}
                onChange={(e) => handleExperienceChange(index, e)}
                className="w-full border p-2 rounded"
              />

              <textarea
                name="description"
                placeholder="Work description"
                value={exp.description}
                onChange={(e) => handleExperienceChange(index, e)}
                className="w-full border p-2 rounded"
              />

            </div>

          ))}

          <button
            type="button"
            onClick={addExperience}
            className="bg-black text-white px-3 py-2 rounded cursor-pointer"
          >
            Add Experience
          </button>

          <h3 className="text-lg font-semibold mt-6">Education</h3>

          {formData.education.map((edu, index) => (

            <div key={index} className="space-y-2 border p-3 rounded-lg">

              <input
                name="college"
                placeholder="College / University"
                value={edu.college}
                onChange={(e) => handleEducationChange(index, e)}
                className="w-full border p-2 rounded"
              />

              <input
                name="degree"
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) => handleEducationChange(index, e)}
                className="w-full border p-2 rounded"
              />

              <input
                name="year"
                placeholder="Year"
                value={edu.year}
                onChange={(e) => handleEducationChange(index, e)}
                className="w-full border p-2 rounded"
              />

            </div>

          ))}

          <button
            type="button"
            onClick={addEducation}
            className="bg-black text-white px-3 py-2 rounded cursor-pointer"
          >
            Add Education
          </button>

          <textarea
            placeholder="Summary"
            className="w-full border p-2 rounded"
            value={formData.summary}
            onChange={(e) =>
              setFormData({ ...formData, summary: e.target.value })
            }
          />

          <button
            type="button"
            onClick={handleGenerateSummary}
            className="bg-black text-white px-3 py-2 rounded cursor-pointer"
          >
            Generate AI Summary
          </button>

          <button
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 cursor-pointer"
          >
            Save Resume
          </button>

        </form>

        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Resume Preview</h2>
          <button 
            onClick={handlePrint} 
            className="px-4 py-2 bg-black text-white rounded-lg mb-3 cursor-pointer"
          >
            Download
          </button>
          <div ref={componentRef} className="bg-white">
            <TemplatePreview resume={formData} template={template}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResumeEditor