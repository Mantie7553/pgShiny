
export interface ShinyMethod {
    id: number;
    method: string;
    odds: string;
    notes: string | null;
}

export interface Pokemon {
    id: number;
    name: string;
    generation: number;
    types: string;
    spriteUrl: string;
    isShinyAvailable: boolean;
    shinyMethods: ShinyMethod[];
}