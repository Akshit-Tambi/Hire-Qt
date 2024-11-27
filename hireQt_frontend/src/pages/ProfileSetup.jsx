import React, { useState, useEffect } from 'react';
import CustomSelect from '../components/CustomSelect';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const ProfileSetup = ({ onChange }) => {
  const location = useLocation();
  const { response } = location.state || {};
  const [jobProfiles, setJobProfiles] = useState([]);

  console.log(response)
  const [formData, setFormData] = useState({
    firstName: response?.firstName || "",
    lastName: response?.lastName || "",
    email: response?.email || "",
    phone: response?.phone || "",
    summary: response?.summary || "",
    skills: Array.isArray(response?.skills) ? response.skills.join(", ") : "",
    education: response?.education?.length ? response.education.map(edu => ({
      institution: edu.institution || "",
      major: edu.major || "",
      cgpa: edu.cgpa || ""
    })) : [{ institution: "", major: "", cgpa: "" }],
    workExperience: response?.workExperience?.length ? response.workExperience.map(work => ({
      title: work.title || "",
      company: work.company || "",
      startMonth: work.startMonth || "",
      endMonth: work.endMonth || "",
      description: work.description || ""
    })) : [{ title: "", company: "", startMonth: "", endMonth: "", description: "" }],
    projects: response?.projects?.length ? response.projects.map(proj => ({
      name: proj.title || "",
      description: proj.description || "",
      technologies: ""
    })) : [{ name: "", description: "", technologies: "" }],
    links: {
      linkedin: "",
      github: "",
      codingProfile: ""
    },
    customJobProfile: "",
    desiredJobProfiles: []
  });

  const navigate = useNavigate();
  const [resumeFile, setResumeFile] = useState(null);
  const domainsDataSource = "/domains.json";
  const collegesDataSource = "/colleges.json";
  useEffect(() => {
    async function fetchDomains() {
      try {
        const response = await fetch(domainsDataSource);
        if (!response.ok) {
          throw new Error("Failed to fetch domains data");
        }
        const data = await response.json();
        setJobProfiles(data.domains || []); // Set job profiles in state
      } catch (error) {
        console.error("Error fetching domains:", error);
        setJobProfiles([]); // Set to empty array on error
      }
    }

    fetchDomains();
  }, []);

    const [selectedProfiles, setSelectedProfiles] = useState([]);
    const handleProfileSelect = (profile) => {
      // Check if profile is already selected
      if (selectedProfiles.includes(profile)) return;

      // Limit to 5 profiles
      if (selectedProfiles.length < 5) {
        const newProfiles = [...selectedProfiles, profile];
        setSelectedProfiles(newProfiles);
        onChange(newProfiles);
      }
    };

    const handleRemoveProfile = (profileToRemove) => {
      const newProfiles = selectedProfiles.filter(profile => profile !== profileToRemove);
      setSelectedProfiles(newProfiles);
      onChange(newProfiles);
    };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const updateArrayField = (field, index, updates) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => 
        i === index ? { ...item, ...updates } : item
      )
    }));
  };

  const addArrayField = (field) => {
    const newField = field === 'education' ? { institution: '', major: '', cgpa: '' } :
                     field === 'workExperience' ? { title: '', company: '', startMonth: '', endMonth: '', description: '' } :
                     { name: '', description: '', technologies: '' };
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], newField]
    }));
  };

  const deleteArrayField = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].length > 1 
        ? prev[field].filter((_, i) => i !== index)
        : [field === 'education' 
            ? { institution: '', major: '', cgpa: '' }
            : field === 'workExperience' 
              ? { title: '', company: '', startMonth: '', endMonth: '', description: '' }
              : { name: '', description: '', technologies: '' }]
    }));
  };


  const handleJobProfilesChange = (profiles) => {
    setFormData(prev => ({
      ...prev,
      desiredJobProfiles: profiles
    }));
  };

  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here...
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 to-cyan-300 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-white to-white text-cyan-800 py-6 px-8">
          <h1 className="text-3xl font-bold text-center">Profile Setup</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">

          {/* Personal Information */}
          <div className="bg-amber-100 p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold text-cyan-800-800 mb-4">Personal Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-cyan-800-700 mb-2">First Name</label>
                <input 
                  type="text" 
                  name="firstName" 
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500" 
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div>
                <label className="block text-cyan-800-700 mb-2">Last Name</label>
                <input 
                  type="text" 
                  name="lastName" 
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500" 
                  placeholder="Enter last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required 
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mt-4">
              <div>
                <label className="block text-cyan-800-700 mb-2">Email</label>
                <input 
                  type="email" 
                  name="email" 
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500" 
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div>
                <label className="block text-cyan-800-700 mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  name="phone" 
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500" 
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required 
                />
              </div>
            </div>
          </div>

          {/* Summary Section */}
          <div className="bg-amber-100 p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold text-cyan-800-800 mb-4">Summary</h2>
            <textarea 
              name="summary"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500" 
              placeholder="Enter a brief summary about yourself"
              value={formData.summary}
              onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
            />
          </div>

          {/* Education */}
          <div className="bg-amber-100 p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold text-cyan-800-800 mb-4">Education</h2>
            {formData.education.map((edu, index) => (
              <div key={index} className="bg-teal-50 p-4 rounded-lg shadow-md mb-6">
                <div>
                  <label className="block text-cyan-800-700 mb-2">Institution</label>
                  <CustomSelect
                    placeholder="Type College Name"
                    dataSource={collegesDataSource}
                    onSelect={(e) => updateArrayField('education', index, { institution: e.target.value })}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4 mb-5">
                  <div>
                    <label className="block text-cyan-800-700 mb-2">Major</label>
                    <input 
                      type="text" 
                      name="major"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500" 
                      placeholder="Enter major"
                      value={edu.major}
                      onChange={(e) => updateArrayField('education', index, { major: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-cyan-800-700 mb-2">CGPA</label>
                    <input 
                      type="number" 
                      name="cgpa"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500" 
                      placeholder="Enter CGPA"
                      value={edu.cgpa}
                      onChange={(e) => updateArrayField('education', index, { cgpa: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center mt-4">
              <button 
                type="button" 
                onClick={() => addArrayField('education')} 
                className="bg-cyan-600 text-white px-4 py-2 rounded-lg"
              >
                Add Education
              </button>
              {formData.education.length > 1 && (
                <button 
                  type="button" 
                  onClick={() => deleteArrayField('education', formData.education.length - 1)} 
                  className="bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Delete Last Education
                </button>
              )}
            </div>
          </div>

          {/* Work Experience */}
          <div className="bg-amber-100 p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold text-cyan-800-800 mb-4">Work Experience</h2>
            {formData.workExperience.map((work, index) => (
              <div key={index} className="bg-teal-50 p-4 rounded-lg shadow-md mb-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-cyan-800-700 mb-2">Job Title</label>
                    <input 
                      type="text" 
                      name="title"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500" 
                      placeholder="Enter job title"
                      value={work.title}
                      onChange={(e) => updateArrayField('workExperience', index, { title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-cyan-800-700 mb-2">Company</label>
                    <input 
                      type="text" 
                      name="company"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500" 
                      placeholder="Enter company name"
                      value={work.company}
                      onChange={(e) => updateArrayField('workExperience', index, { company: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-cyan-800-700 mb-2">Start Month</label>
                    <input 
                      type="month" 
                      name="startMonth"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500" 
                      value={work.startMonth}
                      onChange={(e) => updateArrayField('workExperience', index, { startMonth: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-cyan-800-700 mb-2">End Month</label>
                    <input 
                      type="month" 
                      name="endMonth"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 mb-5" 
                      value={work.endMonth}
                      onChange={(e) => updateArrayField('workExperience', index, { endMonth: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-cyan-800-700 mb-2">Job Description</label>
                  <textarea 
                    name="description"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500" 
                    placeholder="Describe your responsibilities"
                    value={work.description}
                    onChange={(e) => updateArrayField('workExperience', index, { description: e.target.value })}
                  />
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center mt-4">
              <button 
                type="button" 
                onClick={() => addArrayField('workExperience')} 
                className="bg-cyan-600 text-white px-4 py-2 rounded-lg"
              >
                Add Work Experience
              </button>
              {formData.workExperience.length > 1 && (
                <button 
                  type="button" 
                  onClick={() => deleteArrayField('workExperience', formData.workExperience.length - 1)} 
                  className="bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Delete Last Work Experience
                </button>
              )}
            </div>
          </div>

          {/* Projects */}
          <div className="bg-amber-100 p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold text-cyan-800-800 mb-4">Projects</h2>
            {formData.projects.map((project, index) => (
              <div key={index} className="bg-teal-50 p-4 rounded-lg shadow-md mb-4">
                <div>
                  <label className="block text-cyan-800-700 mb-2">Project Name</label>
                  <input 
                    type="text" 
                    name="name"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500" 
                    placeholder="Enter project name"
                    value={project.name}
                    onChange={(e) => updateArrayField('projects', index, { name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-cyan-800-700 mb-2">Project Description</label>
                  <textarea 
                    name="description"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500" 
                    placeholder="Describe your project"
                    value={project.description}
                    onChange={(e) => updateArrayField('projects', index, { description: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-cyan-800-700 mb-2">Technologies Used</label>
                  <input 
                    type="text" 
                    name="technologies"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500" 
                    placeholder="Enter technologies used"
                    value={project.technologies}
                    onChange={(e) => updateArrayField('projects', index, { technologies: e.target.value })}
                  />
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center mt-4">
              <button 
                type="button" 
                onClick={() => addArrayField('projects')} 
                className="bg-cyan-600 text-white px-4 py-2 rounded-lg"
              >
                Add Project
              </button>
              {formData.projects.length > 1 && (
                <button 
                  type="button" 
                  onClick={() => deleteArrayField('projects', formData.projects.length - 1)} 
                  className="bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Delete Last Project
                </button>
              )}
            </div>
          </div>

          {/* Job Profile */}
          <div className="bg-amber-100 p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold text-cyan-800 mb-4">Desired Job Profiles</h2>
            
            {/* Dropdown for selecting profiles */}
            <select 
              onChange={(e) => handleProfileSelect(e.target.value)}
              value=""
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 mb-4"
            >
              <option value="" disabled>Select Job Profiles (Max 5)</option>
              {jobProfiles
                .filter(profile => !selectedProfiles.includes(profile))
                .map(profile => (
                  <option key={profile} value={profile}>{profile}</option>
                ))
              }
            </select>

            {/* Selected Profiles */}
            <div className="flex flex-wrap gap-2">
              {selectedProfiles.map(profile => (
                <div 
                  key={profile} 
                  className="bg-purple-200 px-3 py-1 rounded-full flex items-center"
                >
                  {profile}
                  <button 
                    onClick={() => handleRemoveProfile(profile)}
                    className="ml-2 text-red-600  hover:text-red-800"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {selectedProfiles.length > 0 && (
              <p className="text-sm text-gray-600 mt-2">
                {5 - selectedProfiles.length} profile slot(s) remaining
              </p>
            )}
          </div>

          {/* Links Section */}
          <section className="bg-amber-100 p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold text-cyan-800-800 mb-4">Professional Links</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-cyan-800-700">LinkedIn Profile</label>
                <input 
                  type="url" 
                  name="linkedin" 
                  placeholder="LinkedIn URL" 
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500" 
                  value={formData.links.linkedin}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    links: { ...prev.links, linkedin: e.target.value }
                  }))}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-cyan-800-700">GitHub Profile</label>
                <input 
                  type="url" 
                  name="github" 
                  placeholder="GitHub URL" 
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500" 
                  value={formData.links.github}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    links: { ...prev.links, github: e.target.value }
                  }))}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-cyan-800-700">Coding Profile</label>
                <input 
                  type="url" 
                  name="codingProfile" 
                  placeholder="LeetCode/HackerRank URL" 
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500" 
                  value={formData.links.codingProfile}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    links: { ...prev.links, codingProfile: e.target.value }
                  }))}
                />
              </div>
            </div>
          </section>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button 
              type="submit" 
              className="bg-cyan-600 text-white px-10 py-3 rounded-lg text-lg font-semibold hover:bg-cyan-700 transition duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetup;