type ButtonLoadingProps = {
  size?: "sm" | "md";
};

const ButtonLoading = ({ size = "sm" }: ButtonLoadingProps) => {
  const dimension = size === "sm" ? "w-4 h-4" : "w-5 h-5";

  return (
    <span
      className={`inline-block ${dimension} border-2 border-white/70 border-t-transparent rounded-full animate-spin`}
    />
  );
};

export default ButtonLoading;
