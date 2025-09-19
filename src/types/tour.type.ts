export interface ITourPackage {
  _id: string;
  title: string;
  description: string;
  images: string[];
  location: string;
  costFrom: number;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  departureLocation: string;
  arrivalLocation: string;
  included: string[];
  excluded: string[];
  amenities: string[];
  tourPlan: string[];
  maxGuest: number;
  minAge: number;
  division: string; // likely an ObjectId
  tourType: string; // likely an ObjectId
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  slug: string;
}
