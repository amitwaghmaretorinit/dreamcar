import { groq } from 'next-sanity'
import { client } from '@/sanity/lib/client'

export async function getCars(): Promise<Car[]> {
  const query = groq`*[_type == "car"]{
    _id,
    name,
    price,
    image,
    "slug": slug.current,
    company
  }`
  return await client.fetch<Car[]>(query)
}

export async function getCarDetails(slug: string): Promise<Car | null> {
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
  
  return await client.fetch<Car>(query, { slug })
}

export async function getAllCarSlugs() {
  const query = groq`*[_type == "car"]{
    "slug": slug.current
  }`
  return await client.fetch(query)
} 