<script>
    import Form from "./form.svelte";
    import Showfeedback from "./showfeedback.svelte";

    export let data;
    export let header = '';
    export let desc = '';

    export let options;
    export let selectbox;

    export let endpoint;
    console.log(data)
</script>





<div class="justify-center">

    


  <div class="flex justify-center">

     
    <div class="bg-card  mt-12 rounded-lg p-4 w-8/12">
    
        <h1 class="text-white font-semibold">{header}</h1>
        <p class="text-white text-sm">{desc}</p>
    
        <Form endpoint={endpoint} options ={options} selectbox={selectbox}></Form>


        <Showfeedback data_json={data} endpoint={endpoint}></Showfeedback>
        
    
    
    
    </div>

  </div>
  
    
   

</div>
