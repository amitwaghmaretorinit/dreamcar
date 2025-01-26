import Image from "next/image";
import { groq } from 'next-sanity';
import { client } from '@/sanity/lib/client';
import { urlForImage } from '@/sanity/lib/image';
import Link from 'next/link';

async function getCars() {
  const query = groq`*[_type == "car"]{
    _id,
    name,
    price,
    image,
    "slug": slug.current,
    company
  }`
  return await client.fetch<Car[]>(query);
}

export const revalidate = 10; // Revalidate every 10 seconds

export default async function Home() {
  const cars = await getCars();
   return (
    <div className="min-h-screen p-8">
      <main className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Featured Cars</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car: Car) => (
            <Link 
              href={`/${car.slug}`} 
              key={car.slug}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {car.image && (
                <div className="aspect-video relative">
                  <Image
                    src={urlForImage(car.image).url()}
                    alt={car.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{car.name}</h2>
                <p className="text-gray-600 mb-2">{car.company}</p>
                <p className="font-bold">{car.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
