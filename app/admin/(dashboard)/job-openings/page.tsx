'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import DataTable from '@/components/admin/DataTable'
import { StatusBadge } from '@/components/admin/FormFields'

interface JobOpening {
  id: string
  title: string
  department: string | null
  location: string | null
  experience: string | null
  employment_type: string
  tech_stack: string[]
  display_order: number
  status: string
  created_at: string
}

export default function JobOpeningsPage() {
  const [openings, setOpenings] = useState<JobOpening[]>([])
  const [loading, setLoading] = useState(true)

  const fetchOpenings = async () => {
    setLoading(true)
    try {
      const supabase = createClient()
      const { data } = await supabase
        .from('job_openings')
        .select('*')
        .order('display_order', { ascending: true })
      setOpenings(data || [])
    } catch (err) {
      console.error('Error fetching job openings:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOpenings()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this job opening?')) return
    const supabase = createClient()
    await supabase.from('job_openings').delete().eq('id', id)
    fetchOpenings()
  }

  const columns = [
    {
      key: 'title',
      label: 'Title',
      render: (item: JobOpening) => (
        <div>
          <p className="font-medium">{item.title}</p>
          {item.tech_stack.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
              {item.tech_stack.slice(0, 3).map((tech) => (
                <span key={tech} className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                  {tech}
                </span>
              ))}
              {item.tech_stack.length > 3 && (
                <span className="text-xs text-gray-400">+{item.tech_stack.length - 3}</span>
              )}
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'department',
      label: 'Department',
    },
    {
      key: 'location',
      label: 'Location',
    },
    {
      key: 'status',
      label: 'Status',
      render: (item: JobOpening) => <StatusBadge status={item.status} />,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Job Openings</h1>
          <p className="text-gray-600">Manage job openings for the careers page</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchOpenings}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {loading ? 'Loading...' : 'Refresh'}
          </button>
          <Link
            href="/admin/job-openings/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF000E] text-white rounded hover:bg-[#9E0008] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Opening
          </Link>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={openings}
        basePath="/admin/job-openings"
        onDelete={handleDelete}
        loading={loading}
      />
    </div>
  )
}
