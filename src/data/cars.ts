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
import xuvFront from "@/assets/car-xuv500-front.jpg.asset.json";
import xuvSideRight from "@/assets/car-xuv500-side-right.jpg.asset.json";
import xuvSideLeft from "@/assets/car-xuv500-side-left.jpg.asset.json";
import xuvRear from "@/assets/car-xuv500-rear.jpg.asset.json";
import xuvDashboard from "@/assets/car-xuv500-dashboard.jpg.asset.json";
import xuvInterior from "@/assets/car-xuv500-interior.jpg.asset.json";
import amazeFront from "@/assets/amaze1-front.jpeg.asset.json";
import amazeSide from "@/assets/amaze2-side.jpeg.asset.json";
import amazeDash from "@/assets/amaze3-dash.jpeg.asset.json";
import amazeInterior from "@/assets/amaze4-interior.jpeg.asset.json";
import amazeRearSeats from "@/assets/amaze5-rear-seats.jpeg.asset.json";
import ecosportFront from "@/assets/ecosport1-front.jpeg.asset.json";
import ecosportSideRight from "@/assets/ecosport2-side-right.jpeg.asset.json";
import ecosportSideLeft from "@/assets/ecosport3-side-left.jpeg.asset.json";
import ecosportRear from "@/assets/ecosport4-rear.jpeg.asset.json";
import ecosportDash from "@/assets/ecosport5-dash.jpeg.asset.json";
import ecosportInterior from "@/assets/ecosport6-interior.jpeg.asset.json";
import bmwX1Front from "@/assets/bmwx1-1-front.jpeg.asset.json";
import bmwX1SideRight from "@/assets/bmwx1-2-side-right.jpeg.asset.json";
import bmwX1SideLeft from "@/assets/bmwx1-3-side-left.jpeg.asset.json";
import bmwX1Rear from "@/assets/bmwx1-4-rear.jpeg.asset.json";
import bmwX1Dash from "@/assets/bmwx1-5-dash.jpeg.asset.json";
import bmwX1Interior from "@/assets/bmwx1-6-interior.jpeg.asset.json";
import xl6Front from "@/assets/xl6-front.jpeg.asset.json";
import xl6Side1 from "@/assets/xl6-side1.jpeg.asset.json";
import xl6Side2 from "@/assets/xl6-side2.jpeg.asset.json";
import xl6Interior from "@/assets/xl6-interior.jpeg.asset.json";
import xl6RearSeats from "@/assets/xl6-rear-seats.jpeg.asset.json";
import xl6Rear from "@/assets/xl6-rear.jpeg.asset.json";
import audiQ3Front from "@/assets/audiq3-1-front.jpeg.asset.json";
import audiQ3Side from "@/assets/audiq3-2-side.jpeg.asset.json";
import audiQ3Dash from "@/assets/audiq3-3-dash.jpeg.asset.json";
import audiQ3RearSeats from "@/assets/audiq3-4-rear-seats.jpeg.asset.json";
import mgHector2021 from "@/assets/mg-hector-2021.jpg";
import toyotaUrbanCruiser2024 from "@/assets/toyota-urban-cruiser-2024.jpg";
import tharRoxx2024 from "@/assets/thar-roxx-2024.jpg";
import hyundaiCreta2022 from "@/assets/hyundai-creta-2022.jpg";



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
    img: xuvFront.url,
    name: "Mahindra XUV 500",
    year: 2019,
    fuel: "Diesel",
    trans: "Manual",
    km: "1,23,000 km",
    price: "₹9.20 L",
    cat: "SUV",
    brand: "Mahindra",
    model: "XUV 500",
    variant: "Diesel MT",
    bodyType: "SUV",
    description:
      "Powerful Mahindra XUV 500 diesel with manual transmission. Spacious 7-seater SUV ideal for family and highway trips.",
    gallery: [xuvFront.url, xuvSideRight.url, xuvSideLeft.url, xuvRear.url, xuvDashboard.url, xuvInterior.url],
  },
  {
    slug: "honda-amaze-2024",
    img: amazeFront.url,
    name: "Honda Amaze",
    year: 2024,
    fuel: "Petrol",
    trans: "Automatic",
    km: "35,000 km",
    price: "₹8.50 L",
    cat: "Sedan",
    brand: "Honda",
    model: "Amaze",
    variant: "VX Petrol CVT",
    bodyType: "Sedan",
    description:
      "Premium Honda Amaze petrol automatic — refined ride, feature-loaded cabin and excellent build quality.",
    gallery: [amazeFront.url, amazeSide.url, amazeDash.url, amazeInterior.url, amazeRearSeats.url],
  },
  {
    slug: "ford-ecosport-2016",
    img: ecosportFront.url,
    name: "Ford EcoSport",
    year: 2016,
    fuel: "Petrol",
    trans: "Automatic",
    km: "67,000 km",
    price: "₹5.20 L",
    cat: "SUV",
    brand: "Ford",
    model: "EcoSport",
    variant: "Petrol AT",
    bodyType: "Compact SUV",
    description:
      "Ford EcoSport petrol automatic — solid build, comfortable ride and easy city driving.",
    gallery: [ecosportFront.url, ecosportSideRight.url, ecosportSideLeft.url, ecosportRear.url, ecosportDash.url, ecosportInterior.url],
  },
  {
    slug: "bmw-x1-2017",
    img: bmwX1Front.url,
    name: "BMW X1",
    year: 2017,
    fuel: "Diesel",
    trans: "Automatic",
    km: "1,05,000 km",
    price: "₹13.50 L",
    cat: "Luxury",
    brand: "BMW",
    model: "X1",
    variant: "Diesel AT",
    bodyType: "Luxury SUV",
    description:
      "BMW X1 diesel automatic — luxury SUV with premium interiors, powerful performance and iconic BMW handling.",
    gallery: [bmwX1Front.url, bmwX1SideRight.url, bmwX1SideLeft.url, bmwX1Rear.url, bmwX1Dash.url, bmwX1Interior.url],
  },
  {
    slug: "maruti-suzuki-xl6-2021",
    img: xl6Front.url,
    name: "Maruti Suzuki XL6",
    year: 2021,
    fuel: "Petrol",
    trans: "Manual",
    km: "84,000 km",
    price: "₹9.50 L",
    cat: "SUV",
    brand: "Maruti Suzuki",
    model: "XL6",
    variant: "Petrol MT",
    bodyType: "MPV",
    description:
      "Maruti Suzuki XL6 petrol manual — premium 6-seater MPV with captain seats and comfortable ride.",
    gallery: [xl6Front.url, xl6Side1.url, xl6Side2.url, xl6Interior.url, xl6RearSeats.url, xl6Rear.url],
  },
  {
    slug: "audi-q3-2016",
    img: audiQ3Front.url,
    name: "Audi Q3",
    year: 2016,
    fuel: "Diesel",
    trans: "Automatic",
    km: "1,09,000 km",
    price: "₹13.00 L",
    cat: "Luxury",
    brand: "Audi",
    model: "Q3",
    variant: "Diesel AT",
    bodyType: "Luxury SUV",
    description:
      "Audi Q3 diesel automatic — refined luxury SUV with quattro capability, premium interiors and effortless power delivery.",
    gallery: [audiQ3Front.url, audiQ3Side.url, audiQ3Dash.url, audiQ3RearSeats.url],
  },
  {
    slug: "mg-hector-2021",
    img: mgHector2021,
    name: "MG Hector",
    year: 2021,
    fuel: "Diesel",
    trans: "Manual",
    km: "55,000 km",
    price: "₹13.00 L",
    cat: "SUV",
    brand: "MG",
    model: "Hector",
    variant: "Diesel MT",
    color: "Grey",
    bodyType: "SUV",
    description:
      "Premium MG Hector diesel manual — spacious SUV with modern features, comfortable cabin and powerful performance.",
    gallery: [mgHector2021],
  },
  {
    slug: "toyota-urban-cruiser-hyryder-2024",
    img: toyotaUrbanCruiser2024,
    name: "Toyota Urban Cruiser Hyryder",
    year: 2024,
    fuel: "Diesel",
    trans: "Automatic",
    km: "28,000 km",
    price: "₹13.00 L",
    cat: "SUV",
    brand: "Toyota",
    model: "Urban Cruiser Hyryder",
    variant: "Diesel AT",
    color: "White",
    bodyType: "SUV",
    description:
      "Toyota Urban Cruiser Hyryder diesel automatic — feature-loaded SUV with refined ride quality and premium comfort.",
    gallery: [toyotaUrbanCruiser2024],
  },
  {
    slug: "thar-roxx-2024",
    img: tharRoxx2024,
    name: "Mahindra Thar Roxx",
    year: 2024,
    fuel: "Diesel",
    trans: "Automatic",
    km: "22,000 km",
    price: "₹19.50 L",
    cat: "SUV",
    brand: "Mahindra",
    model: "Thar Roxx",
    variant: "Diesel AT Sunroof",
    color: "Black",
    bodyType: "SUV",
    description:
      "Mahindra Thar Roxx diesel automatic with sunroof — iconic off-road capability paired with modern features and open-air driving.",
    gallery: [tharRoxx2024],
  },
  {
    slug: "hyundai-creta-2022",
    img: hyundaiCreta2022,
    name: "Hyundai Creta",
    year: 2022,
    fuel: "Petrol",
    trans: "Manual",
    km: "48,000 km",
    price: "₹6.00 L",
    cat: "SUV",
    brand: "Hyundai",
    model: "Creta",
    variant: "Petrol MT",
    color: "Silver",
    bodyType: "SUV",
    description:
      "Hyundai Creta petrol manual — stylish compact SUV with premium features, comfortable ride and excellent city manners.",
    gallery: [hyundaiCreta2022],
  },
];


export const getCarBySlug = (slug: string) => cars.find((c) => c.slug === slug);
