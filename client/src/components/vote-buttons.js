// import { IconButton, Text, VStack } from '@chakra-ui/core';
// import React, {useEffect, useState} from 'react';
// import { FiArrowDown, FiArrowUp } from 'react-icons/fi';




// // VoteButtons component responsible for rendering an upvote and downvote button
// const VoteButtons = ({ post }) => {
//     const [isVoting, setVoting] = useState(false);
//     const [votedPosts, setVotedPosts] = useState([]);

//     useEffect(() => {
//         // Fetch the previously voted items from localStorage. 
//         const votesFromLocalStorage = localStorage.getItem("votes") || [];
//         let previousVotes = [];

//         // Parse the value of the item from localStorage.
//         // If value of the items isn't an array, then JS will throw an error
//         try {previousVotes = JSON.parse(votesFromLocalStorage);}
//         catch(error){ console.log(error);}

//         setVotedPosts(previousVotes);
//     }, []);

//     const handleDisablingOfVotes = (postId) => {
//         // Responsible for disabling voting once a user has voted. 
//         const previousVotes = votedPosts;
//         previousVotes.push(postId);

//         setVotedPosts(previousVotes);

//         // Update the voted items from localStorage
//         localStorage.setItem("votes", JSON.stringify(votedPosts));
//     };

//     // when a user clicks on either button, call this function. 
//     const handleClick = async (type) => {
//         setVoting(true);

//         //Do calculations to save the vote.
//         let upVotesCount = post.upVotesCount;
//         let downVotesCount = post.downVotesCount;

//         const date = new Date();

//         if (type === "upvote") {
//             upVotesCount = upVotesCount + 1;
//         }
//         else {
//             downVotesCount = downVotesCount + 1;
//         }

//         await db.collection("posts").doc(post.id).set({
//             title: post.title,
//             upVotesCount,
//             downVotesCount,
//             createdAt: post.createdAt,
//             updatedAt: date.toUTCString()
//         });

//         // Disable voting button once voting is successful. 
//         handleDisablingOfVotes(post.id);

//         setVoting(true);
//     };

//     const checkIfPostIsAlreadyVoted = () => {
//         if(votedPosts.indexOf(post.id) > -1) {
//             return true;
//         }
//         else {
//             return false;
//         }
//     };

//     return (
//         <>
//             <VStack>
//                 <IconButton
//                     size="lg"
//                     colorScheme="purple"
//                     aria-label="Upvote"
//                     icon={<FiArrowUp />}
//                     onClick={() => handleClick("upvote")}
//                     isLoading={isVoting}
//                     // isDisabled={checkIfPostIsAlreadyVoted}
//                 >
//                     <Text bg="gray.100" rounded="md" w="100%" p={1}>
//                         {post.upVotesCount}
//                     </Text>
//                 </IconButton>
//             </VStack>
//             <VStack>
//                 <IconButton
//                     size="lg"
//                     colorScheme="yellow"
//                     aria-label="Downvote"
//                     icon={<FiArrowDown />}
//                     onClick={() => handleClick("downvote")}
//                     isLoading={isVoting}
//                     // isDisabled={checkIfPostIsAlreadyVoted}
//                 >
//                     <Text bg="gray.100" rounded="md" w="100%" p={1}>
//                         {post.downVotesCount}
//                     </Text>
//                 </IconButton>
//             </VStack>
//         </>
//     );
// };

// export default VoteButtons;