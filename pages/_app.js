import "../styles/globals.css";
import { Provider, createClient } from "urql";
import { UserProvider } from "@auth0/nextjs-auth0";

import Nav from "../components/Nav";
import { StateContext } from "./../lib/context";

const client = createClient({ url: process.env.NEXT_PUBLIC_BACKEND_API });

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <StateContext>
        <Provider value={client}>
          <Nav />
          <Component {...pageProps} />
        </Provider>
      </StateContext>
    </UserProvider>
  );
}

export default MyApp;
