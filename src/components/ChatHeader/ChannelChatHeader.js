// We will want to have two separate components, channel chat header and private chat header because the 
// visual styling is different and the functionality is different. 

// Use props.chatType in Chat.js to determine which chat header to show 

// The channel chat header should have a button that shows the number of people in the channel ("4 members"). 
// When clicked it will open the channel sidebar

//  You're going to want to make the service api call to find out how many members are in this channel from 
// chat component (do not make the service call from the channel header component - keep it purely presentational). 

// Keep the api call in chat component, pass the result (number of members) into channel chat header 
// component to display the returned info