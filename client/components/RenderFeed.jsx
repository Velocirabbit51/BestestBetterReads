import React, {useState, useEffect} from 'react';
// const axios = require('axios');

/*
* ==================================================
*   3 Hardcoded book entries.
* ==================================================
*/
const RenderFeed = () => {
  // const [newestPostIds,setNewestPostIds] = useState([]);
  const [newestPosts,setNewestPosts] = useState([]);

  const postIds = [0, 1, 2];
  
  const posts = [];

  for(let i = 0; i < 3; i++) {
    const tempTags = newestPosts[i].tags.join(", ");
    posts.push(
    <div id="post">
      <p>Name: {newestPosts[i].name}</p> <br/>
      <p>Title: {newestPosts[i].title}</p> <br/>
      <p>Author: {newestPosts[i].author}</p> <br/>
      <p>Comments: {newestPosts[i].comments}</p> <br/>
      <ul id="ratings">
        <li>Plotline: {newestPosts[i].comments}</li>
        <li>Unpredictability: {newestPosts[i].unpredictability}</li>
        <li>Pace: {newestPosts[i].pace}</li>
        <li>Writing Style: {newestPosts[i].writingStyle}</li>
        <li>Ending: {newestPosts[i].ending}</li>
        <li>Overall Enjoyability: {newestPosts[i].overallEnjoyability}</li>
      </ul>
      <p>Tags: {tempTags}</p><br/>
    </div>
    );
  }

  return (
    <div className="render-feed">
      {posts}
    </div>
  )
}

export default RenderFeed;