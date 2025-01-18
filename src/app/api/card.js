// pages/api/cart.js

// Initial cart data
let cartItems = [
    { id: 1, name: "Graystone Vase", price: 85, quantity: 1, image: "/images/ProductImage.png" },
    { id: 2, name: "Basic White Vase", price: 80, quantity: 1, image: "/images/ProductTwo.png" },
  ];
  
  // API handler function
  export default function handler(req, res) {
    if (req.method === "GET") {
      // Handle GET request - Return cart items
      res.status(200).json(cartItems);
    } else if (req.method === "PUT") {
      // Handle PUT request - Update quantity
      const { id, quantity } = req.body;
  
      // Update the cart item quantity
      cartItems = cartItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      );
  
      res.status(200).json({ message: "Quantity updated successfully", cartItems });
    } else {
      // Method not allowed
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  