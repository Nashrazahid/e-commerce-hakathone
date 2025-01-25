import axios from "axios";
import slugify from "slugify";
import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables from .env.local
const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);
dotenv.config({ path: path.resolve(_dirname, "../.env.local") });

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2025-01-13",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

console.log("Starting importData script...");

async function importData() {
  try {
    const API_PRODUCTS_URL = "https://hackathon-apis.vercel.app/api/products";

    const response = await axios.get(API_PRODUCTS_URL);
    const products = response.data;
    console.log(`Fetched ${products.length} products from API`);

    let counter = 1;
    for (const product of products) {
      try {
        console.log(`Processing product ${counter}: ${product.name || "Unnamed Product"}`);

        if (!product.name) {
          console.warn(`⚠️ Product ${counter} has no name. Skipping.`);
          counter++;
          continue;
        }

        const slug = slugify(product.name, { lower: true, strict: true });

        // Check if product exists
        const existingProduct = await sanityClient.fetch(
          `*[_type == "product" && slug.current == $slug][0]`,
          { slug }
        );

        const sanityProduct = {
          _type: "product",
          name: product.name,
          slug: { _type: "slug", current: slug },
          price: product.price || 0,
          quantity: product.quantity || 50,
          description: product.description || "Default description.",
          features: product.features || ["Default feature"],
          tags: product.tags || [],
          dimensions: {
            _type: "dimensions",
            height: product.dimensions?.height || "N/A",
            width: product.dimensions?.width || "N/A",
            depth: product.dimensions?.depth || "N/A",
          },
        };

        if (existingProduct) {
          // Update the existing product
          await sanityClient.patch(existingProduct._id).set(sanityProduct).commit();
          console.log(`🔄 Updated product: ${product.name}`);
        } else {
          // Create a new product
          await sanityClient.create(sanityProduct);
          console.log(`✅ Created new product: ${product.name}`);
        }

        counter++;
      } catch (productError) {
        console.error(`❌ Failed to process product ${counter}:`, productError.message);
        counter++;
        continue;
      }
    }

    console.log("✅ Data import completed!");
  } catch (error) {
    console.error("❌ Error importing data:", error.message);
  }
}

importData();
