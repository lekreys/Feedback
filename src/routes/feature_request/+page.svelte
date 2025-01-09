<script>
    import Base from "$lib/base.svelte";
    export let data



    export let categories = [
    { value: "", label: "Select Category" },
    { value: "Mobile", label: "Mobile" },
    { value: "Desktop App", label: "Desktop App" },
    { value: "Web", label: "Web" },
    { value: "Uncategorized", label: "Uncategorized" }
    ];

</script>



<Base data={data} header="Feature Request" desc="Have something you would like to see in Elwyn.ai ? Let us know!" endpoint="feature_request" options={categories} selectbox=true></Base>