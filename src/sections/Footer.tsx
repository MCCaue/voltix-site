export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06]">
      <div className="mx-auto max-w-[1180px] px-6 py-14">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-xs">
            <a href="#top" className="flex items-center gap-2.5" aria-label="Voltix — início">
              <img src="/brand/symbol.svg" alt="" className="h-8 w-8" />
              <span className="font-display text-xl font-extrabold tracking-tight text-white">voltix</span>
            </a>
            <p className="mt-4 text-sm text-volt-fog">
              O seu app de vantagens. Cashback e recompensas em cada parada, do combustível à recarga
              elétrica.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <FooterCol
              title="Plataforma"
              links={[
                ['O app', '#app'],
                ['Como funciona', '#como-funciona'],
                ['Para o posto', '#posto'],
                ['Por que Voltix', '#comparativo'],
                ['Perguntas frequentes', '#faq'],
              ]}
            />
            <FooterCol
              title="Contato"
              links={[
                ['Seja um parceiro', '#parceiro'],
                ['contato@voltix.com.br', 'mailto:contato@voltix.com.br'],
              ]}
            />
            <FooterCol
              title="Redes"
              links={[
                ['Instagram', '#'],
                ['LinkedIn', '#'],
              ]}
            />
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/[0.06] pt-6 text-xs text-volt-fog/60 sm:flex-row sm:items-center">
          <p>© {2026} Voltix. Todos os direitos reservados.</p>
          <p>Feito com energia no Brasil.</p>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="font-display text-xs font-bold uppercase tracking-wider text-white/40">{title}</h4>
      <ul className="mt-4 space-y-2.5">
        {links.map(([label, href]) => (
          <li key={label}>
            <a href={href} className="text-sm text-volt-fog transition-colors hover:text-white">
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
