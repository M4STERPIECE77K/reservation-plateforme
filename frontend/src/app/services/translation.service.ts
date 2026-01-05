import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TranslationService {
    private currentLangSubject = new BehaviorSubject<string>('Français');
    currentLang$ = this.currentLangSubject.asObservable();

    private en = {
        "PROFILE_TITLE": "My Profile",
        "FIRST_NAME": "First Name",
        "LAST_NAME": "Last Name",
        "EMAIL": "Email Address",
        "PHONE": "Phone Number",
        "APP_LANGUAGE": "App Language",
        "CHOOSE_LANGUAGE": "Choose your preferred language",
        "SAVE_CHANGES": "Save Changes",
        "PERSONAL_INFO": "Personal Information",
        "APP_PREFERENCES": "App Preferences",
        "ACCOUNT_SUMMARY": "Account Summary",
        "POINTS": "Points",
        "BOOKINGS": "Bookings",
        "MEMBER_SINCE": "Member since",
        "SECURITY_TIP": "Security Tip",
        "SECURITY_TIP_TEXT": "Ensure your phone number is verified to receive SMS notifications for your bookings.",
        "DASHBOARD": "Dashboard",
        "BROWSE_SERVICES": "Browse Services",
        "MY_BOOKINGS": "My Bookings",
        "MY_RESERVATIONS": "My Reservations",
        "LOGOUT": "Log out",
        "CANCEL": "Cancel",
        "LOGOUT_CONFIRM_TITLE": "Log out?",
        "LOGOUT_CONFIRM_TEXT": "Are you sure you want to log out? You will need to sign in again to access your account.",
        "CLIENT_MEMBER": "Client Member",
        "VERIFIED_ACCOUNT": "Verified Account"
    };

    private fr = {
        "PROFILE_TITLE": "Mon Profil",
        "FIRST_NAME": "Prénom",
        "LAST_NAME": "Nom",
        "EMAIL": "Adresse Email",
        "PHONE": "Numéro de Téléphone",
        "APP_LANGUAGE": "Langue de l'Application",
        "CHOOSE_LANGUAGE": "Choisissez votre langue préférée",
        "SAVE_CHANGES": "Enregistrer les modifications",
        "PERSONAL_INFO": "Informations Personnelles",
        "APP_PREFERENCES": "Préférences de l'App",
        "ACCOUNT_SUMMARY": "Résumé du Compte",
        "POINTS": "Points",
        "BOOKINGS": "Réservations",
        "MEMBER_SINCE": "Membre depuis",
        "SECURITY_TIP": "Conseil de Sécurité",
        "SECURITY_TIP_TEXT": "Assurez-vous que votre numéro de téléphone est vérifié pour recevoir les notifications SMS de vos réservations.",
        "DASHBOARD": "Tableau de Bord",
        "BROWSE_SERVICES": "Parcourir les Services",
        "MY_BOOKINGS": "Mes Réservations",
        "MY_RESERVATIONS": "Mes Rendez-vous",
        "LOGOUT": "Déconnexion",
        "CANCEL": "Annuler",
        "LOGOUT_CONFIRM_TITLE": "Se déconnecter ?",
        "LOGOUT_CONFIRM_TEXT": "Êtes-vous sûr de vouloir vous déconnecter ? Vous devrez vous reconnecter pour accéder à votre compte.",
        "CLIENT_MEMBER": "Membre Client",
        "VERIFIED_ACCOUNT": "Compte Vérifié"
    };

    constructor() {
        const savedLang = localStorage.getItem('app_language');
        if (savedLang) {
            this.currentLangSubject.next(savedLang);
        }
    }

    setLanguage(lang: string) {
        localStorage.setItem('app_language', lang);
        this.currentLangSubject.next(lang);
    }

    translate(key: string): string {
        const lang = this.currentLangSubject.getValue();
        const dictionary: any = lang === 'English' ? this.en : this.fr;
        return dictionary[key] || key;
    }

    getCurrentLang() {
        return this.currentLangSubject.getValue();
    }
}
