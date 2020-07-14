import React from 'react';
import Link from 'next/link';

function Home() {
  return (
    <div>
      <h1>Search App</h1>
      <Link href="/location-finder">
        <a>Location Finder</a>
      </Link>
      <br />
      <Link href="/events-search">
        <a>Events Search</a>
      </Link>
    </div>
  );
}

export default Home;
