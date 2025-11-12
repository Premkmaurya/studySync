import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { HiPhotograph, HiOutlineX } from 'react-icons/hi'; // Icons ke liye
import { useState } from 'react';

export default function CreateGroup() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile,setImageFile]= useState(null)

  // Jab file select ho
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
    setImageFile(file)
      setImagePreview(URL.createObjectURL(file));
    }

  };

  // Jab form submit ho
  const onSubmit = async (data) => {
 
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('image', imageFile);

    try {
      const response = await axios.post(
        'http://localhost:3000/api/groups/create',
        formData, 
        {
          withCredentials: true,
        }
      );

      // Success ke baad user ko /groups page pe bhej do
      navigate(`/group/${response.data.group._id}`);
    } catch (error) {
      console.error('Error creating group:', error.response?.data || error.message);
      // Yahan error dikha sakte hain
    }
  };

  return (
    <div className="w-[92.9vw] h-screen bg-[#121214] p-6 shadow-lg">
      <h1 className="text-3xl font-bold text-white mb-6">
        Create a New Group
      </h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* Image Upload UI */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Group Image
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              {imagePreview ? (
                <div className="relative group w-32 h-32 mx-auto">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-32 w-32 rounded-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setValue('image', null);
                    }}
                    className="absolute top-0 right-0 p-1 bg-red-600 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <HiOutlineX className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <HiPhotograph className="mx-auto h-12 w-12 text-gray-500" />
              )}
              <div className="flex text-sm text-gray-400">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-[#121214] rounded-md font-medium text-blue-400 hover:text-blue-300 focus-within:outline-none p-1 px-2"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    {...register('image')} // TODO: Add validation
                    onChange={handleImageChange}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>

        {/* Group Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300">
            Group Name
          </label>
          <input
            id="name"
            type="text"
            className="mt-1 block w-full bg-[#121214] border border-[#121214] rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            {...register('name', { required: 'Group name is required' })}
            placeholder="My Awesome Study Group"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-300">
            Description
          </label>
          <textarea
            id="description"
            rows="3"
            className="mt-1 block w-full bg-[#121214] border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            {...register('description', { required: 'Description is required' })}
            placeholder="A short description about what this group is for."
          ></textarea>
          {errors.description && (
            <p className="mt-1 text-sm text-red-400">{errors.description.message}</p>
          )}
        </div>

        {/* Field / Category */}
        <div>
          <label htmlFor="field" className="block text-sm font-medium text-gray-300">
            Field of Study
          </label>
          <select
            id="field"
            className="mt-1 block w-full bg-[#121214] border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            {...register('field', { required: 'Please select a field' })}
            defaultValue=""
          >
            <option value="" disabled>Select a category</option>
            <option value="web-dev">Web Development</option>
            <option value="dsa">Data Structures & Algorithms</option>
            <option value="ai-ml">AI / Machine Learning</option>
            <option value="cybersecurity">Cybersecurity</option>
            <option value="other">Other</option>
          </select>
          {errors.field && (
            <p className="mt-1 text-sm text-red-400">{errors.field.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isSubmitting ? 'Creating...' : 'Create Group'}
          </button>
        </div>
      </form>
    </div>
  );
}