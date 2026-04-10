import CreateGroupForm from "./components/CreateGroupForm";

const CreateGroup = () => {
  return (
    <div className="relative pt-20 min-h-screen w-full overflow-hidden bg-black text-[#E5E7EB] font-sans text-sm">
      {/* Immersive Background Mesh */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[60%] bg-indigo-600/10 blur-[140px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[50%] h-[50%] bg-fuchsia-600/10 blur-[140px] rounded-full" />
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
