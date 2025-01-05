import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import Swal from "sweetalert2";
import { ApolloClient, ApolloLink, InMemoryCache, createHttpLink } from "@apollo/client";
import { toast } from "react-toastify";
import { store } from "./redux/store";

const httpLink = createHttpLink({
  uri: "http://localhost:5000/api/v1/graphql",
});

const authLink = setContext((_, { headers }) => {
  const state = store.getState();
  const token = state.auth?.token;

  return { headers: token ? { ...headers, authorization: token } : { ...headers } };
});

// Error link to handle global errors
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      console.error(`[GraphQL error]: Message: ${err.message}, Location: ${err.locations}, Path: ${err.path}`);

      // Handle specific GraphQL errors
      if (err.message.includes("Unauthorized")) {
        toast.error(err.message);
        // Clear local storage and redirect to login
        localStorage.clear();
        window.location.href = "/login";
      } else {
        toast.error(err.message || "GraphQL Error");
      }
    }
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`);

    // Handle network errors
    Swal.fire({
      icon: "error",
      title: "Network Error",
      text: "Failed to connect to the server. Please check your internet connection.",
    });
  }
});
const link = ApolloLink.from([errorLink, authLink, httpLink]);

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
