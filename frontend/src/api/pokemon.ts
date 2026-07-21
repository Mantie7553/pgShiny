import axios from "axios";
import type { Pokemon } from "../types/pokemon";

export const getAllPokemon = async (generation?: number, type?: string): Promise<Pokemon[]> => {
    const params = new URLSearchParams();
    if (generation) params.append('generation', generation.toString());
    if (type) params.append('type', type);

    const res = await axios.get(`/api/pokemon?${params.toString()}`);
    return res.data;
};

export const getPokemon = async (id: number): Promise<Pokemon> => {
    const res = await axios.get(`/api/pokemon/${id}`);
    return res.data;
}