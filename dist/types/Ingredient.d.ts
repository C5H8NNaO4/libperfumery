import { Sources } from "./Sources.js";
export type Ingredient = {
    title: string;
    cas?: string;
    dilution: string;
    dilutant?: string;
    sources: IngredientSource[];
};
export type IngredientSource = {
    source: Sources;
    link: string;
    cas?: string;
    price: string;
    size: string;
    dilution: string;
    dilutant?: string;
};
export type UsedIngredient = {
    title: string;
    cas?: string;
    dilution: string;
    dilutant?: string;
    sources: IngredientSource[];
    amount: string;
};
