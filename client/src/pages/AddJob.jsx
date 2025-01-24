import React, { useEffect, useRef, useState } from 'react'
import Quill from 'quill'
import { JobCategories, JobLocations } from '../assets/assets';

const AddJob = () => {
  const [title, setTitle] = useState('');
  const [location,setLocation] = useState('Hyderabad');
  const [category,setCategory] = useState('Programming');
  const [level,setLevel] = useState('Beginner level');
  const [salary,setSalary] = useState(0);
  const editorRef = useRef(null)
  const quillRef = useRef(null)
  useEffect(()=>{
    //Initiate quill only once
    if(!quillRef.current && editorRef.current){
      quillRef.current = new Quill(editorRef.current,{
        theme:'snow'
      }) 
    }
  },[])

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  }
  return (
    <form onSubmit={onSubmitHandler} className="container p-4 flex flex-col w-full items-center gap-4">
      {/*Job Title*/}
      <div className="w-full max-w-lg">
        <label className='block mb-2 text-sm font-medium text-gray-700'>Job Title </label>
          <input  className="w-full px-3 py-2 border-2 border-gray-300 rounded" type='text' placeholder='Type here' onChange={e=> setTitle(e.target.value )} value={title} required/>
      </div>
      {/*job desc */}
      <div className="w-full max-w-lg ">
      <label className="block mb-2 text-sm font-medium text-gray-700">
          Job Description
        </label>
        <div
          ref={editorRef}
          className="border-2 border-gray-300 rounded p-2">
        </div>
      </div>
      {/*dropdown fields*/}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg">
        <div className="w-full">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Job Category
          </label>
          <select
            className="w-full px-3 py-2 border-2 border-gray-300 rounded"
            onChange={(e) => setCategory(e.target.value)}
          >
            {JobCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Job Location
          </label>
          <select
            className="w-full px-3 py-2 border-2 border-gray-300 rounded"
            onChange={(e) => setLocation(e.target.value)}
          >
            {JobLocations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Job Level
          </label>
          <select
            className="w-full px-3 py-2 border-2 border-gray-300 rounded"
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value="Beginner level">Beginner level</option>
            <option value="Intermediate level">Intermediate level</option>
            <option value="Senior level">Senior level</option>
          </select>
        </div>
      </div>

      {/* Job Salary */}
      <div className="w-full max-w-lg">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Job Salary
        </label>
        <input
          className="w-full px-3 py-2 border-2 border-gray-300 rounded"
          type="number"
          placeholder="0"
          onChange={(e) => setSalary(e.target.value)}
          value={salary}
        />
      </div>

      {/* Add Button */}
      <button
        type="submit"
        className="px-6 py-2 bg-black text-white font-medium rounded"
      >
        ADD
      </button>
    </form>
  );
};

export default AddJob
