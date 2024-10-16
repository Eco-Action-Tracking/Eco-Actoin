'use client';

import React from 'react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div
        className="bg-green-900 h-96
         text-white py-16 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url('https://www.purlsoho.com/media/wysiwyg/CleanShot_2024-06-05_at_10.35.30.png')`, 
        }}
      >
        <div className="container mx-auto px-4 text-center bg-[#1b1b1b8a] rounded-xl p-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            Learn more about our mission, values, and the people behind our eco-friendly initiatives.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Mission Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">Our Mission</h2>
          <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto">
            At EcoStitch, our mission is to promote sustainable practices that benefit both the environment and the community. 
            We are dedicated to reducing carbon footprints through innovative solutions and creating a greener future for all.
          </p>
        </section>

        {/* Values Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValueCard 
              title="Sustainability" 
              description="We believe in adopting sustainable practices to reduce the environmental impact of our activities." 
            />
            <ValueCard 
              title="Community" 
              description="We are committed to supporting the communities we serve, empowering individuals to make eco-conscious choices." 
            />
            <ValueCard 
              title="Innovation" 
              description="Our team is focused on finding new and effective solutions to environmental challenges." 
            />
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">Meet Our Team</h2>
          <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto mb-8">
            Our dedicated team of professionals is passionate about making a positive impact on the environment. 
            Together, we work towards creating a sustainable future.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TeamMember 
              name="Omar" 
              position="Scrum Master" 
              imageUrl="https://media-hbe1-1.cdn.whatsapp.net/v/t61.24694-24/427571503_479256251524801_2534868589826350123_n.jpg?ccb=11-4&oh=01_Q5AaIG-P76VBpS5lQmp5Kom-Bc2lkh4rtKFrBAfg9JFAzraH&oe=671B5E86&_nc_sid=5e03e0&_nc_cat=110" // ضع مسار الصورة
            />
            <TeamMember 
              name="Mariam" 
              position="Product Owner" 
              imageUrl="https://media-hbe1-1.cdn.whatsapp.net/v/t61.24694-24/432244290_936157804936793_4744127954539495901_n.jpg?ccb=11-4&oh=01_Q5AaIHNg4GQut5D5paCbAv07oF4_4JzgVafZ4GRa2XFz089A&oe=671B4263&_nc_sid=5e03e0&_nc_cat=106" // ضع مسار الصورة
            />
            <TeamMember 
              name="Abdullah" 
              position="QA" 
              imageUrl="https://media-hbe1-1.cdn.whatsapp.net/v/t61.24694-24/350388296_997204528092133_3819774619352640934_n.jpg?ccb=11-4&oh=01_Q5AaIAAXzClfbFWZy2w--4d02cekNAmMuvYMh7vbXq0NdtNv&oe=671B662B&_nc_sid=5e03e0&_nc_cat=109" // ضع مسار الصورة
            />
             <TeamMember 
              name="Rafah Shreem" 
              position="Developer" 
              imageUrl="https://media-hbe1-1.cdn.whatsapp.net/v/t61.24694-24/321237949_1448483765870102_559730110937515241_n.jpg?ccb=11-4&oh=01_Q5AaIAda-IFwFHh7W58-IpODpUEkR2oXywVqC-JPYUMU-NAO&oe=671B5117&_nc_sid=5e03e0&_nc_cat=101" // ضع مسار الصورة
            />
             <TeamMember 
              name="obadajawareh." 
              position="Developer" 
              imageUrl="https://media-hbe1-1.cdn.whatsapp.net/v/t61.24694-24/456611035_466324959758940_8361760503687785921_n.jpg?ccb=11-4&oh=01_Q5AaIJbyVkN9w5CxpjMQgIqX-HNzHLC-E0vR2mlpZnXOPNKl&oe=671B4F6C&_nc_sid=5e03e0&_nc_cat=104" // ضع مسار الصورة
            />
          </div>
        </section>

        {/* Call to Action */}
        {/* <section className="bg-green-100 py-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Mission</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-6">
            Ready to make a difference? Get involved in our eco-friendly initiatives and help us create a more sustainable world.
          </p>
          <button className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors">
            Learn More
          </button>
        </section> */}
      </div>
    </div>
  );
}

function ValueCard({ title, description }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function TeamMember({ name, position, imageUrl }) {
  return (
    <div className="text-center">
      <img 
        src={imageUrl} 
        alt={name} 
        className="h-32 w-32 mx-auto rounded-full object-cover mb-4"
      />
      <h4 className="text-lg font-medium text-gray-900">{name}</h4>
      <p className="text-gray-600">{position}</p>
    </div>
  );
}
