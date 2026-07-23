const romanNumerals: Record<number, string> = {
    1: 'I', 2: 'II', 3: 'III', 4: 'IV',
    5: 'V', 6: 'VI', 7: 'VII', 8: 'VIII', 9: 'IX'
};

export function toRoman(gen: number): string {
    return romanNumerals[gen] ?? String(gen);
}

export function formatMethod(method: string): string {
    return method.replace(/([A-Z])/g, ' $1').trim();
}