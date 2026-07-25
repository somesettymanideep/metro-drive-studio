import { useEffect, useState } from "react";
import { cars as staticCars, type Car } from "@/data/cars";
import {
  listInventory,
  listInventoryRemote,
  type InventoryItem,
} from "@/lib/inventoryStore";

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
  const primary = item.images?.[0] || staticCars[0]?.img || "";
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
  const inv = listInventory().map(inventoryToCar);
  return [...inv, ...staticCars];
}

export async function getAllCarsRemote(): Promise<Car[]> {
  const inv = await listInventoryRemote();
  return [...inv.map(inventoryToCar), ...staticCars];
}

export function getAnyCarBySlug(slug: string): Car | undefined {
  return getAllCars().find((c) => c.slug === slug);
}

export async function getAnyCarBySlugRemote(slug: string): Promise<Car | undefined> {
  const cars = await getAllCarsRemote();
  return cars.find((c) => c.slug === slug) ?? getAnyCarBySlug(slug);
}

export function useAllCars(): Car[] {
  const [list, setList] = useState<Car[]>(() => getAllCars());
  useEffect(() => {
    let mounted = true;
    const reload = async () => {
      setList(getAllCars());
      try {
        const remote = await getAllCarsRemote();
        if (mounted) setList(remote);
      } catch {
        if (mounted) setList(getAllCars());
      }
    };
    void reload();
    window.addEventListener("storage", reload);
    window.addEventListener("focus", reload);
    window.addEventListener("metro-inventory-updated", reload);
    return () => {
      mounted = false;
      window.removeEventListener("storage", reload);
      window.removeEventListener("focus", reload);
      window.removeEventListener("metro-inventory-updated", reload);
    };
  }, []);
  return list;
}