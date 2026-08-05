import { useRef } from 'react';
import StatCard from '../components/StatCard';
import JourneyCard from '../components/JourneyCard';

// Stamp data - pulling these into an array avoids writing 6 near-identical blocks
// this is just sample data and real data will be pulled from database 
const stamps = [
    { icon: "temple_buddhist", label: "Jaipur"},
    { icon: "sailing", label: "Goa"},
    { icon: "restaurant", label: "Agra"},
    { icon: "ac_unit", label: "ladakh"},
]

const journeys = [
    {
        title: "Agra",
        image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        title: "Goa",
        image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        title: "Ladakh",
        image: "https://images.unsplash.com/photo-1635255506105-b74adbd94026?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
]

function Profile() {

    // Ref is used instead of state so that DOM does not rerender every time

    const passportRef = useRef(null);

    function handlePassportMouseMove(e) {

        const card = passportRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateX = (rect.height / 2 - y) / 40;
        const rotateY = (x - rect.width / 2) / 40;
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }

    function handlePassportMouseLeave() {
        passportRef.current.style.transform = 'rotateX(0deg) rotateY(0deg)';
    }

    return (
        <div className='bg-background text-on-surface min-h-screen'>

            <main className='max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-section-gap'>

                <div className='grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start'>

                    {/* Left column: name, bio, stats, badge */}
                    <div className='lg:col-span-5 space-y-10'>

                        <section>

                            <span className='px-4 py-1.5 rounded-full bg-primary-container text-on-primary text-xs font-bold inline-block mb-4'>
                                ★ ELITE MEMBER
                            </span>
                            <h1 className='font-display text-5xl font-bold mb-2'>Mr XYZ</h1>
                            <p className='font-body text-lg text-on-surface-variant max-w-md'>
                                Indian Food Explorer & Cultural Storyteller. Chasing unforgettable sunsets from the Himalayas to Kanyakumari, one destination at a time.
                            </p>

                        </section>

                        <div className='grid grid-cols-2 gap-4'>
                            <StatCard value="7" label="States" />
                            <StatCard value="69" label="Cites" />
                        </div>

                        <div className="group relative overflow-hidden bg-gradient-to-br from-tertiary to-tertiary-dark p-8 rounded-[2.5rem] text-white flex items-center gap-6 shadow-warm-lg transition-all duration-500">

                            <div className='absolute inset-0 bg-gradient-to-r from-transparent via-amber-300/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out' />

                            <div className="w-32 h-32 shrink-0 rounded-full bg-primary-container flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-amber-300 group-hover:to-amber-500 group-hover:shadow-[0_0_25px_rgba(251,191,36,0.6)] transition-all duration-1000">
                                <span className="material-symbols-outlined text-9xl">military_tech</span>
                            </div>
                            <div className='relative'>
                                <h3 className="font-display text-xl font-bold mb-1">Voyager Zenith</h3>
                                <p className="text-sm opacity-80">
                                    You've reached the highest tier of Indian exploration. Enjoy
                                    exclusive concierge access.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right column: interactive passport card */}
                    <div className='lg:col-span-7 flex justify-center' style={{ perspective: '2000px'}}>

                        <div
                            ref={passportRef}
                            onMouseMove={handlePassportMouseMove}
                            onMouseLeave={handlePassportMouseLeave}
                            className='relative w-full max-w-[500px] aspect-3/4 bg-gradient-to-br from-tertiary to-tertiary-dark rounded-4xl shadow-warm-lg overflow-hidden p-10 flex flex-col justify-between text-white'
                            style={{ transition: 'transform 0.4s ease-out'}}
                        >

                            <div className='flex justify-between items-start'>
                                <div>
                                    <p className='text-xs text-white/50 uppercase tracking-widest'>Digital Passport</p>
                                    <h2 className='font-display text-3xl'>Wanderly</h2>
                                </div>
                                <span className='material-symbols-outlined'>qr_code_2</span>
                            </div>

                            <div className='grid grid-cols-3 gap-6 py-8'>
                                {stamps.map((stamp) => (
                                    <div key={stamp.label} className='w-24 h-24 rounded-full border-2 border-dashed border-white/20 flex flex-col items-center justify-center text-center hover:scale-110 transition-transform'>
                                        <span className='material-symbols-outlined text-2xl mb-1'>{stamp.icon}</span>
                                        <span className='text-[10px] uppercase tracking-tighter'>{stamp.label}</span>
                                    </div>
                                ))}
                            </div>

                            <div className='pt-10 border-t border-white/10 flex justify-between'>
                                <div>
                                    <p className='text-xs text-white/50 mb-1'>EXPIRATION DATE</p>
                                    <p className='font-bold'>PERPETUAL</p>
                                </div>
                                <div className='text-right'>
                                    <p className='text-xs text-white/50 mb-1'>PASSPORT NO.</p>
                                    <p className='font-bold'>WNDR-9982-ELITE</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Journeys grid */}
                <section className='mt-section-gap'>
                    <h2 className='font-display text-3xl font-bold mb-8'>Curated Journeys</h2>
                    <div className='grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-gutter h-auto md:h-[600px]'>
                            
                            <JourneyCard 
                                title="The Jaipur Retrospect"
                                badge="Featured Trip"
                                subtitle="3 Days · Heritage, Royal Cuisine & Culture"
                                image="https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                className='md:col-span-2 md:row-span-2'
                            />
                            <JourneyCard 
                                title={journeys[0].title}
                                image={journeys[0].image}
                                className='md:col-span-2'
                            />
                            <JourneyCard title={journeys[1].title} image={journeys[1].image} />
                            <JourneyCard title={journeys[2].title} image={journeys[2].image} />
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Profile;
