export default function LoadingSpinner() {
  return (
    <div className="text-center py-10 text-white">
      <div className="border-[3px] border-white/30 border-t-white rounded-full w-10 h-10 animate-spin mx-auto mb-5" />
      <p>Finding e-bikes near you...</p>
    </div>
  );
}

