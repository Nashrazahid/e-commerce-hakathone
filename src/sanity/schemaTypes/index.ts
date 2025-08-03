import { type SchemaTypeDefinition } from 'sanity'
import {product} from "./products"
import {Category} from "./category"
import {Order} from "./order"



export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product,Category,Order],
 
}
