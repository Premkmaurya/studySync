import { motion } from "framer-motion";

export default function Feature() {
  return (
    <div className="w-full h-screen min-h-screen bg-gradient-to-b from-white to-blue-50 flex flex-col items-center justify-center py-20 px-5 overflow-hidden relative">
      {/* Glow Effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1.5 }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-blue-200 blur-[140px] rounded-full"
      />

      {/* Heading */}
      <motion.h1
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-bold text-gray-900 text-center"
      >
        Integrate and Automate with <span className="text-blue-600">Ease</span>
      </motion.h1>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-center text-gray-600 max-w-xl mt-4"
      >
        From connecting with your favorite tools to automating workflows, Geni
        AI simplifies business tasks.
      </motion.p>

      {/* Icons Row */}
      <div className="flex">
        <div className="flex items-center gap-6 md:gap-10 mt-16">
          {[
            "https://framerusercontent.com/images/yw300BfNoo7QuILH3YwnXIGFUg.svg",
            "https://framerusercontent.com/images/oNtsBWjFbsLxfLOZMVt8C5HVEI.svg",
          ].map((icon, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="p-2 border border-black/30 rounded-2xl"
            >
              <img
                src={icon}
                alt="icon"
                className="w-30 h-30 bg-white shadow-lg rounded-2xl border border-black/20 p-4 object-contain"
              />
            </motion.div>
          ))}
        </div>

        {/* Phone Mockup */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative mt-12"
        >
          <img
            src="/img/mobile.png"
            className="w-[24rem] scale-110 md:w-120 drop-shadow-2xl rounded-3xl"
          />
        </motion.div>

        <div className="flex items-center gap-6 md:gap-10 mt-16">
          {[
            "https://framerusercontent.com/images/Oo4CsXTZC6GtPr09sGUibuk.svg",
            "https://framerusercontent.com/images/OX7vNAfYiPqXJtSgJa7LQ4oVwag.svg",
          ].map((icon, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="p-2 border border-black/30 rounded-2xl"
            >
              <img
                src={icon}
                alt="icon"
                className="w-30 h-30 bg-white shadow-lg rounded-2xl border border-black/20 p-4 object-contain"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
