<script>
    import Base from "$lib/base.svelte";
    export let data

    export let categories = [
        { value: "", label: "Select Category" },
        { value: "Bug", label: "Bug" },
        { value: "Uncategorized", label: "Uncategorized" },

    ];
</script>





<Base data={data} header="Public API" desc="Share your ideas and requests for the official Elwyn API. Documentation available at https://app.elwyn.ai/docs" endpoint="public_api" options={categories} selectbox=true></Base>