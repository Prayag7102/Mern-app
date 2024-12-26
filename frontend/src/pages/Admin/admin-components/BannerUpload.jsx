import React, { useState } from 'react';
import { uploadBanner } from '../../../api/Banner';
import { toast } from 'react-toastify';

const BannerUpload = () => {
  const [title, setTitle] = useState('');
  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const urls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    images.forEach(image => formData.append('imageUrl', image));

    try {
      const response = await uploadBanner(formData);
      toast.success('Banner uploaded successfully');
    } catch (error) {
      toast.error('Error uploading banner');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Upload Banner</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
        >
          Upload
        </button>
      </form>
      <div className="mt-6 grid grid-cols-3 gap-4">
        {previewUrls.map((url, index) => (
          <div key={index} className="border border-gray-300 rounded overflow-hidden">
            <img src={url} alt={`Preview ${index}`} className="w-full h-24 object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};


export default BannerUpload;