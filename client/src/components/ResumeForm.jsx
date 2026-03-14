import {useState} from 'react';
import {createResume} from '../services/resumeService.js';

const ResumeForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      location: ""
    },
    summary: "",
    skills: ""
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      personalInfo: {
        ...formData.personalInfo,
        [name] : value
      }
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const data = {
      ...formData,
      skills: formData.skills.split(",")
    };
    try{
      await createResume(data);
      alert("Resume Saved!");
    } catch(err) {
      console.log(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 bg-white shadow rounded-xl space-y-4"
    >
      <h2 className="text-2xl font-bold">Create Resume</h2>

      <input
        placeholder="Resume Title"
        className="w-full border p-2 rounded"
        onChange={(e) =>
          setFormData({ ...formData, title: e.target.value })
        }
      />

      <input
        name="name"
        placeholder="Name"
        className="w-full border p-2 rounded"
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email"
        className="w-full border p-2 rounded"
        onChange={handleChange}
      />

      <input
        name="phone"
        placeholder="Phone"
        className="w-full border p-2 rounded"
        onChange={handleChange}
      />

      <input
        name="location"
        placeholder="Location"
        className="w-full border p-2 rounded"
        onChange={handleChange}
      />

      <textarea
        placeholder="Career Overview"
        className="w-full border p-2 rounded"
        onChange={(e) =>
          setFormData({ ...formData, summary: e.target.value })
        }
      />

      <input
        placeholder="Skills (comma separated)"
        className="w-full border p-2 rounded"
        onChange={(e) =>
          setFormData({ ...formData, skills: e.target.value })
        }
      />

      <button
        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 cursor-pointer"
      >
        Save Resume
      </button>
    </form>
  );
}

export default ResumeForm