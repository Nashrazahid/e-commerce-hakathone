import React from 'react';
import Link from "next/link";

function Heroblock() {
  return (
    <div>
        <ul className='justify-center hidden  sm:flex gap-9 text-gray-600'>
        <li>plant pots</li>
        <li>caramics</li>
        <li>Tables</li>
        <li>chairs</li>
        <li>crocery</li>
        <li>tableware</li>
   <Link href="/about"><li>about</li></Link>        
        </ul>
    </div>
  )
}

export default Heroblock