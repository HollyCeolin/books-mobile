import { ActivityIndicator, StyleSheet } from 'react-native';
import { FlatList } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { gql, useQuery } from "@apollo/client"
import BookItem from '../components/BookItem';

const query = gql`
  query SearchBooks($q: String) {
    googleBooksSearch(q: $q, country: "US") {
      items {
        id
        volumeInfo {
          authors
          averageRating
          description
          imageLinks {
            thumbnail
          }
          title
          subtitle
          industryIdentifiers {
            identifier
            type
          }
        }
      }
    }
    openLibrarySearch(q: $q) {
      docs {
        author_name
        title
        cover_edition_key
        isbn
      }
    }
  }
`;

export default function TabOneScreen() {
  const { data, loading, error} = useQuery(query, {
    variables: { q: "Are You My Mother"}
  });

  console.log(data)
  console.log(loading)
  console.log(error)

  console.log(JSON.stringify(data, null, 2));

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator />}
      {error && (
        <>
          <Text style={styles.title}>Error fetching books</Text>
          <Text>{error.message}</Text>
        </>
      )}
      <FlatList
      data={data?.googleBooksSearch?.items || []}
      showsVerticalScrollIndicator={false}

      renderItem={({ item }) => (
      <BookItem 
      book={{
        image: item.volumeInfo.imageLinks?.thumbnail, 
        title: item.volumeInfo.title, 
        authors: item.volumeInfo.authors, 
        isbn: item.volumeInfo.industryIdentifiers[0].identifier,
      }} 
      /> 
      )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
