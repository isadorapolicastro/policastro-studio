const P = 'M20 20H56A60 60 0 0 1 56 140V200H20ZM56 54A26 26 0 0 1 56 106Z'

/** Símbolo POLICASTROSTUDIO (3C2 · giro com eixo): dois P, um girado, e o ponto no centro. */
export default function Simbolo({ altura = 28, claro = '#F2F2EE', destaque = '#7B61FF', titulo }: { altura?: number; claro?: string; destaque?: string; titulo?: string }) {
  return (
    <svg
      width={(altura * 176) / 280}
      height={altura}
      viewBox="10 10 176 280"
      role={titulo ? 'img' : undefined}
      aria-label={titulo}
      aria-hidden={titulo ? undefined : true}
      focusable="false"
    >
      <path d={P} fill={claro} fillRule="evenodd" />
      <path d={P} fill={destaque} fillRule="evenodd" transform="rotate(180 98 150)" />
      <circle cx="98" cy="150" r="13" fill={destaque} />
    </svg>
  )
}
