let layout = `
<div>
    <section class="pt-3 g-bg-gray-light-v5" ref="NewsTop" v-if="!ShortView">
        <div class="contacts-wrapper">
            <div class="container">
                <div class="row">
                    <div class="col-xl-12">
                        <form class="form message-form">
                            <h2 class="form__title h6">Filter Events</h2>
                            <div class="row">
                                <div class="col-lg-3 pt-3">
                                    <label class="g-font-weight-600 g-font-size-15 g-pl-30" for="event-category">Category</label>
                                    <select id="event-category" class="form-select g-brd-black g-brd-2 w-100 u-select-v2 u-shadow-v19 g-color-black g-color-primary--hover g-bg-white text-left g-rounded-30 g-pl-30 g-py-12" data-placeholder="All" data-open-icon="fa fa-angle-down" data-close-icon="fa fa-angle-up" @change="updateCategory($event)">
                                    <option value="">All</option>
                                    <option v-for="category in Categories" :value="category.id">{{ category.name }}</option>
                                    </select>
                                </div>
                                <div class="col-lg-3 pt-3">
                                    <label class="g-font-weight-600 g-font-size-15 g-pl-30" for="event-activity">Activity</label>
                                    <select id="event-activity" class="form-select g-brd-black g-brd-2 g-brd-2 w-100 u-select-v2 u-shadow-v19 g-color-black g-color-primary--hover g-bg-white text-left g-rounded-30 g-pl-30 g-py-12" data-placeholder="All" data-open-icon="fa fa-angle-down" data-close-icon="fa fa-angle-up" @change="updateGroup($event)">
                                    <option value="">All</option>
                                    <option v-for="activity in Groups" :value="activity.id">{{ activity.name }}</option>
                                    </select>
                                </div>
                                <div class="col-lg-3 pt-3">
                                    <label class="g-font-weight-600 g-font-size-15 g-pl-30" for="event-search" >Search</label>
                                    <div class="input-group mb-3">
                                        <input id="event-search" class="form-control u-shadow-v19 g-brd-black g-brd-2 g-bg-white g-font-size-16 g-rounded-left-30 g-px-30 g-py-13 g-mb-30" aria-label="Search" type="text" name="search" placeholder="Search..." :value=Search />
                                        <div class="input-group-append">
                                            <button type="submit" class="btn btn-block u-shadow-v32 g-brd-black g-brd-2 g-color-black g-color-white--hover g-bg-transparent g-bg-black--hover g-font-size-16 g-rounded-right-30 g-px-20 g-py-13 g-mb-30" aria-label="Submit"><i class="fas fa-search"></i></button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-2 pt-3 mt-3 d-none d-md-block">
                                    <button class="btn btn-block u-shadow-v32 g-brd-black g-brd-2 g-color-black g-color-white--hover g-bg-transparent g-bg-black--hover g-font-size-16 g-rounded-30 g-py-10 mr-2 g-mt-20 g-mb-30" type="button" @submit.prevent @click="changeView()" v-if="Cards"><i class="fas fa-list"></i> List View</button>
                                    <button class="btn btn-block u-shadow-v32 g-brd-black g-brd-2 g-color-black g-color-white--hover g-bg-transparent g-bg-black--hover g-font-size-16 g-rounded-30 g-py-10 mr-2 g-mt-20 g-mb-30" type="button" @submit.prevent @click="changeView()" v-else><i class="fas fa-address-card"></i> Card View</button>
                                </div>
                                <div class="col-lg-1 pt-3 mt-3">
                                    <button class="btn btn-block u-shadow-v32 g-brd-black g-brd-2 g-color-black g-color-white--hover g-bg-transparent g-bg-black--hover g-font-size-16 g-rounded-30 g-py-10 mr-2 g-mt-20 g-mb-30" type="button" @submit.prevent @click="reset()">Reset</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Actual Events -->
    <section class="section blog background--brown pt-4" @scroll="onScroll">
        <div class="container">
            <div class="row">
                <div class="col g-mb-30">
                    <div class="row d-flex justify-content-center m-4" v-if="!Events.length">
                        <p class="h3">No Events Available</p>
                    </div>
                    <div v-if="Cards">
                        <div class="row justify-content-center">
                            <div class="col-md-3 my-3" v-for="event in Events">
                                <div class="card h-100">
                                    <div class="card-header h5 text-center" style="color:black !important;"><em>
                                        <time :datetime="event.start_date">{{ event.start_date | getDate }}</time></em>
                                    </div>
                                    <img v-if=event.thumbnail_url class="card-img-top"  :src=event.thumbnail_url alt="" />
                                    <img v-else-if="event.group && event.group.thumbnail_url" class="card-img-top" :src=event.group.thumbnail_url alt="" />
                                    <img v-else class="card-img-top" src="https://d350x4n02brjm.cloudfront.net/sums/website/images/500x500_Placeholder.jpg" alt="" />
                                    <div class="card-body text-center">
                                        <a :href="'/events/id/' + event.event_id + '-' + event.url_name">
                                            <h2 class="g-color-gray-dark-v2 h5 card-title" v-html="event.title"></h2>
                                        </a>
                                        <p class="card-text"><small>Start times from {{ event.start_date | getTime }}<span v-if=event.venue> | {{ event.venue.name }}</span></small></p>
                                        <p class="card-text" v-if=!(smallcard)>{{ event.short_description }}</p>
                                    </div>
                                    <div class="card-footer bg-white">
                                        <div class="text-center" v-if=event.external_tickets>
                                            <a class="btn btn-xl u-btn-primary rounded-0 text-uppercase g-font-weight-700 g-font-size-12 g-mr-5 g-mt-10"
                                            :href=event.external_tickets>
                                            Tickets</a>
                                        </div>
                                        <div class="text-center" v-else>
                                            <a class="btn btn-xl u-btn-primary rounded-0 g-font-weight-700 g-font-size-12 g-mr-5 g-mt-10 text-white event-info-button"
                                            :href="'/events/id/' + event.event_id + '-' + event.url_name">More Information</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <div class="row" v-for="event in Events">
                            <article class="card my-2 container">
                                <div class="row">
                                    <!-- Date -->
                                    <div class="col-md-1 py-sm-3 align-items-center d-flex justify-content-center text-center mt-3">
                                        <time :datetime="event.start_date">
                                        <span   class="d-block g-font-weight-700 g-font-size-40 g-line-height-1 g-color-black">{{ event.start_date | getDay }}</span>
                                        {{ event.start_date | getMonthYear }}
                                        </time>
                                    </div>
                                    <!-- End Date -->
                                    <!-- Article Image -->
                                    <a :href=event.URL class="col-md-2 p-2 align-items-center d-flex justify-content-center text-center event-img">
                                        <img v-if=event.thumbnail_url class="d-block px-2 g-ml-minus-1 hoverZoomLink img-fluid"  :src=event.thumbnail_url alt="" />
                                        <img v-else-if="event.group && event.group.thumbnail_url" class="d-block px-2 g-ml-minus-1 hoverZoomLink img-fluid" :src=event.group.thumbnail_url alt="" />
                                        <img v-else class="d-block px-2 g-ml-minus-1 hoverZoomLink img-fluid" src="https://d350x4n02brjm.cloudfront.net/sums/website/images/500x500_Placeholder.jpg" alt="" />
                                    </a>
                                    <!-- End Article Image -->
                                    <!-- Article Content -->
                                    <div class="g-py-15 g-px-20 col-md-6 text-center text-md-left mt-3">
                                        <h4 class="h6 text-uppercase g-font-weight-700 g-mb-0">
                                            <a class="g-color-gray-dark-v2" :href=event.URL v-html="event.title"></a>
                                        </h4>
                                        <small><i>Start times from {{ event.start_date | getTime }} <i v-if=event.venue> | {{ event.venue.name }}</i></i></small>
                                        <div class="g-mt-0">
                                            {{ event.short_description }}
                                        </div>
                                    </div>
                                    <!-- End Article Content -->
                                    <!-- Actions -->
                                    <div class="g-pa-20 col-md-2 ml-md-4 align-items-center d-flex justify-content-center text-center">
                                        <div class="row g-mt-minus-10 px-2 py-2" v-if=event.external_tickets>
                                            <a class="btn btn-xl u-btn-secondary rounded-0 text-uppercase g-font-weight-700 g-font-size-12 g-mr-5 g-mt-10"
                                            :href="'/events/id/' + event.event_id + '-' + event.url_name">Info</a>
                                            <a class="btn btn-xl u-btn-primary rounded-0 text-uppercase g-font-weight-700 g-font-size-12 g-mr-5 g-mt-10"
                                            :href=event.external_tickets>
                                            Get Tickets</a>
                                        </div>
                                        <div class="row g-mt-minus-10 px-2 py-2" v-else>
                                            <a class="btn btn-xl u-btn-primary rounded-0 text-uppercase g-font-weight-700 g-font-size-12 g-mr-5 g-mt-10"
                                            :href="'/events/id/' + event.event_id + '-' + event.url_name">Info &amp; Tickets</a>
                                        </div>
                                    </div>
                                </div>
                                <!-- End Actions -->
                            </article>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row d-flex justify-content-center m-3" v-if="MoreResults">
                <button type="button" class="btn btn-xl u-btn-secondary rounded-0 text-uppercase g-font-weight-700 g-font-size-12 g-mr-5 g-mt-10" @click="moreEvents()">Load More <i class="fa fa-chevron-down"></i></button>
            </div>
        </div>
    </section>
</div>
`
    /**
     * Create a Vue component that fetches events from the Pluto API and displays them as either cards or rows
     * If the component is passed a groupid, 'typeid' or 'venueid' the component will only return that group/type/venue's events, without the search bar
     */
