import {
  Phone,
  Menu,
  Truck,
  Globe,
  Factory,
  Search,
  CheckCircle,
  MapPin,
  ShieldCheck,
  CreditCard,
  Mail,
  MessageSquare,
  Home,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  X,
  Clock,
  Package,
  Route,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useRef, useCallback } from 'react';

/* ─── Logo ─── */
const Logo = ({ className = "" }: { className?: string }) => (
  <svg
    className={`h-7 xs:h-8 lg:h-9 w-auto ${className}`}
    fill="none"
    height="120"
    viewBox="0 0 520 120"
    width="520"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Translogistics"
  >
    <g transform="translate(20,30)">
      <rect fill="currentColor" height="10" width="70" x="0" y="0" />
      <rect fill="currentColor" height="10" width="70" x="10" y="18" />
      <rect fill="#FF5A1F" height="10" width="70" x="20" y="36" />
    </g>
    <text
      fill="currentColor"
      fontFamily="Inter, Helvetica, Arial, sans-serif"
      fontSize="48"
      fontWeight="700"
      letterSpacing="0.8"
      x="120"
      y="75"
    >
      Translogistics
    </text>
  </svg>
);

/* ─── CountUp ─── */
const CountUp = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const duration = 1800;
          const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return <span ref={ref}>{count}{suffix}</span>;
};

