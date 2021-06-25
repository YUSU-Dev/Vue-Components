Vue.component('v-events-index', {
    template: `
    <div class="g-bg-gray-light-v5 ">
<section class="pt-3" ref="NewsTop">
    <div class="contacts-wrapper">
        <div class="container">
            <div class="row">
                <div class="col-xl-12">
                    <form class="form message-form">
                        <h6 class="form__title">Filter Events</h6>
                        <div class="row">
                            <div class="col-lg-3">
                                <label class="g-font-weight-500 g-font-size-15 g-pl-30">Category</label>
                                <select class="js-custom-select w-100 u-select-v2 u-shadow-v19 g-brd-none g-color-black g-color-primary--hover g-bg-white text-left g-rounded-30 g-pl-30 g-py-12" data-placeholder="All" data-open-icon="fa fa-angle-down" data-close-icon="fa fa-angle-up" v-model="SelectedCategory">
                                <option value="">All</option>
                                <option v-for="Category in Categories" v-if="Category">{{ Category }}</option>
                                </select>
                            </div>
                            <div class="col-lg-3">
                            <label class="g-font-weight-500 g-font-size-15 g-pl-30">Month/Year</label>
                                <select class="js-custom-select w-100 u-select-v2 u-shadow-v19 g-brd-none g-color-black g-color-primary--hover g-bg-white text-left g-rounded-30 g-pl-30 g-py-12" data-placeholder="All" data-open-icon="fa fa-angle-down" data-close-icon="fa fa-angle-up" v-model="SelectedMonthYear">
                                <option value="">All</option>
                                <option v-for="MonthYear in MonthYears" v-if="MonthYear">{{ MonthYear }}</option>
                                </select>
                            </div>
                            <div class="col-lg-3">
                                <label class="g-font-weight-500 g-font-size-15 g-pl-30">Search</label>
                                <input class="form-control u-shadow-v19 g-brd-none g-bg-white g-font-size-16 g-rounded-30 g-px-30 g-py-13 g-mb-30" type="text" name="search" placeholder="Search..." v-model="Search">
                            </div>
                           
                            <div class="col-lg-3">
                            <label class="g-font-weight-500 g-font-size-15 g-pl-30"></label>
                            <button class="btn btn-block u-shadow-v32 g-brd-black g-brd-2 g-color-black g-color-white--hover g-bg-transparent g-bg-black--hover g-font-size-16 g-rounded-30 g-py-10 mr-2 g-mt-0" type="button" @click.prevent="ResetForm">Reset</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>


<section class="section blog background--brown">
    <div class="container">
        <div class="row">
            <div class="col g-mb-30">

            <template v-for="(Event) in FilteredEventItems">
            <div class="row">
                
                <article class="card my-2">
                    <div class="row">

                        <!-- Date -->
                        <div
                                class="col-md-1 pr-0 ml-3 py-sm-3 align-items-center d-flex justify-content-center text-center">
                            <time :datetime="Event.StartDate">
                            <span   class="d-block g-font-weight-700 g-font-size-40 g-line-height-1 g-color-black">{{ Event.Day }}</span>
                            {{ Event.MonthComYear }}
                            </time>
                        </div>
                        <!-- End Date -->

                        <!-- Article Image -->
                        <a :href=Event.URL
                           class="col-md-2 align-items-center d-flex justify-content-center text-center">
                            <img v-if=Event.Thumb class="d-block px-2 g-ml-minus-1 hoverZoomLink img-fluid" :src=Event.Thumb alt="" />
                            <img v-if=!Event.Thumb class="d-block px-2 g-ml-minus-1 hoverZoomLink img-fluid" src="https://d350x4n02brjm.cloudfront.net/sums/website/images/500x500_Placeholder.jpg" alt="" />
                        </a>
                        <!-- End Article Image -->

                        <!-- Article Content -->
                        <div class="g-py-15 g-px-20 col-md-5 text-center text-md-left">

                            <h4 class="h6 text-uppercase g-font-weight-700 g-mb-0">
                                <a class="g-color-gray-dark-v2" :href=Event.URL v-html="Event.Title"></a>
                            </h4>

                            <small><i>Start times from {{ Event.Date }} <i v-if=Event.Venue> | {{ Event.Venue }}</i></i></small>

                            <div class="g-mt-0">
                                {{ Event.Description }}
                            </div>

                        </div>
                        <!-- End Article Content -->

                        <!-- Actions -->
                        <div class="g-pa-20 col-md-3 ml-md-4 align-items-center d-flex justify-content-center text-center">
                            <div class="row g-mt-minus-10 px-2 py-2">
                                <a class="btn btn-xl u-btn-secondary rounded-0 text-uppercase g-font-weight-700 g-font-size-12 g-mr-5 g-mt-10"
                                   :href=Event.URL>Info</a>
                                <a class="btn btn-xl u-btn-primary rounded-0 text-uppercase g-font-weight-700 g-font-size-12 g-mr-5 g-mt-10"
                                   :href=Event.URL>
                                Get Tickets</a>
                            </div>
                        </div>
                    </div>
                    <!-- End Actions -->
                </article>
                
                </div>
            </template>
        </div>
    </div>


<!--        <div class="row" v-if="TotalItems > 0">

                    <article class="u-shadow-v1-3">
                        <a :href=Event.URL>
                            <figure class="g-pos-rel">
                                <img v-if=Event.Thumb class="img-fluid w-100" :src=Event.Thumb alt="" />
                                <img v-if=!Event.Thumb class="img-fluid w-100" src="https://d350x4n02brjm.cloudfront.net/sums/website/images/500x500_Placeholder.jpg" alt="" />
                                <figcaption class="g-pos-abs g-top-20 g-left-20">
                                    <a class="btn u-btn-bluegray g-mr-10 g-mb-15 text-light">{{ Event.StartDate }}</a>
                                </figcaption>
                            </figure>
                            <div class="g-pa-20 text-dark">
                                <h3 class="h4 g-font-weight-300 g-mb-15">
                                    <a class="u-link-v5 g-color-main g-color-primary--hover" :href=Event.URL v-html="Event.Title"></a>

                                </h3>
                                <small><i>Start times from {{ Event.Date }}</i><i v-if=Event.Venue> | {{ Event.Venue }}</i></small>
                                <div class="g-mb-30">
                                    <p>{{ Event.Description }}</p>
                                </div>
                            </div>
                        </a>
                    </article>
                    
                    -->
<!--            <div class="col-12">-->
<!--                &lt;!&ndash; pagination start&ndash;&gt;-->
<!--                <nav class="text-center" aria-label="Page Navigation">-->
<!--                    <ul class="list-inline">-->
<!--                        <li v-if="Page - 1 >= 1"-->
<!--                            @click.prevent="ChangePage(Page - 1)" class="list-inline-item u-pagination-v1__item u-pagination-v1-1 u-pagination-v1__item&#45;&#45;disabled g-pa-12-21"><span aria-hidden="true">-->
<!--                            <i class="fa fa-angle-left g-mr-5"></i>Back</span>-->
<!--                            <span class="sr-only">Back</span>-->
<!--                        </li>-->
<!--                        <li class="list-inline-item g-hidden-sm-down u-pagination-v1__item u-pagination-v1-1 g-pa-12-19"" v-if="Page > 2" @click.prevent="ChangePage(1)"><span>1</span></li>-->
<!--                        <li class="list-inline-item g-hidden-sm-down g-pa-12-19" v-if="Page > 2">...</li>-->

<!--                        <li class="list-inline-item g-hidden-sm-down u-pagination-v1__item u-pagination-v1__item u-pagination-v1-1 g-pa-12-19"" v-if="Page > 1 && Page != 1" @click.prevent="ChangePage(Page - 1)"><span>{{ Page - 1}}</span></li>-->
<!--                        <li class="list-inline-item g-hidden-sm-down u-pagination-v1__item u-pagination-v1-1 u-pagination-v1-1&#45;&#45;active g-pa-12-19"><span>{{ Page }}</span></li>-->
<!--                        <li class="list-inline-item g-hidden-sm-down u-pagination-v1__item u-pagination-v1__item u-pagination-v1-1 g-pa-12-19"" v-if="Page < Pages && (Page + 1 != Pages)" @click.prevent="ChangePage(Page + 1)"><span>{{ Page + 1 }}</span></li>-->

<!--                        <li class="list-inline-item g-hidden-sm-down g-pa-12-19" v-if="Page < Pages -2">...</li>-->
<!--                        <li class="list-inline-item g-hidden-sm-down u-pagination-v1__item u-pagination-v1-1 g-pa-12-19" @click.prevent="ChangePage(Pages)" v-if="Page != Pages"><span>{{ Pages }}</span></li>-->
<!--                        <li v-if="Page + 1 <= Pages"-->
<!--                            @click.prevent="ChangePage(Page + 1)" class="list-inline-item float-sm-right u-pagination-v1__item u-pagination-v1-1 g-pa-12-21">-->
<!--                            <span>Next</span><i class="fa fa-angle-right" aria-hidden="true"></i>-->
<!--                            <span class="sr-only">Next</span>-->
<!--&lt;!&ndash;                        </li>&ndash;&gt;-->
<!--&lt;!&ndash;                        <li class="list-inline-item float-right">&ndash;&gt;-->
<!--&lt;!&ndash;                            <span class="u-pagination-v1__item-info g-pa-7-14">Page {{ Page }} / {{ Pages }}</span>&ndash;&gt;-->
<!--&lt;!&ndash;                        </li>&ndash;&gt;-->
<!--                    </ul>-->

<!--                </nav>-->
<!--                &lt;!&ndash; pagination end&ndash;&gt;-->
<!--            </div>-->
<!--        </div>-->
    </div>
</section>
    </div>
   `,
    data() {
        return {
            EventItems: '',
            SelectedCategory: '',
            SelectedMonthYear: '',
            Search: '',
            Page: 1,
            PageLength: 9,
            TotalItems: 0
        }
    },
    mounted() {
        let self = this;
        axios.get('https://yusu.org/events-test/events-data')
            .then(function (response) {
                self.EventItems = JSON.parse('[' + response.data.substring(0, response.data.lastIndexOf(',')) + ']');
            })
            .catch(function (error) {
                console.log(error);
            });
        this.ParseURL();
    },
    methods: {
        ParseURL() {
            let U = new URL(window.location.href);
            if (U.searchParams.get("Category")) {
                this.SelectedCategory = U.searchParams.get("Category");
            }
            if (U.searchParams.get("Archive")) {
                this.SelectedMonthYear = U.searchParams.get("Archive");
            }
        },
        ResetForm() {
            this.SelectedCategory = '';
            this.SelectedMonthYear = '';
            this.Search = '';

            let url = new URL(window.location.href);
            url.search = '';
            window.history.pushState({path: url.toString()}, '', url.toString());
        },
        ChangePage(p) {
            this.Page = p;
            this.$refs.NewsTop.scrollIntoView({behavior: 'smooth'});

        }
    },
    computed: {
        Categories() {
            return this.EventItems.length > 0 ? [...new Set(this.EventItems.map(N => N.Category))] : [];
        },
        MonthYears() {
            return this.EventItems.length > 0 ? [...new Set(this.EventItems.map(N => N.MonthYear))] : [];
        },
        FilteredEventItems() {
            let self = this;
            let EventItems = self.EventItems;
            let url = new URL(window.location.href);
            let search_params = url.searchParams;

            // Filter Category:
            if (self.SelectedCategory) {
                self.Page = 1;
                EventItems = EventItems.filter(n => n.Category === self.SelectedCategory);
                search_params.set('Category', self.SelectedCategory);
            }

            // Filter MonthYear:
            if (self.SelectedMonthYear) {
                self.Page = 1;
                EventItems = EventItems.filter(n => n.MonthYear === self.SelectedMonthYear);
                search_params.set('Archive', self.SelectedMonthYear);
            }

            // Update URL:
            url.search = search_params.toString();
            window.history.pushState({path: url.toString()}, '', url.toString());

            // Filter Search:
            if (self.Search) {
                self.Page = 1;
                EventItems = EventItems.filter(n => (n.Title + n.Category + n.Date).toLowerCase().includes(self.Search.toLowerCase()));
            }
            self.TotalItems = EventItems.length;
            let current = (self.Page - 1) * self.PageLength;
            return EventItems.slice(current, current + self.PageLength);
        },
        Pages() {
            return Math.ceil(this.TotalItems / this.PageLength);
        }
    }
});