import React from 'react';
import Hero from '@/components/common/Hero';

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
        title="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
        subtitle="Find Everything You Love, at Prices You'll Adore – Shop Now and Save Big."
        buttonText="Shop Now"
        buttonLink="/discover"
      />
    </section>
  );
};

export default HeroSection;
