
interface Props {
    positioned?: boolean;
}

export default function ShinyBadge({ positioned = true }: Props) {
    return (
        <div className={positioned ? "absolute top-2 right-2" : ""}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-yellow-400 drop-shadow-md shiny-shimmer">
                <path d="M12 3c-.3 1.4-.7 2.6-1.4 3.6S8.9 8.7 7.5 9c1.4.3 2.6.7 3.6 1.4S12.7 12 13 13.5c.3-1.5.7-2.7 1.4-3.6S16.5 8.3 18 9c-1.5-.3-2.7-.7-3.6-1.4S12.3 5.9 12 3z"/>
                <path d="M5 14c-.2.8-.5 1.5-.9 2S3 17.2 2 17.5c1 .3 1.7.6 2.1 1.1s.7 1.2.9 2c.2-.8.5-1.5.9-2s1.1-.8 2.1-1.1c-1-.3-1.7-.6-2.1-1.1S5.2 14.8 5 14z"/>
                <path d="M18.5 2c-.1.7-.4 1.2-.7 1.7s-.9.7-1.8 1c.9.2 1.5.5 1.8 1s.6 1 .7 1.7c.1-.7.4-1.2.7-1.7s.9-.8 1.8-1c-.9-.2-1.5-.5-1.8-1S18.6 2.7 18.5 2z"/>
            </svg>
        </div>
    )
}