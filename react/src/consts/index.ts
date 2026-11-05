import type {BeautyCategory, Categories, Master, MenuItem, Partner} from "@/types";
import {
    VenusAndMars,
    HeartPulse,
    CarFront,
    CircleGauge,
    BriefcaseBusiness,
    GraduationCap,
    House,
    Ellipsis,
    Dumbbell,
    PawPrint,
    Utensils,
    Video,
    Scale,
} from "lucide-react";

export const menuItems: MenuItem[] = [
    {label: "Kataloq", path: "/catalog"},
];

export const categories: Categories[] = [
    { icon: VenusAndMars, label: "GÖZƏLLİK" },
    { icon: HeartPulse, label: "SAĞLAMLIQ" },
    { icon: CarFront, label: "AVTO" },
    { icon: CircleGauge, label: "ƏYLƏNCƏ" },
    { icon: BriefcaseBusiness, label: "XİDMƏTLƏR" },
    { icon: GraduationCap, label: "TƏHSİL" },
    { icon: House, label: "İCARƏ" },
    { icon: Ellipsis, label: "DİGƏR" },
    { icon: Dumbbell, label: "İDMAN" },
    { icon: PawPrint, label: "HEYVANLAR" },
    { icon: Utensils, label: "RESTORAN" },
    { icon: Video, label: "STİL" },
    { icon: Scale, label: "HÜQUQ" },
];

export const beautyCategories: BeautyCategory[]= [
    {
        name: "Hairdressing Services",
        image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80",
    },
    {
        name: "Lash Tech",
        image: "https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=600&q=80",
    },
    {
        name: "Barber",
        image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80",
    },
    {
        name: "Esthetician Treatments & Skincare",
        image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80",
    },
    {
        name: "Tattoo",
        image: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&w=600&q=80",
    },
    {
        name: "Nail Artist",
        image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=600&q=80",
    },
    {
        name: "Laser Technician",
        image: "https://images.unsplash.com/photo-1512290900672-1f48039c3619?auto=format&fit=crop&w=600&q=80",
    },
    {
        name: "Brow Artist",
        image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
    },
    {
        name: "Makeup",
        image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80",
    },
    {
        name: "Piercing",
        image: "https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&w=600&q=80",
    },
];

