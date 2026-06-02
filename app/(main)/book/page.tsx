import { getSpecialists, ConsultationType } from "@/lib/asadoc";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, ShieldCheck, HeartHandshake, Filter } from "lucide-react";

export default async function BookingDirectoryPage({
  searchParams,
}: {
  searchParams: { type?: string };
}) {
  const filterType = searchParams.type as ConsultationType | undefined;

  // This calls our abstraction layer (which currently resolves mock data)
  const specialists = await getSpecialists(filterType);

  return (
    <div className="flex flex-col min-h-screen bg-bg-base p-4 pt-10 pb-24">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="font-serif text-3xl font-bold text-text-primary">Experts</h1>
          <p className="font-sans text-text-secondary mt-1">Farsi-speaking care.</p>
        </div>
        <Badge variant="outline" className="bg-white">
          <Filter className="h-3 w-3 mr-1" /> Filter
        </Badge>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-4">
        <Link href="/book" className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-colors ${!filterType ? 'bg-primary text-white' : 'bg-white text-text-secondary hover:bg-primary/5'}`}>
          All Experts
        </Link>
        <Link href="/book?type=obgyn" className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-colors ${filterType === 'obgyn' ? 'bg-primary text-white' : 'bg-white text-text-secondary hover:bg-primary/5'}`}>
          OBGYNs
        </Link>
        <Link href="/book?type=psychologist" className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-colors ${filterType === 'psychologist' ? 'bg-primary text-white' : 'bg-white text-text-secondary hover:bg-primary/5'}`}>
          Psychologists
        </Link>
        <Link href="/book?type=nutritionist" className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-colors ${filterType === 'nutritionist' ? 'bg-primary text-white' : 'bg-white text-text-secondary hover:bg-primary/5'}`}>
          Nutritionists
        </Link>
      </div>

      <div className="space-y-4">
        {specialists.map((spec) => (
          <Link href={`/book/${spec.id}`} key={spec.id} className="block">
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow bg-white overflow-hidden relative">
              {spec.type === "health_coach" && (
                <div className="absolute top-0 right-0 px-3 py-1 bg-health-coach/10 text-[#6A8A5C] text-xs font-bold rounded-bl-xl flex items-center">
                  <HeartHandshake className="w-3 h-3 mr-1" /> Health Coach
                </div>
              )}
              {spec.type === "doctor" && (
                <div className="absolute top-0 right-0 px-3 py-1 bg-info/10 text-info text-xs font-bold rounded-bl-xl flex items-center">
                  <ShieldCheck className="w-3 h-3 mr-1" /> EU Licensed
                </div>
              )}

              <CardContent className="p-4">
                <div className="flex gap-4">
                  <Avatar className="h-16 w-16 border-2 border-primary/10">
                    <AvatarImage src={spec.avatarUrl} alt={spec.name} />
                    <AvatarFallback className="bg-primary/10 text-primary font-serif font-bold">
                      {spec.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 mt-2">
                    <h3 className="font-serif text-lg font-bold text-text-primary leading-tight">{spec.name}</h3>

                    <div className="flex items-center gap-1 mt-1 text-xs text-text-muted">
                      <Star className="h-3 w-3 fill-accent text-accent" />
                      <span className="font-semibold text-text-primary">{spec.rating}</span>
                      <span>({spec.reviewCount} reviews)</span>
                    </div>

                    <div className="flex gap-1 mt-3 flex-wrap">
                      {spec.languages.map(lang => (
                         <span key={lang} className="text-[10px] uppercase tracking-wider font-bold text-text-secondary bg-bg-muted px-2 py-0.5 rounded-sm">
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
          <div className="text-center py-12 px-4 text-text-muted">
             No specialists found for this category right now.
          </div>
        )}
      </div>
    </div>
  );
}