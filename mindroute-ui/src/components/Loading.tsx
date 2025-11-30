const Loading = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-linear-to-b from-black via-gray-950 to-gray-950 text-white">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-white/70 border-t-transparent rounded-full animate-spin" />
        <p className="italic text-gray-300 text-sm tracking-wide">
          Loading your tasks...
        </p>
      </div>
    </div>
  );
};

export default Loading;
