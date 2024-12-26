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
    <div className="p-4">
      <h1 className="text-lg sm:text-3xl mb-6">Your shopping cart</h1>

      {/* Table Container for Mobile */}
      <div className="overflow-x-auto">
        <Table className="min-w-full sm:min-w-[600px]">
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Product</TableHead>
              <TableHead className="text-right">Qty</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Row 1 */}
            <TableRow>
              <TableCell className="flex items-center gap-3">
                <Image
                  src="/images/ProductImage.png"
                  alt="Graystone Vase"
                  width={50}
                  height={50}
                  className="rounded-md"
                />
                <div>
                  <h2 className="font-medium text-sm sm:text-base">Graystone Vase</h2>
                  <p className="text-xs text-gray-500">
                    A timeless ceramic vase with a tri-color grey glaze
                  </p>
                  <p className="text-xs font-semibold">85rs</p>
                </div>
              </TableCell>
              <TableCell className="text-right text-sm">1</TableCell>
              <TableCell className="text-right text-sm">$250.00</TableCell>
            </TableRow>

            {/* Row 2 */}
            <TableRow>
              <TableCell className="flex items-center gap-3">
                <Image
                  src="/images/ProductTwo.png"
                  alt="Basic White Vase"
                  width={50}
                  height={50}
                  className="rounded-md"
                />
                <div>
                  <h2 className="font-medium text-sm sm:text-base">Basic White Vase</h2>
                  <p className="text-xs text-gray-500">
                    Beautiful and simple, this is one for classics
                  </p>
                  <p className="text-xs font-semibold">80rs</p>
                </div>
              </TableCell>
              <TableCell className="text-right text-sm">1</TableCell>
              <TableCell className="text-right text-sm">$250.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Subtotal Section */}
      <div className="text-right mt-6">
        <h1 className="font-medium text-sm sm:text-base">Subtotal: $500.00</h1>
        <p className="text-xs text-gray-500">
          Taxes and shipping are included at checkout
        </p>
        <button className="mt-4 w-full sm:w-auto px-4 py-2 bg-indigo-950 text-white rounded-md shadow-md text-sm">
          Go to Checkout
        </button>
      </div>
    </div>
  );
}

export default page;
