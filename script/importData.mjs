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
  apiVersion: "2025-01-13", // Set API version
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

console.log("Starting importData script...");

async function uploadImageToSanity(imageUrl) {
  try {
    console.log(`Uploading image: ${imageUrl}`);
    const response = await axios.get(imageUrl, {
      responseType: "arraybuffer",
      timeout: 15000,
    });
    const buffer = Buffer.from(response.data);
    const asset = await sanityClient.assets.upload("image", buffer, {
      filename: imageUrl.split("/").pop() || "default.jpg",
    });
    console.log("✅ Image uploaded successfully:", asset);
    return asset._id;
  } catch (error) {
    console.error(`❌ Failed to upload image (${imageUrl}):`, error.message);
    return null;
  }
}

async function createCategory(category, counter) {
  try {
    if (!category || !category.name) {
      console.error("❌ Invalid category data:", category);
      return null;
    }
    const slug = slugify(category.name, { lower: true, strict: true });
    const existingCategory = await sanityClient.fetch(
      `*[_type=="category" && slug.current==$slug][0]`,
      { slug }
    );

    if (existingCategory) {
      console.log("Category already exists:", existingCategory.name);
      return existingCategory._id;
    }

    const catObj = {
      _type: "category",
      _id: `category-${counter}`,
      name: category.name,
      slug: { _type: "slug", current: slug },
    };
    const response = await sanityClient.createOrReplace(catObj);
    console.log("✅ Category created successfully:", response.name);
    return response._id;
  } catch (error) {
    console.error("❌ Failed to create category:", category.name, error.message);
    return null;
  }
}

async function isProductExists(slug) {
  try {
    const existingProduct = await sanityClient.fetch(
      `*[_type == "product" && slug.current == $slug][0]`,
      { slug }
    );
    return !!existingProduct; // Return true if product exists, false otherwise
  } catch (error) {
    console.error("❌ Error checking product existence:", error.message);
    return false;
  }
}

async function importData() {
  try {
    // Hardcoded URL for products API
    const API_PRODUCTS_URL = "https://hackathon-apis.vercel.app/api/products"; // Replace this with the actual URL

    const response = await axios.get(API_PRODUCTS_URL);
    const products = response.data; // Fetch all products
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

        // Check if product already exists in Sanity
        const exists = await isProductExists(slug);
        if (exists) {
          console.log(`⚠️ Product "${product.name}" already exists. Skipping.`);
          counter++;
          continue;
        }

        // Handle image upload
        let imageRef = null;
        if (product.image) {
          imageRef = await uploadImageToSanity(product.image);
        } else {
          console.warn(`⚠️ Product ${counter} has no image. Proceeding without image.`);
        }

        // Handle category creation
        let catRef = null;
        if (product.category) {
          catRef = await createCategory(product.category, counter);
        }

        // Create Sanity product
        const sanityProduct = {
          _id: `product-${counter}`,
          _type: "product",
          name: product.name,
          slug: { _type: "slug", current: slug },
          price: product.price || 0,
          category: catRef ? { _type: "reference", _ref: catRef } : undefined,
          tags: product.tags || [],
          quantity: product.quantity || 50,
          image: imageRef
            ? { _type: "image", asset: { _type: "reference", _ref: imageRef } }
            : undefined,
          description: product.description || "Default description.",
          features: product.features || ["Default feature"],
        };

        await sanityClient.createOrReplace(sanityProduct);
        console.log(`✅ Imported product ${sanityProduct.name}`);
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