Vue.component('events', {
    template: layout,
    props: ['groupid', 'typeid', 'venueid', 'smallcard'],
    data() {
        return {
            Categories: [],
            Groups: [],
            Events: [],
            SelectedType: '',
            SelectedGroup: '',
            SelectedVenue: '',
            Search: '',
            Page: 1,
            MoreResults: false,
            Cards: true,
            Premium: false,
            ShortView: false,
        }
    },
    created() {
        var self = this;
        //if we have a groupid, only list that group's events
        if (self.groupid) {
            self.SelectedGroup = self.groupid;
            self.ShortView = true;
        } else if (self.typeid) {
            self.SelectedType = self.typeid;
            self.ShortView = true;
        } else if (self.venueid) {
            self.SelectedVenue = self.venueid;
            self.ShortView = true;
        } else {
            //check if looking for a specific activity, search, etc...
            let urlParams = new URLSearchParams(window.location.search);
            if (urlParams.has('activity')) {
                self.SelectedGroup = urlParams.get('activity');
            }
            if (urlParams.has('search')) {
                self.Search = urlParams.get('search');
            }
            if (urlParams.has('category')) {
                self.SelectedType = urlParams.get('category');
            }
            //Get Categories
            axios.get('https://pluto.sums.su/api/events/types?sortBy=name', {
                headers: {
                    'X-Site-Id': 'tZyLG9BX9f4hdTp2HLva5c'
                }
            }).then(function(response) {
                self.Categories = response.data;
            });
            //get Activities
            axios.get('https://pluto.sums.su/api/groups?sortBy=name&selectList=1', {
                headers: {
                    'X-Site-Id': 'tZyLG9BX9f4hdTp2HLva5c'
                }
            }).then(function(response) {
                self.Groups = response.data;
            });
        }
        //get Events
        self.getEvents();
    },
    mounted() {
        //allow scrolling functionality
        this.onScroll();
    },
    methods: {
        /**
         * Fetch events from API
         * @param bool append - are we getting more events to append to the current list?
         */
        getEvents: function(append = false) {

            let parameters = 'sortBy=start_date&futureOrOngoing=1&perPage=12&page=' + this.Page;
            //add relevant parameters to the event search
            if (this.SelectedType) {
                parameters += '&typeId=' + this.SelectedType;
            }
            if (this.SelectedGroup) {
                parameters += '&groupId=' + this.SelectedGroup;
            }
            if (this.SelectedVenue) {
                parameters += '&venueId=' + this.SelectedVenue;
            }
            if (this.Search) {
                parameters += '&searchTerm=' + this.Search;
            }
            //future proofing, in case we want to do something with "premium events"
            if (this.Premium) {
                parameters += "&onlyPremium=1";
            }
            let self = this;
            axios.get('https://pluto.sums.su/api/events?' + parameters, {
                headers: {
                    'X-Site-Id': 'tZyLG9BX9f4hdTp2HLva5c'
                }
            }).then(function(response) {
                //if we want more events (append = true), add to array
                if (append) {
                    self.Events = [...self.Events, ...response.data.data];
                } else {
                    //otherwise replace current events
                    self.Events = response.data.data;
                }
                //If the API says there are more results (ie another page), update the template accordingly
                if (response.data.next_page_url) {
                    self.MoreResults = true
                } else {
                    self.MoreResults = false
                }
            })
        },
        /**
         * Track when the user scrolls down the page
         */
        onScroll() {
            window.onscroll = () => {
                let bottomOfWindow = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight + 10 >= document.documentElement.offsetHeight

                //automatically get more results if at bottom of page
                if (bottomOfWindow) {
                    this.moreEvents();
                }
            }
        },
        //update various fields to change events data
        updateCategory(event) {
            this.SelectedType = event.target.value
            this.getEvents()
        },
        updateGroup(event) {
            this.SelectedGroup = event.target.value
            this.getEvents()
        },
        search(event) {
            this.Search = event.target.value
            this.getEvents()
        },
        reset() {
            //easy way to refresh the page
            window.location = window.location.href.split("?")[0];
        },
        moreEvents() {
            this.Page++;
            this.getEvents(true);
        },
        changeView() {
            this.Cards = !this.Cards;
        }
    }
});

//Various filters to formate dates and time for template
Vue.filter('getDate', function(value) {
    if (value) {
        return moment(String(value)).format('DD MMMM')
    }
});

Vue.filter('getDay', function(value) {
    if (value) {
        return moment(String(value)).format('DD')
    }
});

Vue.filter('getMonthYear', function(value) {
    if (value) {
        return moment(String(value)).format('MMMM YYYY')
    }
});

Vue.filter('getTime', function(value) {
    if (value) {
        return moment(String(value)).format('hh:mm a')
    }
})