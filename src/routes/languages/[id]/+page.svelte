<script>

    import Showdetail from '$lib/showdetail.svelte';
    export let data

    console.log(data)

</script>



<div>

    <Showdetail data={data.data} url="languages"></Showdetail>

</div>

