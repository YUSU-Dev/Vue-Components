# Vue - Events Component

This Repo contains the events vue component which interacts with Sums' [Pluto API](https://github.com/University-of-Lincoln-SU/External-Developer-Docs/tree/master/PlutoAPI)

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
    <events></events>
</div>
```

The component will load 12 events at a time. More events can be fetched by clicking the included "load More" button or by scrolling to the bottom of the page - Lazy-load has been implemented.

Events are sorted by start Date and only currentOrFuture events are included.

The included index.html document can be used for local testing.

If the page has [Select2](https://select2.org/) loaded, the two select dropdowns will load as searchable select2 dropdowns. All styling of the componant is done using [bootstrap](https://getbootstrap.com/).

## Parameters
---
The ```<events>``` component can be passed the following arguments to change what is displayed:

- typeId [Int] - Show events by this event Type
- groupId [Int] - Show events by this SUMS activity
- venueId [Int] - Show events in this venue
- limit [Int] - only show this many cards

If any of the above arguments are included, the component will not show the search/filter bar, so can be included in a smaller section of the page. It also uses horizontal scrolling on small screens to limit the amount of vertical space taken up.

- smallCard [Bool] - Don't show the event description to reduce the event card size
- premium [Bool] - Only show "premium" tagged events in SUMS

## Examples
---

### Show full search/filter and all events (default)
``` <events></events> ```

[](docs\fullEventView.png)


### Show all "YUSU Election" events without event descriptions
``` <events typeId="25" smallCard="true"></events> ```

[](docs\electionEvents.png)


