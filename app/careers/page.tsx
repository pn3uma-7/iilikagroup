'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Image from 'next/image'
import { createClient } from '@/lib/supabase'

interface JobOpening {
  id: string
  title: string
  department: string | null
  location: string | null
  experience: string | null
  employment_type: string
  description: string | null
  tech_stack: string[]
}

interface FormState {
  loading: boolean
  success: boolean
  error: string | null
}

export default function Careers() {
  const [openings, setOpenings] = useState<JobOpening[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedOpening, setSelectedOpening] = useState<JobOpening | null>(null)
  const [formState, setFormState] = useState<FormState>({ loading: false, success: false, error: null })
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin_url: '',
    message: '',
  })

  const supabase = createClient()

  useEffect(() => {
    async function fetchOpenings() {
      const { data } = await supabase
        .from('job_openings')
        .select('id, title, department, location, experience, employment_type, description, tech_stack')
        .eq('status', 'active')
        .order('display_order', { ascending: true })
      setOpenings(data || [])
      setLoading(false)
    }
    fetchOpenings()
  }, [])

  // Client-side search filter
  const filteredOpenings = openings.filter((job) => {
    if (!searchQuery.trim()) return true
    const query = searchQuery.toLowerCase()
    return (
      job.title.toLowerCase().includes(query) ||
      job.tech_stack.some((tech) => tech.toLowerCase().includes(query))
    )
  })

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedOpening) return
    setFormState({ loading: true, success: false, error: null })

    if (!form.name.trim()) {
      setFormState({ loading: false, success: false, error: 'Please enter your name' })
      return
    }
    if (!isValidEmail(form.email)) {
      setFormState({ loading: false, success: false, error: 'Please enter a valid email address' })
      return
    }
    if (!form.phone.trim()) {
      setFormState({ loading: false, success: false, error: 'Please enter your phone number' })
      return
    }

    const { error } = await supabase.from('general_applications').insert({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      linkedin_url: form.linkedin_url.trim() || null,
      message: form.message.trim() || null,
      role_interest: selectedOpening.title,
      job_opening_id: selectedOpening.id,
    })

    if (error) {
      setFormState({ loading: false, success: false, error: 'Failed to submit application. Please try again.' })
      return
    }

    setFormState({ loading: false, success: true, error: null })
  }

  const closeModal = () => {
    setSelectedOpening(null)
    setFormState({ loading: false, success: false, error: null })
    setForm({ name: '', email: '', phone: '', linkedin_url: '', message: '' })
  }

  const benefits = [
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Competitive Salary',
      description: 'Market-leading compensation packages',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Health Insurance',
      description: 'Comprehensive coverage for you and family',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Flexible Work',
      description: 'Remote and hybrid work options',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: 'Learning & Development',
      description: 'Training and certification support',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      title: 'Career Growth',
      description: 'Clear progression paths and mentorship',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Work-Life Balance',
      description: 'Flexible hours and time-off policies',
    },
  ]

  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] -mt-20 overflow-hidden">
        <Image
          src="/images/careers-hero.jpg"
          alt="Careers at IILIKA GROUPS"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 h-full flex items-end pb-20 md:items-center md:pb-0">
          <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
            <div className="max-w-3xl space-y-6">
              <div className="w-12 h-1 bg-[#FF000E]" />
              <p className="text-sm md:text-base uppercase tracking-[0.2em] text-white/80 font-medium">
                Careers &middot; Growth &middot; Impact
              </p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.95] uppercase">
                Join Our Team
              </h1>
              <p className="text-base md:text-lg text-white/80 uppercase tracking-wide">
                Build your career with IILIKA GROUPS. Explore opportunities to work with leading enterprises.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Current Openings */}
      <section className="bg-white py-16">
        <div className="container-custom">
          <div className="mb-12">
            <div className="w-12 h-1 bg-[#FF000E] mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 uppercase">Current Openings</h2>
            <p className="text-[#333333] max-w-3xl">
              Join our team of talented professionals
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="relative">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by job title or technology..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF000E] focus:border-transparent"
              />
            </div>
            {searchQuery && (
              <p className="text-sm text-[#333333] mt-2">
                Showing {filteredOpenings.length} of {openings.length} openings
              </p>
            )}
          </div>

          {/* Openings List */}
          <div className="space-y-6 max-w-4xl mx-auto">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-4 border-[#FF000E] border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : filteredOpenings.length > 0 ? (
              filteredOpenings.map((job) => (
                <Card key={job.id}>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-black mb-2">{job.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-[#333333] mb-3">
                        {job.location && (
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {job.location}
                          </span>
                        )}
                        {job.experience && (
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {job.experience}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {job.tech_stack.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-gray-100 text-[#333333] text-xs rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Button variant="primary" size="sm" onClick={() => setSelectedOpening(job)}>
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            ) : openings.length > 0 ? (
              <div className="text-center py-12">
                <p className="text-[#333333] text-lg">No openings match your search.</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-2 text-[#FF000E] hover:underline"
                >
                  Clear search
                </button>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-[#333333] text-lg mb-4">
                  No current openings at the moment.
                </p>
                <Link href="/contact" className="text-[#FF000E] hover:underline font-medium">
                  Submit a general application from our Contact page
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="bg-[#1a1a1a] py-16">
        <div className="container-custom">
          <div className="mb-12">
            <div className="w-12 h-1 bg-[#FF000E] mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 uppercase">Why Work With Us</h2>
            <p className="text-white/60 max-w-3xl">
              Benefits and perks that make a difference
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="border border-white/10 rounded-lg p-6">
                <div className="text-[#FF000E] mb-4">{benefit.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2 uppercase tracking-wide">{benefit.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* General Application CTA */}
      <section className="bg-[#333333] py-16">
        <div className="container-custom">
          <div className="max-w-2xl">
            <div className="w-12 h-1 bg-[#FF000E] mb-6" />
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 uppercase">
              Don&apos;t See a Perfect Match?
            </h2>
            <p className="text-white/60 mb-8">
              Submit your profile and we&apos;ll reach out when opportunities arise.
            </p>
            <Link href="/contact">
              <Button variant="primary" size="lg">
                Submit General Application
                <svg className="w-5 h-5 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Apply Modal */}
      {selectedOpening && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50" onClick={closeModal} />

          {/* Modal */}
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h3 className="text-lg font-bold text-black">Apply Now</h3>
                <p className="text-sm text-[#333333]">{selectedOpening.title}</p>
              </div>
              <button
                onClick={closeModal}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              {formState.success ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-black mb-2">Application Submitted!</h4>
                  <p className="text-[#333333] mb-6">
                    Thank you for applying. We&apos;ll review your profile and get back to you soon.
                  </p>
                  <Button variant="primary" onClick={closeModal}>Close</Button>
                </div>
              ) : (
                <form onSubmit={handleApply} className="space-y-4">
                  {formState.error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                      {formState.error}
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-[#333333] mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#FF000E]"
                      placeholder="Your name"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#333333] mb-1">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#FF000E]"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#333333] mb-1">
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#FF000E]"
                        placeholder="+91 XXXXX XXXXX"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#333333] mb-1">
                      LinkedIn Profile URL
                    </label>
                    <input
                      type="url"
                      value={form.linkedin_url}
                      onChange={(e) => setForm({ ...form, linkedin_url: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#FF000E]"
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#333333] mb-1">
                      Cover Note
                    </label>
                    <textarea
                      rows={3}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#FF000E]"
                      placeholder="Tell us briefly why you're interested in this role..."
                    ></textarea>
                  </div>

                  <Button type="submit" variant="primary" className="w-full" disabled={formState.loading}>
                    {formState.loading ? 'Submitting...' : 'Submit Application'}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
