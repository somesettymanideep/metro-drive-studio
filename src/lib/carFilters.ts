export function isCarRemoved(item: {
  id?: string;
  name?: string;
  model?: string;
  slug?: string;
  brand?: string;
}): boolean {
  if (
    item.id === "b833839a-79cf-445f-9cbc-7cdbf67dbcf2" ||
    item.id === "2526bc04-add7-4b66-b73d-29dd091486da"
  ) {
    return true;
  }
  const name = (item.name || "").toLowerCase().trim();
  const model = (item.model || "").toLowerCase().trim();
  const slug = (item.slug || "").toLowerCase().trim();

  // Hyundai i20 Asta (2018 Diesel MT, 80,324 km, ₹6.50 L)
  if (
    slug === "hyundai-i20-asta-2018" ||
    slug.includes("i20-asta") ||
    (name.includes("i20") && name.includes("asta")) ||
    (model.includes("i20") && name.includes("asta"))
  ) {
    return true;
  }

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
  if (
    (name.includes("tiago") || model.includes("tiago") || slug.includes("tiago")) &&
    !slug.includes("9549")
  ) {
    return true;
  }
  if (
    (name.includes("aura") || model.includes("aura") || slug.includes("aura")) &&
    !slug.includes("1142")
  ) {
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
  if (slug === "mg-zs-ev-exclusive-plus-2024") {
    return true;
  }
  if (
    slug === "maruti-suzuki-brezza-vxi-2022-7879" ||
    slug === "maruti-suzuki-brezza-zxi-plus-2022-2580" ||
    slug === "toyota-innova-crysta-2-4-z-2020-1899" ||
    slug === "skoda-kodiaq-lk-4x4-2019-8118" ||
    slug === "hyundai-tucson-gls-4wd-2018" ||
    slug === "maruti-suzuki-wagonr-vxi-o-2017-0540" ||
    slug === "hyundai-creta-1-4-s-plus-diesel-2016" ||
    slug === "toyota-innova-2-5-v-2013-2448"
  ) {
    return true;
  }

  return false;
}
