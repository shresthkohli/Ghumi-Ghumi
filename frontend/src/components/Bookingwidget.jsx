// Sticky "Book Now" card that sits in the right column of the detail page


export default function BookingWidget({ destination }) {
    const { price_from, perks } = destination;

    return (
        <div className="glass-widget sticky top-28 rounded-3xl border border-white/30 p-8">
            <div className="mb-8 flex items-start justify-between">
                <div>
                    <p className="font-body text-label-lg text-on-surface-variant mb-1">Starting from</p>
                    <h3 className="font-display text-headline-lg text-on-surface flex items-baseline gap-1">
                        ${price_from}
                        <span className="font-body text-body-md font-normal text-on-surface-variant">/ person</span>
                    </h3>
                </div>

                <button
                type="button"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white bg-white/50 transition-colors hover:bg-primary-fixed active:scale-90"
                aria-label="Save destination"
                >
                <span className="material-symbols-outlined text-primary">bookmark</span>
                </button>

            </div>

            <div className="mb-8 space-y-6">
                <div>
                    <label className="font-body text-label-lg text-on-surface-variant mb-2 block">
                        Check-in / Check-out
                    </label>
                    <div className="relative">
                        <input
                            className="font-body text-body-md w-full rounded-xl border-none bg-white/40 px-12 py-4 text-on-surface focus:ring-2 focus:ring-primary/20"
                            readOnly
                            type="text"
                            value="Select dates"
                        />
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">
                            calendar_month
                        </span>
                    </div>
                </div>

                <div>
                    <label className="font-body text-label-lg text-on-surface-variant mb-2 block">Travelers</label>
                    <div className="relative">
                        <select className="font-body text-body-md w-full appearance-none rounded-xl border-none bg-white/40 px-12 py-4 text-on-surface focus:ring-2 focus:ring-primary/20">
                            <option>2 Adults</option>
                            <option>1 Adult</option>
                            <option>Family (2A + 2C)</option>
                        </select>
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">
                            group
                        </span>
                        <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant">
                            expand_more
                        </span>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <button
                    type="button"
                    className="glossy-button font-display text-headline-md w-full rounded-2xl py-5 text-white active:scale-[0.98]"
                >
                    Book Now
                </button>
                <div className="font-body text-label-md flex items-center justify-center gap-2 text-on-surface-variant">
                    <span className="material-symbols-outlined text-[16px]">verified_user</span>
                    <span>No credit card required to secure dates</span>
                </div>
            </div>

            <div className="mt-8 border-t border-black/5 pt-8">
                <p className="font-body text-label-lg text-on-surface-variant mb-4">Wanderly Perks</p>
                <ul className="space-y-3">
                {perks.map((perk) => (
                    <li key={perk.label} className="font-body text-body-md flex items-center gap-3">
                        <span className="material-symbols-outlined gold-accent">{perk.icon}</span>
                        <span>{perk.label}</span>
                    </li>
                ))}
                </ul>
            </div>
        </div>
    );
}