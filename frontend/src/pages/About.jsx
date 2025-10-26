import React from "react";    
export default function About() {
  return (
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-4">About Simple Blogging Platform</h2>
      <p className="text-gray-700 leading-relaxed">
        The <strong>Simple Blogging Platform</strong> is a full-stack web application that allows users
        to create and browse blogs by categories such as Technology, Travel, and Food.
        <br /><br />
        It demonstrates how modern web development technologies and MongoDB’s flexible NoSQL
        schema can be used to build scalable and interactive applications.
      </p>
    </div>
  );
}
