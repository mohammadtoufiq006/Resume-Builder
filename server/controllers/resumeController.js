import Resume from '../models/resume.js';

export const createResume = async(req, res) => {
  try{
    const resume = new Resume(req.body);
    await resume.save();
    res.status(201).json(resume);
  } catch(err) {
    res.status(500).json({message: err.message});
  }
};

export const getResumes = async(req, res) => {
  try{
    const resumes = await Resume.find();
    res.json(resumes);
  } catch(err) {
    res.status(500).json({message: err.message});
  }
};

export const getResumeById = async(req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    res.json(resume);
  } catch(err) {
    res.status(404).json({ message: "Resume not found" });
  }
};

export const updateResume = async(req, res) => {
  try{
    const updated = await Resume.findByIdAndUpdate(
      req.params.id,
      req.body,
      {returnDocument: 'after'}
    );
    res.json(updated);
  } catch(err) {
    res.status(500).json({message: err.message});
  }
};

export const deleteResume = async(req, res) => {
  try{
    await Resume.findByIdAndDelete(req.params.id);
    res.json({message: "Resume Deleted"});
  } catch(err) {
    res.status(500).json({message: err.message});
  }
};