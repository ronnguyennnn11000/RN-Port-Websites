'use client'

import { User, Briefcase, FileText, Mail } from 'lucide-react'
import { NavBar } from '@/components/ui/tubelight-navbar'

const navItems = [
  { name: 'About',   url: '/#about',    icon: User      },
  { name: 'Works',   url: '/#services', icon: Briefcase },
  { name: 'Resume',  url: '/resume',    icon: FileText  },
  { name: 'Contact', url: '/#cta',      icon: Mail      },
]

export default function Navbar() {
  return <NavBar items={navItems} />
}
