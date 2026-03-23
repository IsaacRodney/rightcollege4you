import PricingCard from "../components/PricingCard";
import SectionIntro from "../components/SectionIntro";
import useSeo from "../hooks/useSeo";

const tiers = [
  {
    name: "Basic",
    price: "$499",
    description: "Focused support for students who want expert essay feedback and a sharper final submission.",
    features: ["Personal statement review", "Two supplemental essay reviews", "Written feedback and revisions"]
  },
  {
    name: "Standard",
    price: "$1,499",
    description: "Comprehensive help for students managing applications across multiple colleges.",
    features: ["Full application planning", "Essay strategy and edits", "Activity list and resume review"]
  },
  {
    name: "Premium",
    price: "$3,200",
    description: "High-touch mentorship for families who want end-to-end support and a complete admissions strategy.",
    features: ["Everything in Standard", "School list strategy", "Interview prep and ongoing mentorship"]
  }
];

export default function PricingPage() {
  useSeo(
    "Pricing",
    "Explore RightCollege4You pricing for essay review, application support, and full admissions mentorship."
  );

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <SectionIntro
        eyebrow="Pricing"
        title="Support that matches your application season."
        description="Choose the level of guidance that fits your timeline, goals, and the amount of hands-on strategy you want."
      />
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {tiers.map((tier, index) => (
          <PricingCard key={tier.name} tier={tier} featured={index === 1} />
        ))}
      </div>
    </section>
  );
}
