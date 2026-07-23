import carSedan from "@/assets/car-sedan.jpg";
import carSuv from "@/assets/car-suv.jpg";
import carHatch from "@/assets/car-hatch.jpg";
import carLuxury from "@/assets/car-luxury.jpg";
import carInnova from "@/assets/car-innova.jpg";
import carKia from "@/assets/car-kia.jpg";
import venue1 from "@/assets/car-venue-1.jpg";
import venue2 from "@/assets/car-venue-2.jpg";
import venue3 from "@/assets/car-venue-3.jpg";
import venue4 from "@/assets/car-venue-4.jpg";
import venue5 from "@/assets/car-venue-5.jpg";
import venue6 from "@/assets/car-venue-6.jpg";
import wagonr1 from "@/assets/car-wagonr-1.jpg";
import wagonr2 from "@/assets/car-wagonr-2.jpg";
import wagonr3 from "@/assets/car-wagonr-3.jpg";
import wagonr4 from "@/assets/car-wagonr-4.jpg";
import wagonr5 from "@/assets/car-wagonr-5.jpg";
import venue7 from "@/assets/car-venue-7.jpg";
import tiagoFront from "@/assets/car-tiago-front.jpg.asset.json";
import tiagoRear from "@/assets/car-tiago-rear.jpg.asset.json";
import tiagoSideLeft from "@/assets/car-tiago-side-left.jpg.asset.json";
import tiagoSideRight from "@/assets/car-tiago-side-right.jpg.asset.json";
import tiagoInterior from "@/assets/car-tiago-interior.jpg.asset.json";
import xuv500 from "@/assets/car-xuv500.jpg";
import hondaVx from "@/assets/car-honda-vx.jpg";
import ecosport from "@/assets/car-ecosport.jpg";
import bmwX1 from "@/assets/car-bmw-x1.jpg";
import xl6 from "@/assets/car-xl6.jpg";
import audiQ3 from "@/assets/car-audi-q3.jpg";




export type Car = {
  slug: string;
  img: string;
  name: string;
  year: number;
  fuel: string;
  trans: string;
  km: string;
  price: string;
  cat: string;
  // details
  brand?: string;
  model?: string;
  variant?: string;
  color?: string;
  owners?: string;
  registration?: string;
  engine?: string;
  mileage?: string;
  bodyType?: string;
  insurance?: string;
  description?: string;
  highlights?: string[];
  features?: string[];
  gallery?: string[];
};

