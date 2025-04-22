import { CAS } from "./fields";
import { Sources } from "./Sources";

export type NormalizedItem = {
  title: string;
  price: string;
  source: Sources;
  size: string;
  dilution: string;
  /** A CAS number (Chemical Abstracts Service Registry Number) is a unique numerical identifier assigned to chemical substances, including those used in perfumery, to provide unambiguous identification across industries and regulatory systems. */
  cas?: CAS;
  href?: string;
  tags: string[];
  aliases: string[];
  odors?: string[];
  description?: string;
  attributes: Attribute[];
};

export type NormalizedIFRAEntry = {
  /** A CAS number (Chemical Abstracts Service Registry Number) is a unique numerical identifier assigned to chemical substances, including those used in perfumery, to provide unambiguous identification across industries and regulatory systems. */
  cas: CAS;
  name: string;
  files: FileDescriptor[];
  attributes: GenericAttribute[];
};

export enum AttributeName {
  origin = "origin",
  manufacturer = "manufacturer",
  dilutant = "dilutant",
}

export type Attribute = Partial<Record<AttributeName, string>>;

export type GenericAttribute = {
  type: "date" | "flag" | "reference";
  name: string;
  value: string;
};

export type FileDescriptor = {
  contentType: string;
  fileName: string;
  href: string;
};
