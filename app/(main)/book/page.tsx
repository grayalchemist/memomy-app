import { getSpecialists, ConsultationType } from "@/lib/asadoc";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, ShieldCheck, HeartHandshake, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

export default async function BookingDirectoryPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  const filterType = type as ConsultationType | undefined;

  // This calls our abstraction layer (which currently resolves mock data)
  const specialists = await getSpecialists(filterType);

  const filters: { label: string; value?: ConsultationType }[] = [
    { label: "All Experts" },
    { label: "OBGYNs", value: "obgyn" },
    { label: "Psychologists", value: "psychologist" },
    { label: "Nutritionists", value: "nutritionist" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background p-4 pb-28 pt-10">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-foreground">
            Experts
          </h1>
          <p className="mt-1 text-sm text-foreground-secondary">
            Farsi-speaking care.
          </p>
        </div>
        <Badge variant="outline" className="bg-card">
          <Filter className="mr-1 size-3" /> Filter
        </Badge>
      </div>

      {/* Filter Tabs */}
      <div className="scrollbar-hide mb-4 flex gap-2 overflow-x-auto pb-2">
        {filters.map((f) => {
          const active = (f.value ?? undefined) === filterType;
          const href = f.value ? `/book?type=${f.value}` : "/book";
          return (
            <Link
              key={f.label}
              href={href}
              className={cn(
                "whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-all",
                active
                  ? "bg-gradient-brand text-primary-foreground shadow-sm"
                  : "bg-card text-foreground-secondary ring-1 ring-foreground/10 hover:bg-muted"
              )}
            >
              {f.label}
            </Link>
          );
        })}
      </div>

      <div className="space-y-4">
        {specialists.map((spec) => (
          <Link href={`/book/${spec.id}`} key={spec.id} className="block">
            <Card className="relative overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
              {spec.type === "health_coach" && (
                <div className="absolute right-0 top-0 flex items-center rounded-bl-xl bg-coach/10 px-3 py-1 text-xs font-bold text-coach">
                  <HeartHandshake className="mr-1 size-3" /> Health Coach
                </div>
              )}
              {spec.type === "doctor" && (
                <div className="absolute right-0 top-0 flex items-center rounded-bl-xl bg-info/10 px-3 py-1 text-xs font-bold text-info">
                  <ShieldCheck className="mr-1 size-3" /> EU Licensed
                </div>
              )}

              <CardContent className="p-4">
                <div className="flex gap-4">
                  <Avatar className="size-16 ring-2 ring-primary/10">
                    <AvatarImage src={spec.avatarUrl} alt={spec.name} />
                    <AvatarFallback className="bg-primary/10 font-heading font-bold text-primary">
                      {spec.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="mt-2 flex-1">
                    <h3 className="font-heading text-lg font-bold leading-tight text-foreground">
                      {spec.name}
                    </h3>

                    <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="size-3 fill-accent text-accent" />
                      <span className="font-semibold text-foreground">
                        {spec.rating}
                      </span>
                      <span>({spec.reviewCount} reviews)</span>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-1">
                      {spec.languages.map((lang) => (
                        <span
                          key={lang}
                          className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-foreground-secondary"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}

        {specialists.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            No specialists found for this category right now.
          </div>
        )}
      </div>
    </div>
  );
}
