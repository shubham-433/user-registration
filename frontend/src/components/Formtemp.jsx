import React,{useEffect, useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import '../App.css';


// Define validation schema using Yup
const validationSchema = Yup.object({
 firstName: Yup.string().min(4).max(15).required('First Name is required'),
 lastName: Yup.string().required('Last Name is required'),
 email: Yup.string().email('Invalid email address').required('Email is required'),
 mobileNumber: Yup.string().matches(/^[0-9]+$/, 'Mobile number can only contain digits').required('Mobile number is required'),
 gender: Yup.string().oneOf(['male', 'female', 'other'], 'Invalid gender').required('Gender is required'),
 dob: Yup.date().required('Date of Birth is required'),
 about: Yup.string(), // Optional field
});


const UserRegistrationForm = () => {
  const [messages,setMessages] = useState(""); 
  
  useEffect(() => { 
    const timer = setTimeout(() => {
      setMessages("");
    }, 1000);
    return () => clearTimeout(timer);
  }, [messages]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post('http://localhost:3001/api/register/', values);
      console.log(response.data);
      setMessages(response.data.message)
      setSubmitting(false);
      
    } catch (error) {
      console.error('Error:', error);
      setMessages('something went wrong')
      setMessages(error.response.data.message)
      setSubmitting(false);
    }
 };
 
console.log(messages)
 return (
    <div className=" mx-auto px-4 bg-gray-400 " >
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          mobileNumber: '',
          gender: '',
          dob: '',
          about: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        
      >
        {({ isSubmitting }) => (
          
       <div className=' w-100   sm:py-32 lg:px-8 flex-container '>

           
         <div className='left-box'>
         <Form className=" mx-auto  max-w-xl bg-white p-10 ">
         <div className="absolute inset-0 flex items-start justify-center mt-20">
              {messages ? (
                  <div className="text-center text-white bg-green-500 p-2 w-auto rounded">{messages}</div>
              ) : null}
          </div>
            
            <div className=" grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
            <div className=' ' style={{height:'5rem'}}>
                <label htmlFor="first-name" className="block text-left text-gray-700 text-sm font-bold mb-2 ">
                First name
                </label>
                <Field
                    className="block w-full px-3 py-2 leading-tight text-gray-700 border rounded focus:ring-2 focus:ring-inset focus:ring-indigo-300"
                    id="firstName"
                    type="text"
                    name="firstName"
                />
              <ErrorMessage  name="firstName" component="div" className="text-red-500 text-xs mt-1 text-left" />
            </div>
            <div className=" " style={{height:'5rem'}}>
              <label className="block text-left text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                Last Name
              </label>
              <Field
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none"
                id="lastName"
                type="text"
                name="lastName"
              />
              <ErrorMessage name="lastName" component="div" className="text-red-500 text-xs mt-1 text-left h-14" />
            </div>
            </div>
            <div className="mb-4"style={{height:'5rem'}}>
              <label className="block text-left text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email Address
              </label>
              <Field
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none"
                id="email"
                type="email"
                name="email"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1 text-left " />
            </div>
            <div className="mb-4" style={{height:'5rem'}}>
              <label className="block text-left text-gray-700 text-sm font-bold mb-2" htmlFor="mobileNumber">
                Mobile Number
              </label>
              <Field
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none"
                id="mobileNumber"
                type="tel"
                name="mobileNumber"
              />
              <ErrorMessage name="mobileNumber" component="div" className="text-red-500 text-xs mt-1 text-left" />
            </div>
            <div className='grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2'>



            <div className="mb-4" style={{height:'5rem'}}>
              <label className="block text-left text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
                Gender
              </label>
              <Field as="select"
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none"
                id="gender"
                name="gender"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Field>
              <ErrorMessage name="gender" component="div" className="text-red-500 text-xs mt-1 text-left" />
            </div>
            <div className="mb-4" style={{height:'5rem'}}>
              <label className="block text-left text-gray-700 text-sm font-bold mb-2" htmlFor="dob">
                Date of Birth
              </label>
              <Field
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none"
                id="dob"
                type="date"
                name="dob"
              />
              <ErrorMessage name="dob" component="div" className="text-red-500 text-xs mt-1 text-left" />
            </div>

            </div>
            <div className="mb-4" style={{height:'5rem'}}>
              <label className="block text-left text-gray-700 text-sm font-bold mb-2" htmlFor="about">
                About
              </label>
              <Field as="textarea"
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none"
                id="about"
                name="about"
                rows="2"
              />
            </div>
            <div className="flex items-center justify-between" >
              <button
                type="submit"
                className="px-4  py-1 w-full font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none"
                disabled={isSubmitting}
              >
                Register
              </button>
            </div>
          </Form>
         </div>
         <div className="right-box max-w-xl ">
                <img
                  src="https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=dfd2ec5a01006fd8c4d7592a381d3776&auto=format&fit=crop&w=1000&q=80"
                  alt="nod"
                />
              </div>
       </div>
       
        )}
      </Formik>
    </div>
 );
};

export default UserRegistrationForm;
