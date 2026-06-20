export type KajianType = "series" | "single";

export interface Slide {
  tag: string;
  title: string;
  content: string;
}

export interface Pertemuan {
  id: number;
  title: string;
  date: string;
  slides: Slide[];
}

export interface Kajian {
  id: string;
  type: KajianType;
  title: string;
  pemateri: string;
  cover_tag: string;
  tags: string[];
  color: { primary: string; soft: string; accent: string };
  pertemuan?: Pertemuan[]; // for series
  date?: string; // for single
  slides?: Slide[]; // for single
}
