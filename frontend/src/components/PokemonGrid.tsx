import type { Pokemon } from "../types/pokemon";
import GenerationDivider from "./GenerationDivider";
import PokemonCard from "./PokemonCard";

interface Props {
    pokemon: Pokemon[];
    onSelect: (id: number) => void;
}

export default function PokemonGrid({ pokemon, onSelect }: Props) {
    const grouped = pokemon.reduce<Record<number, Pokemon[]>>((acc, p) => {
        if (!acc[p.generation]) acc[p.generation] = [];
        acc[p.generation].push(p);
        return acc;
    }, {});

    const generations = Object.keys(grouped).map(Number).sort((a, b) => a - b);

    return (
        <div>
            {generations.map(gen => (
                <div key={gen}>
                    <GenerationDivider generation={gen} />
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 px-4">
                        {grouped[gen].map(p => (
                            <PokemonCard key={p.id} pokemon={p} onClick={onSelect} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}