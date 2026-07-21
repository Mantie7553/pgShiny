import type { Pokemon } from "../types/pokemon";
import PokemonRow from "./PokemonRow";

interface Props {
    pokemon: Pokemon[];
    onSelect: (id: number) => void;
}

export default function PokemonList({ pokemon, onSelect }: Props) {
    return (
        <div className="flex flex-col gap-2 p-4">
            {pokemon.map(p => (
                <PokemonRow key={p.id} pokemon={p} onClick={onSelect} />
            ))}
        </div>
    );
}