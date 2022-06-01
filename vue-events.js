let layout = `
<div class="w-100">
    <div v-if="ShortView">
        <div class="text-center scrolling-wrapper flex-nowrap flex-lg-wrap justify-content-lg-center position-relative py-3">
            <div class="scroll-item m-2" v-for="event in Events">
                <a :href="'/events/id/' + event.event_id + '-' + event.url_name" class="text-dark">
                    <div class="card h-100">
                        <div class="card-header h5 text-center" style="color:black !important;"><em>
                                <time :datetime="event.start_date">{{ event.start_date | getDate }}</time></em>
                        </div>
                        <img v-if=event.thumbnail_url class="card-img-top" :src=event.thumbnail_url alt="" />
                        <img v-else-if="event.group && event.group.thumbnail_url" class="card-img-top"
                            :src=event.group.thumbnail_url alt="" />
                        <img v-else class="card-img-top"
                            src="https://d350x4n02brjm.cloudfront.net/sums/website/images/500x500_Placeholder.jpg" alt="" />
                        <div class="card-body text-center">
                            <h2 class="text-dark h5 card-title" v-html="event.event_date_title"></h2>
                            <p class="card-text"><small>Start times from {{ event.start_date | getTime }}<span
                                        v-if=event.venue> | {{ event.venue.name }}</span></small></p>
                            <p class="card-text" v-if=!(smallcard)>{{ event.short_description }}</p>
                        </div>
                        <div class="card-footer p-0 bg-white">
                            <div class="text-center" v-if=event.external_tickets>
                                <a class="btn btn-xl btn-secondary rounded text-uppercase p-3 m-2 text-wrap"
                                    :href=event.external_tickets>
                                    Tickets
                                </a>
                            </div>
                            <div class="text-center" v-else>
                                <p class="btn btn-xl btn-secondary rounded p-3 m-2 text-white event-info-button text-wrap">
                                    More Information
                                </p>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div v-else>
        <section class="pt-3">
            <div class="contacts-wrapper">
                <div class="container">
                    <div class="row">
                        <div class="col-xl-12">
                            <form class="form">
                                <h2 class="h6">Filter Events</h2>
                                <div class="row">
                                    <div class="col-lg-3 pt-3">
                                        <label for="event-category">Category</label>
                                        <select id="event-category" class="form-control" data-placeholder="All"
                                            data-open-icon="fa fa-angle-down" data-close-icon="fa fa-angle-up"
                                            @change="updateCategory($event)">
                                            <option value="">All</option>
                                            <option v-for="category in Categories" :value="category.id">{{ category.name }}</option>
                                        </select>
                                    </div>
                                    <div class="col-lg-3 pt-3">
                                        <label for="event-activity">Activity</label>
                                        <select id="event-activity" class="form-control" data-placeholder="All"
                                            data-open-icon="fa fa-angle-down" data-close-icon="fa fa-angle-up"
                                            @change="updateGroup($event)">
                                            <option value="">All</option>
                                            <option v-for="activity in Groups" :value="activity.id">{{ activity.name }}
                                            </option>
                                        </select>
                                    </div>
                                    <div class="col-lg-4 pt-3">
                                        <label for="event-search">Search</label>
                                        <div class="input-group mb-3">
                                            <input id="event-search" class="form-control" aria-label="Search"
                                                type="text" name="search" placeholder="Search..." :value=Search />
                                            <div class="input-group-append">
                                                <button type="submit" class="btn btn-block btn-secondary"
                                                    aria-label="Submit"><i class="fas fa-search"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-2 pt-3">
                                        <label>Reset Form</label>
                                        <button class="btn btn-block btn-secondary" type="button"
                                            @submit.prevent @click="reset()">Reset</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Actual Events -->
        <section class="section pt-4" @scroll="onScroll">
            <div class="container">
                <div class="row">
                    <div class="col g-mb-30">
                        <div class="row d-flex justify-content-center m-4" v-if="!Events.length">
                            <p class="h3">No Events Available</p>
                        </div>
                        <div class="row justify-content-center">
                            <div class="col-6 col-md-3 my-3" v-for="event in Events">
                                <a :href="'/events/id/' + event.event_id + '-' + event.url_name" class="text-dark">
                                    <div class="card h-100">
                                        <div class="card-header h5 text-center" style="color:black !important;"><em>
                                                <time :datetime="event.start_date">{{ event.start_date | getDate }}</time></em>
                                        </div>
                                        <img v-if=event.thumbnail_url class="card-img-top" :src=event.thumbnail_url alt="" />
                                        <img v-else-if="event.group && event.group.thumbnail_url" class="card-img-top"
                                            :src=event.group.thumbnail_url :alt="event.group.name + ' Logo'" />
                                        <img v-else class="card-img-top"
                                            src="https://d350x4n02brjm.cloudfront.net/sums/website/images/500x500_Placeholder.jpg"
                                            alt="" />
                                        <div class="card-body text-center">
                                            <h2 class="text-dark h5 card-title" v-html="event.event_date_title"></h2>
                                            <p class="card-text"><small>Start times from {{ event.start_date | getTime }}<span
                                                        v-if=event.venue> | {{ event.venue.name }}</span></small></p>
                                            <p class="card-text" v-if=!(smallcard)>{{ event.short_description }}</p>
                                        </div>
                                        <div class="card-footer p-0 bg-white">
                                            <div class="text-center" v-if=event.external_tickets>
                                                <a class="btn btn-xl btn-secondary yu-bg-primary rounded text-uppercase p-3 m-2 text-wrap"
                                                    :href=event.external_tickets>
                                                    Tickets</a>
                                            </div>
                                            <div class="text-center" v-else>
                                                <p class="btn btn-xl btn-secondary rounded p-3 m-2 text-white event-info-button text-wrap">
                                                    More Information
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row d-flex justify-content-center m-3" v-if="MoreResults && !limit">
                    <button type="button"
                        class="btn btn-xl u-btn-secondary rounded-0 text-uppercase g-font-weight-700 g-font-size-12 g-mr-5 g-mt-10"
                        @click="moreEvents()">Load More <i class="fa fa-chevron-down"></i></button>
                </div>
            </div>
        </section>
    </div>
</div>
`
    /**
     * Create a Vue component that fetches events from the Pluto API and displays them as event cards
     * If the component is passed a groupid, 'typeid' or 'venueid' the component will only return that group/type/venue's events, without the search bar
     */
