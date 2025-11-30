import Logo from "./Logo.tsx";

export default function Navbar() {
  return (
    <nav className="w-full bg-gradient-to-b from-black via-gray-950 to-gray-950 text-white backdrop-blur-md border-b border-gray-800 py-7 px-6 flex justify-center items-center shadow-lg">
      <Logo />
    </nav>
  );
}
