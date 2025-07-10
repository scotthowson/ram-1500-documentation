import React, { useState } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';

const FeatureList = [
  {
    title: 'Comprehensive Build Guides',
    Svg: require('@site/static/img/dodge-ram-1500-logo-svg-vector.svg').default,
    description: (
      <>
        Detailed step-by-step instructions covering performance upgrades, mechanical mods, and custom 3D printed parts tailored for the RAM 1500 5.7L HEMI 2011 Laramie Longhorn.
      </>
    ),
  },
  {
    title: '3D Print Files & Settings',
    Svg: require('@site/static/img/3d_printing.svg').default,
    description: (
      <>
        Download ready-to-print 3D models with recommended materials, print settings, and installation notes to get your parts perfect every time.
      </>
    ),
  },
  {
    title: 'Community Support & Collaboration',
    Svg: require('@site/static/img/community.svg').default,
    description: (
      <>
        Connect with others working on similar builds, share ideas, troubleshoot, and collaborate on improving the RAM 1500 mod ecosystem.
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={clsx('col col--4')}>
      <div 
        className="feature-card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          padding: '2rem 1rem',
          borderRadius: '8px',
          transition: 'all 0.3s ease',
          transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
          boxShadow: isHovered ? '0 10px 25px rgba(0,0,0,0.1)' : '0 2px 4px rgba(0,0,0,0.05)',
          backgroundColor: 'var(--ifm-background-color)',
          border: '1px solid var(--ifm-color-emphasis-300)',
        }}
      >
        <div className="text--center">
          <div 
            style={{
              display: 'inline-block',
              transition: 'transform 0.3s ease',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            }}
          >
            <Svg 
              style={{
                height: '200px',
                width: '200px',
                filter: isHovered ? 'brightness(1.1)' : 'brightness(1)',
                transition: 'filter 0.3s ease',
              }}
              role="img" 
            />
          </div>
        </div>
        <div className="text--center padding-horiz--md">
          <Heading 
            as="h3"
            style={{
              marginBottom: '1rem',
              color: 'var(--ifm-color-emphasis-800)',
              transition: 'color 0.3s ease',
            }}
          >
            {title}
          </Heading>
          <p 
            style={{
              color: 'var(--ifm-color-emphasis-600)',
              lineHeight: '1.6',
              fontSize: '0.95rem',
            }}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section 
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '4rem 0',
        width: '100%',
        backgroundColor: 'var(--ifm-background-surface-color)',
      }}
    >
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}