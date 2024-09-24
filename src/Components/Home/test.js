// import React, { useState, useEffect } from "react";
// import { load } from "cheerio";  // Import the named export 'load'

// function Testing() {
//   const [word, setWord] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           "https://www.makemytrip.com/bus/search/Chennai/Hyderabad/24-04-2024?from_code=MMTCC1159&to_code=MMTCC1319"
//         );
//         const html = await response.text();
//         const $ = load(html);  // Use the 'load' function

//         // Example: Search for the word "example" within the entire HTML content
//         const bodyText = $("body").text();
//         const wordIndex = bodyText.indexOf("IntrCity");
//         if (wordIndex !== -1) {
//           const foundWord = bodyText.substring(
//             wordIndex,
//             wordIndex + "IntrCity".length
//           );
//           setWord(foundWord);
//         } else {
//           setWord("Word not found");
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h2>Word from Website:</h2>
//       <p>{word ? word : "Loading..."}</p>
//     </div>
//   );
// }

// export default Testing;
