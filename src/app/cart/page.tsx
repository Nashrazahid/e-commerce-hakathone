import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

function page() {
  return (
    <div className="p-9">
      <h1 className="text-3xl p-9">Your shopping cart</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px] text-left">Product</TableHead>
            <TableHead className="text-right w-[150px]">Quantity</TableHead>
            <TableHead className="text-right w-[150px]">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* First Row */}
          <TableRow>
            <TableCell className="flex items-start gap-4">
              <Image
                src="/images/product Image.png"
                alt="product image"
                width={80}
                height={80}
                className="rounded-md"
              />
              <div>
                <h2 className="font-medium">Graystone Vase</h2>
                <p className="text-sm text-gray-500">
                  A timeless ceramic vase with a tri-color grey glaze
                </p>
                <p className="text-sm font-semibold">85rs</p>
              </div>
            </TableCell>
            <TableCell className="text-right">1</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>

          {/* Second Row */}
          <TableRow>
            <TableCell className="flex items-start gap-4">
              <Image
                src="/images/product two.png"
                alt="product image"
                width={80}
                height={80}
                className="rounded-md"
              />
              <div>
                <h2 className="font-medium">Basic White Vase</h2>
                <p className="text-sm text-gray-500">
                  Beautiful and simple, this is one for classics
                </p>
                <p className="text-sm font-semibold">80rs</p>
              </div>
            </TableCell>
            <TableCell className="text-right">1</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div className="text-right mt-4">
        <h1 className="font-medium">Subtotal: $500.00</h1>
        <p className="text-sm text-gray-500">
          Taxes and shipping are included at checkout
        </p>
        <button className="mt-4 px-6 py-2 bg-indigo-950 text-white rounded-md shadow-md">
          Go to Checkout
        </button>
      </div>
    </div>
  );
}

export default page;
