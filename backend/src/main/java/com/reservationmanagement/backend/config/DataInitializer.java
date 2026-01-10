package com.reservationmanagement.backend.config;

import com.reservationmanagement.backend.entity.Service;
import com.reservationmanagement.backend.repository.ServiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final ServiceRepository serviceRepository;

    @Override
    public void run(String... args) throws Exception {
        if (serviceRepository.count() == 0) {
            List<Service> initialServices = List.of(
                    Service.builder()
                            .title("Coupe de cheveux classique")
                            .category("Beauté")
                            .description(
                                    "Consultation complète suivie d'un lavage, d'une coupe de précision et d'un coiffage avec des produits premium")
                            .fullDescription(
                                    "Notre service de coupe de cheveux classique offre une expérience personnalisée pour ceux qui recherchent un look net et professionnel. En commençant par une consultation personnelle, nos stylistes travaillent avec vous pour comprendre vos objectifs capillaires et la forme de votre visage afin de vous offrir la coupe parfaite. Le service comprend un lavage revitalisant avec des nettoyants de haute qualité et une finition avec un coiffage de précision utilisant uniquement les meilleurs produits pour garantir que votre nouveau look dure.")
                            .duration("40 min")
                            .price("35 000 Ar")
                            .popular(true)
                            .image("https://lh3.googleusercontent.com/aida-public/AB6AXuBneqwVGGiW5IsQzv2rGEwOUe7khK_77xcU5lgKD9FeCk6INXRBfIxPMVDtK6c1yt2q-Q31zIcqp73g0rhy3iqxlgugpX3-tljtpyuB9PjIo-zdf9vlSZYeptH7aOVSFf8X81z_BC5imJpZTesa61d1iwu-F9ttFVZ-DCGGFhojyhUy8WXNhqKK4jOXwObU34TXINuitDqj7FacUZ_TYg_o9SsigXFtVwAINqQZzsY9gARIQLVeywv9RKLfUEATseCi84JBITYLD9U")
                            .rating(4.8)
                            .reviews(156)
                            .location("Salon Chic Style, Centre-ville")
                            .providerName("Sarah Jenkins")
                            .isVerified(true)
                            .build(),
                    Service.builder()
                            .title("Examen Dentaire")
                            .category("Santé")
                            .description(
                                    "Examen buccal complet, nettoyage et traitement au fluor pour des dents et des gencives saines")
                            .fullDescription(
                                    "Gardez votre sourire parfait avec notre examen dentaire complet. Notre équipe d'experts effectue un examen approfondi de vos dents et gencives pour assurer une détection précoce de tout problème. Le forfait comprend un détartrage et un polissage professionnels pour éliminer la plaque et le tartre, suivis d'un traitement au fluor pour renforcer votre émail. Nous accordons la priorité à votre confort et à votre santé buccale.")
                            .duration("60 min")
                            .price("120 000 Ar")
                            .popular(false)
                            .image("https://lh3.googleusercontent.com/aida-public/AB6AXuCjz4wSKRNUN8nCm3oHmj2aWuodknei_fDvW2aVZ_0iay2rZ3QXhbYC6t1iKv1voSQ6D5HfMEOdqkCalX9lUH4aiePU1gfFAA9RCdCcGTwBoJc6OX3j4Lk0coxzMavY-y4QD3yoqLJZveBq-OjrJyGisIoxxYUPyqQI-OX-vwamGTVNz2ONClWZQdBDW4t0NHtS9Ce56L9mlYZ0uN4GA2GPUDDUq6khwnGPz-_V3puD_uVrvJ64eOZsNNYkELfKle8swe9_ppsFxAk")
                            .rating(4.9)
                            .reviews(89)
                            .location("Clinique Dentaire Sourires Éclatants")
                            .providerName("Dr. Michael Chen")
                            .isVerified(true)
                            .build(),
                    Service.builder()
                            .title("Vidange Premium")
                            .category("Automobile")
                            .description(
                                    "Comprend le remplacement de l'huile synthétique, le changement du filtre et un contrôle de sécurité complet en 20 points")
                            .fullDescription(
                                    "Maintenez les performances de votre moteur avec notre service de vidange premium. Nous utilisons une huile synthétique de haute qualité conçue spécifiquement pour les besoins de votre véhicule. Ce service ne se limite pas à la vidange ; nous remplaçons également votre filtre à huile et effectuons une inspection de sécurité détaillée en 20 points, vérifiant les niveaux de liquide, la pression des pneus et l'état des freins pour assurer votre sécurité sur la route.")
                            .duration("30 min")
                            .price("85 000 Ar")
                            .popular(false)
                            .image("https://lh3.googleusercontent.com/aida-public/AB6AXuAT_WGDSCjWRpONQht1oghUwAfgWFOyM9aoIRxqvebNRsFMsK_PJSpKcFDMqYXCZSdpIsYi-BbcpTHcHFAVCNanzRaQvfE81CQbNO4tKGvHI0RLwVndbWX7zVckYLBRqZf0yJ81T9G3izNnzX1lxdpEdoUrdxy8Zop9GukaIYmX6UlATcYovenINyNNv32GGWHNd26-2fLsomHHKDdRhKoTzQPi_PPBGhOG3oJ3QHfsniwOMWG4A5HL_ZBK-l3K1JEqaVcXDR2EJa4")
                            .rating(4.7)
                            .reviews(210)
                            .location("Centre Auto Master Précision")
                            .providerName("Auto Masters")
                            .isVerified(true)
                            .build(),
                    Service.builder()
                            .title("Massage Thérapeutique")
                            .category("Bien-être")
                            .description(
                                    "Soulagez le stress et les tensions musculaires grâce à nos techniques spécialisées de massage complet du corps")
                            .fullDescription(
                                    "Vivez une relaxation totale avec notre thérapie de massage complet du corps signature. Ce traitement complet combine des techniques suédoises et de tissus profonds pour relâcher les tensions, améliorer la circulation et promouvoir un bien-être général. Nos thérapeutes certifiés personnalisent la pression selon vos préférences, en se concentrant sur les zones de stress. Comprend l'aromathérapie pour renforcer l'effet calmant.")
                            .duration("60 min")
                            .price("50 000 Ar")
                            .popular(false)
                            .image("https://lh3.googleusercontent.com/aida-public/AB6AXuC6LKVdHCYCNjv6i9W-MhzddTIFKhaEX7AB1-yNonsBAglmNEv__qE3lkUk2ykJJJkcn3MID6c0s2AWPCdgVmtXSAxlu6k9kgbzAKCY4tTAnVMwhfoSNAu7XNJ_J-vsYqeVLqklXQNTgnlcwDRSnID3YoAL2z9LR33g87lnL3MNdjX-jZiZfTR_0Lr2HiCVDOGbgYc8AaLJmiuHv2cB0gOyHOEcQbbuKGURrXh1vnFVBOLXsmgTkAdwUapFCed5Cs9MKVk9vD-mSik")
                            .gallery(List.of(
                                    "https://lh3.googleusercontent.com/aida-public/AB6AXuAxnKOrs8HKPku0umel1zk5VdugvHXG_gFjYk5gX75N3r-b10MyPkwlFQ7139jvz9rLiSTkN94523dfMBrXMAohJJWgx_8Y_8FyW8Wkd4gehk4eV5BNHwMelb7daZ5yOrwGBL55Bs-bHLSa55SkWZH-2JwMvI0O8D6CAjZeM8KXJcIFFo_CpGoK3H6ltLep_JRqlnVqqd0STnNXpYkk5AWzeI_4GhHIjK7WDk0Z8Rc_PN19FowkInvujcLU1S8V50sVyP-YlKRBvW8",
                                    "https://lh3.googleusercontent.com/aida-public/AB6AXuBzrGxMvqDWSdIkWmXM_JBo5yzCTwtdUewoIJXozGMNr_msFKAfCsq8jLhNhBWCtYWu1zbBM-rZa25DTCDe5MgZlkTLfmcIpWigBSaaS6t8tw5hX579yXpJJycBx1WZ2lbjHk6ciW7Z-pJJTAal4mn6frs8dvZ1uHVCB_0_byEdcOYB72ggV21tr3ra83BM7tvEE2tafQFaQkkd7l0m11CCR8KSPsmpJ-cn5mq5jAneiw7R1rEaN6_WV5o5gAOwzwaImiO8qev_2-A",
                                    "https://lh3.googleusercontent.com/aida-public/AB6AXuCciZ9KKeaDPNqIrD2Fq0O6dgnAuYCeyjr1grBGvq1zEHAjevVcBGWvUTws9DzrF3kHu0sFJNVfyQMTbtY9SWxT4j0_Ozru1aKmCaJRLfWTMHfuDYHqz1VZDn8Hxkat8z2PhDtI0HdXvIxnyTOruN7asu00tO1jpJiVKNg7fxEPRWriRAnUH-VJBk223YCPtPCVCBfpi3lvYcb4xM0fuRR4mbOv3sed-a6A5X7h8UEpGPk-9i4hhm7dS6GgvNGDQ3MDQPW90BIBMfQ"))
                            .rating(4.9)
                            .reviews(128)
                            .location("Centre de Bien-être Zen, Centre-ville")
                            .providerName("Alex Rivera")
                            .isVerified(true)
                            .build(),
                    Service.builder()
                            .title("Réparation Plomberie")
                            .category("Maison")
                            .description(
                                    "Diagnostic expert et réparation des fuites, des obstructions et de l'entretien des tuyaux. Prix à l'heure.")
                            .fullDescription(
                                    "Lorsque des problèmes de plomberie surviennent, vous avez besoin d'experts en qui vous pouvez avoir confiance. Nos plombiers professionnels fournissent un diagnostic complet et des réparations rapides et fiables pour tous les systèmes de plomberie domestiques. Qu'il s'agisse d'une fuite persistante, d'une obstruction tenace ou d'un entretien général des tuyaux, nous utilisons des équipements modernes pour résoudre le problème correctement dès la première fois. Nous nous engageons à fournir un service de haute qualité avec des tarifs horaires transparents.")
                            .duration("1h")
                            .price("80 000 Ar")
                            .popular(false)
                            .image("https://lh3.googleusercontent.com/aida-public/AB6AXuCMQuhUbmSIZypFCz5To_RUSLBOE3tsp3qd3zaAIYavWo4Q5Reyb4XQufHgqNMqwc8APkCU091HibSpzPXsegRGKZiwJuqua1SsfzCf72vRM6neXViUwCWfPW8JT8Q00OoXRldHjQfVUMqzaORPWWYrtL6NegZW46EmXn4Z33GNC9_d5xbB0xE7dZfHmoZTOeAZ4sVkO-wPMP7LBvF2dEwdxhqB5p1yQ2RXs2OawWMMi8sYLecoEOlnaF0Yer0cVYKeWQS_MufOVj4")
                            .rating(4.6)
                            .reviews(64)
                            .location("Services HomeFix Co.")
                            .providerName("Plomberie Fiable")
                            .isVerified(true)
                            .build());
            serviceRepository.saveAll(initialServices);
        }
    }
}
