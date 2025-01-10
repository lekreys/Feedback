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
  let selectedFile = null;

  let formData = {
    Title: '',
    Description: '',
    Category: '',
    Vote: 0,
    image: null
  };

  function handleFileSelect(event) {
    const file = event.target.files[0];
    const maxSize = 5 * 1024 * 1024; // 5MB limit
    
    if (file) {
      if (file.size > maxSize) {
        alert('File size must be less than 5MB');
        event.target.value = ''; // Reset input
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        alert('Only image files are allowed');
        event.target.value = '';
        return;
      }
      
      selectedFile = file;
      formData.image = file.name;
    }
  }

  async function Postdata(data) {
    try {
      const formDataObj = new FormData();
      formDataObj.append('Title', data.Title);
      formDataObj.append('Description', data.Description);
      formDataObj.append('Category', data.Category);
      formDataObj.append('Vote', data.Vote);
      
      if (selectedFile) {
        formDataObj.append('image', selectedFile);
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
    if (selectedFile) {
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
      Vote: 0,
      image: null
    };
    selectedFile = null;
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
            class="bg-transparent border-0 text-white"
          />
        </div>
        
        <div class="space-y-2">
          <label for="description" class="text-white">Description</label>
          <Input 
            id="description" 
            type="text" 
            bind:value={formData.Description} 
            placeholder="Any additional details..." 
            required
            class="bg-transparent border-0 text-white"
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

      <div class="flex justify-between items-center pt-4 border-t border-gray-700">
        <!-- Left side: File Upload Input -->
        <div class="flex items-center gap-2">
          <input 
            id="image" 
            type="file" 
            accept="image/*" 
            on:change={handleFileSelect}
            class="hidden"
          />
          <label 
            for="image" 
            class="cursor-pointer inline-flex items-center px-4 py-2 rounded-md text-sm font-medium
                   bg-gray-700 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 
                   focus:ring-offset-2 focus:ring-gray-500"
          >
            {selectedFile ? 'Change Image' : 'Upload Image'}
          </label>
          {#if selectedFile}
            <span class="text-sm text-gray-300 truncate max-w-[150px]">
              {selectedFile.name}
            </span>
          {/if}
        </div>

        <!-- Right side: Action Buttons -->
        <div class="flex gap-2">
          <Button 
            type="button" 
            variant="destructive" 
            on:click={cancelForm}
            class="text-white hover:bg-gray-800"
          >
            Cancel
          </Button>
          <Button type="submit" class="text-white">
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