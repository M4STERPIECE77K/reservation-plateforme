import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-browse-services',
    standalone: true,
    imports: [CommonModule, SidebarComponent],
    templateUrl: './browse-services.component.html'
})
export class BrowseServicesComponent {
    private router = inject(Router);
    private authService = inject(AuthService);

    activeCategory = 'All Services';

    categories = [
        'All Services',
        'Haircuts',
        'Coloring',
        'Styling',
        'Treatments'
    ];

    services = [
        {
            title: 'Classic Haircut',
            description: 'Complete consultation followed by a wash, precision cut, and styling with premium products',
            duration: '40 min',
            price: '$35',
            popular: true,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBneqwVGGiW5IsQzv2rGEwOUe7khK_77xcU5lgKD9FeCk6INXRBfIxPMVDtK6c1yt2q-Q31zIcqp73g0rhy3iqxlgugpX3-tljtpyuB9PjIo-zdf9vlSZYeptH7aOVSFf8X81z_BC5imJpZTesa61d1iwu-F9ttFVZ-DCGGFhojyhUy8WXNhqKK4jOXwObU34TXINuitDqj7FacUZ_TYg_o9SsigXFtVwAINqQZzsY9gARIQLVeywv9RKLfUEATseCi84JBITYLD9U'
        },
        {
            title: 'Dental Checkup',
            description: 'Full oral examination, cleaning, and fluoride treatment for healthy teeth and gums',
            duration: '60 min',
            price: '$120',
            popular: false,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjz4wSKRNUN8nCm3oHmj2aWuodknei_fDvW2aVZ_0iay2rZ3QXhbYC6t1iKv1voSQ6D5HfMEOdqkCalX9lUH4aiePU1gfFAA9RCdCcGTwBoJc6OX3j4Lk0coxzMavY-y4QD3yoqLJZveBq-OjrJyGisIoxxYUPyqQI-OX-vwamGTVNz2ONClWZQdBDW4t0NHtS9Ce56L9mlYZ0uN4GA2GPUDDUq6khwnGPz-_V3puD_uVrvJ64eOZsNNYkELfKle8swe9_ppsFxAk'
        },
        {
            title: 'Premium Oil Change',
            description: 'Includes synthetic oil replacement, filter change, and a comprehensive 20-point safety check',
            duration: '30 min',
            price: '$85',
            popular: false,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAT_WGDSCjWRpONQht1oghUwAfgWFOyM9aoIRxqvebNRsFMsK_PJSpKcFDMqYXCZSdpIsYi-BbcpTHcHFAVCNanzRaQvfE81CQbNO4tKGvHI0RLwVndbWX7zVckYLBRqZf0yJ81T9G3izNnzX1lxdpEdoUrdxy8Zop9GukaIYmX6UlATcYovenINyNNv32GGWHNd26-2fLsomHHKDdRhKoTzQPi_PPBGhOG3oJ3QHfsniwOMWG4A5HL_ZBK-l3K1JEqaVcXDR2EJa4'
        },
        {
            title: 'Therapeutic Massage',
            description: 'Relieve stress and muscle tension with our specialized full-body massage techniques',
            duration: '60 min',
            price: '$50',
            popular: false,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6LKVdHCYCNjv6i9W-MhzddTIFKhaEX7AB1-yNonsBAglmNEv__qE3lkUk2ykJJJkcn3MID6c0s2AWPCdgVmtXSAxlu6k9kgbzAKCY4tTAnVMwhfoSNAu7XNJ_J-vsYqeVLqklXQNTgnlcwDRSnID3YoAL2z9LR33g87lnL3MNdjX-jZiZfTR_0Lr2HiCVDOGbgYc8AaLJmiuHv2cB0gOyHOEcQbbuKGURrXh1vnFVBOLXsmgTkAdwUapFCed5Cs9MKVk9vD-mSik'
        },
        {
            title: 'Plumbing Repair',
            description: 'Expert diagnosis and repair for leaks, clogs, and pipe maintenance. Price is per hour',
            duration: '1h',
            price: '$80',
            popular: false,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMQuhUbmSIZypFCz5To_RUSLBOE3tsp3qd3zaAIYavWo4Q5Reyb4XQufHgqNMqwc8APkCU091HibSpzPXsegRGKZiwJuqua1SsfzCf72vRM6neXViUwCWfPW8JT8Q00OoXRldHjQfVUMqzaORPWWYrtL6NegZW46EmXn4Z33GNC9_d5xbB0xE7dZfHmoZTOeAZ4sVkO-wPMP7LBvF2dEwdxhqB5p1yQ2RXs2OawWMMi8sYLecoEOlnaF0Yer0cVYKeWQS_MufOVj4'
        }
    ];

    onNavigate(route: string) {
        if (route === 'dashboard') {
            this.router.navigate(['/app']);
        } else if (route === 'services') {
            this.router.navigate(['/services']);
        }
    }

    onLogout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }

    setActiveCategory(category: string) {
        this.activeCategory = category;
    }
}
