<script>
    import Button from "./components/ui/button/button.svelte";
    import Label from "./components/ui/label/label.svelte";
    export let data;
    export let url;

    let imageUrls = [];
    if (data.image_url) {
        try {
            imageUrls = JSON.parse(data.image_url);
        } catch (error) {
            console.error("Error parsing image_url:", error);
        }
    }

    // Menambahkan state untuk preview gambar
    let selectedImage = null;
</script>

<div class="flex justify-center mt-10">
    <div class="bg-card flex w-9/12 p-7 rounded-md">
        <div>
            <div class="h-10 flex justify-center text-white bg-subcard w-72 rounded-md border-[0.5px] border-gray-600">
                <a href="/{url}" class="mt-2"><Label>Back to all post</Label></a>
            </div>

            <div class="bg-subcard mt-7 text-white p-5 border-[0.5px] border-gray-600 rounded-md flex justify-between">
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
            
            {#if imageUrls.length > 0}
                <div class="image-scroll-container mt-4">
                    <div class="image-row">
                        {#each imageUrls as url, index}
                            <div class="image-wrapper">
                                <img 
                                    src={url} 
                                    alt={`Image ${index + 1}`} 
                                    class="thumbnail hover:opacity-80 transition-opacity cursor-pointer"
                                    on:click={() => selectedImage = url}
                                />
                            </div>
                        {/each}
                    </div>
                </div>
            {:else}
                <p class="text-gray-400 mt-4">No images available</p>
            {/if}
        </div>
    </div>
</div>

{#if selectedImage}
    <div 
        class="fixed inset-0 bg-black/80 flex items-center justify-center z-50 cursor-pointer"
        on:click={() => selectedImage = null}
    >
        <img 
            src={selectedImage} 
            alt="Preview" 
            class="max-w-[90%] max-h-[90vh] object-contain"
        />
    </div>
{/if}

<style>
    .image-scroll-container {
        width: 100%;
        overflow-x: auto;
        padding: 1rem 0;
    }

    .image-row {
        display: flex;
        gap: 1rem;
        min-width: min-content;
    }

    .image-wrapper {
        flex: 0 0 auto;
        width: 150px; /* Ukuran thumbnail */
        height: 150px;
    }

    .thumbnail {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 0.5rem;
        border: 1px solid rgba(255, 255, 255, 0.1);
    }

    /* Styling scrollbar */
    .image-scroll-container::-webkit-scrollbar {
        height: 6px;
    }

    .image-scroll-container::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 3px;
    }

    .image-scroll-container::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 3px;
    }

    .image-scroll-container::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.3);
    }
</style>