import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import MyBooksProvider from "./context/MyBooksProvider";

const API_KEY =
  "yinzhu::stepzen.net+1000::9a41fd2fb6bd16ca1993cabe89b43f8a92d5043e354eb1a215a0266f6b77f9ec";

const client = new ApolloClient({
  uri: "https://yinzhu.stepzen.net/api/books/__graphql",
  headers: {
    Authorization: `ApiKey ${API_KEY}`,
  },
  cache: new InMemoryCache(),
});

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ApolloProvider client={client}>
          <MyBooksProvider>
            <Navigation colorScheme={colorScheme} />
          </MyBooksProvider>
        </ApolloProvider>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
