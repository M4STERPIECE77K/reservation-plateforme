import { Injectable } from '@angular/core';

export interface ServiceItem {
    id: number;
    title: string;
    category: string;
    description: string;
    fullDescription?: string;
    duration: string;
    price: string;
    popular: boolean;
    image: string;
    gallery?: string[];
    rating?: number;
    reviews?: number;
    location?: string;
    providerName?: string;
    isVerified?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class ServicesService {
    private services: ServiceItem[] = [
        {
            id: 1,
            title: 'Classic Haircut',
            category: 'Beauty',
            description: 'Complete consultation followed by a wash, precision cut, and styling with premium products',
            fullDescription: 'Our Classic Haircut service provides a tailored experience for those seeking a sharp, professional look. Starting with a personal consultation, our stylists work with you to understand your hair goals and face shape to deliver the perfect cut. The service includes a revitalizing wash with high-quality cleansers and a finish with precision styling using only the best products to ensure your new look lasts.',
            duration: '40 min',
            price: '$35',
            popular: true,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBneqwVGGiW5IsQzv2rGEwOUe7khK_77xcU5lgKD9FeCk6INXRBfIxPMVDtK6c1yt2q-Q31zIcqp73g0rhy3iqxlgugpX3-tljtpyuB9PjIo-zdf9vlSZYeptH7aOVSFf8X81z_BC5imJpZTesa61d1iwu-F9ttFVZ-DCGGFhojyhUy8WXNhqKK4jOXwObU34TXINuitDqj7FacUZ_TYg_o9SsigXFtVwAINqQZzsY9gARIQLVeywv9RKLfUEATseCi84JBITYLD9U',
            rating: 4.8,
            reviews: 156,
            location: 'Chic Style Salon, Uptown',
            providerName: 'Sarah Jenkins',
            isVerified: true
        },
        {
            id: 2,
            title: 'Dental Checkup',
            category: 'Health',
            description: 'Full oral examination, cleaning, and fluoride treatment for healthy teeth and gums',
            fullDescription: 'Maintain your perfect smile with our comprehensive dental checkup. Our expert dental team performs a thorough examination of your teeth, gums, and mouth to ensure early detection of any issues. The package includes professional scaling and polishing to remove plaque and tartar buildup, followed by a fluoride treatment to strengthen your enamel. We prioritize your comfort and oral health above all.',
            duration: '60 min',
            price: '$120',
            popular: false,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjz4wSKRNUN8nCm3oHmj2aWuodknei_fDvW2aVZ_0iay2rZ3QXhbYC6t1iKv1voSQ6D5HfMEOdqkCalX9lUH4aiePU1gfFAA9RCdCcGTwBoJc6OX3j4Lk0coxzMavY-y4QD3yoqLJZveBq-OjrJyGisIoxxYUPyqQI-OX-vwamGTVNz2ONClWZQdBDW4t0NHtS9Ce56L9mlYZ0uN4GA2GPUDDUq6khwnGPz-_V3puD_uVrvJ64eOZsNNYkELfKle8swe9_ppsFxAk',
            rating: 4.9,
            reviews: 89,
            location: 'Bright Smiles Dental Clinic',
            providerName: 'Dr. Michael Chen',
            isVerified: true
        },
        {
            id: 3,
            title: 'Premium Oil Change',
            category: 'Automotive',
            description: 'Includes synthetic oil replacement, filter change, and a comprehensive 20-point safety check',
            fullDescription: 'Keep your engine running at peak performance with our Premium Oil Change service. We use high-quality synthetic oil specifically designed for your vehicle\'s needs. This service isn\'t just about changing the oil; we also replace your oil filter and perform a detailed 20-point safety inspection, checking fluid levels, tire pressure, and brake conditions to ensure your safety on the road.',
            duration: '30 min',
            price: '$85',
            popular: false,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAT_WGDSCjWRpONQht1oghUwAfgWFOyM9aoIRxqvebNRsFMsK_PJSpKcFDMqYXCZSdpIsYi-BbcpTHcHFAVCNanzRaQvfE81CQbNO4tKGvHI0RLwVndbWX7zVckYLBRqZf0yJ81T9G3izNnzX1lxdpEdoUrdxy8Zop9GukaIYmX6UlATcYovenINyNNv32GGWHNd26-2fLsomHHKDdRhKoTzQPi_PPBGhOG3oJ3QHfsniwOMWG4A5HL_ZBK-l3K1JEqaVcXDR2EJa4',
            rating: 4.7,
            reviews: 210,
            location: 'Precision Auto Care Center',
            providerName: 'Auto Masters',
            isVerified: true
        },
        {
            id: 4,
            title: 'Therapeutic Massage',
            category: 'Wellness',
            description: 'Relieve stress and muscle tension with our specialized full-body massage techniques',
            fullDescription: 'Experience total relaxation with our signature Full Body Massage Therapy. This comprehensive treatment combines Swedish and Deep Tissue techniques to release tension, improve circulation, and promote overall wellness. Our certified therapists customize pressure to your preference, focusing on areas of stress. Includes aromatherapy to enhance the calming effect.',
            duration: '60 min',
            price: '$50',
            popular: false,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6LKVdHCYCNjv6i9W-MhzddTIFKhaEX7AB1-yNonsBAglmNEv__qE3lkUk2ykJJJkcn3MID6c0s2AWPCdgVmtXSAxlu6k9kgbzAKCY4tTAnVMwhfoSNAu7XNJ_J-vsYqeVLqklXQNTgnlcwDRSnID3YoAL2z9LR33g87lnL3MNdjX-jZiZfTR_0Lr2HiCVDOGbgYc8AaLJmiuHv2cB0gOyHOEcQbbuKGURrXh1vnFVBOLXsmgTkAdwUapFCed5Cs9MKVk9vD-mSik',
            gallery: [
                'https://lh3.googleusercontent.com/aida-public/AB6AXuAxnKOrs8HKPku0umel1zk5VdugvHXG_gFjYk5gX75N3r-b10MyPkwlFQ7139jvz9rLiSTkN94523dfMBrXMAohJJWgx_8Y_8FyW8Wkd4gehk4eV5BNHwMelb7daZ5yOrwGBL55Bs-bHLSa55SkWZH-2JwMvI0O8D6CAjZeM8KXJcIFFo_CpGoK3H6ltLep_JRqlnVqqd0STnNXpYkk5AWzeI_4GhHIjK7WDk0Z8Rc_PN19FowkInvujcLU1S8V50sVyP-YlKRBvW8',
                'https://lh3.googleusercontent.com/aida-public/AB6AXuBzrGxMvqDWSdIkWmXM_JBo5yzCTwtdUewoIJXozGMNr_msFKAfCsq8jLhNhBWCtYWu1zbBM-rZa25DTCDe5MgZlkTLfmcIpWigBSaaS6t8tw5hX579yXpJJycBx1WZ2lbjHk6ciW7Z-pJJTAal4mn6frs8dvZ1uHVCB_0_byEdcOYB72ggV21tr3ra83BM7tvEE2tafQFaQkkd7l0m11CCR8KSPsmpJ-cn5mq5jAneiw7R1rEaN6_WV5o5gAOwzwaImiO8qev_2-A',
                'https://lh3.googleusercontent.com/aida-public/AB6AXuCciZ9KKeaDPNqIrD2Fq0O6dgnAuYCeyjr1grBGvq1zEHAjevVcBGWvUTws9DzrF3kHu0sFJNVfyQMTbtY9SWxT4j0_Ozru1aKmCaJRLfWTMHfuDYHqz1VZDn8Hxkat8z2PhDtI0HdXvIxnyTOruN7asu00tO1jpJiVKNg7fxEPRWriRAnUH-VJBk223YCPtPCVCBfpi3lvYcb4xM0fuRR4mbOv3sed-a6A5X7h8UEpGPk-9i4hhm7dS6GgvNGDQ3MDQPW90BIBMfQ'
            ],
            rating: 4.9,
            reviews: 128,
            location: 'Zen Wellness Center, Downtown',
            providerName: 'Alex Rivera',
            isVerified: true
        },
        {
            id: 5,
            title: 'Plumbing Repair',
            category: 'Home',
            description: 'Expert diagnosis and repair for leaks, clogs, and pipe maintenance. Price is per hour',
            fullDescription: 'When plumbing issues arise, you need experts you can trust. Our professional plumbers provide comprehensive diagnosis and fast, reliable repairs for all home plumbing systems. Whether it\'s a persistent leak, a stubborn clog, or general pipe maintenance, we use modern equipment to fix the problem correctly the first time. We are dedicated to providing high-quality service with transparent hourly rates.',
            duration: '1h',
            price: '$80',
            popular: false,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMQuhUbmSIZypFCz5To_RUSLBOE3tsp3qd3zaAIYavWo4Q5Reyb4XQufHgqNMqwc8APkCU091HibSpzPXsegRGKZiwJuqua1SsfzCf72vRM6neXViUwCWfPW8JT8Q00OoXRldHjQfVUMqzaORPWWYrtL6NegZW46EmXn4Z33GNC9_d5xbB0xE7dZfHmoZTOeAZ4sVkO-wPMP7LBvF2dEwdxhqB5p1yQ2RXs2OawWMMi8sYLecoEOlnaF0Yer0cVYKeWQS_MufOVj4',
            rating: 4.6,
            reviews: 64,
            location: 'HomeFix Services Co.',
            providerName: 'Reliable Plumbing',
            isVerified: true
        }
    ];

    getServices() {
        return this.services;
    }

    getServiceById(id: number) {
        return this.services.find(s => s.id === id);
    }
}
