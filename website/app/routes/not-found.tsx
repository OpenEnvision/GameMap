import { Link } from "react-router";
export default function NotFound() {
  return (
    <main id="main-content" className="error-page">
      <title>Page not found — GameMap</title>
      <span className="eyebrow">404 / OFF THE MAP</span>
      <h1>This path is still uncharted.</h1>
      <p>
        Find a working starting point in the resource library, or explore the
        guides.
      </p>
      <Link className="button button-primary" to="/resources/">
        Explore resources
      </Link>
    </main>
  );
}