Vue.component('events', {
    template: layout,
    props: ['groupid', 'typeid', 'venueid', 'smallcard', 'limit', 'premium'],
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
            Premium: false,
            ShortView: false,
        }
    },
    created() {
        var self = this;
        //Only show "premium" tagged events
        if (self.premium){
            self.Premium = true;
        }
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
        } else if (self.limit){
            self.ShortView = true;
        } else {
            //check if looking for a specific activity, search, etc...
            let urlParams = new URLSearchParams(window.location.search);
            if (urlParams.has('activity_id')) {
                self.SelectedGroup = urlParams.get('activity_id');
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
        if (!this.limit){
            this.onScroll();
        }
        //Add Select2 Search dropdowns to the selects - if not present is ignored
        try {
            $('#event-category, #event-activity').select2();
        } catch {}
    },
    methods: {
        /**
         * Fetch events from API
         * @param bool append - are we getting more events to append to the current list?
         */
        getEvents: function(append = false) {
            let self = this;
            if (!append) { self.Page = 1; }
            let parameters = 'sortBy=start_date&futureOrOngoing=1&page=' + this.Page;
            //add relevant parameters to the event search
            if (this.limit) {
                parameters += '&perPage=' + this.limit;
            } else {
                parameters += '&perPage=12';
            }
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
            if (this.Premium) {
                parameters += "&onlyPremium=1";
            }
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