// We define the strict Types that our UI expects.
// When the real API arrives, we just map their JSON to match these types.

export type SpecialistType = "doctor" | "health_coach";
export type ConsultationType = "obgyn" | "psychologist" | "nutritionist" | "therapist";

export interface Specialist {
  id: string;
  name: string;
  type: SpecialistType;
  specialty: ConsultationType[];
  languages: string[];
  avatarUrl: string;
  bio: string;
  rating: number;
  reviewCount: number;
  licenseJurisdiction?: string;
  feeEur: number;
}

export interface TimeSlot {
  id: string;
  startTime: string; // ISO String
  endTime: string;
}

// ==========================================
// MOCK DATA (Hardcoded fake Iranian specialists)
// ==========================================

export const MOCK_SPECIALISTS: Specialist[] = [
  {
    id: "doc_1",
    name: "Dr. Laleh Ahmadi",
    type: "doctor",
    specialty: ["obgyn"],
    languages: ["Farsi", "English", "German"],
    avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    bio: "Consultant Obstetrician based in Berlin with 12 years of experience. Specialized in high-risk pregnancies and maternal mental health support.",
    rating: 4.9,
    reviewCount: 124,
    licenseJurisdiction: "Germany (Ärztekammer Berlin)",
    feeEur: 85.0,
  },
  {
    id: "doc_2",
    name: "Dr. Reza Karimi",
    type: "doctor",
    specialty: ["psychologist", "therapist"],
    languages: ["Farsi", "English", "Swedish"],
    avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704a",
    bio: "Clinical Psychologist focused on postpartum depression and family transition trauma.",
    rating: 4.8,
    reviewCount: 92,
    licenseJurisdiction: "Sweden (Socialstyrelsen)",
    feeEur: 95.0,
  },
  {
    id: "hc_1",
    name: "Shirin Farahani",
    type: "health_coach",
    specialty: ["nutritionist"],
    languages: ["Farsi", "English"],
    avatarUrl: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
    bio: "Certified pre/postnatal nutritionist. Helping you navigate cravings, gestional diabetes, and recovery nutrition.",
    rating: 5.0,
    reviewCount: 38,
    feeEur: 45.0,
  },
  {
    id: "hc_2",
    name: "Mona Salehi",
    type: "health_coach",
    specialty: ["therapist"],
    languages: ["Farsi", "French"],
    avatarUrl: "https://i.pravatar.cc/150?u=a042581f4f29026024d",
    bio: "Wellness coach specializing in mindfulness and pregnancy anxiety reduction techniques.",
    rating: 4.7,
    reviewCount: 205,
    feeEur: 50.0,
  }
];

// ==========================================
// ABSTRACTION METHODS
// ==========================================

const MODE = process.env.NEXT_PUBLIC_ASADOC_MODE || "mock";

export async function getSpecialists(filterType?: ConsultationType): Promise<Specialist[]> {
  if (MODE === "mock") {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (filterType) {
      return MOCK_SPECIALISTS.filter(s => s.specialty.includes(filterType));
    }
    return MOCK_SPECIALISTS;
  }

  // Later: Implement real fetch to AsaDoc API
  throw new Error("API mode not yet implemented");
}

export async function getSpecialist(id: string): Promise<Specialist | null> {
  if (MODE === "mock") {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return MOCK_SPECIALISTS.find(s => s.id === id) || null;
  }
  throw new Error("API mode not yet implemented");
}

export async function getAvailability(specialistId: string, dateStr: string): Promise<TimeSlot[]> {
  if (MODE === "mock") {
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Generate 3 random slots for any date they pick
    const baseDate = new Date(dateStr);
    return [
      {
        id: `slot_1_${dateStr}`,
        startTime: new Date(baseDate.setHours(10, 0, 0, 0)).toISOString(),
        endTime: new Date(baseDate.setHours(10, 45, 0, 0)).toISOString(),
      },
      {
        id: `slot_2_${dateStr}`,
        startTime: new Date(baseDate.setHours(14, 30, 0, 0)).toISOString(),
        endTime: new Date(baseDate.setHours(15, 15, 0, 0)).toISOString(),
      },
      {
        id: `slot_3_${dateStr}`,
        startTime: new Date(baseDate.setHours(16, 0, 0, 0)).toISOString(),
        endTime: new Date(baseDate.setHours(16, 45, 0, 0)).toISOString(),
      }
    ];
  }
  throw new Error("API mode not yet implemented");
}
