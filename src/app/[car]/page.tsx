import { groq } from 'next-sanity'
import { client } from '@/sanity/lib/client'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { urlForImage } from '@/sanity/lib/image'
 // ... existing code ...

async function getCarDetails(slug: string): Promise<Car | null> {
    const query = groq`*[_type == "car" && slug.current == $slug][0]{
      _id,
      name,
      price,
      range,
      acceleration,
      description,
      company,
      image
    }`
    
    return await client.fetch<Car>(query, { slug });
  }
  

export async function generateStaticParams() {
  const query = groq`*[_type == "car"]{
    "slug": slug.current
  }`
  const cars = await client.fetch(query)
  return cars.map((car: { slug: string }) => ({
    car: car.slug,
  }))
}

export const revalidate = 10 // Revalidate every hour

export default async function CarPage({ params }: {
    params: { car: string }
  }) {
  const {car} = await params;
  const carDetails = await getCarDetails(car)

  if (!carDetails) {
    notFound()
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{carDetails.name}</h1>
        
        {carDetails.image && (
          <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
            <Image
              src={urlForImage(carDetails.image).url()}
              alt={carDetails.name}
              width={1200}
              height={600}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow text-gray-800">
              <h2 className="text-xl font-semibold mb-2">Specifications</h2>
              <ul className="space-y-2">
                <li><span className="font-medium">Model:</span> {carDetails.model}</li>
                <li><span className="font-medium">Company:</span> {carDetails.company}</li>
                <li><span className="font-medium">Price:</span> {carDetails.price}</li>
                {carDetails.range && (
                  <li><span className="font-medium">Range:</span> {carDetails.range}</li>
                )}
                {carDetails.acceleration && (
                  <li><span className="font-medium">Acceleration:</span> {carDetails.acceleration}</li>
                )}
              </ul>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p>{carDetails.description}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}