import logo from "../assets/MindRouteLogo.svg";

export default function Logo() {
  return (
    <div className="flex items-center gap-1">
      <img
        src={logo}
        alt="MindRoute Logo"
        className="w-19 h-19 drop-shadow-[0_0_6px_#00E0FF]"
      />
      <span className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent italic tracking-widest">
        indRoute
      </span>
    </div>
  );
}
