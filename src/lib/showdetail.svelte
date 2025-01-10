<script>
    import Button from "./components/ui/button/button.svelte";
    import Label from "./components/ui/label/label.svelte";
    export let data;
    export let url;

    console.log(data.image_url)

    console.log("lalallalaal")
    console.log(data)
</script>



<div class="flex justify-center mt-10">

    <div class="bg-card flex w-9/12 p-7 rounded-md">

        <div>

            <div class="h-10 flex justify-center text-white bg-subcard w-72 rounded-md border-[0.5px] border-gray-600">
                <a href="/{url}" class="mt-2"><Label>Back to all post</Label></a>
            </div>

            <div class="bg-subcard mt-7 text-white p-5  border-[0.5px] border-gray-600 rounded-md flex justify-between">

                <div class="ml-7">

                    <Label class="text-gray-500">Category</Label>
                    <Label class="block mt-3 text-lg">{data.Category}</Label>

                </div>

                <div class="mr-10">
                    <Label class="text-gray-500">Vote</Label>
                    <Label class="block mt-3 text-lg">{data.Vote}</Label>

                </div>

            </div>
        </div>

        <div class="w-full ml-16 pr-8">
            
            <label for="" class="mb-10 text-lg font-semibold text-white block">{data.Title}</label>

            <label for="" class="text-sm text-white">{data.Description}</label>
            {#if data.image_url}
            <img 
              src={data.image_url} 
              class="w-44 h-44 border-[0.5px] mt-6 rounded-md"
              alt="Preview image"
            />
          {:else}
          
          {/if}            
        </div>
    </div>

</div>
