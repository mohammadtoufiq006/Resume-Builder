import {useState, useEffect} from 'react';
import {getResumes, deleteResume} from '../services/resumeService.js';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [resumes, setResumes] = useState([]);
  const navigate = useNavigate();

  const fetchResumes = async () => {
    try {
      const res = await getResumes();
      setResumes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteResume(id);
      fetchResumes();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-10">

      <h1 className="text-3xl font-bold mb-6">My Resumes</h1>

      <button onClick={() => navigate("/create")}
      className="mb-6 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer"
      >
        Create Resume
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {resumes.map((resume) => (

          <div
            key={resume._id}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition w-full"
          >

            <h2 className="text-xl font-semibold">{resume.title}</h2>

            <p className="text-sm text-gray-500 mt-2">
              {resume.personalInfo?.name}
            </p>

            <div className="flex gap-3 mt-4">

              <button onClick={() => navigate(`/editor/${resume._id}`)}
               className="text-blue-600 hover:underline cursor-pointer">
                Edit
              </button>

              <button onClick={() => handleDelete(resume._id)}
                className="text-red-500 hover:underline cursor-pointer"
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Dashboard