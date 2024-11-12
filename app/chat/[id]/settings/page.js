'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Upload } from 'lucide-react';

const SettingItem = ({ icon: Icon, title, description, type, value, onChange }) => (
  <div className="py-4 border-b">
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3">
          <Icon size={20} />
        </div>
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      {type === 'toggle' && (
        <div 
          className={`w-12 h-6 rounded-full p-1 cursor-pointer ${value ? 'bg-blue-500' : 'bg-gray-300'}`}
          onClick={() => onChange(!value)}
        >
          <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${value ? 'translate-x-6' : ''}`} />
        </div>
      )}
      {type === 'select' && (
        <select className="p-2 rounded-lg bg-gray-100 border-none">
          {value.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      )}
    </div>
  </div>
);

export default function SettingsPage({ params }) {
  const router = useRouter();
  const [files, setFiles] = useState([]);
  const [name, setName] = useState('');
  const [subtitle, setSubtitle] = useState('');

  // Fetch uploaded files from the server
  const fetchFiles = async () => {
    try {
      const res = await fetch('/api/bot', { method: 'GET' });
      const data = await res.json();
      setFiles(data);
    } catch (error) {
      console.error('Failed to fetch files:', error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  // Handle file upload on drop
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prevFiles) => [
      ...prevFiles,
      ...droppedFiles.map(file => ({ file, id: Date.now() + Math.random() })),
    ]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data, only adding non-empty fields
    const formData = new FormData();
    if (name) formData.append('name', name);
    if (subtitle) formData.append('subtitle', subtitle);

    files.forEach(fileObj => {
      if (fileObj.file) {
        formData.append('files', fileObj.file);
      }
    });

    try {
      const res = await fetch('/api/bot', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const newFile = await res.json();
        setFiles((prevFiles) => [...prevFiles, newFile]);
        setName('');  // Reset name field
        setSubtitle('');  // Reset subtitle field
      } else {
        console.error('Failed to upload data');
      }
    } catch (error) {
      console.error('Failed to submit form:', error);
    }
  };

  // Handle file deletion
  const handleDelete = async (fileId) => {
    try {
      await fetch(`/api/files/${fileId}`, { method: 'DELETE' });
      setFiles((prevFiles) => prevFiles.filter(file => file.id !== fileId));
    } catch (error) {
      console.error('Failed to delete file:', error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="p-4 bg-indigo-200 shadow flex items-center">
        <button onClick={() => router.push('/')} className="mr-2">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">Settings</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="mb-6">
            <input
              type="text"
              name="title"
              placeholder="Name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 mb-4 rounded-lg bg-gray-100"
            />
            <input
              placeholder="Subtitle (optional)"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full p-2 rounded-lg bg-gray-100 h-24 resize-none"
            />
          </div>

          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
          >
            <Upload size={32} className="mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600">Drag and drop files here, or click to select files</p>
            <input
              type="file"
              className="hidden"
              multiple
              onChange={(e) => handleDrop({ ...e, dataTransfer: { files: e.target.files } })}
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Submit
          </button>
        </form>

        <div className="bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold p-4 border-b">Uploaded Files</h2>
          <div className="divide-y">
            {files.map((fileObj) => (
              <div key={fileObj.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                <div>
                  <h3 className="font-medium">{fileObj.file ? fileObj.file.name : fileObj.name}</h3>
                  <p className="text-sm text-gray-500">
                    {fileObj.size || fileObj.file.size} • Uploaded on {fileObj.uploadedAt || new Date().toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(fileObj.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}