export default function ErrorState({ message }) {
  return (
    <div className="rounded-[2rem] border border-rose-400/30 bg-rose-400/10 p-6 text-rose-100">
      {message}
    </div>
  );
}
