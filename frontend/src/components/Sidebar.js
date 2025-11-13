"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    HomeIcon,
    PlusIcon,
    FileTextIcon,
    PersonIcon,
    CalendarIcon,
    ExitIcon,
    PersonIcon as UserIcon
} from "@radix-ui/react-icons";
import { apiService } from "@/services/api";
import { useState, useEffect } from "react";

const navigationItems = [
    {
        name: "Tableau de bord",
        href: "/",
        icon: HomeIcon,
    },
    {
        name: "Créer une intervention",
        href: "/create-intervention",
        icon: PlusIcon,
    },
    {
        name: "Créer un projet",
        href: "/create-projet",
        icon: FileTextIcon,
    },
    {
        name: "Créer un salarié",
        href: "/create-salarie",
        icon: PersonIcon,
    },
    {
        name: "Créer un client",
        href: "/create-client",
        icon: PersonIcon,
    },
    {
        name: "Créer un matériel",
        href: "/create-materiel",
        icon: PlusIcon,
    },
    {
        name: "Planning salariés",
        href: "/employee-schedule",
        icon: CalendarIcon,
    },
    {
        name: "Vue projets",
        href: "/project-overview",
        icon: FileTextIcon,
    },
];

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const currentUser = apiService.getUser();
        setUser(currentUser);
    }, []);

    const handleLogout = () => {
        apiService.logout();
        router.push('/login');
    };

    return (
        <div className="w-64 bg-gray-900 text-white h-full flex flex-col">
            {/* Logo/Header */}
            <div className="p-6 border-b border-gray-700">
                <h1 className="text-xl font-bold flex items-center gap-2">
                    <CalendarIcon className="w-6 h-6" />
                    Gestion BTP
                </h1>
                <p className="text-gray-400 text-sm mt-1">Interventions</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    {navigationItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                        ? "bg-blue-600 text-white"
                                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span className="text-sm font-medium">{item.name}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* User info and logout */}
            <div className="mt-auto p-4 border-t border-gray-700">
                {user && (
                    <div className="mb-4">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                <UserIcon className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-white">
                                    {user.prenom} {user.nom}
                                </p>
                                <p className="text-xs text-gray-400 capitalize">
                                    {user.role?.toLowerCase()}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
                >
                    <ExitIcon className="w-4 h-4" />
                    <span className="text-sm">Déconnexion</span>
                </button>

                <p className="text-xs text-gray-400 text-center mt-4">
                    © 2024 Gestion BTP
                </p>
            </div>
        </div>
    );
}