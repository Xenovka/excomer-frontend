import React from "react";
import { useQuery } from "urql";
import { useRouter } from "next/router";

import { GET_PRODUCT_QUERY } from "../../lib/query";
import { useStateContext } from "../../lib/context";
import { DetailsStyle, ProductInfo, Quantity, Buy } from "../../styles/ProductDetails";

import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";

export default function ProductDetails() {
  const { qty, increaseQty, decreaseQty, onAdd } = useStateContext();

  const { query } = useRouter();

  const [results] = useQuery({
    query: GET_PRODUCT_QUERY,
    variables: { slug: query.slug }
  });

  const { data, fetching, error } = results;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  const { title, description, image } = data.products.data[0].attributes;

  return (
    <DetailsStyle>
      <img src={image.data.attributes.formats.medium.url} alt={title} />
      <ProductInfo>
        <h3>{title}</h3>
        <p>{description}</p>
        <div>
          <Quantity>
            <span>Quantity</span>
            <button>
              <AiFillMinusCircle onClick={decreaseQty} />
            </button>
            <p>{qty}</p>
            <button>
              <AiFillPlusCircle onClick={increaseQty} />
            </button>
          </Quantity>
        </div>
        <Buy onClick={() => onAdd(data.products.data[0].attributes, qty)}>Add to cart</Buy>
      </ProductInfo>
    </DetailsStyle>
  );
}
