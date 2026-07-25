import { useEffect, useState } from "react";
import { cars as staticCars, type Car } from "@/data/cars";
import { listInventory, type InventoryItem } from "@/lib/inventoryStore";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export function inventoryToCar(item: InventoryItem): Car {
  const yearNum = parseInt(item.year, 10);
  const priceNum = parseFloat(String(item.price).replace(/[^\d.]/g, ""));
  const priceLabel = item.price
    ? /[₹l|cr|,]/i.test(item.price)
      ? item.price
      : priceNum >= 100000
        ? `₹${(priceNum / 100000).toFixed(2)} L`
        : `₹${priceNum.toLocaleString("en-IN")}`
    : "";
  const kmLabel = item.km
    ? /km/i.test(item.km)
      ? item.km
      : `${item.km} km`
    : "";
  const primary = item.images?.[0] ?? "";
  const nameParts = item.name || `${item.brand} ${item.model}`.trim();
  return {
    slug: `inv-${slugify(nameParts || item.id)}-${item.id.slice(-6)}`,
    img: primary,
    name: nameParts,
    year: Number.isFinite(yearNum) ? yearNum : new Date().getFullYear(),
    fuel: item.fuel,
    trans: item.trans,
    km: kmLabel,
    price: priceLabel,
    cat: item.cat,
    brand: item.brand,
    model: item.model,
    variant: item.variant,
    color: item.color,
    bodyType: item.bodyType,
    description: item.description,
    gallery: item.images && item.images.length ? item.images : primary ? [primary] : [],
  };
}

export function getAllCars(): Car[] {
  const inv = listInventory()
    .filter((i) => (i.images?.[0] || "").length > 0)
    .map(inventoryToCar);
  return [...inv, ...staticCars];
}

export function getAnyCarBySlug(slug: string): Car | undefined {
  return getAllCars().find((c) => c.slug === slug);
}

export function useAllCars(): Car[] {
  const [list, setList] = useState<Car[]>(() => getAllCars());
  useEffect(() => {
    const reload = () => setList(getAllCars());
    window.addEventListener("storage", reload);
    window.addEventListener("focus", reload);
    return () => {
      window.removeEventListener("storage", reload);
      window.removeEventListener("focus", reload);
    };
  }, []);
  return list;
}