type BrandLogoProps = {
  size?: number
  className?: string
}

const BrandLogo = ({ size = 24, className }: BrandLogoProps) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 128 128"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="12" y="12" width="104" height="104" rx="28" fill="#FF5F1F" />
      <rect x="36" y="40" width="40" height="8" rx="4" fill="#111111" />
      <rect x="36" y="60" width="32" height="8" rx="4" fill="#111111" />
      <rect x="36" y="80" width="24" height="8" rx="4" fill="#111111" />
      <path
        d="M83 84.5L74.5 76a4 4 0 10-5.7 5.7l11.4 11.3a4 4 0 005.6 0l25-25a4 4 0 00-5.6-5.7L83 84.5z"
        fill="#111111"
      />
    </svg>
  )
}

export default BrandLogo
