# Vue - Shop Component

This Repo contains the shop vue component which interacts with Sums' [Pluto API](https://github.com/University-of-Lincoln-SU/External-Developer-Docs/tree/master/PlutoAPI)

You will need to include the following scripts:

```
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="location-where-comp-is-stored.js"></script>
<script>
    var app = new Vue({
        el: '#main'
    });
</script>
```

You can then use following code anywhere you want to use the component.

```
<div id="main">
    <shop siteid="" />
</div>
```

The component will load up to 12 products at a time. More products can be fetched by clicking the included "load More" button or by scrolling to the bottom of the page.

Products are sorted by name and only products with stock are included.  

The included index.html document can be used for local testing.

## Parameters
---

The ```<shop>``` component can be passed the following arguments to change what is displayed:

- ```siteid``` [```string```] (required): SUMS X-Site-Id
- ```title``` [```string```]: Title for the shop element, eg "YUSU Shop"
- ```featuredshop``` [```boolean```]: Show just Union Shop items, rather than every product on sale
- ```hidefilter``` [```boolean```]: hide the shop search and activity filters
