let layout = `
<div class="g-bg-gray-light-v5 ">
    <section class="pt-3" ref="NewsTop">
        <div class="contacts-wrapper">
            <div class="container">
                <div class="row">
                    <div class="col-xl-12">
                        <form class="form message-form">
                            <h6 class="form__title">Filter Events</h6>
                            <div class="row">
                                <div class="col-lg-3 pt-3">
                                    <label class="g-font-weight-500 g-font-size-15 g-pl-30">Category</label>
                                    <select class="form-select w-100 u-select-v2 u-shadow-v19 g-brd-none g-color-black g-color-primary--hover g-bg-white text-left g-rounded-30 g-pl-30 g-py-12" data-placeholder="All" data-open-icon="fa fa-angle-down" data-close-icon="fa fa-angle-up" @change="updateCategory($event)">
                                    <option value="">All</option>
                                    <option v-for="category in Categories" :value="category.id">{{ category.name }}</option>
                                    </select>
                                </div>
                                <div class="col-lg-3 pt-3">
                                    <label class="g-font-weight-500 g-font-size-15 g-pl-30">Activity</label>
                                    <select class="form-select w-100 u-select-v2 u-shadow-v19 g-brd-none g-color-black g-color-primary--hover g-bg-white text-left g-rounded-30 g-pl-30 g-py-12" data-placeholder="All" data-open-icon="fa fa-angle-down" data-close-icon="fa fa-angle-up" @change="updateGroup($event)">
                                    <option value="">All</option>
                                    <option v-for="activity in Groups" :value="activity.id">{{ activity.name }}</option>
                                    </select>
                                </div>
                                <div class="col-lg-3 pt-3">
                                    <label class="g-font-weight-500 g-font-size-15 g-pl-30">Search</label>
                                    <input class="form-control u-shadow-v19 g-brd-none g-bg-white g-font-size-16 g-rounded-30 g-px-30 g-py-13 g-mb-30" type="text" name="search" placeholder="Search..." @keyup="search($event)"/>
                                </div>

                                <div class="col-lg-3 pt-3">
                                    <label class="g-font-weight-500 g-font-size-15 g-pl-30"></label>
                                    <button class="btn btn-block u-shadow-v32 g-brd-black g-brd-2 g-color-black g-color-white--hover g-bg-transparent g-bg-black--hover g-font-size-16 g-rounded-30 g-py-10 mr-2 g-mt-0" type="button" @click.prevent="ResetForm" @click="reset()">Reset</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Actual Events -->
    <section class="section blog background--brown">
        <div class="container">
            <div class="row">
                <div class="col g-mb-30">
            <div class="row d-flex justify-content-center m-4" v-if="!Events.length">
                <p class="h3">No Events Available</p>
            </div>
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
            <div class="row d-flex justify-content-center m-3">
                <button type="button" class="btn btn-xl u-btn-primary rounded-0 text-uppercase g-font-weight-700 g-font-size-12 g-mr-5 g-mt-10" @click="moreEvents()">Load More <i class="fa fa-chevron-down"></i></button>
            </div>
        </div>
    </section>
</div>
`

var app = new Vue({
    el: "#events",
    template: layout,
    data() {
        return {
            Categories: [],
            Groups: [],
            Events: [],
            SelectedCategory: '',
            SelectedGroup: '',
            Search: '',
            Page: 1,
        }
    },
    created() {
        var self = this;
        //Get Categories
        axios.get('https://pluto.sums.su/api/events/types?sortBy=name', {
                headers: {
                    'X-Site-Id': 'tZyLG9BX9f4hdTp2HLva5c'
                }
            }).then(function(response) {
                self.Categories = response.data;
            })
            //get Activities
        axios.get('https://pluto.sums.su/api/groups?sortBy=name&selectList=1', {
                headers: {
                    'X-Site-Id': 'tZyLG9BX9f4hdTp2HLva5c'
                }
            }).then(function(response) {
                self.Groups = response.data;
            })
            //get Events
        self.getEvents();

    },
    computed: {
        MonthYears() {
            return [];
        },
    },
    methods: {
        getEvents: function(append = false) {
            let parameters = 'sortBy=start_date&onlyFuture=1&page=' + this.Page;
            if (this.SelectedCategory) {
                parameters += '&typeId=' + this.SelectedCategory;
            }
            if (this.SelectedGroup) {
                parameters += '&groupId=' + this.SelectedGroup;
            }
            if (this.Search) {
                parameters += '&searchTerm=' + this.Search;
            }
            let self = this;
            axios.get('https://pluto.sums.su/api/events?' + parameters, {
                headers: {
                    'X-Site-Id': 'tZyLG9BX9f4hdTp2HLva5c'
                }
            }).then(function(response) {
                if (append) {
                    self.Events = [...self.Events, ...response.data.data];
                } else {
                    self.Events = response.data.data;
                }
            })
        },
        updateCategory(event) {
            this.SelectedCategory = event.target.value
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
            location.reload()
        },
        moreEvents() {
            this.Page++;
            this.getEvents(true);
        }
    }
});

Vue.filter('formatDate', function(value) {
    if (value) {
        return moment(String(value)).format('DD/MM/YYYY hh:mm')
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
