import { createClient } from 'next-sanity'

// import { apiVersion, dataset, projectId } from '../env'

// export const client = createClient({
//   projectId,
//   dataset,
//   apiVersion,
//   useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
// })
import dotenv from "dotenv"

dotenv.config()
export const client = createClient({
  projectId: 'ctb1uwwl', // Replace with your project ID
  dataset: 'production',        // Or your dataset name
  apiVersion: '2024-01-04',     // Today's date or latest API version
  useCdn: false,                // Disable CDN for real-time updates
  token:"skq6cYYKHMTUKMIPmr9Po8q1qyjPGdnYPuRIjvHq9pzSKH5fy84EUf1EHj1bUq79KxTqtHAL2orNskZQuKbgMhT0SJOQn2CTLO8JcbRraNoqqkTY6iXehMh5QsFRtH6mOdFu3Fne5JuI4HxeAlLvqtlwPvf1Z0CdY36gn2QQPlojlkVfPSA9",
});