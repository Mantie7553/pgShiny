
interface Props {
    type: string;
}

const typeColors: Record<string, string> = {
    fire:     'bg-orange-500',
    water:    'bg-blue-500',
    grass:    'bg-green-500',
    electric: 'bg-yellow-400',
    psychic:  'bg-pink-500',
    ice:      'bg-cyan-400',
    dragon:   'bg-indigo-600',
    dark:     'bg-gray-800',
    fairy:    'bg-pink-300',
    fighting: 'bg-red-700',
    poison:   'bg-purple-500',
    ground:   'bg-yellow-600',
    rock:     'bg-yellow-800',
    bug:      'bg-lime-500',
    ghost:    'bg-purple-800',
    steel:    'bg-gray-400',
    normal:   'bg-gray-300',
    flying:   'bg-sky-400',
}

const CDN_BASE = 'https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons';

export default function TypeBadge({ type }: Props) {
    const bg = typeColors[type] ?? 'bg-gray-400';

    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-white text-xs font-semibold ${bg}`}>
            <img
                src={`${CDN_BASE}/${type}.svg`}
                alt={type}
                className="w-3.5 h-3.5"
            />
            {type}
        </span>
    )
}