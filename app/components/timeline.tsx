export default function Timeline() {
    const timelineEvents = [
        {
            date: "November 4 1999",
            title: "Born",
            content: "🇯🇵",
            position: "start"
        },
        {
            date: "April 1 2019 - March 31 2025",
            title: "Kyoto University",
            content: "⛩️",
            position: "end"
        },
        {
            date: "April 1 2025-",
            title: "🏢",
            content: "As AI Work Transformation Engineer.",
            position: "start"
        }
    ];

    const CheckIcon = () => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
        >
            <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
            />
        </svg>
    );

    return (
        <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical mx-auto max-w-4xl px-16">
            {timelineEvents.map((event, index) => (
                <li key={index}>
                    {index > 0 && <hr />}
                    <div className="timeline-middle">
                        <CheckIcon />
                    </div>
                    <div className={`timeline-${event.position} ${event.position === 'start' ? 'mb-10 md:text-end md:mr-8 ml-8' : 'md:mb-10 md:ml-8 ml-8'}`}>
                        <time className="font-mono italic">{event.date}</time>
                        <div className="text-lg font-black">{event.title}</div>
                        <p>{event.content}</p>
                    </div>
                    {index < timelineEvents.length - 1 && <hr />}
                </li>
            ))}
        </ul>
    );
}