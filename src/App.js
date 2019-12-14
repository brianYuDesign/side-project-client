import React from "react"
import ApolloClient from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { ApolloProvider } from "react-apollo"
import { split } from "apollo-link"
import { setContext } from "apollo-link-context"
import { createUploadLink } from "apollo-upload-client"
import { onError } from "apollo-link-error"
import { getMainDefinition } from "apollo-utilities"
import { ToastContainer, Flip } from "react-toastify"
import { persistCache } from "apollo-cache-persist"
import { uri } from "./utils"
import { BreadcrumbProvider } from "./components/breadcrumb"

const token = () => localStorage.getItem("access-token")

const httpLink = createUploadLink({ uri })

const authLink = setContext(async (request, { headers }) => {
  try {
    return {
      headers: {
        ...headers,
        "access-token": token()
      }
    }
  } catch (error) {
    console.log("Get cognito session failed, message: ", error)
    return {
      headers
    }
  }
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(error => {
      console.log(error.message)
    })
  } else if (networkError) {
    console.log("網路連線異常")
  }
})

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    )
  },
  httpLink
)

const cache = new InMemoryCache({
  dataIdFromObject: object => object.id || null,
  addTypename: false
})

persistCache({
  cache,
  storage: window.localStorage
})

const client = new ApolloClient({
  link: authLink.concat(errorLink.concat(link)),
  cache,
  resolvers: {}
})

const App = ({ children }) => {
  return (
    <>
      <ApolloProvider client={client}>
        <BreadcrumbProvider>{children}</BreadcrumbProvider>
      </ApolloProvider>
      <ToastContainer transition={Flip} autoClose={10000} />
    </>
  )
}

export default App
