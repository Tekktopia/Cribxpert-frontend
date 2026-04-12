import React from 'react';
import Hero from './Hero';

// Hero carousel images array
const heroImages = [
  '/images/apartment2.jpg',
  '/images/hero-image.jpeg',
  '/images/apartment3.jpg',
];

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full">
      <Hero
        images={heroImages}
        title="Where Comfort Meets Convenience"
        subtitle="From cozy apartment to luxury spaces, find and book your perfect home away from home"
        buttonText="Discover"
        buttonLink="/discover"
      />
    </section>
  );
};

export default HeroSection;
