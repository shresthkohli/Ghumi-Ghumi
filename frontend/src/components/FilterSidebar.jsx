// this page has the filter logic.. pass down the state via props

import { categories } from "../data/destinations";

function FilterSidebar({ activeCategories, onCatefotyToggle }) {

    return (

        <aside className="w-full md:w-80 shrink-0">
            <div className="bg-surface-container-highest p-8 rounded-4xl shadow-lg sticky top-24 border border-white/20 space-y-6 ">
                <div className="flex flex-col items-center text-center pb-6 border-b border-outline-variant">
                    <div className="w-20 h-20 rounded-full border-2 border-primary/30 flex items-center justify-center mb-3">
                        <span className="material-symbols-outlined text-primary text-4xl">
                            explore
                        </span>
                    </div>
                    <span className="font-body text-label-md uppercase tracking-widest text-primary">
                        Explore Horizons
                    </span>
                </div>

                <div>
                    <h3 className="font-display text-headline-md text-on-surface mb-4">
                        Filter by
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {
                            categories.map((category) => {
                                const isActive = activeCategories.includes(category.id);
                                return (
                                    <button
                                        key={category.id}
                                        onClick={() => onCatefotyToggle(category.id)}
                                        className={
                                            `px-4 py-2 rounded-full text-label-lg flex items-center gap-2 transition-all
                                            ${
                                                isActive
                                                    ?   "bg-primary text-on-primary"
                                                    :   "bg-white/40 text-on-surface-variant hover:bg-primary/10"
                                            }`
                                        }
                                    >
                                        <span className="material-symbols-outlined text-body-lg">
                                            {category.icon}
                                        </span>
                                        {category.label}
                                    </button>
                                )
                            })
                        }
                    </div>
                </div>

                <hr className="border-outline-variant"/>

            </div>
        </aside>
    );
}

export default FilterSidebar;