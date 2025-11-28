export default function Content() {
  return (
    <div className="w-full min-h-screen bg-[#f7f8fa] px-6 py-20 flex flex-col justify-center">
      {/* Header */}
      <div className="w-full flex justify-center h-[60vh] mt-[4vw]">
        <div className="w-[50%] text-center">
          <h1 className="text-[5vw] font-bold leading-none mb-8 text-gray-900">
            Driving Success through Smart AI
          </h1>
          <p className="text-lg">
            From innovation to user focus, Geni AI is dedicated to transforming
            businesses create and automate every day.
          </p>
        </div>
      </div>
      {/* Image Section */}
      <div className="w-full h-[75vh] flex justify-center rounded-2xl p-5 border border-black/15">
        <img
          src="/img/me.jpg"
          alt="Journey Illustration"
          className="w-full object-cover border border-black/40 rounded-2xl shadow-lg"
        />
      </div>
      {/* Paragraphs */}
      <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
        <p>
          Hi, I'm <span className="font-semibold text-gray-900">Prem</span> — a
          self-taught developer and the creator of{" "}
          <span className="font-semibold">StudySync</span>. My journey didn’t
          start with perfect English, expensive courses, or big mentors. It
          started in a small town, with curiosity, a single device, and a dream
          to build something meaningful.
        </p>

        <p>
          When I began coding, everything felt overwhelming — HTML, JavaScript,
          errors, debugging… but step by step, project by project, things
          started to make sense. What truly changed everything was{" "}
          <span className="font-semibold">consistency</span> — learning
          something small every single day.
        </p>

        <p>
          As I grew, I realized something important: many students struggle not
          because they lack talent, but because they don’t have the right tools
          or support system. That realization inspired me to build{" "}
          <span className="font-semibold">StudySync</span>.
        </p>

        <p>
          I wanted to solve the same problems I faced: managing notes, studying
          alone, staying motivated, and understanding concepts clearly. With
          real-time syncing, AI-powered assistance, and a clean workspace,
          StudySync was born to make learning collaborative, fast, and
          enjoyable.
        </p>

        <p>
          Today, StudySync is more than just a notes app — it’s a learning
          partner. It’s built for students who want to grow, together. And
          honestly, this is just the beginning. I’m still learning, still
          improving, and still building.
        </p>

        <p className="font-semibold text-gray-900">
          Thanks for being part of my journey.
          <br />– Prem Maurya
        </p>
      </div>
    </div>
  );
}
