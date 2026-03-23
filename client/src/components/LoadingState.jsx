export default function LoadingState({ label = "Loading..." }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center text-slate-300">
      {label}
    </div>
  );
}
