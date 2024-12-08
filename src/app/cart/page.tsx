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
    <div className="p-9 ">
      <h1 className="text-3xl p-9">Your shopping cart</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Product</TableHead>
            <TableHead className="text-end justify-end mr-56">
              Quantity
            </TableHead>
            <TableHead className="text-end justify-items-end">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">
              <Image
                src="/images/product Image.png"
                alt="image"
                width={300}
                height={200}
              />
            </TableCell>
            <TableCell className="">
              graystone vase
              <h1>a simeless ceremic vase with a tri color grey glaze</h1>
              <h1>85rs</h1>
            </TableCell>
            <TableCell className="text-right">1</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">
              <Image
                src="/images/product two.png"
                alt="image"
                width={300}
                height={200}
              />
            </TableCell>
            <TableCell >
              basic white vase
              <h1>beutiful and simple this is a one for classics</h1>
              <h1>80rs</h1>
            </TableCell>
            <TableCell className="text-right ml-28">1</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div className="text-end mt-4">
        <h1>Subtotal</h1>
        <h1>Taxes and shipping are included at checkout</h1>
        <button className="bg-indigo-950 p-2 border-y-black mb-9 ">
          go to checkout
        </button>
      </div>
    </div>
  );
}

export default page;
