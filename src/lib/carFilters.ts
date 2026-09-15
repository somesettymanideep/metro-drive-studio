export function isCarRemoved(item: {
  id?: string;
  name?: string;
  model?: string;
  slug?: string;
  brand?: string;
}): boolean {
  if (item.id === "b833839a-79cf-445f-9cbc-7cdbf67dbcf2") return true;
  const name = (item.name || "").toLowerCase().trim();
  const model = (item.model || "").toLowerCase().trim();
  const slug = (item.slug || "").toLowerCase().trim();

  // Tata Safari Storme VX (Old removed 2018 10.50L listing reg 0444)
  if (slug === "tata-safari-storme-vx-2018") {
    return true;
  }

  // Other vehicles removed by user request
  if (
    name.includes("safari 7s") ||
    model.includes("safari 7s") ||
    slug.includes("safari-7s") ||
    slug.includes("safari-75")
  ) {
    return true;
  }
  if (name.includes("tiago") || model.includes("tiago") || slug.includes("tiago")) {
    return true;
  }
  if (name.includes("aura") || model.includes("aura") || slug.includes("aura")) {
    return true;
  }
  if (name.includes("hyryder") || model.includes("hyryder") || slug.includes("hyryder")) {
    return true;
  }
  if (name.includes("tiguan") || model.includes("tiguan") || slug.includes("tiguan")) {
    return true;
  }
  if (name.includes("dzire zxi taxi") || slug.includes("dzire-zxi-taxi")) {
    return true;
  }
  if (
    slug === "tata-altroz-xz-2024" ||
    slug === "tata-altroz-xz-plus-cng-2023"
  ) {
    return true;
  }
  if (slug === "maruti-suzuki-brezza-zxi-plus-at-2022-4356") {
    return true;
  }
  if (slug === "hyundai-creta-1-5-e-diesel-2022") {
    return true;
  }
  if (slug === "hyundai-venue-s-o") {
    return true;
  }
  if (slug === "maruti-suzuki-xl6-zeta-2021") {
    return true;
  }
  if (slug === "honda-city-v-cvt-2019") {
    return true;
  }
  if (slug === "maruti-suzuki-ertiga-zxi-plus-2024") {
    return true;
  }

  return false;
}
