
import { Outlet } from "react-router";
import BottomNavbar from "@/components/layout/BottomNavbar";
import Header from "./header";
import Footer from "./footer";
import { useCallback, useState } from "react";
import CityDialog from "@/components/common/CityDialog";
import { CityPickerContext } from "@/features/location/city-picker-context";
import { useLocationCity } from "@/features/location/useLocationCity";

export default function MainLayout() {
    const [cityDialogOpen, setCityDialogOpen] = useState(false);
    const { city, setCity } = useLocationCity();
    const openCityPicker = useCallback(() => setCityDialogOpen(true), []);
    return (
        <CityPickerContext.Provider value={openCityPicker}><div className="flex min-h-screen flex-col">
            <Header />

            <main className="flex-1 bg-second">
                <Outlet />
            </main>

            <Footer />

            <BottomNavbar />
            <CityDialog open={cityDialogOpen} onOpenChange={setCityDialogOpen} selectedCity={city} onSelectCity={setCity} />
        </div></CityPickerContext.Provider>
    );
}
