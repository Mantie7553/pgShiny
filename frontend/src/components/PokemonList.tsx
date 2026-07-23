import type { Pokemon } from "../types/pokemon";
import GenerationDivider from "./GenerationDivider";
import PokemonRow from "./PokemonRow";

interface Props {
    pokemon: Pokemon[];
    onSelect: (id: number) => void;
}

export default function PokemonList({ pokemon, onSelect }: Props) {
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
                    <div className="flex flex-col gap-2 px-4">
                        {grouped[gen].map(p => (
                            <PokemonRow key={p.id} pokemon={p} onClick={onSelect} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}