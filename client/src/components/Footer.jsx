import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl">RightCollege4You</p>
          <p className="mt-3 max-w-sm text-sm text-slate-400">
            Personalized college admissions strategy for ambitious students who want more than generic advice.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Explore</p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-slate-300">
            <Link to="/success-stories">Success Stories</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/contact">Get Started</Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Contact</p>
          <div className="mt-4 space-y-2 text-sm text-slate-300">
            <p>rodney_simon@hotmail.com</p>
            <p>630-730-8218</p>
            <p>Bolingbrook, Illinois</p>
            <p>Helping students nationwide</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
