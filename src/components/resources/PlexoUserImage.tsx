type PlexoLogoProps = {
  scale?: number;
  backgroundColor?: string;
};

export default function PlexoUserImage({ scale = 1, backgroundColor }: PlexoLogoProps) {
  return (
    <svg
      width={317 * scale}
      height={317 * scale}
      viewBox="0 0 317 317"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="317" height="317" rx="158.5" fill={backgroundColor ?? "#0C0A09"} />
      <path
        d="M158.21 187.501C176.408 187.501 191.733 202.097 192.941 221.074C193.026 222.407 194.101 223.493 195.436 223.493H212.253C213.588 223.493 214.676 222.407 214.622 221.073C213.383 190.598 188.845 165.848 158.21 165.848C157.985 165.848 157.761 165.849 157.537 165.852C119.286 165.493 87.9906 134.519 86.7396 95.5859C86.6967 94.2512 85.6183 93.1633 84.2829 93.1633H67.4656C66.1303 93.1633 65.0447 94.2494 65.078 95.5843C66.0013 132.632 88.0543 164.492 119.602 179.057C120.405 179.427 120.576 180.506 119.932 181.113C109.266 191.174 102.436 205.364 101.797 221.074C101.743 222.409 102.831 223.493 104.166 223.493H120.983C122.319 223.493 123.393 222.407 123.478 221.074C124.673 202.305 139.677 187.821 157.613 187.506C157.811 187.507 158.01 187.508 158.209 187.508L158.21 187.501Z"
        fill="#19B888"
      />
      <path
        d="M235.596 145.705C235.174 146.34 234.276 146.417 233.736 145.879C229.214 141.368 224.299 137.258 219.046 133.607C218.507 133.232 218.358 132.499 218.704 131.941C225.282 121.364 229.249 108.94 229.678 95.5813C229.721 94.2466 230.799 93.1633 232.134 93.1633H248.952C250.287 93.1633 251.373 94.2468 251.339 95.5817C250.879 114.092 245.145 131.304 235.596 145.705Z"
        fill="#19B888"
      />
      <path
        d="M158.21 129.155C140.011 129.155 124.687 114.558 123.479 95.582C123.394 94.2494 122.32 93.1633 120.984 93.1633H104.167C102.832 93.1633 101.744 94.2487 101.798 95.5829C103.037 126.057 127.575 150.808 158.21 150.808C196.765 150.808 228.42 181.916 229.679 221.077C229.722 222.412 230.8 223.5 232.135 223.5H248.953C250.288 223.5 251.374 222.414 251.34 221.079C250.417 184.03 228.362 152.169 196.812 137.605C196.009 137.234 195.839 136.155 196.482 135.549C207.151 125.487 213.984 111.295 214.623 95.5816C214.677 94.2474 213.589 93.1633 212.254 93.1633H195.437C194.102 93.1633 193.027 94.2494 192.942 95.582C191.734 114.559 176.408 129.155 158.21 129.155Z"
        fill="#64E46E"
      />
      <path
        d="M80.8225 170.958C81.2439 170.323 82.1426 170.246 82.6824 170.785C87.2041 175.296 92.1193 179.405 97.3722 183.056C97.9112 183.431 98.0604 184.165 97.7138 184.722C91.1363 195.3 87.1691 207.724 86.7405 221.082C86.6976 222.417 85.6192 223.5 84.2839 223.5H67.4666C66.1313 223.5 65.0457 222.416 65.0789 221.081C65.5395 202.571 71.2728 185.359 80.8225 170.958Z"
        fill="#64E46E"
      />
    </svg>
  );
}