/* ─── Main App ─── */
export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [mobileMenuOpen]);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
      const sections = ['about', 'services', 'process', 'contact'];
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Process', href: '#process' },
    { label: 'Contact', href: '#contact' },
  ];

  const ease = [0.25, 1, 0.5, 1] as const;

  const fadeUp = {
    initial: { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.7, ease }
  };

  const stagger = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.55, delay, ease }
  });

  return (
    <div className="min-h-[100svh] antialiased bg-white overflow-x-hidden">

      {/* ─── Navigation ─── */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl border-b border-slate-100 shadow-sm shadow-black/[0.03]'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease }}
      >
        <div className="flex justify-between items-center px-4 sm:px-6 lg:px-10 h-14 sm:h-16">
          <a
            href="#"
            className={`transition-colors duration-300 flex-shrink-0 ${
              isScrolled ? 'text-slate-900' : 'text-white'
            }`}
          >
            <Logo />
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-0.5 lg:gap-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`px-3 lg:px-4 py-2 text-[13px] font-medium transition-all duration-300 rounded-lg ${
                  isScrolled
                    ? activeSection === item.label.toLowerCase()
                      ? 'text-primary'
                      : 'text-slate-500 hover:text-slate-900'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
            <a
              href="tel:9892414174"
              className={`ml-2 lg:ml-4 flex items-center gap-2 px-4 lg:px-5 py-2 rounded-lg text-[13px] font-semibold transition-all duration-300 ${
                isScrolled
                  ? 'bg-primary text-white hover:bg-primary-container'
                  : 'bg-white/10 text-white hover:bg-white/20 border border-white/15'
              }`}
            >
              <Phone size={13} />
              <span className="hidden lg:inline">989 241 4174</span>
              <span className="lg:hidden">Call Us</span>
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`md:hidden p-2.5 -mr-2 rounded-lg transition-colors ${
              isScrolled
                ? 'text-slate-900 active:bg-slate-100'
                : 'text-white active:bg-white/10'
            }`}
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </motion.nav>

      {/* ─── Mobile Menu ─── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[60] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={closeMobileMenu}
            />
            <motion.div
              className="absolute right-0 top-0 bottom-0 w-[min(300px,85vw)] bg-white flex flex-col shadow-2xl"
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              exit={{ x: 300 }}
              transition={{ duration: 0.35, ease }}
            >
              {/* Header */}
              <div className="flex justify-between items-center p-4 xs:p-5 border-b border-slate-100 flex-shrink-0">
                <Logo className="text-slate-900 !h-6" />
                <button
                  onClick={closeMobileMenu}
                  className="p-2 rounded-lg hover:bg-slate-100 active:bg-slate-200 transition-colors"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Nav links */}
              <div className="flex-1 overflow-y-auto no-scrollbar p-3 xs:p-4 space-y-0.5">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className="flex items-center justify-between py-3.5 px-4 text-[15px] font-medium text-slate-700 hover:text-primary active:bg-slate-50 rounded-xl transition-all"
                  >
                    {item.label}
                    <ChevronRight size={15} className="text-slate-300" />
                  </a>
                ))}
              </div>

              {/* Bottom CTAs */}
              <div
                className="flex-shrink-0 p-4 xs:p-5 border-t border-slate-100 space-y-2.5"
                style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 16px), 16px)' }}
              >
                <a
                  href="tel:9892414174"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-primary text-white rounded-xl font-semibold text-sm active:opacity-90 transition-opacity"
                >
                  <Phone size={15} /> Call Now
                </a>
                <a
                  href="https://wa.me/919892414174"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#25D366] text-white rounded-xl font-semibold text-sm active:opacity-90 transition-opacity"
                >
                  <MessageSquare size={15} /> WhatsApp
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Hero ─── */}
      <header className="relative min-h-[100svh] sm:min-h-[640px] sm:max-h-[900px] sm:h-screen flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            alt="Freight trucks on Indian highway"
            className="w-full h-full object-cover object-center"
            src="https://lh3.googleusercontent.com/aida/ADBb0uhV2m87Gsn4lC4k50aQLiUfoGE4233LspZ7wLXa5k0wGF29MxDTmXYA5IA9DfYP7UbRpQUK6RbeF5FjGw9nmAsVnXaUnAYSpnPctin7kL8NCFVIK8dXZxkgIcLMQObZWlHsPrqzhtyXo1BHUqQaqCjH3jGoE23LuZHW5DnOQky3gx5k94AI2_WC7hGP__hrsIqvjoxRo0jzailQQWy5d-BFeAQo6aB61vTTOGte6OOCICpCjMOrZFSofJ06NlmvwdagI8NjqH7B"
            referrerPolicy="no-referrer"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/65 to-transparent" />
        </div>

        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-10 pb-20 xs:pb-24 sm:pb-28">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
          >
            <p className="text-[10px] xs:text-[11px] font-semibold tracking-[0.2em] uppercase text-white/50 mb-4 sm:mb-6">
              Owner‑Operated · Since 2008
            </p>

            <h1 className="text-[1.75rem] xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-headline font-extrabold text-white leading-[1.1] mb-4 sm:mb-6 tracking-tight">
              We Move Your Freight
              <br />
              Across India
            </h1>

            <p className="text-[13px] xs:text-sm sm:text-base lg:text-lg text-white/50 leading-relaxed max-w-[280px] xs:max-w-sm sm:max-w-md lg:max-w-lg mb-6 xs:mb-8 sm:mb-10">
              A hands‑on team that personally connects you with trusted truck
              operators for bulk and industrial cargo.
            </p>

            <div className="flex flex-col xs:flex-row flex-wrap gap-3">
              <a
                href="tel:9892414174"
                className="group flex items-center justify-center xs:justify-start gap-2.5 px-5 xs:px-6 py-3 xs:py-3.5 bg-white text-slate-900 rounded-lg font-semibold text-sm hover:bg-slate-50 active:bg-slate-100 transition-all"
              >
                <Phone size={16} />
                Talk to Us
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </a>
              <a
                href="#services"
                className="px-5 xs:px-6 py-3 xs:py-3.5 text-white/80 rounded-lg font-medium text-sm hover:bg-white/10 active:bg-white/15 transition-all border border-white/15 text-center"
              >
                What We Do
              </a>
            </div>
          </motion.div>

          <motion.div
            className="mt-8 xs:mt-10 sm:mt-14 lg:mt-20 grid grid-cols-3 gap-3 xs:gap-4 sm:gap-6 max-w-[260px] xs:max-w-xs sm:max-w-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7, ease }}
          >
            {[
              { value: 17, suffix: "+", label: "Years" },
              { value: 28, suffix: "+", label: "States" },
              { value: 100, suffix: "+", label: "Loads / Mo" },
            ].map((stat, idx) => (
              <div key={idx} className="text-left">
                <div className="text-xl xs:text-2xl sm:text-2xl lg:text-3xl font-headline font-bold text-white">
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-[9px] xs:text-[10px] sm:text-[11px] text-white/35 uppercase tracking-wider mt-0.5 sm:mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </header>

      {/* ─── About ─── */}
      <section className="py-14 xs:py-16 sm:py-20 md:py-28 lg:py-36 scroll-mt-16" id="about">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10">
          <motion.div {...fadeUp}>
            <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase text-primary/60 mb-3 sm:mb-4">
              About Us
            </p>
            <h2 className="text-2xl xs:text-[1.7rem] sm:text-3xl lg:text-4xl font-headline font-bold text-slate-900 leading-tight mb-4 sm:mb-6">
              People You Can
              <br />
              Pick Up the Phone To
            </h2>
            <p className="text-[13px] xs:text-sm sm:text-[15px] text-slate-500 leading-[1.85] max-w-2xl mb-8 xs:mb-10 sm:mb-16">
              We're a family‑run logistics company based in Vasai since 2008.
              No call centres, no bots — when you ring us, you speak to someone
              who knows your shipment. We personally vet every truck operator
              and stay hands‑on from pickup to delivery.
            </p>

            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {[
                {
                  icon: ShieldCheck,
                  title: "Hand‑Picked Operators",
                  desc: "Every driver personally vetted",
                },
                {
                  icon: MapPin,
                  title: "Mumbai Hub",
                  desc: "Naigaon / Vasai base",
                },
                {
                  icon: Phone,
                  title: "Direct Line",
                  desc: "You talk to us, not a machine",
                },
                {
                  icon: CreditCard,
                  title: "Honest Pricing",
                  desc: "Transparent, no hidden costs",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="p-4 sm:p-5 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors"
                  {...stagger(idx * 0.06)}
                >
                  <item.icon
                    className="text-primary mb-2.5 sm:mb-3"
                    size={20}
                    strokeWidth={1.5}
                  />
                  <h4 className="font-semibold text-slate-900 text-sm mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Services ─── */}
      <section className="py-14 xs:py-16 sm:py-20 md:py-28 lg:py-36 bg-slate-50/70 scroll-mt-16" id="services">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10">
          <motion.div className="max-w-xl mb-8 xs:mb-10 sm:mb-16" {...fadeUp}>
            <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase text-primary/60 mb-3 sm:mb-4">
              Services
            </p>
            <h2 className="text-2xl xs:text-[1.7rem] sm:text-3xl lg:text-4xl font-headline font-bold text-slate-900 leading-tight">
              What We Handle
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
            {[
              {
                icon: Truck,
                title: "Full Truck Loads",
                desc: "Dedicated vehicles, direct routes, your cargo only.",
              },
              {
                icon: Globe,
                title: "Pan‑India Routes",
                desc: "Every state — metro hubs to remote sites.",
              },
              {
                icon: Factory,
                title: "Industrial & Heavy Cargo",
                desc: "Equipment, raw materials, oversized goods.",
              },
              {
                icon: Search,
                title: "Vehicle Sourcing",
                desc: "We find the right truck for your specific load.",
              },
              {
                icon: CheckCircle,
                title: "We Handle Everything",
                desc: "Paperwork, loading, tracking, delivery — all of it.",
              },
              {
                icon: Package,
                title: "Custom Needs",
                desc: "Unusual cargo? Tell us. We'll figure it out.",
              },
            ].map((service, idx) => (
              <motion.div
                key={idx}
                className="bg-white p-5 sm:p-7 rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all duration-300"
                {...stagger(idx * 0.06)}
              >
                <service.icon
                  size={22}
                  strokeWidth={1.5}
                  className="text-primary mb-3 sm:mb-5"
                />
                <h3 className="text-[15px] sm:text-base font-headline font-semibold text-slate-900 mb-1.5 sm:mb-2">
                  {service.title}
                </h3>
                <p className="text-[13px] sm:text-sm text-slate-400 leading-relaxed">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Process ─── */}
      <section className="py-14 xs:py-16 sm:py-20 md:py-28 lg:py-36 scroll-mt-16" id="process">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10">
          <motion.div
            className="text-center max-w-lg mx-auto mb-8 xs:mb-10 sm:mb-16"
            {...fadeUp}
          >
            <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase text-primary/60 mb-3 sm:mb-4">
              Process
            </p>
            <h2 className="text-2xl xs:text-[1.7rem] sm:text-3xl lg:text-4xl font-headline font-bold text-slate-900 leading-tight">
              Four Simple Steps
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-5 lg:gap-6">
            {[
              {
                step: "01",
                title: "You Call or Message",
                desc: "Tell us what, where, and when.",
                icon: MessageSquare,
              },
              {
                step: "02",
                title: "We Find the Right Truck",
                desc: "From our personally vetted network.",
                icon: Search,
              },
              {
                step: "03",
                title: "We Coordinate Pickup",
                desc: "And keep you updated throughout.",
                icon: Route,
              },
              {
                step: "04",
                title: "Delivered & Confirmed",
                desc: "Safe delivery, paperwork sorted.",
                icon: CheckCircle,
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="relative bg-white rounded-xl p-5 sm:p-7 border border-slate-100 hover:border-slate-200 transition-colors"
                {...stagger(idx * 0.08)}
              >
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <span className="text-2xl sm:text-3xl font-headline font-bold text-slate-100">
                    {item.step}
                  </span>
                  <item.icon
                    size={18}
                    className="text-primary"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="text-sm font-semibold text-slate-900 mb-1 sm:mb-1.5">
                  {item.title}
                </h3>
                <p className="text-[13px] sm:text-sm text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Contact ─── */}
      <section className="py-14 xs:py-16 sm:py-20 md:py-28 lg:py-36 bg-slate-50/70 scroll-mt-16" id="contact">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-24">
            {/* Left column */}
            <motion.div {...fadeUp}>
              <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase text-primary/60 mb-3 sm:mb-4">
                ContactNo 
              </p>
              <h2 className="text-2xl xs:text-[1.7rem] sm:text-3xl lg:text-4xl font-headline font-bold text-slate-900 leading-tight mb-4 sm:mb-5">
                Speak to Us Directly
              </h2>
              <p className="text-[13px] xs:text-sm sm:text-[15px] text-slate-500 mb-8 sm:mb-12">
                              </p>

              <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-10">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-xl flex items-center justify-center text-white font-headline font-bold text-xs sm:text-sm flex-shrink-0">
                  MV
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm">
                    Manoj Vyas
                  </h4>
                  <p className="text-xs text-slate-400">
                    Founder & Operations Head
                  </p>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4 text-[13px] sm:text-sm text-slate-500">
                <div className="flex gap-3 items-start">
                  <MapPin
                    size={16}
                    className="text-primary mt-0.5 flex-shrink-0"
                    strokeWidth={1.5}
                  />
                  <p className="leading-relaxed">
                    01/7B Lourds CHS, Station Road
                    <br />
                    Naigaon East, Palghar
                  </p>
                </div>
                <a
                  href="mailto:manojvyastrans1972@gmail.com"
                  className="flex items-start sm:items-center gap-3 hover:text-primary transition-colors group"
                >
                  <Mail
                    size={16}
                    className="text-primary flex-shrink-0 mt-0.5 sm:mt-0"
                    strokeWidth={1.5}
                  />
                  <span className="break-all xs:break-normal text-xs sm:text-sm">
                    manojvyastrans1972@gmail.com
                  </span>
                </a>
              </div>
            </motion.div>

            {/* Right column */}
            <motion.div className="space-y-3 sm:space-y-4" {...fadeUp}>
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
                <a
                  href="tel:9892414174"
                  className="group bg-primary rounded-xl p-5 sm:p-7 text-white hover:shadow-lg hover:shadow-primary/15 active:opacity-95 transition-all duration-300"
                >
                  <Phone size={20} strokeWidth={1.5} className="mb-4 sm:mb-6" />
                  <p className="text-[11px] xs:text-xs text-white/50 mb-1">Call us</p>
                  <p className="text-lg sm:text-xl font-headline font-bold mb-3 sm:mb-5">
                    989 241 4174
                  </p>
                  <span className="flex items-center gap-1.5 text-xs font-medium text-white/60 group-hover:text-white/90 transition-colors">
                    Ring now
                    <ArrowUpRight size={12} />
                  </span>
                </a>

                <a
                  href="https://wa.me/919892414174"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-[#25D366] rounded-xl p-5 sm:p-7 text-white hover:shadow-lg hover:shadow-[#25D366]/15 active:opacity-95 transition-all duration-300"
                >
                  <MessageSquare
                    size={20}
                    strokeWidth={1.5}
                    className="mb-4 sm:mb-6"
                  />
                  <p className="text-[11px] xs:text-xs text-white/60 mb-1">Message us on</p>
                  <p className="text-lg sm:text-xl font-headline font-bold mb-3 sm:mb-5">
                    WhatsApp
                  </p>
                  <span className="flex items-center gap-1.5 text-xs font-medium text-white/60 group-hover:text-white/90 transition-colors">
                    Open chat
                    <ArrowUpRight size={12} />
                  </span>
                </a>
              </div>

              <div className="flex items-center gap-3 px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl border border-slate-100 text-[13px] sm:text-sm text-slate-500 bg-white">
                <Clock
                  size={14}
                  className="text-primary flex-shrink-0"
                  strokeWidth={1.5}
                />
                <span>
                  <strong className="text-slate-700">Every day</strong> · 8 AM – 10 PM IST
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="bg-slate-900 text-white">
        <div className="px-4 sm:px-6 lg:px-10 py-10 sm:py-14">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-12 gap-8 sm:gap-10 md:gap-12 pb-8 sm:pb-12 border-b border-white/[0.08]">
              <div className="xs:col-span-2 md:col-span-5">
                <Logo className="text-white mb-3 sm:mb-4" />
                <p className="text-[13px] sm:text-sm text-white/30 max-w-xs leading-relaxed">
                  Owner‑operated B2B logistics, moving freight across India
                  since 2008.
                </p>
              </div>

              <div className="md:col-span-3 md:col-start-7">
                <h5 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/25 mb-3 sm:mb-4">
                  Navigation
                </h5>
                <ul className="space-y-2 sm:space-y-2.5">
                  {navItems.map((item) => (
                    <li key={item.label}>
                      <a
                        className="text-[13px] sm:text-sm text-white/40 hover:text-white transition-colors"
                        href={item.href}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="md:col-span-3">
                <h5 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/25 mb-3 sm:mb-4">
                  Reach Us
                </h5>
                <ul className="space-y-2 sm:space-y-2.5">
                  <li>
                    <a
                      href="tel:9892414174"
                      className="flex items-center gap-2 text-[13px] sm:text-sm text-white/40 hover:text-white transition-colors"
                    >
                      <Phone size={13} /> 989 241 4174
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://wa.me/919892414174"
                      className="flex items-center gap-2 text-[13px] sm:text-sm text-white/40 hover:text-white transition-colors"
                    >
                      <MessageSquare size={13} /> WhatsApp
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-[11px] sm:text-xs text-white/20 text-center sm:text-left">
                © {new Date().getFullYear()} Translogistics. All rights reserved.
              </p>
            </div>
          </div>
        </div>

        {/* Spacer for mobile bottom nav */}
        <div className="h-16 md:hidden" />
      </footer>

      {/* ─── Floating Buttons (hidden on mobile since bottom nav exists) ─── */}
      <div className="fixed bottom-20 right-4 z-40 flex flex-col gap-2.5 md:bottom-8 md:right-8">
        <motion.a
          href="https://wa.me/919892414174"
          className="w-11 h-11 sm:w-12 sm:h-12 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/25 hover:shadow-xl active:scale-95 transition-all"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 0.4, ease }}
          whileHover={{ scale: 1.06 }}
          aria-label="Chat on WhatsApp"
        >
          <MessageSquare size={18} />
        </motion.a>
        <motion.a
          href="tel:9892414174"
          className="w-11 h-11 sm:w-12 sm:h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-lg shadow-primary/25 hover:shadow-xl active:scale-95 transition-all"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.4, ease }}
          whileHover={{ scale: 1.06 }}
          aria-label="Call us"
        >
          <Phone size={18} />
        </motion.a>
      </div>

      {/* ─── Mobile Bottom Nav ─── */}
      <nav
        className="fixed bottom-0 left-0 right-0 md:hidden bg-white/95 backdrop-blur-xl border-t border-slate-100 z-50"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        aria-label="Mobile navigation"
      >
        <div className="flex justify-around items-center h-14">
          {[
            { icon: Home, label: 'Home', href: '#', color: 'text-primary' },
            { icon: Phone, label: 'Call', href: 'tel:9892414174', color: 'text-slate-400' },
            { icon: MessageSquare, label: 'WhatsApp', href: 'https://wa.me/919892414174', color: 'text-slate-400' },
          ].map((item) => (
            <a
              key={item.label}
              className={`flex flex-col items-center justify-center gap-0.5 ${item.color} min-w-[3rem] min-h-[2.75rem] active:opacity-70 transition-opacity`}
              href={item.href}
            >
              <item.icon size={17} />
              <span className="text-[9px] font-semibold">{item.label}</span>
            </a>
          ))}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex flex-col items-center justify-center gap-0.5 text-slate-400 min-w-[3rem] min-h-[2.75rem] active:opacity-70 transition-opacity"
            aria-label="Open menu"
          >
            <Menu size={17} />
            <span className="text-[9px] font-semibold">Menu</span>
          </button>
        </div>
      </nav>
    </div>
  );
}