import { createContext, createSignal, useContext } from "solid-js";
import { BiSolidMapPin, BiSolidData, BiRegularImages, BiSolidFileExport, BiSolidPlusCircle } from 'solid-icons/bi'
import { FaSolidRoute, FaSolidDrawPolygon } from 'solid-icons/fa'

import ExifImage from "~/interfaces/ExifImage";


interface AppState {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
    listItems: Array<{ href: string; icon: any; label: string }>;
    subNavItems: Array<{ href: string; icon: any; label: string }>;
    imageList: Array<ExifImage>;
  }
  
const initialState: AppState = {
    isSidebarOpen: true,
    toggleSidebar: () => {},
    listItems: [
        { href: "/", icon: <BiSolidMapPin size={24} />, label: "Map" },
        { href: "/data", icon: <BiSolidData size={24}  />, label: "Data" },
        { href: "#", icon: <BiRegularImages size={24}  />, label: "Image Lab" },
        { href: "#", icon: <BiSolidFileExport size={24}  />, label: "Export" },
    ],
    subNavItems: [
        { href: "#", icon: <BiSolidPlusCircle size={24} />, label: "Add Image(s)" },
        { href: "#", icon: <FaSolidRoute size={24} />, label: "Create Route" },
        { href: "#", icon: <FaSolidDrawPolygon size={24} />, label: "Create Zone" },
    ],
    imageList: [
        {
            name: "My Image", 
            path: "https://picsum.photos/200/300", 
            exifData: {
                size: "200x300", 
                date: "2021-09-01", 
                tags: ["tag1", "tag2"],
                latitude: 39.7589,
                longitude: -84.1916,
            }
        },
        {
            name: "Another Image", 
            path: "https://picsum.photos/200/300", 
            exifData: {
                size: "200x300", 
                date: "2021-09-02", 
                tags: ["tag3", "tag4"],
                latitude: 40.7589,
                longitude: -84.1916,
            }
        },
        {
            name: "Third Image", 
            path: "https://picsum.photos/200/300", 
            exifData: {
                size: "200x300", 
                date: "2021-09-03", 
                tags: ["tag5", "tag6"],
                latitude: 40.7589,
                longitude: -84.1916,
                
            }
        },
        {
            name: "Fourth Image", 
            path: "https://picsum.photos/200/300", 
            exifData: {
                size: "200x300", 
                date: "2021-09-04", 
                tags: ["tag7", "tag8"],
                latitude: 39.7589,
                longitude: -84.1216,
            }
        },
        {
            name: "Fifth Image", 
            path: "https://picsum.photos/200/300",
            exifData: {
                size: "200x300", 
                date: "2021-09-05", 
                tags: ["tag9", "tag10"],
                latitude: 40.7530,
                longitude: -84.1540,
            } 
        },
        
    ]
};

interface Props {
    children: any;
};

const AppStateContext = createContext<AppState>(initialState);
  
export function AppState(props: Props) {
    const [isSidebarOpen, setIsSidebarOpen] = createSignal(initialState.isSidebarOpen);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen());
    };

    const state: AppState = {
        isSidebarOpen: isSidebarOpen(),
        toggleSidebar,
        listItems: initialState.listItems,
        subNavItems: initialState.subNavItems,
        imageList: initialState.imageList
    };

    return <AppStateContext.Provider value={state}>{props.children}</AppStateContext.Provider>;
}

export const useAppState = () => useContext(AppStateContext);