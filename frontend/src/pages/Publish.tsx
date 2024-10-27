import { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../ config'; // Adjust the path based on your project structure
import { useNavigate } from 'react-router-dom'; // Adjust the path based on your project structure

const Publish = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const postData = async () => {
    const data = { 
      title, 
      content, // Include content in the data object
    };

    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, data, {
        headers: {
          Authorization:  localStorage.getItem('token'), // Get the token and format it properly
        },
      });

      console.log('Data posted successfully:', response.data);
      alert('Post published successfully!'); // Alert on success
      console.log(response.data.id);
      
      navigate(`/blog/${response.data.blog.id}`); // Navigate to the newly created blog post
    } catch (error) {
      console.error('Error posting data:', error);
      alert('Error posting data. Please try again.'); // Alert on error
      throw error; // Rethrow the error for further handling if needed
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)} // Update title state
        className="w-full max-w-lg mb-4 p-4 h-12 text-lg border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)} // Update content state
        className="w-full max-w-lg p-4 h-64 text-lg border border-gray-300 rounded-md shadow-sm resize-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
      />
      <button 
        onClick={postData} 
        className="mt-4 w-full max-w-lg h-12 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
      >
        Publish
      </button>
    </div>
  );
}

export default Publish;