export const beautyServices = [
    {
        name: "Dr. Skin Cosmetology & Clinic",
        image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
        address: "Təbriz k. 44 (m. N.Nərimanov)",
        rating: 4.97,
        category: "Kosmetologiya & Dəri mərkəzi",
        reviews: 164,
        services: [
            {
                name: "Biorevitalizasiya və mezoterapiya",
                price: 65,
            },
            {
                name: "Dərinin dərindən təmizlənməsi",
                price: 40,
            },
        ],
        availableTimes: ["11:30", "14:00", "17:00"],
    },
    {
        name: "Ink Art Tattoo & Piercing",
        image: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&w=800&q=80",
        address: "Bəşir Səfəroğlu k. 192 (m. Nizami)",
        rating: 4.95,
        category: "Tatu studiyası & Pirsing",
        reviews: 98,
        services: [
            {
                name: "Fərdi eskizlə bədii tatu (mini)",
                price: 50,
            },
            {
                name: "Qulaq / burun pirsingi + titan sırğa",
                price: 25,
            },
        ],
        availableTimes: ["13:00", "16:00", "18:30"],
    },
    {
        name: "Brow Bar Baku",
        image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
        address: "Rəsul Rza k. 11 (m. Sahil)",
        rating: 4.99,
        category: "Qaş memarlığı & Laminasiya",
        reviews: 230,
        services: [
            {
                name: "Qaş memarlığı + rənglənmə",
                price: 20,
            },
            {
                name: "Qaş laminasiyası və vitamin bərpa",
                price: 30,
            },
        ],
        availableTimes: ["12:00", "15:00", "17:30"],
    },
      {
        name: "Glow Makeup & Style Studio",
        image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
        address: "Zərifə Əliyeva k. 25 (m. Sahil)",
        rating: 4.96,
        category: "Vizaj & Makiyaj studiyası",
        reviews: 145,
        services: [
            {
                name: "Axşam makiyajı (Full Glam)",
                price: 45,
            },
            {
                name: "Gündəlik Nude makiyaj",
                price: 30,
            },
        ],
        availableTimes: ["10:30", "13:30", "16:00"],
    },
          {
        name: "Glow Makeup & Style Studio",
        image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
        address: "Zərifə Əliyeva k. 25 (m. Sahil)",
        rating: 4.96,
        category: "Vizaj & Makiyaj studiyası",
        reviews: 145,
        services: [
            {
                name: "Axşam makiyajı (Full Glam)",
                price: 45,
            },
            {
                name: "Gündəlik Nude makiyaj",
                price: 30,
            },
        ],
        availableTimes: ["10:30", "13:30", "16:00"],
    },
          {
        name: "Glow Makeup & Style Studio",
        image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
        address: "Zərifə Əliyeva k. 25 (m. Sahil)",
        rating: 4.96,
        category: "Vizaj & Makiyaj studiyası",
        reviews: 145,
        services: [
            {
                name: "Axşam makiyajı (Full Glam)",
                price: 45,
            },
            {
                name: "Gündəlik Nude makiyaj",
                price: 30,
            },
        ],
        availableTimes: ["10:30", "13:30", "16:00"],
    },
          {
        name: "Glow Makeup & Style Studio",
        image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
        address: "Zərifə Əliyeva k. 25 (m. Sahil)",
        rating: 4.96,
        category: "Vizaj & Makiyaj studiyası",
        reviews: 145,
        services: [
            {
                name: "Axşam makiyajı (Full Glam)",
                price: 45,
            },
            {
                name: "Gündəlik Nude makiyaj",
                price: 30,
            },
        ],
        availableTimes: ["10:30", "13:30", "16:00"],
    },
          {
        name: "Glow Makeup & Style Studio",
        image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
        address: "Zərifə Əliyeva k. 25 (m. Sahil)",
        rating: 4.96,
        category: "Vizaj & Makiyaj studiyası",
        reviews: 145,
        services: [
            {
                name: "Axşam makiyajı (Full Glam)",
                price: 45,
            },
            {
                name: "Gündəlik Nude makiyaj",
                price: 30,
            },
        ],
        availableTimes: ["10:30", "13:30", "16:00"],
    },
          {
        name: "Glow Makeup & Style Studio",
        image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
        address: "Zərifə Əliyeva k. 25 (m. Sahil)",
        rating: 4.96,
        category: "Vizaj & Makiyaj studiyası",
        reviews: 145,
        services: [
            {
                name: "Axşam makiyajı (Full Glam)",
                price: 45,
            },
            {
                name: "Gündəlik Nude makiyaj",
                price: 30,
            },
        ],
        availableTimes: ["10:30", "13:30", "16:00"],
    },
          {
        name: "Glow Makeup & Style Studio",
        image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
        address: "Zərifə Əliyeva k. 25 (m. Sahil)",
        rating: 4.96,
        category: "Vizaj & Makiyaj studiyası",
        reviews: 145,
        services: [
            {
                name: "Axşam makiyajı (Full Glam)",
                price: 45,
            },
            {
                name: "Gündəlik Nude makiyaj",
                price: 30,
            },
        ],
        availableTimes: ["10:30", "13:30", "16:00"],
    },
          {
        name: "Glow Makeup & Style Studio",
        image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
        address: "Zərifə Əliyeva k. 25 (m. Sahil)",
        rating: 4.96,
        category: "Vizaj & Makiyaj studiyası",
        reviews: 145,
        services: [
            {
                name: "Axşam makiyajı (Full Glam)",
                price: 45,
            },
            {
                name: "Gündəlik Nude makiyaj",
                price: 30,
            },
        ],
        availableTimes: ["10:30", "13:30", "16:00"],
    },
];


export const partners: Partner[] = [
    {
        id: 1,
        name: "Lash BB Studio",
        logo: "https://placehold.co/100x100/1f1f1f/ffffff?text=LB",
        rating: 4.96,
        meta: "2 filial",
    },
    {
        id: 2,
        name: "Tulga Barbershop",
        logo: "https://placehold.co/100x100/2b2016/f5c542?text=TB",
        rating: 5,
        meta: "Sahil",
    },
    {
        id: 3,
        name: "DentStar Clinic",
        logo: "https://placehold.co/100x100/0f5a4a/ffffff?text=DS",
        rating: 4.99,
        meta: "Nəsimi",
    },
    {
        id: 4,
        name: "AutoSpa Detailing",
        logo: "https://placehold.co/100x100/4a0a1a/ffffff?text=AS",
        rating: 4.97,
        meta: "Babək",
    },
    {
        id: 5,
        name: "Pushkin Fitness",
        logo: "https://placehold.co/100x100/3a1a05/ffb020?text=PF",
        rating: 4.96,
        meta: "Mərkəz",
    },
    {
        id: 6,
        name: "Cherry Nails Bar",
        logo: "https://placehold.co/100x100/e11d48/ffffff?text=CN",
        rating: 4.99,
        meta: "28 May",
    },
];

export const masters: Master[] = [
    {
        id: 1,
        name: "Aysel Məmmədova",
        role: "Top Nail Artist",
        salon: "Cherry Nails & Beauty",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
    },
    {
        id: 2,
        name: "Elmir Əliyev",
        role: "Brand Barber",
        salon: "TULGA Gentlemen Barbershop",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
    },
    {
        id: 3,
        name: "Leyla Hüseynova",
        role: "Lash & Brow Stylist",
        salon: "Lash BB Studio",
        rating: 4.98,
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
    },
    {
        id: 4,
        name: "Nigar Vəliyeva",
        role: "Top Colorist & Stylist",
        salon: "Shynarym Beauty Lounge",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
    },
];
