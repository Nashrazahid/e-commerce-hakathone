import React from 'react';
import Link from "next/link";



function Heroblock() {
  return (
    <div>
      <nav>
        <ul className="flex justify-center gap-9 text-gray-600">
          <li className="hidden sm:block">plant pots</li>
          <li className="hidden sm:block">ceramics</li>
          <li className="hidden sm:block">Tables</li>
          <li className="hidden sm:block">chairs</li>
          <li>crockery</li>
          <li>tableware</li>
          <li>
            <Link href="/about">about</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}



export default Heroblock