import { Link } from "@remix-run/react";

export default function ProductsIndex() {
  return (
    <div>
      <h1>Our Products</h1>
      <ul>
        <li>
          <Link to="/products/product1">Product 1 &mdash; Pioneers of the Mystery Genre</Link>
        </li>
        <li>
          <Link to="/products/product2">Product 2 &mdash; Old Cap Collier Library</Link>
        </li>
        <li>
          <Link to="/products/product3">Product 3 &mdash; Vintage True Crime &hellip; by Allen Pinkerton</Link>
        </li>
      </ul>
    </div>
  );
}