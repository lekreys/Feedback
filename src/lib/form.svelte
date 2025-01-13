<script>
  import Input from './components/ui/input/input.svelte';
  import Button from './components/ui/button/button.svelte';
  import * as AlertDialog from '$lib/components/ui/alert-dialog';
  import { Plus } from 'lucide-svelte'; 
  import axios from 'axios';
  import Label from './components/ui/label/label.svelte';

  export let endpoint;
  export let selectbox;
  export let options;

  let showForm = false;
  let showSuccessDialog = false;
  let showErrorDialog = false;
  let selectedFiles = [];
  let totalSize = 0;
  const MAX_FILES = 3; // Konstanta untuk batas maksimal file

  let formData = {
    Title: '',
    Description: '',
    Category: '',
    Vote: 0
  };

  function handleFileSelect(event) {
    const files = Array.from(event.target.files);
    const maxSize = 5 * 1024 * 1024; // 5MB limit
    let totalNewSize = 0;
    
    // Cek jika total file akan melebihi batas
    if (selectedFiles.length + files.length > MAX_FILES) {
      alert(`Maksimal ${MAX_FILES} gambar yang diperbolehkan`);
      return;
    }
    
    const validFiles = files.filter(file => {
      if (file.size > maxSize) {
        alert(`File ${file.name} melebihi ukuran 5MB`);
        return false;
      }
      if (!file.type.startsWith('image/')) {
        alert(`File ${file.name} bukan file gambar`);
        return false;
      }
      totalNewSize += file.size;
      return true;
    });

    // Update selectedFiles dengan batas maksimal
    const newSelectedFiles = [...selectedFiles, ...validFiles];
    if (newSelectedFiles.length <= MAX_FILES) {
      selectedFiles = newSelectedFiles;
      totalSize = selectedFiles.reduce((acc, file) => acc + file.size, 0);
    } else {
      alert(`Maksimal ${MAX_FILES} gambar yang diperbolehkan`);
    }
  }

  async function Postdata(data) {
    try {
      const formDataObj = new FormData();
      formDataObj.append('Title', data.Title);
      formDataObj.append('Description', data.Description);
      formDataObj.append('Category', data.Category);
      formDataObj.append('Vote', data.Vote);

      if (selectedFiles.length > 0) {
        selectedFiles.forEach((file) => {
          formDataObj.append('images', file);
        });
      }

      const response = await axios.post(`/api/${endpoint}_file`, formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log('Feedback berhasil dikirim:', response.data);

      resetForm();
      showSuccessDialog = true;
    } catch (error) {
      console.error('Error saat mengirim feedback:', error);
      showErrorDialog = true;
    }
  }

  async function postDataWithoutFile(data) {
    try {
      const response = await axios.post(`/api/${endpoint}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Feedback berhasil dikirim:', response.data);

      resetForm();
      showSuccessDialog = true;
    } catch (error) {
      console.error('Error saat mengirim feedback:', error);
      showErrorDialog = true;
    }
  }

  function handleSubmit() {
    if (selectedFiles.length > 0) {
      Postdata(formData);
    } else {
      postDataWithoutFile({
        Title: formData.Title,
        Description: formData.Description,
        Category: formData.Category,
        Vote: formData.Vote
      });
    }
  }

  function closeSuccessDialog() {
    showSuccessDialog = false;
  }

  function closeErrorDialog() {
    showErrorDialog = false;
  }

  function cancelForm() {
    resetForm();
    showForm = false;
  }

  function resetForm() {
    formData = {
      Title: '',
      Description: '',
      Category: '',
      Vote: 0
    };
    selectedFiles = [];
    totalSize = 0;
  }
</script>

<div class="w-full bg-form rounded-lg border border-gray-600 p-4 mt-6">
  {#if !showForm}
    <div class="flex justify-between items-center">
      <Label class="text-white">Share Your Feedback...</Label>
      <Button 
        on:click={() => showForm = true}
        class="flex items-center gap-2 hover:bg-gray-800"
      >
        <Plus size={20} />
      </Button>
    </div>
  {:else}
    <form on:submit|preventDefault={handleSubmit} class="space-y-4">
      <div class="space-y-4">
        <div>
          <Input 
            id="title" 
            type="text" 
            bind:value={formData.Title} 
            placeholder="Short descriptive title" 
            required
            class="bg-transparent border-0 text-white w-full"
          />
        </div>
        
        <div class="space-y-2">
          <label for="description" class="text-white">Description</label>
          <Input 
            id="description" 
            bind:value={formData.Description} 
            placeholder="Any additional details..." 
            required
            class="w-full bg-transparent border-0 text-white p-2 rounded-md"
          />
        </div>

        {#if selectbox}
          <div class="space-y-2">
            <label for="category" class="text-white">Category</label>
            <select 
              id="category" 
              bind:value={formData.Category} 
              required
              class="w-full bg-black pl-2 p-1 border text-white rounded-md text-sm"
            >
              {#each options as opt}
                <option value={opt.value}>{opt.label}</option>
              {/each}
            </select>
          </div>
        {/if}
      </div>

      <div class="flex flex-col md:flex-row justify-between items-start pt-4 border-t border-gray-700 gap-4">
        <div class="w-full md:w-2/3 space-y-3">
          <input 
            id="image" 
            type="file" 
            accept="image/*" 
            multiple
            on:change={handleFileSelect}
            class="hidden"
          />
          <div class="flex flex-wrap items-center gap-3">
            <label 
              for="image" 
              class="cursor-pointer inline-flex items-center px-4 py-2 rounded-md text-sm font-medium
                     bg-gray-700 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 
                     focus:ring-offset-2 focus:ring-gray-500 {selectedFiles.length >= MAX_FILES ? 'opacity-50 cursor-not-allowed' : ''}"
              class:pointer-events-none={selectedFiles.length >= MAX_FILES}
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {selectedFiles.length > 0 ? `Change Images (${selectedFiles.length}/${MAX_FILES})` : 'Upload Images'}
            </label>
            {#if selectedFiles.length > 0}
              <span class="text-sm text-gray-300">
                {selectedFiles.length} of {MAX_FILES} file(s) selected
              </span>
            {/if}
          </div>

          {#if selectedFiles.length > 0}
            <div class="bg-gray-800/50 rounded-lg p-2">
              <div class="max-h-40 overflow-y-auto space-y-2">
                {#each selectedFiles as file, i (i)}
                  <div class="flex items-center justify-between gap-2 text-sm text-gray-300 p-2 bg-gray-800/50 rounded-md">
                    <div class="flex items-center gap-2 min-w-0 flex-1">
                      <span class="truncate">{file.name}</span>
                      <span class="text-xs text-gray-400 whitespace-nowrap">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                    </div>
                    <button
                      type="button"
                      class="text-red-400 hover:text-red-300 p-1"
                      on:click={() => {
                        selectedFiles = selectedFiles.filter((_, index) => index !== i);
                        totalSize = selectedFiles.reduce((acc, file) => acc + file.size, 0);
                      }}
                    >
                      ×
                    </button>
                  </div>
                {/each}
              </div>
            </div>
          {/if}
        </div>

        <div class="flex gap-2 w-full md:w-auto">
          <Button 
            type="button" 
            variant="destructive" 
            on:click={cancelForm}
            class="flex-1 md:flex-initial text-white hover:bg-gray-800"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            class="flex-1 md:flex-initial text-white"
          >
            Submit Feature
          </Button>
        </div>
      </div>
    </form>
  {/if}
</div>

<AlertDialog.Root bind:open={showSuccessDialog}>
  <AlertDialog.Content class="sm:max-w-[425px] bg-gray-900 text-white border border-gray-700">
    <AlertDialog.Header>
      <AlertDialog.Title class="text-xl font-semibold">Berhasil!</AlertDialog.Title>
      <AlertDialog.Description class="text-gray-300">
        Terima kasih! Feedback Anda telah berhasil dikirim dan akan kami tinjau segera.
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer class="border-t border-gray-700">
      <AlertDialog.Action on:click={closeSuccessDialog}>
        <Button variant="default" class="bg-primary hover:bg-primary/90">
          Tutup
        </Button>
      </AlertDialog.Action>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>

<AlertDialog.Root bind:open={showErrorDialog}>
  <AlertDialog.Content class="sm:max-w-[425px] bg-gray-900 text-white border border-gray-700">
    <AlertDialog.Header>
      <AlertDialog.Title class="text-xl font-semibold text-red-500">Error!</AlertDialog.Title>
      <AlertDialog.Description class="text-gray-300">
        Maaf, terjadi kesalahan saat mengirim feedback. Silakan coba lagi nanti.
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer class="border-t border-gray-700">
      <AlertDialog.Action on:click={closeErrorDialog}>
        <Button variant="destructive">
          Tutup
        </Button>
      </AlertDialog.Action>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>