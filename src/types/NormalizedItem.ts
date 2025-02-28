import { Sources } from "./Sources";

export type NormalizedItem = {
  title: string;
  price: string;
  source: Sources;
  amount: string;
  dilution: string;
  cas?: string;
  link?: string;
  tags: string[];
  aliases: string[];
  odors?: string[];
  description?: string;
};
