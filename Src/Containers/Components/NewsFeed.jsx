import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import useSWR from 'swr';
import SwipeButton from './SwipeControl'; 

// Custom fetcher function for useSWR
const fetcher = url => fetch(url).then(res => res.json());

const NewsFeed = () => {
  // state regarding to fetch the data
  const [fetchNews, setFetchNews] = useState(false);
  
  // tracking index while Clicking the buttons
  const [currentIndex, setCurrentIndex] = useState(0);
  

  //  useSWR hook is used for data fetching, caching, and revalidation.
   
  //  The first argument is the API endpoint. It becomes active only when `fetchNews` is true.
  //  The second argument is the fetcher function that retrieves and parses the JSON data.
   
  //  If `fetchNews` is false, the fetch is skipped by passing `null` as the key.
   
  const { data, error } = useSWR(
    fetchNews
      ? 'https://api.gdeltproject.org/api/v2/doc/doc?query=latestnews&format=json'
      : null,
    fetcher,
  );

  // Debugging logs to monitor data and error states
  console.log('data===>', JSON.stringify(data));
  console.log('error===>', JSON.stringify(error));

  
  //  handleSwipeComplete invoked when the swipe action is completed.
  //  Sets `fetchNews` to true,      useSWR to fetch data.
   
  const handleSwipeComplete = () => {
    setFetchNews(true);
  };


    // Handler to navigate to the next  in the list.
    // Ensures that the currentIndex does not exceed the bounds of the list of array.

  const handleNextArticle = () => {
    if (currentIndex < (data.articles ? data.articles.length - 1 : 0)) {
      setCurrentIndex(currentIndex + 1);
    }
  };


  // Handler to navigate to the previous  in the list.
    // Ensures that the currentIndex does not go below zero.
 
  const handlePreviousArticle = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Conditional rendering: Display error message if data fetching failed
  if (error) return <Text style={styles.error}>Failed to load news</Text>;
  
  // Conditional rendering: Show the SwipeButton component while data is being fetched
  if (!data) return <SwipeButton onSwipeComplete={handleSwipeComplete} />;

  // Extract the current news based on the currentIndex
  const currentArticle = data.articles ? data.articles[currentIndex] : null;

  // Conditional rendering: Inform the user if no articles are available
  if (!currentArticle)
    return <Text style={styles.error}>No articles available.</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Display the new image or a placeholder if unavailable */}
        <Image
          source={{
            uri: currentArticle.socialimage || 'https://via.placeholder.com/150',
          }}
          style={styles.image}
          resizeMode="contain" // Ensures the image scales uniformly without cropping
          onError={(e) => console.log('Image load error:', e.nativeEvent.error)} // Logs image loading errors
        />
        
        {/* Display the article's title */}
        <Text style={styles.title}>{currentArticle.title}</Text>
        
        {/* Display the domain of the article */}
        <Text style={styles.source}>{currentArticle.domain}</Text>
        
        {/* Display the article's description or a default message if unavailable */}
        <Text style={styles.description}>
          {currentArticle.description || 'No description available.'}
        </Text>

        {/* Container for navigation buttons */}
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              title="Previous"
              onPress={handlePreviousArticle}
              disabled={currentIndex === 0} // Disable if on the first article
            />
          </View>
          <View style={styles.button}>
            <Button
              title="Next"
              onPress={handleNextArticle}
              disabled={currentIndex === data.articles.length - 1} // Disable if on the last article
            />
          </View>
        </View>
      </View>
    </View>
  );
};

// Stylesheet for the NewsFeed component
const styles = StyleSheet.create({
  container: {
    flex: 1, // Occupies the full screen
    padding: 16, // Adds padding around the content
    backgroundColor: '#fff', // Sets the background color to white
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center', // Centers content horizontally
  },
  card: {
    borderWidth: 1, // Adds a border around the card
    borderColor: '#000', // Sets border color to black
    borderRadius: 8, // Rounds the corners of the card
    padding: 10, // Adds padding inside the card
    width: '90%', // Sets the card width to 90% of the container
    maxWidth: 400, // Sets a maximum width for larger screens
  },
  image: {
    width: '100%', // Image takes full width of the card
    height: 200, // Sets a fixed height for the image
    marginBottom: 20, // Adds space below the image
    backgroundColor: '#e0e0e0', // Placeholder background color while the image loads
  },
  title: {
    fontWeight: 'bold', // Makes the title bold
    fontSize: 18, // Sets the font size
    textAlign: 'center', // Centers the text
    marginBottom: 10, // Adds space below the title
    color: 'brown', // Sets the text color to brown
  },
  source: {
    fontStyle: 'italic', // Italicizes the source text
    marginBottom: 10, // Adds space below the source
    textAlign: 'center', // Centers the text
    color: '#000', // Sets the text color to black
  },
  description: {
    marginTop: 5, // Adds space above the description
    textAlign: 'center', // Centers the text
    marginBottom: 20, // Adds space below the description
    color: '#000', // Sets the text color to black
  },
  error: {
    textAlign: 'center', // Centers the error message
    marginTop: 20, // Adds space above the error message
    color: 'red', // Sets the text color to red
  },
  buttonContainer: {
    flexDirection: 'row', // Arranges buttons horizontally
    justifyContent: 'space-between', // Spaces buttons evenly
    width: '100%', // Buttons container takes full width of the card
    paddingHorizontal: 20, // Adds horizontal padding
    marginTop: 20, // Adds space above the buttons
  },
  button: {
    flex: 1, // Each button takes equal space
    marginHorizontal: 10, // Adds horizontal margin between buttons
  },
});

export default NewsFeed;
