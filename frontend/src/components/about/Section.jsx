import React from 'react';

const Section = ({ reverse }) => {
  return (
    <section className="relative w-full h-[70vh] bg-white overflow-hidden">
      {/* Dark clipped background shape from the wireframe */}
      <div
        className="absolute inset-0 text-black z-0"
      ></div>

      <div className={`relative z-10 container mx-auto px-6 gap-10 flex flex-col-reverse lg:flex-row items-center justify-center h-full ${reverse === "reverse" ? "lg:flex-row-reverse" : ""}`}>
        {/* Text Content */}
        <div className="lg:w-1/2 text-center lg:text-left mt-10 lg:mt-0">
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
            Empowering Creativity
          </h1>
          <p className="text-md lg:text-xl mb-8">
            Our mission is to simplify the way people work and create by harnessing the power of advanced AI technology. We aim to provide intuitive tools that empower individuals and businesses to achieve more, faster, and with greater ease.
          </p>
        </div>

        {/* Image Content */}
        <div className="lg:w-1/2 flex justify-center">
          <div className="relative rounded-3xl shadow-2xl border-4 border-white overflow-hidden max-w-md lg:max-w-lg">
            <img
              src="/img/about-1.avif" // Replace with your actual image URL
              alt="AI Cube empowering creativity"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section;