import React from "react";
import Link from "next/link";

import { ProductStyle } from "../styles/ProductStyle";

export default function Products({ product }) {
  const { title, price, image, slug } = product.attributes;

  return (
    <ProductStyle>
      <Link href={`product/${slug}`}>
        <div>
          <img src={image.data.attributes.formats.small.url} alt={title} />
        </div>
      </Link>
      <h2>{title}</h2>
      <h3>{price}</h3>
    </ProductStyle>
  );
}
