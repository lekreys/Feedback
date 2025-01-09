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


<Base data={data} header="Bugs" desc="Report any bugs or issues you may have encountered while using Elwyn.ai" endpoint='bugs' options={categories} selectbox=true></Base>

