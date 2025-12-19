
export interface eSIMPlan {
  id: string;
  name: string;
  data: string;
  duration: string;
  price: number;
  originalPrice: number;
  isPopular?: boolean;
  networks?: string[];
  features?: string[]; // e.g., "Hotspot", "5G Ready", "Local Number"
}

export interface Destination {
  id: string;
  name: string;
  code: string;
  imageUrl: string;
  slug: string;
  description: string;
  shortDesc: string;
  plans: eSIMPlan[];
  rating: number;
  reviewsCount: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  content: string;
  date: string;
  location: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
