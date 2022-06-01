# Vue - Activities A-Z Component

This Repo contains the activities vue component which interacts with Sums' [Pluto API](https://github.com/University-of-Lincoln-SU/External-Developer-Docs/tree/master/PlutoAPI)

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
    <v-activities-a-z siteid="" />
</div>
```

The component will load 25 activities at a time. More activites can be fetched by clicking the included "load More" button.

Activities are sorted by name.

The included index.html document can be used for local testing.

## Versions
---
V1.x is not supported  
v2.x uses the Pluto API

## Parameters
---
```siteid``` (required): SUMS X-Site-Id

```selectedparents```: comma separated string of parent categories to display.  
eg. ```<v-activities-a-z selectedparents="2,24"></v-activities-a-z>``` returns Sport Clubs and Societies at YUSU  

```selectedcategory```: A single category to diplay. Will hide filters, but not search

```title```: Set title of the component

### URL Parameters

Passing ```?search=``` will activate the component search functionality.
