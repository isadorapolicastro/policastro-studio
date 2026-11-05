/** Símbolo POLICASTROSTUDIO (IG1 · ligadura): o I de Isadora apoia o G de Guilherme. */
export const G_TRACO = 'M160.4 60.6A64 64 0 1 0 174 100H114'

export default function Simbolo({ altura = 28, claro = '#F2F2EE', destaque = '#7B61FF', titulo }: { altura?: number; claro?: string; destaque?: string; titulo?: string }) {
  return (
    <svg
      width={(altura * 174) / 184}
      height={altura}
      viewBox="23 8 174 184"
      role={titulo ? 'img' : undefined}
      aria-label={titulo}
      aria-hidden={titulo ? undefined : true}
      focusable="false"
    >
      <path d={G_TRACO} fill="none" stroke={claro} strokeWidth="26" />
      <rect x="33" y="18" width="26" height="164" fill={destaque} />
    </svg>
  )
}
