export interface Product {
  slug: string; name: string; eyebrow: string; title: string; description: string;
  image: string; features: string[];
}
export interface Plan {name: string; period: string; price: string; description: string; features: string[]; featured?: boolean;
  /** Twelve monthly payments, shown slashed beside the annual price. */ compareAt?: string; saving?: string}
