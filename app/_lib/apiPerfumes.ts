import supabase from "./supabase";

export interface PerfumeType {
  id: number;
  name: string;
  description: string;
  firstnote: string;
  secondnote: string;
  mainnote: string;
  Capacity: number;
  price: number;
  image: string;
}

export async function getPerfumes(): Promise<PerfumeType[]> {
  const { data, error } = await supabase.from("Perfumes").select("*");
  if (error) {
    throw new Error("perfumes could not be loaded");
  }
  return data as PerfumeType[];
}
