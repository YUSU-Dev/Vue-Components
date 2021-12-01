# Vue - Events Component

This Repo contains the events vue component which interacts with Sums' [Pluto API](https://github.com/University-of-Lincoln-SU/External-Developer-Docs/tree/master/PlutoAPI)

The ```global/.footer``` template can be passed the parameter ```vue_comp="vue-events-vX.x"``` where ```X.x``` is the current version of vue-events uploaded to the SUMS AWS bucket.  

You can then use following code anywhere you want to use the component.

```
<div id="main">
    <events></events>
</div>
```

The component will load 12 events at a time. More events can be fetched by clicking the included "load More" button or by scrolling to the bottom of the page - Lazy-load has been implemented.

Events are sorted by start Date and only currentOrFuture events are included.

The included index.html document can be used for local testing.

## Parameters
---
The ```<events>``` component can be passed the following arguments to change what is displayed:

- typeId [Int] - Show events by this event Type
- groupId [Int] - Show events by this SUMS activity
- venueid [Int] - Show events in this venue

If any of the above arguments are included, the component will not show the search/filter bar, so can be included in a smaller section of the page.

- smallCard [Bool] - Don't show the event description to reduce the event card size

## Examples
---

### Show full search/filter and all events (default)
``` <events></events> ```

[](docs\fullEventView.png)


### Show all "YUSU Election" events without event descriptions
``` <events typeId="25" smallCard="true"></events> ```

[](docs\electionEvents.png)


