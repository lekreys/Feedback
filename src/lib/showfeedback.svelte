<script>
    import axios from "axios";
    import Label from "./components/ui/label/label.svelte";
    import Button from "./components/ui/button/button.svelte";
    import Layout from "../routes/+layout.svelte";
    import { onMount } from 'svelte';
  
    export let data_json;
  
    let feedbackData;
    let votedPosts = {};

    export let endpoint;
  
    onMount(() => {
      feedbackData = data_json.all_Feedback;
      const savedVotes = localStorage.getItem('votedPosts');
      if (savedVotes) {
        votedPosts = JSON.parse(savedVotes);
      }
    });
  
    async function toggleVote(feed, index) {

      const isVoted = votedPosts[feed.id];
      const new_vote = isVoted ? feed.Vote - 1 : feed.Vote + 1;
  
      const new_data = {
        Title: feed.Title,
        Description: feed.Description,
        Category: feed.Category,
        Vote: new_vote,
      };
  
      try {
        const response = await axios.put(
          `http://127.0.0.1:8000/${endpoint}/${feed.id}`,
          new_data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        
        feedbackData[index] = {
          ...feed,
          Vote: new_vote
        };
        feedbackData = [...feedbackData]; 

        if (isVoted) {
          delete votedPosts[feed.id];
        } else {
          votedPosts[feed.id] = true;
        }
        localStorage.setItem('votedPosts', JSON.stringify(votedPosts));
        votedPosts = { ...votedPosts };
  
      } catch (error) {
        console.error("Error updating vote:", error);
      }
    }
  </script>
  
  <div class="mt-7 rounded-md border-[0.5px] border-gray-500">
    <div class="h-14 bg-subcard rounded-t-md"></div>
  
    <div>
      {#each feedbackData || data_json.all_Feedback as feed, index}

      
        <div class="text-white border-t-[0.5px] border-gray-500 px-5 py-2 flex justify-between">


            <div class="w-11/12 h-24 overflow-hidden pt-2">
              <a href="feature_request/{feed.id}">
                <Label class="text-md font-semibold block">{feed.Title}</Label>
              </a>
              <Label class="text-sm text-gray-400 block overflow-hidden whitespace-nowrap text-ellipsis">
                {feed.Description}
              </Label>
            </div>

        

  
          <Button
            on:click={() => toggleVote(feed, index)}
            class="w-6 h-10 mt-6 font-semibold rounded flex flex-col items-center space-y-3 bg-black border-[0.5px] border-gray-500
              {votedPosts[feed.id] ? 'bg-primary-500' : 'hover:bg-gray-700'}"
          >
            <svg
              viewBox="0 0 24 24"
              class="absolute h-12 w-3 mb-5 {votedPosts[feed.id] ? 'text-white' : ''}"
              fill="none"  
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 7C12.2652 7 12.5196 7.10536 12.7071 7.29289L19.7071 14.2929C20.0976 14.6834 20.0976 15.3166 19.7071 15.7071C19.3166 16.0976 18.6834 16.0976 18.2929 15.7071L12 9.41421L5.70711 15.7071C5.31658 16.0976 4.68342 16.0976 4.29289 15.7071C3.90237 15.3166 3.90237 14.6834 4.29289 14.2929L11.2929 7.29289C11.4804 7.10536 11.7348 7 12 7Z"
                  fill="currentColor" 
                ></path>
              </g>
            </svg>
            <p>{feed.Vote}</p>
          </Button>
        </div>
      {/each}
    </div>
  
    <div class="h-14 bg-subcard rounded-b-md"></div>
  </div>
  
  <style>
    :global(.bg-primary-500) {
      background-color: rgba(126, 60, 236,0.4);
      color: white;
      border:1px  rgba(126, 60, 236) solid ;
    }
  </style>