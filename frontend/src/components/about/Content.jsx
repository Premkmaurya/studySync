import Core from "./Core";
import Section from "./Section";

export default function Content() {
  return (
    <div className="w-full min-h-screen px-6 py-20 flex flex-col justify-center">
      {/* Header */}
      <div className="w-full flex justify-center h-[60vh] mt-[12vw]">
        <div className="w-[50%] text-center">
          <h1 className="text-[4.5vw] font-bold leading-none mb-8 text-gray-900">
            Driving Success through Smart AI
          </h1>
          <p className="text-md w-[80%] mx-auto text-gray-500">
            From innovation to user focus, Geni AI is dedicated to transforming
            businesses create and automate every day.
          </p>
        </div>
      </div>
      {/* Image Section */}
      <div className="w-full h-[75vh] flex justify-center rounded-2xl p-1.5 border border-black/15 shadow-lg shadow-black/50">
        <img
          src="/img/about-1.avif"
          alt="Journey Illustration"
          className="w-full object-cover border-4 border-white rounded-2xl shadow-lg shadow-black/50"
        />
      </div>
      {/* Paragraphs */}
      <div className="mt-10">
        <Section />
        <Section reverse={"reverse"} />
      </div>
      <div>
        <div className="w-full flex justify-center h-[10vh] mt-[4vw]">
          <div className="w-[50%] text-center">
            <h1 className="text-[4.5vw] font-bold leading-none mb-8 text-gray-900">
              Driving Success through Smart AI
            </h1>
            <p className="text-md w-[80%] mx-auto text-gray-500">
              From innovation to user focus, Geni AI is dedicated to
              transforming businesses create and automate every day.
            </p>
          </div>
        </div>
          <Core />
      </div>
    </div>
  );
}
