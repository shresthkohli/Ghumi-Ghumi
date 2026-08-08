function AttractionCard({
    icon,
    name,
    description
}) {

    return (

        <div className="
            group
            rounded-[2rem]
            bg-surface-container
            border border-outline/20
            p-8
            transition-all
            duration-300
            hover:-translate-y-1
            hover:border-primary/30
            hover:shadow-warm-lg
        ">

            <div className="
                w-14
                h-14
                rounded-2xl
                bg-primary-container
                text-on-primary
                flex
                items-center
                justify-center
                mb-6
                transition-transform
                duration-300
                group-hover:scale-110
            ">

                <span className="material-symbols-outlined text-3xl">
                    {icon}
                </span>

            </div>

            <h3 className="
                font-display
                text-title-lg
                text-on-surface
                mb-3
            ">
                {name}
            </h3>

            <p className="
                text-on-surface-variant
                leading-relaxed
            ">
                {description}
            </p>

        </div>

    );

}

export default AttractionCard;