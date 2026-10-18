import { prerenderToNodeStream } from "react-dom/static";
import { Readable } from "node:stream";
import { ServerRouter, type EntryContext } from "react-router";

// Used by the dev server and build-time prerendering, never deployed as a server.
export default async function handleRequest(
  request: Request,
  status: number,
  headers: Headers,
  context: EntryContext,
) {
  // Unlike streaming SSR, static prerender waits for Suspense without leaving
  // the article in a hidden chunk that requires JavaScript to reveal it.
  const { prelude } = await prerenderToNodeStream(
    <ServerRouter context={context} url={request.url} />,
    { signal: request.signal },
  );
  headers.set("Content-Type", "text/html; charset=utf-8");
  return new Response(
    Readable.toWeb(prelude as Readable) as ReadableStream<Uint8Array>,
    { status, headers },
  );
}