export const cars: Car[] = [
  {
    slug: "hyundai-venue-s-o",
    img: venue7,
    name: "Hyundai Venue S(O)",
    year: 2022,
    fuel: "Petrol",
    trans: "Manual",
    km: "1,07,000 km",
    price: "₹7.80 L",
    cat: "SUV",
    brand: "Hyundai",
    model: "Venue",
    variant: "S(O) Petrol MT",
    color: "White",
    bodyType: "Compact SUV",

    description:
      "Well-maintained Hyundai Venue S(O) petrol variant. Spacious compact SUV with modern features, comfortable interiors and excellent fuel efficiency. Perfect for city driving and highway cruising.",
    gallery: [venue7, venue1, venue2, venue3, venue4, venue5, venue6],
  },
  {
    slug: "maruti-wagonr-2024",
    img: wagonr5,
    name: "Maruti Suzuki WagonR",
    year: 2024,
    fuel: "Petrol",
    trans: "Automatic",
    km: "27,000 km",
    price: "₹6.25 L",
    cat: "Hatchback",
    brand: "Maruti Suzuki",
    model: "WagonR",
    variant: "Petrol AMT",
    bodyType: "Hatchback",
    description:
      "Almost new 2024 Maruti Suzuki WagonR petrol automatic. Spacious cabin, excellent mileage and easy city driving with AMT transmission. Well-maintained with low kilometres.",
    gallery: [wagonr5, wagonr1, wagonr2, wagonr3, wagonr4],
  },
  {
    slug: "tata-tiago-ev-xt-lr",
    img: tiagoFront.url,
    name: "Tata Tiago EV XT Long Range",
    year: 2023,
    fuel: "Electric",
    trans: "Automatic",
    km: "26,000 km",
    price: "₹6.80 L",
    cat: "Hatchback",
    brand: "Tata",
    model: "Tiago EV",
    variant: "XT Long Range",
    bodyType: "Electric Hatchback",
    description:
      "Tata Tiago EV XT Long Range — zero emissions, low running cost and modern EV features. Well maintained with low kilometres.",
    gallery: [tiagoFront.url, tiagoSideRight.url, tiagoSideLeft.url, tiagoRear.url, tiagoInterior.url],
  },
  {
    slug: "mahindra-xuv-500-2019",
    img: xuv500,
    name: "Mahindra XUV 500",
    year: 2019,
    fuel: "Diesel",
    trans: "Manual",
    km: "—",
    price: "₹9.20 L",
    cat: "SUV",
    brand: "Mahindra",
    model: "XUV 500",
    variant: "Diesel MT",
    bodyType: "SUV",
    description:
      "Powerful Mahindra XUV 500 diesel with manual transmission. Spacious 7-seater SUV ideal for family and highway trips.",
    gallery: [xuv500],
  },
  {
    slug: "honda-city-vx-2024",
    img: hondaVx,
    name: "Honda City VX",
    year: 2024,
    fuel: "Petrol",
    trans: "Automatic",
    km: "35,000 km",
    price: "₹8.50 L",
    cat: "Sedan",
    brand: "Honda",
    model: "City",
    variant: "VX Petrol AT",
    bodyType: "Sedan",
    description:
      "Premium Honda City VX petrol automatic — refined ride, feature-loaded cabin and excellent build quality.",
    gallery: [hondaVx],
  },
  {
    slug: "ford-ecosport-2016",
    img: ecosport,
    name: "Ford EcoSport",
    year: 2016,
    fuel: "Petrol",
    trans: "Automatic",
    km: "—",
    price: "₹5.20 L",
    cat: "SUV",
    brand: "Ford",
    model: "EcoSport",
    variant: "Petrol AT",
    bodyType: "Compact SUV",
    description:
      "Ford EcoSport petrol automatic — solid build, comfortable ride and easy city driving.",
    gallery: [ecosport],
  },
  {
    slug: "bmw-x1-2017",
    img: bmwX1,
    name: "BMW X1",
    year: 2017,
    fuel: "Diesel",
    trans: "Automatic",
    km: "—",
    price: "₹13.50 L",
    cat: "Luxury",
    brand: "BMW",
    model: "X1",
    variant: "Diesel AT",
    bodyType: "Luxury SUV",
    description:
      "BMW X1 diesel automatic — luxury SUV with premium interiors, powerful performance and iconic BMW handling.",
    gallery: [bmwX1],
  },
  {
    slug: "maruti-suzuki-xl6-2021",
    img: xl6,
    name: "Maruti Suzuki XL6",
    year: 2021,
    fuel: "Petrol",
    trans: "Manual",
    km: "—",
    price: "₹9.50 L",
    cat: "SUV",
    brand: "Maruti Suzuki",
    model: "XL6",
    variant: "Petrol MT",
    bodyType: "MPV",
    description:
      "Maruti Suzuki XL6 petrol manual — premium 6-seater MPV with captain seats and comfortable ride.",
    gallery: [xl6],
  },
  {
    slug: "audi-q3-2016",
    img: audiQ3,
    name: "Audi Q3",
    year: 2016,
    fuel: "Diesel",
    trans: "Automatic",
    km: "—",
    price: "₹13.00 L",
    cat: "Luxury",
    brand: "Audi",
    model: "Q3",
    variant: "Diesel AT",
    bodyType: "Luxury SUV",
    description:
      "Audi Q3 diesel automatic — refined luxury SUV with quattro capability, premium interiors and effortless power delivery.",
    gallery: [audiQ3],
  },
];


export const getCarBySlug = (slug: string) => cars.find((c) => c.slug === slug);
