export default function LoadingSpinner() {
  return (
    <div className="animate-pulse flex space-x-2">
      <div className="w-3 h-3 bg-sky-500 rounded-full"></div>
      <div className="w-3 h-3 bg-sky-500 rounded-full animation-delay-200"></div>
      <div className="w-3 h-3 bg-sky-500 rounded-full animation-delay-400"></div>
    </div>
  );
}
