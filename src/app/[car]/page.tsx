import React from 'react';
import { notFound } from 'next/navigation';

interface CarPageProps {
  params: {
    car: string;
  };
}

async function getCarDetails(carId: string) {
  // TODO: Replace with actual API call or database query
  // This is just mock data for demonstration
  const cars = {
    'model-3': {
      name: 'Tesla Model 3',
      price: '$40,240',
      range: '272 miles',
      acceleration: '5.8s 0-60 mph',
      description: 'All-electric sedan with minimalist design and cutting-edge technology.'
    },
    // Add more cars as needed
  };

  return cars[carId as keyof typeof cars];
}

export default async function CarPage({ params }: CarPageProps) {
  const carDetails = await getCarDetails(params.car);

  if (!carDetails) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{carDetails.name}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2">Specifications</h2>
              <ul className="space-y-2">
                <li><span className="font-medium">Price:</span> {carDetails.price}</li>
                <li><span className="font-medium">Range:</span> {carDetails.range}</li>
                <li><span className="font-medium">Acceleration:</span> {carDetails.acceleration}</li>
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
  );
}