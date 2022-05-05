# Vue - Shop Component

> This component is currenly pre-production as the api endpoints are not finished. It also requires a lot of data updating as most products do not have a category!


This Repo contains the shop vue component which interacts with Sums' [Pluto API](https://github.com/University-of-Lincoln-SU/External-Developer-Docs/tree/master/PlutoAPI)

The ```global/.footer``` template can be passed the parameter ```vue_comp="vue-shop-vX.x"``` where ```X.x``` is the current version of vue-shop uploaded to the SUMS AWS bucket.  

You can then use following code anywhere you want to use the component.

```
<div id="main">
    <shop></shop>
</div>
```

The component will load up to 12 products at a time. More products can be fetched by clicking the included "load More" button or by scrolling to the bottom of the page.

Events are sorted by name and only products with stock are included.  
There are two types of products, "All" and "YUSU Shop". "All" will list every product on sums, including memberships and activity products. 

The included index.html document can be used for local testing.

## Parameters
---

Currently None!
