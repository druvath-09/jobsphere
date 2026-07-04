import { Container } from '@/shared/components/layout';

const TESTIMONIALS = [
  {
    id: 1,
    quote: "JobSphere helped us reduce hiring time by 40%. The quality of engineers on this platform is unmatched. We filled three senior backend roles in less than a month.",
    name: "Priya Shah",
    designation: "Head of Talent",
    company: "Stripe",
    initial: "PS",
    color: "bg-blue-600"
  },
  {
    id: 2,
    quote: "As a developer, I loved the transparency. I could see salary ranges upfront and applied directly to hiring managers. JobSphere is now my go-to for finding new opportunities.",
    name: "David Chen",
    designation: "Senior Frontend Engineer",
    company: "Vercel",
    initial: "DC",
    color: "bg-emerald-600"
  },
  {
    id: 3,
    quote: "We switched entirely to JobSphere for our technical hiring. The platform is incredibly fast, and the candidates are highly responsive. It feels like the future of hiring.",
    name: "Sarah Jenkins",
    designation: "VP of Engineering",
    company: "Linear",
    initial: "SJ",
    color: "bg-purple-600"
  }
];

function StarRating() {
  return (
    <div className="flex gap-1 mb-4 text-accent">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="py-20 sm:py-32 bg-background border-t border-border/50">
      <Container padding="md">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Trusted by top engineering teams
          </h2>
        </div>

        {/* Mobile Carousel / Desktop Grid */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 md:grid md:grid-cols-3 md:overflow-visible md:snap-none md:pb-0 scrollbar-hide">
          {TESTIMONIALS.map((t) => (
            <div 
              key={t.id} 
              className="flex-shrink-0 w-[85vw] sm:w-[400px] md:w-auto snap-center flex flex-col justify-between bg-surface p-8 rounded-2xl border border-border/60 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                <StarRating />
                <p className="text-text-primary text-base sm:text-lg leading-relaxed font-medium">
                  "{t.quote}"
                </p>
              </div>
              <div className="mt-8 flex items-center gap-4 border-t border-border/50 pt-6">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white font-bold text-lg shadow-sm ${t.color}`}>
                  {t.initial}
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary">{t.name}</h4>
                  <p className="text-sm text-text-secondary">{t.designation}, <span className="font-medium text-text-primary">{t.company}</span></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
