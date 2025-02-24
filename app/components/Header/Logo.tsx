import { Link } from "@remix-run/react"

export default function Logo() {
  return (
    <Link to="/" className="flex items-center">
      <img
        src="/images/logo_full.svg"
        alt="Tales of Murder"
        className="h-8 xs:h-9 md:h-10 w-auto"
      />
      {/* Optional: Add text logo with Breamcatcher font */}
      {/* <span className="ml-2 text-2xl font-breamcatcher">Tales of Murder</span> */}
    </Link>
  )
} 