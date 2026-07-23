import { toRoman } from "../utils/generation";

const genRegions: Record<number, string> = {
    1: 'Kanto',
    2: 'Johto',
    3: 'Hoenn',
    4: 'Sinnoh',
    5: 'Unova',
    6: 'Kalos',
    7: 'Alola',
    8: 'Galar',
    9: 'Paldea'
};

interface Props {
    generation: number;
}

export default function GenerationDivider({ generation }: Props) {
    const region = genRegions[generation] ?? 'Unknown';

    return (
        <div className="flex items-center gap-4 px-4 py-6">
            <span className="font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap">
                {region}
            </span>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest whitespace-nowrap">
                Generation {toRoman(generation)}
            </span>
            <div className="flex-1 h-px bg-gray-200" />
        </div>
    );
}