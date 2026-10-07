// ========================================================
// DATA STORE: CITIES, TOP CATEGORIES, SALONS, MASTERS, BRANDS
// ========================================================
const ZeyvoData = {
    cities: [
        { name: "Bakı", count: "1 200+ məkan" },
        { name: "Sumqayıt", count: "160+ məkan" },
        { name: "Gəncə", count: "120+ məkan" },
        { name: "Xırdalan", count: "80+ məkan" }
    ],

    // Top-Level Categories matching Image 2
    // 13 Categories matching user Image 2 (7 in Row 1 + 6 in Row 2, plus dynamic DAHA ÇOX / MINIMIZE)
    topCategories: [
        // ROW 1
        {
            id: "beauty",
            title: "GÖZƏLLİK",
            enTitle: "BEAUTY",
            azName: "Gözəllik & Baxım",
            color: "text-pink-500",
            activeBg: "bg-pink-500",
            bgSoft: "bg-pink-50",
            icon: `<svg class="w-7 h-7 sm:w-8 sm:h-8 mx-auto" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><circle cx="7.5" cy="9" r="3.5"/><path d="M7.5 12.5v7M5 16.5h5"/><circle cx="15" cy="14" r="3.5"/><path d="M17.5 11.5l4-4M17.5 7.5h4v4"/></svg>`,
            subcategories: [
                { id: "hair", name: "Hairdressing services", azName: "Saç kəsimi & Stil", image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80" },
                { id: "lashes", name: "Lash Tech", azName: "Qaş & Kirpik", image: "https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=600&q=80" },
                { id: "barber", name: "Barber", azName: "Kişi bərbəri", image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80" },
                { id: "cosmetology", name: "Esthetician treatments, skincare", azName: "Kosmetologiya & Dəri", image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80" },
                { id: "tattoo", name: "Tattoo", azName: "Tatu studiyası", image: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&w=600&q=80" },
                { id: "nails", name: "Nail Artist", azName: "Manikür & Pedikür", image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=600&q=80" },
                { id: "laser", name: "Laser Technician", azName: "Lazer epilyasiyası", image: "https://images.unsplash.com/photo-1512290900672-1f48039c3619?auto=format&fit=crop&w=600&q=80" },
                { id: "brows", name: "Brow Artist", azName: "Qaş dizaynı", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80" },
                { id: "makeup", name: "Makeup", azName: "Vizaj & Makiyaj", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80" },
                { id: "piercing", name: "Piercing", azName: "Pirsing & SPA", image: "https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&w=600&q=80" }
            ]
        },
        {
            id: "health",
            title: "SAĞLAMLIQ",
            enTitle: "HEALTH",
            azName: "Sağlamlıq & Tibb",
            color: "text-teal-600",
            activeBg: "bg-teal-600",
            bgSoft: "bg-teal-50",
            icon: `<svg class="w-7 h-7 sm:w-8 sm:h-8 mx-auto" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M7 11h2.5l1.5-3 2 6 1.5-3H17"/></svg>`,
            subcategories: [
                { id: "dental", name: "Dental Clinic", azName: "Stomatologiya & Diş", image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80" },
                { id: "therapist", name: "General Practice", azName: "Terapevt & Müayinə", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80" },
                { id: "analysis", name: "Blood Tests & Lab", azName: "Qan analizləri & Lab", image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=600&q=80" },
                { id: "physio", name: "Physiotherapy & Rehab", azName: "Fizioterapiya & Bərpa", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80" },
                { id: "dermatology", name: "Dermatology", azName: "Dermatologiya & Dəri", image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=600&q=80" },
                { id: "ophthalmology", name: "Ophthalmology", azName: "Oftalmologiya & Göz", image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80" },
                { id: "cardiology", name: "Cardiology", azName: "Kardiologiya & Ürək", image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=600&q=80" },
                { id: "mri", name: "Ultrasound & MRI", azName: "USM & MRT Diaqnostika", image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80" },
                { id: "psychology", name: "Psychologist", azName: "Psixoloq məsləhəti", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80" },
                { id: "massage", name: "Therapeutic Massage", azName: "Müalicəvi Masaj", image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80" }
            ]
        },
        {
            id: "auto",
            title: "AVTO",
            enTitle: "AUTO",
            azName: "Avto xidmətlər",
            color: "text-rose-500",
            activeBg: "bg-rose-500",
            bgSoft: "bg-rose-50",
            icon: `<svg class="w-7 h-7 sm:w-8 sm:h-8 mx-auto" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 11l1.5-5h11l1.5 5M3 11h18v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Z"/><circle cx="7" cy="14" r="1.5" fill="currentColor"/><circle cx="17" cy="14" r="1.5" fill="currentColor"/></svg>`,
            subcategories: [
                { id: "carwash", name: "Car Wash", azName: "Avtoyuma & Təmizləmə", image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=600&q=80" },
                { id: "detailing", name: "Detailing & Ceramic", azName: "Detailing & Keramika", image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=600&q=80" },
                { id: "oil", name: "Oil & Filter Service", azName: "Yağ dəyişmə & Filter", image: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80" },
                { id: "diagnostics", name: "Computer Diagnostics", azName: "Kompüter Diaqnostika", image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80" },
                { id: "tires", name: "Tire & Wheel Balancing", azName: "Təkər & Balans", image: "https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&w=600&q=80" },
                { id: "body_paint", name: "Body Repair & Paint", azName: "Kuzov təmiri & Boya", image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80" },
                { id: "electric", name: "Auto Electrician", azName: "Avto Elektrik", image: "https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=600&q=80" },
                { id: "engine", name: "Engine Overhaul", azName: "Mühərrik təmiri", image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=600&q=80" },
                { id: "tinting", name: "Window Tint & PPF", azName: "Plyonka & PPF örtük", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80" },
                { id: "sound", name: "Car Audio & Tuning", azName: "Avto Akustika & Səs", image: "https://images.unsplash.com/photo-1558441719-7d079ebcb8ee?auto=format&fit=crop&w=600&q=80" }
            ]
        },
        {
            id: "entertainment",
            title: "ƏYLƏNCƏ",
            enTitle: "ENTERTAINMENT",
            azName: "Əyləncə & Asudə",
            color: "text-amber-500",
            activeBg: "bg-amber-500",
            bgSoft: "bg-amber-50",
            icon: `<svg class="w-7 h-7 sm:w-8 sm:h-8 mx-auto" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><path stroke-linecap="round" d="m15 9 6-6M18 3h3v3"/></svg>`,
            subcategories: [
                { id: "fitness", name: "Fitness & Gym", azName: "Fitnes & Trenajor", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80" },
                { id: "pool", name: "Indoor Pool & SPA", azName: "Qapalı Hovuz & SPA", image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=600&q=80" },
                { id: "yoga", name: "Yoga & Pilates", azName: "Yoqa & Pilates", image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=600&q=80" },
                { id: "bowling", name: "Bowling & Billiards", azName: "Boulinq & Bilyard", image: "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=600&q=80" },
                { id: "karting", name: "Go-Kart Racing", azName: "Kartinq Klubları", image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80" },
                { id: "vr_games", name: "VR Gaming Lounge", azName: "VR Oyun Klubu", image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=600&q=80" },
                { id: "paintball", name: "Paintball & Tag", azName: "Peyntbol & Tir", image: "https://images.unsplash.com/photo-1511882150382-421056c89033?auto=format&fit=crop&w=600&q=80" },
                { id: "cinema", name: "VIP Cinema", azName: "Kinoteatr & VIP zal", image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80" },
                { id: "quest", name: "Escape Quests", azName: "Kvest otaqları", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80" },
                { id: "dance", name: "Dance Studios", azName: "Rəqs Studiyaları", image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80" }
            ]
        },
        {
            id: "services",
            title: "XİDMƏTLƏR",
            enTitle: "SERVICES",
            azName: "Məişət xidmətləri",
            color: "text-purple-600",
            activeBg: "bg-purple-600",
            bgSoft: "bg-purple-50",
            icon: `<svg class="w-7 h-7 sm:w-8 sm:h-8 mx-auto" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="3"/><path stroke-linecap="round" d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><circle cx="12" cy="12.5" r="1.5"/><path stroke-linecap="round" d="M3 12.5h7.5M13.5 12.5H21"/></svg>`,
            subcategories: [
                { id: "dryclean", name: "Dry Cleaning", azName: "Ximçistka & Təmizləmə", image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=600&q=80" },
                { id: "cleaning", name: "House & Office Cleaning", azName: "Ev & Ofis kliningi", image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80" },
                { id: "appliance", name: "Appliance Repair", azName: "Məişət texnikası təmiri", image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80" },
                { id: "tailor", name: "Tailoring & Atelier", azName: "Dərzi & Atelye", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=80" },
                { id: "handyman", name: "Plumber & Electrician", azName: "Santexnik & Elektrik", image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80" },
                { id: "locksmith", name: "Locksmith & Keys", azName: "Qıfıl & Açar təmiri", image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80" },
                { id: "furniture", name: "Furniture Repair", azName: "Mebel yığımı & təmiri", image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=600&q=80" },
                { id: "shoes", name: "Shoe & Bag Spa", azName: "Ayaqqabı bərpası", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80" },
                { id: "disinfection", name: "Disinfection Service", azName: "Dezinfeksiya", image: "https://images.unsplash.com/photo-1584744982491-665216d95f8b?auto=format&fit=crop&w=600&q=80" },
                { id: "moving", name: "Moving & Cargo", azName: "Yükdaşıma & Köçürmə", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80" }
            ]
        },
        {
            id: "education",
            title: "TƏHSİL",
            enTitle: "EDUCATION",
            azName: "Təhsil & Kurslar",
            color: "text-orange-600",
            activeBg: "bg-orange-600",
            bgSoft: "bg-orange-50",
            icon: `<svg class="w-7 h-7 sm:w-8 sm:h-8 mx-auto" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M22 10v6M2 10l10-5 10 5-10 5z"/><path stroke-linecap="round" stroke-linejoin="round" d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5"/></svg>`,
            subcategories: [
                { id: "barberschool", name: "Barber Academy", azName: "Bərbər məktəbi", image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80" },
                { id: "beautyschool", name: "Cosmetology School", azName: "Vizaj & Kosmetologiya", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80" },
                { id: "nailschool", name: "Nail Artistry School", azName: "Dırnaq ustalığı", image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=600&q=80" },
                { id: "languages", name: "Foreign Languages", azName: "Xarici dillər", image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80" },
                { id: "driving", name: "Driving School", azName: "Sürücülük kursları", image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=600&q=80" },
                { id: "programming", name: "IT & Coding Academy", azName: "İT & Proqramlaşdırma", image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=600&q=80" },
                { id: "music", name: "Music & Vocal Lessons", azName: "Musiqi & Vokal", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80" },
                { id: "art", name: "Art & Painting Studio", azName: "Rəsm & İncəsənət", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80" },
                { id: "culinary", name: "Culinary Courses", azName: "Kulinariya kursları", image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80" },
                { id: "tutor", name: "Tutors & Exam Prep", azName: "Abituriyent hazırlığı", image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80" }
            ]
        },
        {
            id: "rent",
            title: "İCARƏ",
            enTitle: "RENT",
            azName: "İcarə & Kirayə",
            color: "text-fuchsia-600",
            activeBg: "bg-fuchsia-600",
            bgSoft: "bg-fuchsia-50",
            icon: `<div class="relative w-7 h-7 sm:w-8 sm:h-8 mx-auto flex flex-col items-center justify-center"><svg class="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M4 5l8-2.5 8 2.5"/><rect x="3" y="6" width="18" height="13" rx="2" fill="currentColor" fill-opacity="0.1"/></svg><span class="absolute top-[8px] text-[7px] sm:text-[8px] font-black tracking-tighter">RENT</span></div>`,
            subcategories: [
                { id: "car_rent", name: "Car Rental", azName: "Avtomobil icarəsi", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80" },
                { id: "photo_studio", name: "Photo Studio Rental", azName: "Foto studiya icarəsi", image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=600&q=80" },
                { id: "coworking", name: "Coworking Space", azName: "Kovorkinq & Ofis", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80" },
                { id: "equipment", name: "Photo & Video Gear", azName: "Foto & Video texnika", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80" },
                { id: "event_venue", name: "Banquet & Event Halls", azName: "Tədbir zalı icarəsi", image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=600&q=80" },
                { id: "costumes", name: "Costume & Dress Hire", azName: "Geyim & Kostyum", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80" },
                { id: "yachts", name: "Yacht & Boat Rental", azName: "Qayıq & Yaxta icarəsi", image: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d17?auto=format&fit=crop&w=600&q=80" },
                { id: "party_furniture", name: "Party Tents & Decor", azName: "Çadır & Tədbir mebeli", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80" },
                { id: "sound", name: "Pro Sound & DJ Gear", azName: "Səs & İşıq sistemləri", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80" },
                { id: "sports_gear", name: "Sports Gear & Bikes", azName: "İdman avadanlığı", image: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=600&q=80" }
            ]
        },

        // ROW 2
        {
            id: "other",
            title: "DİGƏR",
            enTitle: "OTHER",
            azName: "Digər xidmətlər",
            color: "text-amber-600",
            activeBg: "bg-amber-600",
            bgSoft: "bg-amber-50",
            icon: `<div class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-amber-400 flex items-center justify-center gap-1 mx-auto shadow-sm"><span class="w-1.5 h-1.5 bg-white rounded-full"></span><span class="w-1.5 h-1.5 bg-white rounded-full"></span><span class="w-1.5 h-1.5 bg-white rounded-full"></span></div>`,
            subcategories: [
                { id: "consulting", name: "Business Consulting", azName: "Biznes & Konsaltinq", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80" },
                { id: "delivery", name: "Express Courier", azName: "Kuryer & Çatdırılma", image: "https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?auto=format&fit=crop&w=600&q=80" },
                { id: "events", name: "Event Planning", azName: "Tədbir təşkili", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80" },
                { id: "translation", name: "Translation & Notary", azName: "Tərcümə mərkəzi", image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80" },
                { id: "printing", name: "Printing & Polygraphy", azName: "Poliqrafiya & Çap", image: "https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?auto=format&fit=crop&w=600&q=80" }
            ]
        },
        {
            id: "sport",
            title: "İDMAN",
            enTitle: "SPORT",
            azName: "İdman & Fitnes",
            color: "text-sky-600",
            activeBg: "bg-sky-600",
            bgSoft: "bg-sky-50",
            icon: `<svg class="w-7 h-7 sm:w-8 sm:h-8 mx-auto" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m6.5 6.5 11 11M5 9l-2-2 4-4 2 2M15 19l2 2 4-4-2-2M8 4l2 2M18 14l2 2M4 8l2 2M14 18l2 2"/></svg>`,
            subcategories: [
                { id: "gym", name: "Modern Gym & Fitness", azName: "Trenajor zalları", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80" },
                { id: "boxing", name: "Boxing & Martial Arts", azName: "Boks & Kikboks", image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=600&q=80" },
                { id: "pool", name: "Swimming Pool", azName: "Üzgüçülük hovuzu", image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=600&q=80" },
                { id: "padel", name: "Padel & Tennis", azName: "Padel & Tennis", image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=600&q=80" },
                { id: "crossfit", name: "CrossFit Box", azName: "Krossfit & TRX", image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80" }
            ]
        },
        {
            id: "animals",
            title: "HEYVANLAR",
            enTitle: "ANIMALS",
            azName: "Zooxidmətlər & Baytarlıq",
            color: "text-emerald-600",
            activeBg: "bg-emerald-600",
            bgSoft: "bg-emerald-50",
            icon: `<svg class="w-7 h-7 sm:w-8 sm:h-8 mx-auto" fill="currentColor" viewBox="0 0 24 24"><path d="M12 11.5c-2.2 0-4 1.8-4 4 0 1.9 1.4 3.5 3.2 3.9.5.1 1.1.1 1.6 0 1.8-.4 3.2-2 3.2-3.9 0-2.2-1.8-4-4-4Z"/><ellipse cx="6.5" cy="9.5" rx="2" ry="2.5"/><ellipse cx="17.5" cy="9.5" rx="2" ry="2.5"/><ellipse cx="10" cy="5.5" rx="1.8" ry="2.2"/><ellipse cx="14" cy="5.5" rx="1.8" ry="2.2"/></svg>`,
            subcategories: [
                { id: "grooming", name: "Pet Grooming & Spa", azName: "Qruminq & SPA", image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=600&q=80" },
                { id: "vet", name: "Veterinary Clinic", azName: "Baytarlıq klinikası", image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=600&q=80" },
                { id: "pethotel", name: "Pet Hotel & Sitting", azName: "Zoohotel & Baxım", image: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=600&q=80" },
                { id: "petcare", name: "Pet Care & Training", azName: "Təlim & Gəzinti", image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=600&q=80" }
            ]
        },
        {
            id: "restaurants",
            title: "RESTORAN",
            enTitle: "RESTAURANTS",
            azName: "Restoranlar & Kafe",
            color: "text-rose-600",
            activeBg: "bg-rose-600",
            bgSoft: "bg-rose-50",
            icon: `<svg class="w-7 h-7 sm:w-8 sm:h-8 mx-auto" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M18 2v20M21 2v6a3 3 0 0 1-3 3M6 2v7a3 3 0 0 0 3 3v10M9 2v7M3 2v7a3 3 0 0 0 3 3"/></svg>`,
            subcategories: [
                { id: "dining", name: "Fine Dining", azName: "Premium Restoranlar", image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80" },
                { id: "terrace", name: "Panoramic Terrace", azName: "Teras & Şəhər Panoramı", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80" },
                { id: "lounge", name: "Lounge & Bar", azName: "Lounge & Barlar", image: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=600&q=80" },
                { id: "breakfast", name: "Breakfast & Brunch", azName: "Səhər yeməyi", image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80" }
            ]
        },
        {
            id: "style",
            title: "STİL",
            enTitle: "STYLE",
            azName: "Dizayn, Foto & Stil",
            color: "text-indigo-600",
            activeBg: "bg-indigo-600",
            bgSoft: "bg-indigo-50",
            icon: `<svg class="w-7 h-7 sm:w-8 sm:h-8 mx-auto" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m22 8-6 4 6 4V8Z"/><rect x="2" y="6" width="14" height="12" rx="2"/></svg>`,
            subcategories: [
                { id: "photoshoot", name: "Photoshoot & Video", azName: "Fotosessiya & Video", image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=600&q=80" },
                { id: "stylist", name: "Personal Stylist", azName: "İmic & Stilist", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80" },
                { id: "atelier", name: "Fashion Atelier", azName: "Atelye & Dərzi", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=80" }
            ]
        },
        {
            id: "lawyers",
            title: "HÜQUQ",
            enTitle: "LAWYERS",
            azName: "Hüquq & Notariat",
            color: "text-slate-700",
            activeBg: "bg-slate-700",
            bgSoft: "bg-slate-50",
            icon: `<svg class="w-7 h-7 sm:w-8 sm:h-8 mx-auto" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v18M3 7h18M7 21h10M4 7l3 7h-6l3-7ZM20 7l3 7h-6l3-7Z"/></svg>`,
            subcategories: [
                { id: "notary", name: "Notary Public", azName: "Notariat xidməti", image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80" },
                { id: "advocate", name: "Advocate & Legal Defense", azName: "Vəkil & Məhkəmə", image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80" },
                { id: "corporate", name: "Corporate Law", azName: "Korporativ hüquq", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80" }
            ]
        }
    ],

    // Comprehensive Salons / Centers catalog
    salons: [
        // --- BEAUTY ---

        {
            id: 101,
            topCategory: "beauty",
            category: "cosmetology",
            name: "Dr. Skin Cosmetology & Clinic",
            tag: "Kosmetologiya & Dəri mərkəzi",
            rating: 4.97,
            reviewsCount: 164,
            location: "Təbriz k. 44 (m. N.Nərimanov)",
            distance: "2.3 km",
            workHours: "10:00 - 20:00",
            image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
            badge: "Premium",
            discount: "Endirim 15%",
            description: "Peşəkar həkim-kosmetoloqlar, biorevitalizasiya, pilinq və lazer cavanlaşdırma.",
            services: [
                { id: 1011, name: "Biorevitalizasiya və mezoterapiya", price: 65, duration: "45 dəq" },
                { id: 1012, name: "Dərinin dərindən təmizlənməsi", price: 40, duration: "60 dəq" }
            ],
            slots: ["11:30", "14:00", "17:00"]
        },
        {
            id: 102,
            topCategory: "beauty",
            category: "tattoo",
            name: "Ink Art Tattoo & Piercing",
            tag: "Tatu studiyası & Pirsing",
            rating: 4.95,
            reviewsCount: 98,
            location: "Bəşir Səfəroğlu k. 192 (m. Nizami)",
            distance: "1.1 km",
            workHours: "12:00 - 22:00",
            image: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&w=800&q=80",
            badge: "Top Studio",
            discount: null,
            description: "Steril şəraitdə fərdi eskizlərlə bədii tatuaj və bütün növ pirsinqlər.",
            services: [
                { id: 1021, name: "Fərdi eskizlə bədii tatu (mini)", price: 50, duration: "60 dəq" },
                { id: 1022, name: "Qulaq / burun pirsingi + titan sırğa", price: 25, duration: "30 dəq" }
            ],
            slots: ["13:00", "16:00", "18:30"]
        },
        {
            id: 103,
            topCategory: "beauty",
            category: "brows",
            name: "Brow Bar Baku",
            tag: "Qaş memarlığı & Laminasiya",
            rating: 4.99,
            reviewsCount: 230,
            location: "Rəsul Rza k. 11 (m. Sahil)",
            distance: "0.5 km",
            workHours: "10:00 - 20:00",
            image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
            badge: "Zeyvo 2026",
            discount: "Endirim 10%",
            description: "Qaşların anatomik formasına uyğun dizayn, laminasiya və boyama.",
            services: [
                { id: 1031, name: "Qaş memarlığı + rənglənmə", price: 20, duration: "40 dəq" },
                { id: 1032, name: "Qaş laminasiyası və vitamin bərpa", price: 30, duration: "50 dəq" }
            ],
            slots: ["12:00", "15:00", "17:30"]
        },
        {
            id: 104,
            topCategory: "beauty",
            category: "makeup",
            name: "Glow Makeup & Style Studio",
            tag: "Vizaj & Makiyaj studiyası",
            rating: 4.96,
            reviewsCount: 145,
            location: "Zərifə Əliyeva k. 25 (m. Sahil)",
            distance: "0.8 km",
            workHours: "09:00 - 21:00",
            image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
            badge: "Lüks",
            discount: null,
            description: "Gündəlik, axşam və gəlin makiyajı. Yalnız lüks seqment kosmetik vasitələr.",
            services: [
                { id: 1041, name: "Axşam makiyajı (Full Glam)", price: 45, duration: "60 dəq" },
                { id: 1042, name: "Gündəlik Nude makiyaj", price: 30, duration: "40 dəq" }
            ],
            slots: ["10:30", "13:30", "16:00"]
        },
        {
            id: 105,
            topCategory: "beauty",
            category: "piercing",
            name: "Titanium Piercing & Body Art",
            tag: "Professional pirsing",
            rating: 4.98,
            reviewsCount: 112,
            location: "Nizami k. 84 (m. Sahil)",
            distance: "0.6 km",
            workHours: "11:00 - 21:00",
            image: "https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&w=800&q=80",
            badge: "Steril",
            discount: null,
            description: "Tibb sertifikatlı mütəxəssislər, implant dərəcəli titan zinət əşyaları.",
            services: [
                { id: 1051, name: "Qığırdaq (Helix / Tragus) pirsingi", price: 30, duration: "25 dəq" },
                { id: 1052, name: "Dodaq / Burun pirsingi", price: 28, duration: "20 dəq" }
            ],
            slots: ["14:00", "16:30", "18:00"]
        },
        {
            id: 1,
            topCategory: "beauty",
            category: "nails",
            name: "Cherry Nails & Beauty",
            tag: "Gözəllik salonu & Dırnaq",
            rating: 4.98,
            reviewsCount: 184,
            location: "Nizami k. 128 (m. 28 May)",
            distance: "1.2 km",
            workHours: "10:00 - 21:00",
            image: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=800&q=80",
            badge: "Populyar",
            discount: "Endirim 20%",
            description: "Bakının mərkəzində premium manikür, pedikür və qaş korreksiyası. Yüksək sterilizasiya və peşəkar komanda.",
            services: [
                { id: 11, name: "Kombinə manikür + Gel lak", price: 25, duration: "60 dəq" },
                { id: 12, name: "Qaş korreksiyası və xına", price: 15, duration: "35 dəq" },
                { id: 13, name: "Smart pedikür və qulluq", price: 35, duration: "75 dəq" }
            ],
            slots: ["14:30", "16:00", "17:30", "19:00"]
        },
        {
            id: 2,
            topCategory: "beauty",
            category: "barber",
            name: "TULGA Gentlemen Barbershop",
            tag: "Kişi bərbəri & Fade",
            rating: 5.0,
            reviewsCount: 220,
            location: "Neftçilər pr. 45 (m. Sahil)",
            distance: "0.9 km",
            workHours: "10:00 - 22:00",
            image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
            badge: "Premium",
            discount: null,
            description: "Kişilər üçün klassik ənənələr və müasir dəb trendləri. Dəqiq saç kəsimi, saqqal dizaynı.",
            services: [
                { id: 21, name: "Kişi saç kəsimi + yuyulma", price: 30, duration: "45 dəq" },
                { id: 22, name: "Saqqal modelləşdirməsi", price: 20, duration: "30 dəq" },
                { id: 23, name: "Tulga Kombo (Saç + Saqqal)", price: 45, duration: "75 dəq" }
            ],
            slots: ["13:00", "15:00", "16:30", "18:00"]
        },
        {
            id: 3,
            topCategory: "beauty",
            category: "massage",
            name: "Aura Spa & Wellness Lounge",
            tag: "Masaj & SPA mərkəzi",
            rating: 4.95,
            reviewsCount: 142,
            location: "Füzuli k. 15 (m. 28 May)",
            distance: "2.1 km",
            workHours: "11:00 - 22:00",
            image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80",
            badge: "Seçilmiş",
            discount: "Endirim 15%",
            description: "Bədən və ruhun dincəlməsi üçün fərdi masaj və SPA ritualları.",
            services: [
                { id: 31, name: "Klassik bədən masajı", price: 45, duration: "50 dəq" },
                { id: 32, name: "Tay aroma-masajı", price: 60, duration: "60 dəq" }
            ],
            slots: ["14:00", "16:15", "18:30"]
        },
        {
            id: 4,
            topCategory: "beauty",
            category: "lashes",
            name: "Lash BB Beauty Studio",
            tag: "Kirpik və qaş studiyası",
            rating: 4.96,
            reviewsCount: 195,
            location: "Azadlıq pr. 88 (m. Nəsimi)",
            distance: "1.4 km",
            workHours: "10:00 - 20:00",
            image: "https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=800&q=80",
            badge: "Zeyvo 2026",
            discount: null,
            description: "Kirpik qaynağı və qaş memarlığında peşəkar standartlar.",
            services: [
                { id: 41, name: "Klassik / 2D kirpik qaynağı", price: 35, duration: "90 dəq" },
                { id: 42, name: "Kirpik laminasiyası + botox", price: 30, duration: "50 dəq" }
            ],
            slots: ["12:30", "15:00", "17:45"]
        },
        {
            id: 5,
            topCategory: "beauty",
            category: "laser",
            name: "M Elektra Laser Studio",
            tag: "Lazer və kosmetologiya",
            rating: 4.94,
            reviewsCount: 110,
            location: "Heydər Əliyev pr. 102 (m. Gənclik)",
            distance: "3.2 km",
            workHours: "09:00 - 21:00",
            image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
            badge: "Yeni",
            discount: "Endirim 20%",
            description: "Aleksandrit və Diod lazer avadanlığı ilə ağrısız epilyasiya.",
            services: [
                { id: 51, name: "Aleksandrit lazer: Bütün bədən", price: 80, duration: "60 dəq" },
                { id: 52, name: "Ultrasəs üz təmizlənməsi", price: 40, duration: "50 dəq" }
            ],
            slots: ["11:00", "14:00", "16:30"]
        },
        {
            id: 6,
            topCategory: "beauty",
            category: "hair",
            name: "Shynarym Beauty Lounge",
            tag: "Premium saç studiyası",
            rating: 4.98,
            reviewsCount: 160,
            location: "Təbriz k. 44 (m. Nərimanov)",
            distance: "1.8 km",
            workHours: "10:00 - 20:30",
            image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
            badge: "Top Salon",
            discount: null,
            description: "AirTouch rənglənmə və saç bərpası üçün ixtisaslaşmış məkan.",
            services: [
                { id: 61, name: "Xanım saç kəsimi və feni", price: 35, duration: "60 dəq" },
                { id: 62, name: "AirTouch / Balayaj rənglənməsi", price: 120, duration: "180 dəq" }
            ],
            slots: ["13:30", "16:00", "19:00"]
        },

        // --- HEALTH ---
        {
            id: 7,
            topCategory: "health",
            category: "dental",
            name: "DentStar Dental Clinic",
            tag: "Stomatoloji Mərkəz",
            rating: 4.99,
            reviewsCount: 230,
            location: "Həsən Əliyev k. 68",
            distance: "1.5 km",
            workHours: "09:00 - 20:00",
            image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80",
            badge: "Top Klinika",
            discount: "10% Endirim",
            description: "Ağrısız diş müalicəsi, implantasiya və estetik vinirlər. Almaniya avadanlıqları.",
            services: [
                { id: 71, name: "Həkim müayinəsi + Rəqəmsal rentgen", price: 20, duration: "30 dəq" },
                { id: 72, name: "Diş daşlarının təmizlənməsi (AirFlow)", price: 45, duration: "45 dəq" },
                { id: 73, name: "Zoom 4 lazerlə diş ağardılması", price: 150, duration: "60 dəq" }
            ],
            slots: ["11:00", "14:00", "17:00"]
        },
        {
            id: 8,
            topCategory: "health",
            category: "therapist",
            name: "Mediland Medical Center",
            tag: "Çoxsahəli Klinika & Diaqnostika",
            rating: 4.93,
            reviewsCount: 140,
            location: "İnşaatçılar pr. 12",
            distance: "2.4 km",
            workHours: "08:30 - 19:30",
            image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
            badge: "Akkreditə",
            discount: null,
            description: "Ümumi terapevt qəbulu, kardioloji və laboratoriya analizləri bir ünvanda.",
            services: [
                { id: 81, name: "Baş həkim terapevt qəbulu", price: 40, duration: "40 dəq" },
                { id: 82, name: "Ümumi Check-Up analiz paketi", price: 75, duration: "30 dəq" }
            ],
            slots: ["10:30", "12:00", "15:30"]
        },
        {
            id: 9,
            topCategory: "health",
            category: "physio",
            name: "Vitalis Bərpa & Fizioterapiya",
            tag: "Reabilitasiya və Sağlam Onurğa",
            rating: 4.97,
            reviewsCount: 96,
            location: "Koroğlu Rəhimov k. 22",
            distance: "3.0 km",
            workHours: "09:00 - 21:00",
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
            badge: "İxtisaslaşmış",
            discount: "15% Endirim",
            description: "Onurğa əyrilikləri, idman zədələri və manual terapiya üzrə ixtisaslaşmış komanda.",
            services: [
                { id: 91, name: "Manual onurğa diaqnostikası", price: 35, duration: "45 dəq" },
                { id: 92, name: "Terapevtik müalicəvi masaj seansı", price: 50, duration: "60 dəq" }
            ],
            slots: ["12:00", "16:00", "18:30"]
        },

        // --- AUTO ---
        {
            id: 10,
            topCategory: "auto",
            category: "detailing",
            name: "AutoSpa Baku Detailing",
            tag: "Premium Detailing & Keramika",
            rating: 4.97,
            reviewsCount: 165,
            location: "Babək pr. 34A",
            distance: "4.1 km",
            workHours: "09:00 - 21:00",
            image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=800&q=80",
            badge: "Top Detailing",
            discount: "Keramikaya 15%",
            description: "Avtomobillər üçün nano-keramika, cilalama (polirovka) və salonun dərindən kimyəvi təmizliyi.",
            services: [
                { id: 101, name: "3-qat bədən cilalanması (Polirovka)", price: 120, duration: "180 dəq" },
                { id: 102, name: "Salonun buxarla kimyəvi təmizlənməsi", price: 90, duration: "150 dəq" },
                { id: 103, name: "Gyeon 9H Keramika örtüyü (2 qat)", price: 250, duration: "240 dəq" }
            ],
            slots: ["11:00", "14:30", "17:00"]
        },
        {
            id: 11,
            topCategory: "auto",
            category: "carwash",
            name: "Formula 1 Baku CarWash",
            tag: "Təmassız Avtoyuma & Qulluq",
            rating: 4.92,
            reviewsCount: 310,
            location: "Ziya Bünyadov pr. 118",
            distance: "3.5 km",
            workHours: "24/7 Açıqdır",
            image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=800&q=80",
            badge: "24/7",
            discount: null,
            description: "Köpüklü təmassız yuma, salon tozsoranı və şin qaraldılması. Növbəsiz onlayn bron.",
            services: [
                { id: 111, name: "Kompleks yuma (Kuzov + Salon)", price: 15, duration: "35 dəq" },
                { id: 112, name: "Mühərrik bölməsinin quru yuyulması", price: 25, duration: "40 dəq" }
            ],
            slots: ["13:00", "15:00", "18:00", "20:00"]
        },
        {
            id: 12,
            topCategory: "auto",
            category: "oil",
            name: "PitStop Express Servis",
            tag: "Yağ Dəyişmə & Diaqnostika",
            rating: 4.95,
            reviewsCount: 178,
            location: "Tbilisi pr. 74",
            distance: "2.8 km",
            workHours: "09:00 - 20:00",
            image: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80",
            badge: "Ekspress",
            discount: "Hədiyyə diaqnostika",
            description: "Orijinal Castrol, Motul, Mobil yağları, filterlərin dəyişdirilməsi və asqı sistemi yoxlanışı.",
            services: [
                { id: 121, name: "Mühərrik yağının və filterin dəyişdirilməsi", price: 20, duration: "25 dəq" },
                { id: 122, name: "Kompüter diaqnostikası (Launch X431)", price: 25, duration: "20 dəq" }
            ],
            slots: ["12:00", "14:30", "16:45"]
        },

        // --- ENTERTAINMENT ---
        {
            id: 13,
            topCategory: "entertainment",
            category: "fitness",
            name: "Pushkin Fitness & Spa Club",
            tag: "Premium İdman Kompleksi",
            rating: 4.96,
            reviewsCount: 204,
            location: "Puşkin k. 10 (m. Sahil)",
            distance: "0.8 km",
            workHours: "07:00 - 23:00",
            image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
            badge: "Lüks",
            discount: "İlk məşqə 20%",
            description: "Müasir Technogym trenajorları, Fin saunası və fərdi məşqçi ilə dərslər.",
            services: [
                { id: 131, name: "1 günlük tam giriş (Zal + Sauna + Hovuz)", price: 25, duration: "Günlük" },
                { id: 132, name: "Fərdi məşqçi ilə fərdi fitness seansı", price: 30, duration: "60 dəq" }
            ],
            slots: ["10:00", "15:00", "18:30"]
        },
        {
            id: 14,
            topCategory: "entertainment",
            category: "yoga",
            name: "Harmony Yoga & Pilates Studio",
            tag: "Qadın Yoqa & Meditasiya",
            rating: 4.98,
            reviewsCount: 115,
            location: "Səməd Vurğun k. 48",
            distance: "1.6 km",
            workHours: "08:30 - 21:00",
            image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80",
            badge: "Seçilmiş",
            discount: null,
            description: "Hatha yoqa, Aero-yoqa (qamakla) və onurğa dartınma məşqləri rahat atmosferdə.",
            services: [
                { id: 141, name: "Qrup dərsi: Hatha Yoqa & Nəfəs", price: 18, duration: "75 dəq" },
                { id: 142, name: "Fərdi Pilates Reformer seansı", price: 40, duration: "60 dəq" }
            ],
            slots: ["11:00", "17:00", "19:00"]
        },

        // --- SERVICES ---
        {
            id: 15,
            topCategory: "services",
            category: "cleaning",
            name: "CleanPro Ev & Ofis Klining",
            tag: "Professional Təmizlik Servisi",
            rating: 4.95,
            reviewsCount: 180,
            location: "Bütün Bakı üzrə səyyar xidmət",
            distance: "Ünvana gəlirik",
            workHours: "08:00 - 21:00",
            image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
            badge: "Zəmanətli",
            discount: "15% Endirim",
            description: "Kärcher avadanlıqları ilə mənzillərin, ofislərin və təmir sonrası sahələrin təmizliyi.",
            services: [
                { id: 151, name: "Mənzil təmizliyi (1-2 otaqlı standart)", price: 45, duration: "180 dəq" },
                { id: 152, name: "Yumşaq mebel və divan yuyulması", price: 35, duration: "90 dəq" }
            ],
            slots: ["10:00", "14:00", "17:00"]
        },
        {
            id: 16,
            topCategory: "services",
            category: "dryclean",
            name: "Express Ximçistka Baku",
            tag: "Quru Təmizləmə & Ütüləmə",
            rating: 4.91,
            reviewsCount: 135,
            location: "Rəşid Behbudov k. 52",
            distance: "1.1 km",
            workHours: "09:00 - 20:30",
            image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=800&q=80",
            badge: "Tez çatdırılma",
            discount: null,
            description: "Kostyum, palto, axşam geyimləri və xalçaların incə kimyəvi təmizlənməsi.",
            services: [
                { id: 161, name: "Kişi kostyumunun ximçistkası", price: 20, duration: "24 saat" },
                { id: 162, name: "Gödəkçə və palto quru təmizliyi", price: 25, duration: "24 saat" }
            ],
            slots: ["11:30", "14:00", "16:30"]
        },

        // --- EDUCATION ---
        {
            id: 17,
            topCategory: "education",
            category: "barberschool",
            name: "Baku Barber & Stylist Academy",
            tag: "Peşə Təhsili və Sertifikatlaşma",
            rating: 4.97,
            reviewsCount: 88,
            location: "Cəfər Cabbarlı k. 30 (m. Nizami)",
            distance: "1.0 km",
            workHours: "10:00 - 19:00",
            image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
            badge: "Diplom verilir",
            discount: "Qeydiyyata 20%",
            description: "Sıfırdan peşəkar bərbər və fade sənəti. Təcrübəli instruktorlar və real modellər üzərində praktika.",
            services: [
                { id: 171, name: "Sınaq dərsi və peşə istiqamətləndirməsi", price: 30, duration: "60 dəq" },
                { id: 172, name: "Fərdi ustad dərsi (Fade texnikaları)", price: 80, duration: "120 dəq" }
            ],
            slots: ["12:00", "15:00", "17:30"]
        },
        {
            id: 18,
            topCategory: "education",
            category: "beautyschool",
            name: "MakeUp Pro Academy Baku",
            tag: "Beynəlxalq Vizaj Məktəbi",
            rating: 4.99,
            reviewsCount: 110,
            location: "Nizami k. 84",
            distance: "1.3 km",
            workHours: "11:00 - 20:00",
            image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
            badge: "Beynəlxalq",
            discount: null,
            description: "Gündəlik və gəlin makiyajı dərsləri, rəng koloristikası və sertifikatlı proqramlar.",
            services: [
                { id: 181, name: "Özün üçün makiyaj (Fərdi kurs seansı)", price: 60, duration: "90 dəq" },
                { id: 182, name: "Göz makiyajı və konturinq ustad dərsi", price: 45, duration: "75 dəq" }
            ],
            slots: ["14:00", "16:30", "18:30"]
        },

        // --- MORE ---
        {
            id: 19,
            topCategory: "animals",
            category: "petcare",
            name: "PetCare Baku Qruming Lounge",
            tag: "Ev heyvanları üçün SPA və Kəsim",
            rating: 4.96,
            reviewsCount: 75,
            location: "Səməd Vurğun k. 92",
            distance: "2.0 km",
            workHours: "10:00 - 20:00",
            image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=800&q=80",
            badge: "Heyvansevər",
            discount: "10% Endirim",
            description: "İtlər və pişiklər üçün gigiyenik daranma, çimizdirmə, dırnaq kəsimi və model saç kəsimi.",
            services: [
                { id: 191, name: "Kiçik cins itlər üçün kompleks qruming", price: 35, duration: "60 dəq" },
                { id: 192, name: "Pişiklər üçün yuyulma və daranma", price: 30, duration: "50 dəq" }
            ],
            slots: ["11:00", "13:30", "16:00"]
        },
        {
            id: 20,
            topCategory: "style",
            category: "photo",
            name: "Zoom Art Fotostudiya",
            tag: "Portret & Brend Çəkilişləri",
            rating: 4.94,
            reviewsCount: 62,
            location: "Füzuli k. 34",
            distance: "1.9 km",
            workHours: "10:00 - 21:00",
            image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=80",
            badge: "İşıq avadanlığı",
            discount: null,
            description: "Peşəkar cyc-wall və işıqlandırma, biznes portretləri və şəxsi fotosessiyalar.",
            services: [
                { id: 201, name: "Fərdi studiya fotosessiyası (1 saat)", price: 70, duration: "60 dəq" }
            ],
            slots: ["13:00", "15:30", "18:00"]
        }
    ,
// --- RENT ---
        {
            id: 21,
            topCategory: "rent",
            category: "car_rent",
            name: "Baku Luxury Cars Rental",
            tag: "Premium & Biznes Avtomobillər",
            rating: 4.98,
            reviewsCount: 145,
            location: "Nizami k. 110 (Port Baku yaxınlığı)",
            distance: "0.6 km",
            workHours: "24/7 Açıqdır",
            image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
            badge: "Lüks Park",
            discount: "3 günə 15%",
            description: "Sürücülü və sürücüsüz premium avtomobillər: Mercedes S-Class, BMW 7, Porsche, Range Rover. Şəhərdaxili və aeroport transfer.",
            services: [
                { id: 211, name: "Mercedes S-Class (W223) günlük icarə", price: 280, duration: "Günlük" },
                { id: 212, name: "VIP Heydər Əliyev Aeroport transferi", price: 80, duration: "60 dəq" }
            ],
            slots: ["11:00", "14:00", "17:30", "20:00"]
        },
        {
            id: 22,
            topCategory: "rent",
            category: "photo_studio",
            name: "White Hall Studio & Cowork",
            tag: "Foto & İşıq Zalının İcarəsi",
            rating: 4.96,
            reviewsCount: 82,
            location: "Ağ Şəhər bulvarı 12",
            distance: "2.1 km",
            workHours: "09:00 - 22:00",
            image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80",
            badge: "Cyc-wall",
            discount: null,
            description: "200 kv.m ağ siklorama, Profoto işıqları, fərdi qrim otağı və çəkiliş rekvizitləri ilə peşəkar məkan.",
            services: [
                { id: 221, name: "Böyük zalın saatlıq icarəsi (Profoto ilə)", price: 45, duration: "60 dəq" },
                { id: 222, name: "Gündüz paketi (4 saat tam studiya)", price: 150, duration: "240 dəq" }
            ],
            slots: ["10:00", "13:00", "16:00"]
        },

        // --- OTHER ---
        {
            id: 23,
            topCategory: "other",
            category: "events",
            name: "Prestige Event Group Baku",
            tag: "Korporativ & Özəl Tədbirlər",
            rating: 4.97,
            reviewsCount: 110,
            location: "Nobel pr. 25 (Azure)",
            distance: "1.8 km",
            workHours: "09:00 - 20:00",
            image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
            badge: "Top Agentlik",
            discount: "Erkən rezerv 10%",
            description: "Konfranslar, qala gecələr, təqdimatlar və fərdi bayramların açar-təslimi təşkili.",
            services: [
                { id: 231, name: "Tədbir konseptinin hazırlanması və konsultasiya", price: 50, duration: "60 dəq" },
                { id: 232, name: "Səs və işıq avadanlığının texniki təminatı", price: 200, duration: "Günlük" }
            ],
            slots: ["12:00", "15:00", "18:00"]
        },

        // --- SPORT ---
        {
            id: 24,
            topCategory: "sport",
            category: "gym",
            name: "IronGym Baku Club",
            tag: "Peşəkar Trenajor & Crossfit",
            rating: 4.98,
            reviewsCount: 195,
            location: "Xocalı pr. 37 (m. Xətai)",
            distance: "1.4 km",
            workHours: "06:30 - 23:30",
            image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
            badge: "Technogym",
            discount: "İlk giriş pulsuz",
            description: "1500 kv.m müasir məşq sahəsi, kardioməkan, boks rinqi, sauna və protein bar.",
            services: [
                { id: 241, name: "1 günlük tam giriş (Zal + Sauna)", price: 20, duration: "Günlük" },
                { id: 242, name: "Fərdi instruktorla məşq seansı", price: 30, duration: "60 dəq" }
            ],
            slots: ["09:00", "14:00", "18:00", "20:00"]
        },
        {
            id: 25,
            topCategory: "sport",
            category: "padel",
            name: "Baku Padel & Tennis Arena",
            tag: "Müasir Padel Kortları",
            rating: 4.95,
            reviewsCount: 130,
            location: "Dənizkənarı Milli Park",
            distance: "0.8 km",
            workHours: "08:00 - 00:00",
            image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=800&q=80",
            badge: "İspan örtük",
            discount: null,
            description: "Panoramik şüşəli 4 qapalı və 2 açıq padel kortu. Raketka icarəsi və təlimçi xidməti.",
            services: [
                { id: 251, name: "1 saatlıq kort icarəsi (4 nəfər üçün)", price: 40, duration: "60 dəq" },
                { id: 252, name: "Baş məşqçi ilə padel təlimi", price: 35, duration: "50 dəq" }
            ],
            slots: ["11:00", "15:00", "19:00", "21:00"]
        },

        // --- ANIMALS ---
        {
            id: 26,
            topCategory: "animals",
            category: "vet",
            name: "Royal Vet Baku Klinika",
            tag: "24/7 Baytarlıq Mərkəzi",
            rating: 4.99,
            reviewsCount: 160,
            location: "Tbilisi pr. 49",
            distance: "2.3 km",
            workHours: "24/7 Açıqdır",
            image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=800&q=80",
            badge: "Təcili 24/7",
            discount: "İlk müayinə 10%",
            description: "Ultrasəs, rəqəmsal rentgen, cərrahiyyə, peyvəndlər və laboratoriya analizləri ilə tam baytar yardımı.",
            services: [
                { id: 261, name: "Həkim-baytarın ümumi baxışı və konsultasiya", price: 25, duration: "30 dəq" },
                { id: 262, name: "Kompleks peyvənd vurulması + pasport", price: 35, duration: "25 dəq" }
            ],
            slots: ["10:30", "13:00", "16:30", "19:00"]
        },

        // --- RESTAURANTS ---
        {
            id: 27,
            topCategory: "restaurants",
            category: "dining",
            name: "Mangal Steak House Bayil",
            tag: "Premium Steyk & Şəhər Panoramı",
            rating: 4.98,
            reviewsCount: 380,
            location: "Qurban Abbasov k. 28 (Bayıl)",
            distance: "3.2 km",
            workHours: "12:00 - 01:00",
            image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
            badge: "Michelin Guide",
            discount: "Onlayn masa bronu",
            description: "Xüsusi dəniz panoraması, quru yetişdirilmiş Black Angus steykləri və zəngin şərab kolleksiyası.",
            services: [
                { id: 271, name: "Dəniz mənzərəli masa rezervasiyası (2-4 nəfər)", price: 0, duration: "Dərhal təsdiq" },
                { id: 272, name: "Şefin dequstasiya axşamı menyusu", price: 85, duration: "120 dəq" }
            ],
            slots: ["13:00", "15:30", "19:00", "21:30"]
        },
        {
            id: 28,
            topCategory: "restaurants",
            category: "breakfast",
            name: "Paul Terrace Fountain Square",
            tag: "Fransız Qəhvəxanası & Brunch",
            rating: 4.94,
            reviewsCount: 240,
            location: "Fəvvarələr Meydanı (Nizami k. 5)",
            distance: "0.5 km",
            workHours: "08:30 - 23:00",
            image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
            badge: "Açıq Teras",
            discount: null,
            description: "Təzə bişmiş kruasanlar, zərif fransız omletləri və ətirli kofe rahat şəhər mərkəzində.",
            services: [
                { id: 281, name: "Brunch masası rezervasiyası", price: 0, duration: "Dərhal təsdiq" },
                { id: 282, name: "Kruasan və imza desert dəsti", price: 18, duration: "45 dəq" }
            ],
            slots: ["09:00", "11:00", "13:30", "16:00"]
        },

        // --- STYLE ---
        {
            id: 29,
            topCategory: "style",
            category: "atelier",
            name: "Sartoria Baku Bespoke",
            tag: "Lüks Fərdi Geyim Tikişi",
            rating: 4.99,
            reviewsCount: 89,
            location: "Rəsul Rza k. 14 (m. Sahil)",
            distance: "0.7 km",
            workHours: "10:00 - 20:00",
            image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80",
            badge: "İtalyan Yun",
            discount: "10% Endirim",
            description: "İtaliya və İngiltərə parçalarından (Loro Piana, Scabal) fərdi ölçülü kişi və qadın kostyumları.",
            services: [
                { id: 291, name: "Baş dərzinin ölçü götürməsi və parça seçimi", price: 30, duration: "45 dəq" },
                { id: 292, name: "Klassik kostyumun fərdi tikilməsi", price: 350, duration: "7 gün" }
            ],
            slots: ["11:00", "14:00", "17:00"]
        },

        // --- LAWYERS ---
        {
            id: 30,
            topCategory: "lawyers",
            category: "advocate",
            name: "Baku Legal & Notary Partners",
            tag: "Hüquq Bürosu & Məhkəmə Vəkili",
            rating: 5.0,
            reviewsCount: 125,
            location: "Nizami Mall Plaza (m. 28 May)",
            distance: "1.1 km",
            workHours: "09:00 - 19:00",
            image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
            badge: "Kollegiya üzvü",
            discount: "İlk 20 dəq pulsuz",
            description: "Vəkillər Kollegiyasının üzvləri: əmlak, müqavilələr, kommersiya mübahisələri və notarial təsdiq.",
            services: [
                { id: 301, name: "Baş vəkil ilə hüquqi konsultasiya", price: 40, duration: "45 dəq" },
                { id: 302, name: "Müqavilə və sənədlərin ekspertizası", price: 50, duration: "60 dəq" }
            ],
            slots: ["10:00", "12:30", "15:00", "17:30"]
        }
    ],

    // Masters categorized by top category
    masters: [
        // Beauty masters
        {
            id: 1,
            topCategory: "beauty",
            name: "Aysel Məmmədova",
            title: "Top Nail Artist",
            salonId: 1,
            salonName: "Cherry Nails & Beauty",
            rating: 5.0,
            experience: "6 il təcrübə",
            photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80"
        },
        {
            id: 2,
            topCategory: "beauty",
            name: "Elmir Əliyev",
            title: "Brand Barber",
            salonId: 2,
            salonName: "TULGA Gentlemen Barbershop",
            rating: 5.0,
            experience: "8 il təcrübə",
            photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
        },
        {
            id: 3,
            topCategory: "beauty",
            name: "Leyla Hüseynova",
            title: "Lash & Brow Stylist",
            salonId: 4,
            salonName: "Lash BB Studio",
            rating: 4.98,
            experience: "5 il təcrübə",
            photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80"
        },
        {
            id: 4,
            topCategory: "beauty",
            name: "Nigar Vəliyeva",
            title: "Top Colorist & Stylist",
            salonId: 6,
            salonName: "Shynarym Beauty Lounge",
            rating: 5.0,
            experience: "7 il təcrübə",
            photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
        },

        // Health masters / doctors
        {
            id: 5,
            topCategory: "health",
            name: "Dr. Fərid Əhmədov",
            title: "Baş Həkim Stomatoloq",
            salonId: 7,
            salonName: "DentStar Dental Clinic",
            rating: 5.0,
            experience: "11 il təcrübə",
            photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80"
        },
        {
            id: 6,
            topCategory: "health",
            name: "Dr. Nərgiz Qasımova",
            title: "Həkim-terapevt",
            salonId: 8,
            salonName: "Mediland Medical Center",
            rating: 4.97,
            experience: "9 il təcrübə",
            photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80"
        },
        {
            id: 7,
            topCategory: "health",
            name: "Yusif Bağırov",
            title: "Manual Terapevt",
            salonId: 9,
            salonName: "Vitalis Bərpa Mərkəzi",
            rating: 5.0,
            experience: "8 il təcrübə",
            photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80"
        },

        // Auto specialists
        {
            id: 8,
            topCategory: "auto",
            name: "Rəşad Quliyev",
            title: "Master Detailer & Keramika",
            salonId: 10,
            salonName: "AutoSpa Baku Detailing",
            rating: 5.0,
            experience: "7 il təcrübə",
            photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80"
        },
        {
            id: 9,
            topCategory: "auto",
            name: "Kamran Məmmədov",
            title: "Avto Diaqnostik & Mühəndis",
            salonId: 12,
            salonName: "PitStop Express Servis",
            rating: 4.95,
            experience: "10 il təcrübə",
            photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80"
        },

        // Entertainment trainers
        {
            id: 10,
            topCategory: "entertainment",
            name: "Murad Qasımov",
            title: "Fərdi Fitnes Təlimçi",
            salonId: 13,
            salonName: "Pushkin Fitness Club",
            rating: 4.99,
            experience: "6 il təcrübə",
            photo: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=300&q=80"
        },
        {
            id: 11,
            topCategory: "entertainment",
            name: "Aydan İsmayılova",
            title: "Yoqa & Meditasiya Ustadı",
            salonId: 14,
            salonName: "Harmony Yoga Studio",
            rating: 5.0,
            experience: "5 il təcrübə",
            photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=300&q=80"
        },

        // Services specialists
        {
            id: 12,
            topCategory: "services",
            name: "Vüqar Həsənov",
            title: "Baş Klining Meneceri",
            salonId: 15,
            salonName: "CleanPro Servis",
            rating: 4.96,
            experience: "6 il təcrübə",
            photo: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80"
        },

        // Education instructors
        {
            id: 13,
            topCategory: "education",
            name: "Könül Babayeva",
            title: "Beynəlxalq Nail İnstruktor",
            salonId: 18,
            salonName: "MakeUp Pro Academy",
            rating: 5.0,
            experience: "10 il təcrübə",
            photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80"
        }
    ,
// Rent specialists
        {
            id: 11,
            topCategory: "rent",
            name: "Rauf Qasımov",
            title: "VIP Avtopark Meneceri",
            salonId: 21,
            salonName: "Baku Luxury Cars Rental",
            rating: 4.99,
            experience: "7 il təcrübə",
            photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80"
        },
        // Sport coaches
        {
            id: 12,
            topCategory: "sport",
            name: "Kənan Rəhimov",
            title: "Baş Məşqçi & Dietoloq",
            salonId: 24,
            salonName: "IronGym Baku Club",
            rating: 5.0,
            experience: "8 il təcrübə",
            photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
        },
        // Animals specialists
        {
            id: 13,
            topCategory: "animals",
            name: "Dr. Elnur Bağırov",
            title: "Baş Baytar Həkim",
            salonId: 26,
            salonName: "Royal Vet Baku Klinika",
            rating: 4.99,
            experience: "10 il təcrübə",
            photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80"
        },
        // Restaurants chefs
        {
            id: 14,
            topCategory: "restaurants",
            name: "Şef Tural Həsənov",
            title: "İmza Baş Aşpazı",
            salonId: 27,
            salonName: "Mangal Steak House Bayil",
            rating: 5.0,
            experience: "12 il təcrübə",
            photo: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=300&q=80"
        },
        // Style experts
        {
            id: 15,
            topCategory: "style",
            name: "Camal Mustafayev",
            title: "Baş Sartorial Dərzi",
            salonId: 29,
            salonName: "Sartoria Baku Bespoke",
            rating: 4.98,
            experience: "15 il təcrübə",
            photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80"
        },
        // Lawyers
        {
            id: 16,
            topCategory: "lawyers",
            name: "Vəkil Elşən Məmmədov",
            title: "Kollegiya Vəkili & Partnyor",
            salonId: 30,
            salonName: "Baku Legal Partners",
            rating: 5.0,
            experience: "14 il təcrübə",
            photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80"
        },
        // Other services
        {
            id: 17,
            topCategory: "other",
            name: "Samirə İsmayılova",
            title: "Tədbir Baş Koordinatoru",
            salonId: 23,
            salonName: "Prestige Event Group Baku",
            rating: 4.97,
            experience: "6 il təcrübə",
            photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80"
        }
    ],

    // Brands / Networks
    brands: [
        { name: "Lash BB Studio", label: "LASH BB", tag: "2 filial", rating: 4.96, bg: "bg-[#1F2024]", text: "text-white" },
        { name: "Tulga Barbershop", label: "TULGA", tag: "Sahil", rating: 5.0, bg: "bg-[#2A231C]", text: "text-amber-300" },
        { name: "DentStar Clinic", label: "DENT", tag: "Nəsimi", rating: 4.99, bg: "bg-teal-900", text: "text-teal-200" },
        { name: "AutoSpa Detailing", label: "AUTOSPA", tag: "Babək", rating: 4.97, bg: "bg-rose-950", text: "text-rose-300" },
        { name: "Pushkin Fitness", label: "FITNESS", tag: "Mərkəz", rating: 4.96, bg: "bg-amber-950", text: "text-amber-300" },
        { name: "Cherry Nails Bar", label: "CHERRY", tag: "28 May", rating: 4.99, bg: "bg-rose-600", text: "text-white" }
    ],

    // Grouped All Categories for "Daha çox" (More) Modal
    allCategoriesGrouped: [
        {
            id: "beauty",
            title: "Gözəllik & Baxım",
            icon: `<svg class="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="7.5" cy="9" r="3.5"/><path d="M7.5 12.5v7M5 16.5h5"/><circle cx="15" cy="14" r="3.5"/><path d="M17.5 11.5l4-4M17.5 7.5h4v4"/></svg>`,
            items: ["Manikür & Pedikür", "Saç kəsimi & Stil", "Kişi bərbəri & Fade", "Qaş & Kirpik", "Lazer epilyasiyası", "Kosmetologiya", "SPA & Masaj", "Vizaj & Makiyaj", "Tatu & Permanent", "Solyari"]
        },
        {
            id: "health",
            title: "Sağlamlıq & Tibb",
            icon: `<svg class="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M7 11h2.5l1.5-3 2 6 1.5-3H17"/></svg>`,
            items: ["Stomatologiya", "Terapevt qəbulu", "Qan analizləri", "Kardioqramma", "Fizioterapiya & Bərpa", "Manual terapiya", "Oftalmologiya", "Dermatologiya"]
        },
        {
            id: "auto",
            title: "Avto xidmətlər",
            icon: `<svg class="w-5 h-5 text-rose-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 11l1.5-5h11l1.5 5M3 11h18v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Z"/><circle cx="7" cy="14" r="1.5" fill="currentColor"/><circle cx="17" cy="14" r="1.5" fill="currentColor"/></svg>`,
            items: ["Avtoyuma", "Detailing & Cilalama", "Keramika örtüyü", "Mühərrik yağı dəyişmə", "Kompüter diaqnostikası", "Təkər təmiri & Balans", "Şüşə qaraltma (Plyonka)"]
        },
        {
            id: "entertainment",
            title: "Əyləncə & İdman",
            icon: `<svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
            items: ["Fitnes & Trenajor", "Qapalı Hovuz", "Sauna & SPA", "Yoqa & Meditasiya", "Pilates Reformer", "Boulinq & Bilyard", "Kartinq Klubları"]
        },
        {
            id: "services",
            title: "Məişət xidmətləri",
            icon: `<svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
            items: ["Quru təmizləmə (Ximçistka)", "Ev & Mənzil kliningi", "Ofis təmizliyi", "Məişət texnikası təmiri", "Dərzi & Atelye", "Santexnik & Elektrik"]
        },
        {
            id: "education",
            title: "Təhsil & Kurslar",
            icon: `<svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
            items: ["Bərbər məktəbi", "Vizaj kursları", "Dırnaq ustalığı", "Xarici dillər", "Sürücülük məktəbi", "İT & Dizayn dərsləri"]
        },
        {
            id: "more",
            title: "Zooxidmətlər & Digər",
            icon: `<svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path stroke-linecap="round" stroke-linejoin="round" d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
            items: ["İt & Pişik qrumingi", "Zoomehmanxana", "Baytarlıq müayinəsi", "Fotostudiya", "Videoçəkiliş", "Tədbir təşkili"]
        }
    ],

    // Standard Gallery Generator for Salons (Interior & Works)
    getSalonGallery: function(salonId) {
        const salon = this.salons.find(s => s.id === salonId) || this.salons[0];
        
        if (salon.topCategory === 'barber' || salon.category === 'barber') {
            return [
                { id: 1, type: "interior", title: "Klassik bərbər kresloları və iş zonası", img: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=80" },
                { id: 2, type: "interior", title: "Gözləmə zalı və dəri divanlar", img: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1200&q=80" },
                { id: 3, type: "interior", title: "Baş yuma və relaks zonası", img: "https://images.unsplash.com/photo-1534778356534-d3d45b6df1da?auto=format&fit=crop&w=1200&q=80" },
                { id: 4, type: "works", title: "Low Fade və dəqiq saç kəsimi", img: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=1200&q=80" },
                { id: 5, type: "works", title: "Saqqal dizaynı və isti dəsmal qulluğu", img: "https://images.unsplash.com/photo-1517832606589-715753b0e352?auto=format&fit=crop&w=1200&q=80" },
                { id: 6, type: "works", title: "Klassik kişi stili və pompadour", img: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1200&q=80" }
            ];
        } else if (salon.topCategory === 'health') {
            return [
                { id: 1, type: "interior", title: "Kavo stomatoloji kabinet və avadanlıq", img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80" },
                { id: 2, type: "interior", title: "Sterilizasiya və alət hazırlıq zonası", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80" },
                { id: 3, type: "interior", title: "Qonaq otağı və rəqəmsal rentgen", img: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80" },
                { id: 4, type: "works", title: "Zoom 4 diş ağardılması nəticəsi", img: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=80" },
                { id: 5, type: "works", title: "Estetik keramik vinirlər", img: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=1200&q=80" }
            ];
        } else if (salon.topCategory === 'auto') {
            return [
                { id: 1, type: "interior", title: "Qapalı temperatur-nəzarətli detailing boksu", img: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=1200&q=80" },
                { id: 2, type: "interior", title: "Gözləmə otağı və PlayStation zonası", img: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=1200&q=80" },
                { id: 3, type: "works", title: "3-qat cilalama və 9H keramika parıltısı", img: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80" },
                { id: 4, type: "works", title: "Salonun dəri və buxarla bərpası", img: "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?auto=format&fit=crop&w=1200&q=80" }
            ];
        }

        // Default Beauty Salon Gallery (Cherry Nails, Lash BB, Shynarym)
        return [
            { id: 1, type: "interior", title: "Əsas xanım salonu və stil zonası", img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80" },
            { id: 2, type: "interior", title: "Reception və qonaq üçün çay/kofe barı", img: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=1200&q=80" },
            { id: 3, type: "interior", title: "Manikür və sterilizasiya masaları", img: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1200&q=80" },
            { id: 4, type: "interior", title: "VIP SPA və Pedikür zonası", img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80" },
            { id: 5, type: "works", title: "Fransız manikürü və premium dizayn", img: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=1200&q=80" },
            { id: 6, type: "works", title: "AirTouch və təbii saç rənglənməsi", img: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1200&q=80" },
            { id: 7, type: "works", title: "2D Kirpik qaynağı və qaş memarlığı", img: "https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=1200&q=80" },
            { id: 8, type: "works", title: "Smart pedikür və dəriyə qulluq", img: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=1200&q=80" }
        ];
    },
};
