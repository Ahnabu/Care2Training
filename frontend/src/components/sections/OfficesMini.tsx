import { offices, siteContact } from "@/content/offices";
import { cn } from "@/lib/utils";

export function OfficesMini({ className }: Readonly<{ className?: string }>) {
  return (
    <aside className={cn("rounded-[30px] border border-border bg-card p-6 md:p-8 shadow-sm", className)}>
      <p className="text-sm font-bold uppercase tracking-[0.12em] text-muted-foreground">Offices</p>
      <div className="mt-4 grid gap-4 text-[0.98rem] text-muted-foreground">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.12em] text-muted-foreground">Contact</p>
          <div className="mt-2 flex flex-col gap-1">
            <a className="font-semibold text-foreground hover:text-primary" href={`mailto:${siteContact.email}`}>
              {siteContact.email}
            </a>
            {siteContact.phones.map((p) => (
              <a key={p.tel} className="font-semibold text-foreground hover:text-primary" href={`tel:${p.tel}`}>
                {p.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.12em] text-muted-foreground">Locations</p>
          <div className="mt-2 grid gap-3">
            {offices.map((o) => (
              <div key={o.country}>
                <p className="font-semibold text-foreground">{o.country}</p>
                <p className="text-muted-foreground">{o.address}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

