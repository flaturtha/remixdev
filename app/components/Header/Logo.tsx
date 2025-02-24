import { Link } from "@remix-run/react"

export default function Logo() {
  return (
    <Link to="/" className="flex items-center">
      <img
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_full-SeQHREkB92sFihqEM8id69rzfNajdL.png"
        alt="Tales of Murder"
        width={300}
        height={60}
        className="w-full max-w-[300px] h-auto"
      />
    </Link>
  )
} 