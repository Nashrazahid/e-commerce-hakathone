import { defineType,defineField } from "sanity";



export  const Order = defineType({
  name: 'order',
  title: 'Order',
  type: 'document',
  fields: [
    { name: 'customerName', title: 'Customer Name', type: 'string' },
    { name: 'email', title: 'Email', type: 'string' },
    { name: 'address', title: 'Address', type: 'text' },
    {
      name: 'products',
      title: 'Products',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'productId', title: 'Product ID', type: 'string' },
            { name: 'productName', title: 'Product Name', type: 'string' },
            { name: 'quantity', title: 'Quantity', type: 'number' },
            { name: 'price', title: 'Price', type: 'number' },
          ],
        },
      ],
    },
    { name: 'totalAmount', title: 'Total Amount', type: 'number' },
    {
      name: 'status',
      title: 'Order Status',
      type: 'string',
      options: {
        list: ['Pending', 'Shipped', 'Delivered'],
        layout: 'radio',
      },
      initialValue: 'Pending',
    },
    { name: 'createdAt', title: 'Created At', type: 'datetime', initialValue: (new Date()).toISOString() },
  ],
});
