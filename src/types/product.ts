import type { LucideIcon } from 'lucide-react';

export interface ProductVariant {
  servings: number;
  price: number;
  originalPrice?: number;
  perServing: number;
}

export interface ProductIngredient {
  name: string;
  amount: string;
  benefit: string;
}

export interface ScienceInfo {
  name: string;
  dose: string;
  mechanism: string;
  research: string;
}

export interface WhoIsThisFor {
  icon: string | React.ReactNode;
  title: string;
  desc: string;
}

export interface HowToUse {
  step: string;
  title: string;
  desc: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  productIds: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  badge?: string;
  description: string;
  longDescription: string;
  image: string;
  color: 'blue' | 'emerald' | 'red' | string;
  accentColor: string;
  textColor: string;
  bgColor: string;
  borderColor: string;
  ingredients: ProductIngredient[];
  benefits: string[];
  variants: ProductVariant[];
  flavors: string[];
  icon: LucideIcon;
  whoIsThisFor?: WhoIsThisFor[];
  howToUse?: HowToUse[];
  science?: ScienceInfo[];
  tags?: string[];
  categoryId?: string;
}
