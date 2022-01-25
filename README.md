# Vue - Activities A-Z Component

This Repo contains the activities vue component which interacts with Sums' [Pluto API](https://github.com/University-of-Lincoln-SU/External-Developer-Docs/tree/master/PlutoAPI)

The ```global/.footer``` template can be passed the parameter ```vue_comp="vue-activities-az-v2.x"``` where ```2.x``` is the current version of vue-events uploaded to the SUMS AWS bucket.  

You can then use following code anywhere you want to use the component.

```
<div id="main">
    <v-activities-a-z />
</div>
```

The component will load 25 activities at a time. More activites can be fetched by clicking the included "load More" button or by scrolling to the bottom of the page - Lazy-load has been implemented.

Activities are sorted by name.

The included index.html document can be used for local testing.

## Versions
---
V1.x is depreciated but included for legacy purposes
v2.x uses the Pluto API

## Parameters
---
The ```<v-activities-a-z >``` component does not have any parameters.

### URL Parameters

Passing ```?search=``` will activate the component search functionality.