import type {LucideIcon} from "lucide-react";

declare interface MenuItem {
    label: string;
    path: string;
}

declare interface Categories {
    icon: LucideIcon;
    label: string;
    active?: boolean;
}

declare interface BeautyCategory {
    name: string;
    image: string;
}

declare interface BeautyServiceCardProps {
    item: {
        name: string;
        image: string;
        address: string;
        rating: number;
        category: string;
        reviews: number;
        services: {
            name: string;
            price: number;
        }[];
        availableTimes: string[];
    };
}

declare type Partner = {
    id: number;
    name: string;
    logo: string;
    rating: number;
    meta: string;
};

declare type Master = {
    id: number;
    name: string;
    role: string;
    salon: string;
    rating: number;
    avatar: string;
};
