import Link from 'next/link'

export default function CarLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container px-4">
      <div className="flex justify-between items-center py-4 absolute top-0">
        <Link 
          href="/" 
          className="inline-flex items-center px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="mr-2"
          >
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Cars
        </Link>
      </div>
      {children}
    </div>
  )
} 