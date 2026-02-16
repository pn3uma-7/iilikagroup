import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1a1a1a] text-white mt-20">
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="w-12 h-1 bg-[#FF000E]" />
            <Link href="/" className="inline-block">
              <Image
                src="/images/iilika-groups.svg"
                alt="IILIKA GROUPS"
                width={180}
                height={40}
                className="h-10 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-white/60 leading-relaxed max-w-md">
              Building teams and GCCs that deliver. Deployed staffing, GCC setup & scaling, and project-based delivery for modern enterprises.
            </p>
            <div className="flex items-center gap-6 text-sm text-white/40">
              <span>Pune, Maharashtra</span>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span>Nashik, Maharashtra</span>
            </div>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-[0.2em] text-white/50 font-medium mb-6">Services</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/staffing" className="text-sm text-white/70 hover:text-[#FF000E] transition-colors">
                  Staffing & Resources
                </Link>
              </li>
              <li>
                <Link href="/gcc-enablement" className="text-sm text-white/70 hover:text-[#FF000E] transition-colors">
                  GCC Enablement
                </Link>
              </li>
              <li>
                <Link href="/service-based-projects" className="text-sm text-white/70 hover:text-[#FF000E] transition-colors">
                  Project Delivery
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-[0.2em] text-white/50 font-medium mb-6">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm text-white/70 hover:text-[#FF000E] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-sm text-white/70 hover:text-[#FF000E] transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/insights" className="text-sm text-white/70 hover:text-[#FF000E] transition-colors">
                  Insights
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="text-sm text-white/70 hover:text-[#FF000E] transition-colors">
                  Case Studies
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-white/50 font-medium mb-6">Get in Touch</h4>
            <div className="space-y-4">
              <a
                href="mailto:info@iilikagroups.com"
                className="flex items-center gap-3 text-sm text-white/70 hover:text-[#FF000E] transition-colors"
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info@iilikagroups.com
              </a>
              <Link
                href="/contact"
                className="flex items-center gap-3 text-sm text-white/70 hover:text-[#FF000E] transition-colors"
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            &copy; {currentYear} IILIKA GROUPS. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-white/30">
            <Link href="/services" className="hover:text-white/60 transition-colors">
              Services
            </Link>
            <Link href="/about" className="hover:text-white/60 transition-colors">
              About
            </Link>
            <Link href="/contact" className="hover:text-white/60 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
