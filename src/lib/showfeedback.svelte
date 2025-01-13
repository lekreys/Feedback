<script>
  import axios from "axios";
  import Label from "./components/ui/label/label.svelte";
  import Button from "./components/ui/button/button.svelte";
  import Layout from "../routes/+layout.svelte";
  import { onMount } from 'svelte';

  export let data_json;
  export let endpoint;

  let feedbackData;
  let votedPosts = {};

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

<div class="mt-7 rounded-md border-[0.5px] border-gray-500 bg-black/20 backdrop-blur-sm">
  <div class="h-14 bg-subcard rounded-t-md"></div>

  <div class="divide-y divide-gray-500/50">
    {#each feedbackData || data_json.all_Feedback as feed, index}
      <div class="hover:bg-gray-800/30 transition-colors duration-200">
        <div class="px-4 py-4 sm:px-6 flex flex-col sm:flex-row justify-between items-start gap-4">
          <!-- Content Section -->
          <div class="flex-1 min-w-0 space-y-2">
            <a 
              href="{endpoint}/{feed.id}" 
              class="block group"
            >
              <Label class="text-lg font-semibold text-white block group-hover:text-blue-400 transition-colors duration-200">
                {feed.Title}
              </Label>
            </a>
            
            <div class="relative">
              <Label class="text-sm text-gray-400 block">
                <div class="line-clamp-2 sm:line-clamp-1">
                  {feed.Description}
                </div>
              </Label>
              <div class="absolute bottom-0 right-0 w-8 h-full bg-gradient-to-l from-black/20"></div>
            </div>
            
            <!-- Category Tag if needed -->
            {#if feed.Category}
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-300">
                {feed.Category}
              </span>
            {/if}
          </div>

          <!-- Vote Button -->
          <div class="flex sm:flex-col items-center gap-2 self-center sm:self-start">
            <Button
              on:click={() => toggleVote(feed, index)}
              class="relative group px-3 py-2 sm:w-10 h-auto font-medium rounded-lg flex items-center sm:flex-col gap-2 
                    border border-gray-500/50 transition-all duration-200
                    {votedPosts[feed.id] ? 'bg-primary-500' : 'bg-black hover:bg-gray-800'}"
            >
              <svg
                viewBox="0 0 24 24"
                class="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-200 
                      group-hover:-translate-y-0.5 {votedPosts[feed.id] ? 'text-white' : ''}"
                fill="none"  
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 7C12.2652 7 12.5196 7.10536 12.7071 7.29289L19.7071 14.2929C20.0976 14.6834 20.0976 15.3166 19.7071 15.7071C19.3166 16.0976 18.6834 16.0976 18.2929 15.7071L12 9.41421L5.70711 15.7071C5.31658 16.0976 4.68342 16.0976 4.29289 15.7071C3.90237 15.3166 3.90237 14.6834 4.29289 14.2929L11.2929 7.29289C11.4804 7.10536 11.7348 7 12 7Z"
                  fill="currentColor" 
                ></path>
              </svg>
              <span class="font-semibold">{feed.Vote}</span>
            </Button>
          </div>
        </div>
      </div>
    {/each}
  </div>

  <div class="h-14 bg-subcard rounded-b-md"></div>
</div>

<style>
  :global(.bg-primary-500) {
    background-color: rgba(126, 60, 236, 0.2);
    color: white;
    border-color: rgba(126, 60, 236, 0.5);
  }

  /* Tambahan untuk animasi hover pada vote button */
  :global(.bg-primary-500:hover) {
    background-color: rgba(126, 60, 236, 0.3);
    border-color: rgba(126, 60, 236, 0.7);
  }
</style>