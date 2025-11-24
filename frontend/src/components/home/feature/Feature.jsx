import { motion } from "framer-motion";

export default function Feature() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-white to-blue-50 flex flex-col items-center justify-center py-20 px-5 overflow-hidden relative">
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
        From connecting with your favorite tools to automating workflows, Geni AI simplifies business tasks.
      </motion.p>

      {/* Icons Row */}
      <div className="flex items-center gap-6 md:gap-10 mt-16">
        {["/mnt/data/fbc087bf-daa6-4265-8a64-42e53a035d8e.png","/icons/brand1.png", "/icons/brand2.png", "/icons/brand3.png", "/icons/brand4.png"].map((icon, i) => (
          <motion.img
            key={i}
            src={icon}
            alt="icon"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="w-20 h-20 bg-white shadow-lg rounded-2xl p-4 object-contain"
          />
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
          className="w-[320px] scale-110 md:w-[380px] drop-shadow-2xl rounded-3xl"
        />
      </motion.div>
    </div>
  );
}
