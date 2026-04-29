import { useSelector } from "react-redux";
import CreateGroupForm from "./components/CreateGroupForm";

const CreateGroup = () => {
  const theme = useSelector((state) => state.theme.mode);
  return (
    <div className={`relative pt-20 min-h-screen w-full overflow-hidden ${theme === "dark" ? "bg-black text-[#fafbfc]" : "bg-white text-[#1a1a1a]"} font-sans text-sm`}>
      {/* Immersive Background Mesh */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className={`absolute top-[-10%] right-[-5%] w-[60%] h-[60%] ${theme === "dark" ? "bg-indigo-600/10" : "bg-indigo-400/5"} blur-[140px] rounded-full`} />
        <div className={`absolute bottom-[-10%] left-[-5%] w-[50%] h-[50%] ${theme === "dark" ? "bg-fuchsia-600/10" : "bg-fuchsia-400/5"} blur-[140px] rounded-full`} />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`,
          }}
        />
      </div>

      {/* Main Creation Form */}
      <main className="relative z-10 flex justify-center items-center py-5 px-6 h-screen overflow-hidden">
        <CreateGroupForm />
      </main>
    </div>
  );
};

export default CreateGroup;
