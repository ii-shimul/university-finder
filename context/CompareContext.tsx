"use client";

import { createContext, useContext, useState } from "react";
import { University } from "@/types/types";

interface CompareContextType {
	selected: University[];
	toggleCompare: (university: University) => void;
	isSelected: (id: number) => boolean;
	clearAll: () => void;
}

const CompareContext = createContext<CompareContextType | null>(null);

export function CompareProvider({ children }: { children: React.ReactNode }) {
	const [selected, setSelected] = useState<University[]>([]);

	const toggleCompare = (university: University) => {
		setSelected((prev) => {
			// if already selected, remove it
			if (prev.some((u) => u.id === university.id)) {
				return prev.filter((u) => u.id !== university.id);
			}
			// if already have 2 selected, don't add more
			if (prev.length >= 2) return prev;
			// add the university
			return [...prev, university];
		});
	};

	const isSelected = (id: number) => selected.some((u) => u.id === id);

	const clearAll = () => setSelected([]);

	return (
		<CompareContext.Provider
			value={{ selected, toggleCompare, isSelected, clearAll }}
		>
			{children}
		</CompareContext.Provider>
	);
}

export function useCompare() {
	const context = useContext(CompareContext);
	if (!context)
		throw new Error("useCompare must be used inside CompareProvider");
	return context;
}
