import type { Pokemon } from "../types/pokemon";
import PokemonCard from "./PokemonCard";

interface Props {
    pokemon: Pokemon[];
    onSelect: (id: number) => void;
}

export default function PokemonGrid({ pokemon, onSelect }: Props) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-4">
            {pokemon.map(p => (
                <PokemonCard key={p.id} pokemon={p} onClick={onSelect} />
            ))}
        </div>
    );
}