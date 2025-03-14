import React from 'react';
import AdvertisementSlider from '../components/AdvertisementSlider';
import { advertisements } from '../data/advertisements';

const AdvertisementsPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Advertisement Posters</h1>
      <p className="text-gray-600 mb-8">
        Browse through our collection of informative posters promoting economic citizenship and financial awareness.
      </p>
      
      <AdvertisementSlider advertisements={advertisements} />
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">About Our Campaigns</h2>
        <p className="text-gray-700">
          These digital posters represent ongoing campaigns aimed at increasing economic literacy and participation 
          among citizens of all ages. Each campaign focuses on different aspects of economic citizenship, from financial 
          education to sustainable consumption.
        </p>
        <p className="text-gray-700 mt-4">
          If you're interested in using these materials for educational purposes or would like to participate 
          in any of these initiatives, please contact us through our social media channels.
        </p>
      </div>
    </div>
  );
};

export default AdvertisementsPage;
