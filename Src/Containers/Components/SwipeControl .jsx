import React, { useRef, useState } from 'react';
import { Animated, PanResponder, StyleSheet, Text, View } from 'react-native';


 
  // This component provides a swipeable button that users can drag to the right.
const SwipeButton = ({ onSwipeComplete }) => {
  const translateX = useRef(new Animated.Value(0)).current;
  
  // Local state to determine if the swipe has been completed
  const [swiped, setSwiped] = useState(false);

    // PanResponder is used to handle touch gestures.
  const panResponder = useRef(
    PanResponder.create({
   
        // Determines if the PanResponder should become active.
      onStartShouldSetPanResponder: () => true,

     
        // Handles the movement of the gesture.
      onPanResponderMove: Animated.event(
        [null, { dx: translateX }],
        { useNativeDriver: false } // `translateX` uses JavaScript-driven animation
      ),

    
        // Determines if the swipe distance is sufficient to consider the swipe as complete.
      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dx > 150) { 
          setSwiped(true); // Update state to indicate swipe completion
          onSwipeComplete(); // Trigger the callback passed via props
          
          Animated.spring(translateX, {
            toValue: 200, 
            useNativeDriver: true, 
          }).start();
        } else {
          // Reset the button to its original position if swipe is insufficient
          Animated.spring(translateX, {
            toValue: 0, // Return to starting position
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      {/* Instructional text for the user */}
      <Text style={styles.instructionsText}>No Data Found. Just Swipe Right to Load News.</Text>

      <View style={styles.swipeContainer}>
        {/* Label indicating the swipe direction */}
        <Text style={styles.swipeText}>Swipe to right</Text>
        
        {/* Animated View representing the swipeable button */}
        <Animated.View
          {...panResponder.panHandlers} // Attach PanResponder handlers to capture touch events
          style={[
            styles.swipeableButton,
            { transform: [{ translateX }] } // Apply horizontal translation based on gesture
          ]}
        >
          {/* Arrow icon indicating swipe direction */}
          <Text style={styles.arrow}>→</Text>
        </Animated.View>
      </View>
      
      {/* Feedback text displayed upon successful swipe */}
      {swiped && <Text style={styles.successText}>Swiped!</Text>}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1, // Occupies the full available space
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center', // Centers content horizontally
    backgroundColor: '#f0f0f0', // Light grey background for contrast
    padding: 20, // Adds padding around the content
  },
  instructionsText: {
    fontSize: 18, // Larger font for readability
    color: '#333', // Dark grey text color
    marginBottom: 30, // Space below the instructions
    textAlign: 'center', // Centers the text horizontally
  },
  swipeContainer: {
    width: 300, // Fixed width for the swipe area
    height: 60, // Fixed height for the swipe area
    backgroundColor: '#333', // Dark background for the swipe area
    borderRadius: 30, // Rounded corners for a pill-shaped appearance
    justifyContent: 'center', // Centers child elements vertically
    overflow: 'hidden', // Ensures the swipeable button doesn't overflow the container
  },
  swipeText: {
    position: 'absolute', // Positions the text absolutely within the container
    left: 20, // Positions the text 20 units from the left
    color: '#fff', // White text color for contrast
    fontSize: 18, // Adequate font size for readability
  },
  swipeableButton: {
    width: 50, // Fixed width for the button
    height: 50, // Fixed height for the button
    backgroundColor: '#fff', // White background for the button
    borderRadius: 25, // Makes the button circular
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center', // Centers content horizontally
    position: 'absolute', // Positions the button absolutely within the swipe container
    left: 5, // Initial position from the left
    top: 5, // Initial position from the top
    shadowColor: '#000', // Black shadow for depth
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 2, // Shadow blur radius
    elevation: 5, // Elevation for Android shadow
  },
  arrow: {
    fontSize: 24, // Size of the arrow icon
    color: '#333', // Dark grey color matching the swipe container
  },
  successText: {
    marginTop: 20, // Space above the success message
    fontSize: 18, // Adequate font size for readability
    color: 'green', // Green color to indicate success
    fontWeight: 'bold', // Bold text for emphasis
  },
});

export default SwipeButton;
