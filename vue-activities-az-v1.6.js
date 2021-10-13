Vue.component('VActivitiesAZ', {
    template: `
    <div class="row societies-a-z-block" id="societies-a-z">
    <div class="col-12">
        <div class="row activities-list">
            <div class="col">
                <div class="heading heading--primary heading--center pb-2">
                    <h2 class="heading__title"> <span>Clubs and Societies: <span class="d-inline-block">A-Z</span></span>
                    </h2>
                </div>
            </div>
            <div class="col-lg-4 d-none d-lg-inline-flex">
                <input class="nav-item w-100 float-right" type="text" aria-label="search for society/club" name="search" placeholder="Search..." v-model="Search" style="height: 40px;" />
            </div>
            <div class="col-sm-12 d-lg-none">
                <section class="section contacts no-padding-bottom no-padding-top">
                    <div class="contacts-wrapper">
                        <div class="container">
                            <div class="row">
                                <div class="col-xl-12">
                                    <form>
                                        <p class="form__title h6">Filter</p>
                                        <div class="row">
                                            <div class="col-12">
                                                <label>Category</label>
                                                <select class="form__field d-block d-sm-inline-block" v-model="SelectedCategory">
                                                    <option value="" selected>Please Select a Category</option>
                                                    <option v-for="Category in ActivityCategories">{{ Category }}
                                                    </option>
                                                </select>
                                            </div>

                                            <div class="col-12 g-pt-10">
                                                <label>Search</label>
                                                <input aria-label="search for society/club" type="text" class="form__field d-block d-sm-inline-block" placeholder="Search..." v-model="Search">
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <div class="col-lg-12 d-none d-lg-block">
                <div class="nav-societies-type text-center">
                    <ul class="clubs-nav-block nav nav-tabs nav-justified u-nav-v2-1 u-nav-rounded-3 u-nav-primary g-mb-30" data-btn-classes="btn btn-md btn-block u-btn-outline-primary g-mb-30">
                        <li v-for="Parent in ActivityParents" @click.prevent="SelectedParent = Parent" @click.prevent="SelectedCategory = ''" class="nav-item"><a v-bind:class="{'active':(SelectedParent === Parent)}" class="nav-link" :href="'/student-life/clubs-and-socs?category='+Parent"><span>{{ Parent }}</span></a></li>
                    </ul>
                    <ul class="nav nav-pills nav-fill g-mb-30">
                        <li class="nav-item" @click.prevent="SelectedCategory = ''"><a v-bind:class="{'active':(SelectedCategory === '')}" href="#" class="nav-link"><span>All</span></a></li>
                        <li v-for="Category in FilteredSubCategories" @click.prevent="SelectedCategory = Category" class="nav-item" v-if=""><a v-bind:class="{'active':(SelectedCategory === Category)}" class="nav-link" :href="'/student-life/clubs-and-socs?category='+Category"><span>{{ Category }}</span></a></li>
                    </ul>
                </div>
            </div>

            <div class="row socs-list g-mb-10 w-100 justify-content-center">
                <!-- Activity -->
                <div class="col-md-2 mx-2 my-2 activity-article d-block" v-for="Activity in FilteredActivities">
                    <div>
                        <a :href="'/activities/view/' + Activity.URL">
                            <div>



                                <div v-if="Activity.Thumb" class="d-none d-md-block justify-content-center" style="height: 9em;overflow:hidden; background-position: center; background-repeat: no-repeat; background-size: contain; cursor:pointer;" v-bind:style="'background-image:url(' + Activity.Thumb + ');'"
                                    alt="">
                                </div>
                                <div v-else class="d-none d-md-block justify-content-center" style="height: 9em;overflow:hidden ;background-image:url('https://yusu.s3.eu-west-2.amazonaws.com/sums/website/images/placeholder-events.png');
                                    background-position: center; background-repeat: no-repeat; background-size: contain; cursor:pointer;" alt=""></div>
                                <div v-if="Activity.Thumb" class="d-md-none justify-content-center" style="height: 9em;overflow:hidden; background-position: center; background-repeat: no-repeat; background-size: contain; cursor:pointer;" v-bind:style="'background-image:url(' + Activity.Thumb + ');'"
                                    alt=""></div>
                                <div v-else class="d-md-none justify-content-center" style="height: 5em;overflow:hidden ;background-image:url('https://yusu.s3.eu-west-2.amazonaws.com/sums/website/images/placeholder-events.png');
                                background-position: center; background-repeat: no-repeat; background-size: contain; cursor:pointer;" alt=""> </div>
                                <!--                            <div v-if="Activity.Thumb"><img class="img-fluid" :src=Activity.Thumb alt=""-->
                                <!--                                                            style="height: 150px; width: 150px"/></div>-->
                                <!--                            <div v-else><img class="img-fluid"-->
                                <!--                                             src="https://yusu.s3.eu-west-2.amazonaws.com/sums/website/images/placeholder-events.png"-->
                                <!--                                             alt=""/></div>-->
                            </div>
                            <div class="h6 g-color-grey g-mb-5 text-center align-bottom btn-block">
                                <p class="g-color-black">{{ Activity.Name }}</p>
                                <!-- <p>{{ Activity.Category }}</p> -->
                            </div>
                        </a>
                    </div>
                </div>
                <!-- Activity end-->

                <div class="col-md-12 text-center">
                    <!--                    <a v-if="TotalItems > PageLength" @click.prevent="showMore()" id="show-more" class="btn-more">Show More <i class="fa fa-chevron-down"></i></a>-->
                    <!--                    <a v-if="DefaultPageLength < PageLength" @click.prevent="showLess()" id="show-more" class="btn-more">Show Less <i class="fa fa-chevron-up"></i></a>-->
                    <a v-if="TotalItems > PageLength" @click.prevent="showAll()" id="show-more" class="btn-more">Show All <i class="fa fa-chevron-down"></i></a>
                    <a v-if="TotalItems == PageLength" @click.prevent="showTop()" id="show-more" class="btn-more">Show Less <i class="fa fa-chevron-up"></i></a>
                </div>
            </div>
        </div>
    </div>

</div>
    `,
    data() {
        return {
            Activities: [],
            SelectedParent: 'Societies',
            SelectedCategory: '',
            Search: '',
            Page: 1,
            DefaultPageLength: 10,
            PageLength: 10,
            TotalItems: 0
        }
    },
    beforeMount() {
        this.ParseURL();
    },
    mounted() {
        let self = this;
        axios.get('https://yusu.org/api/all-activities')
            .then(function(response) {
                self.Activities = JSON.parse('[' + response.data.substring(0, response.data.lastIndexOf(',')) + ']');
            })
            .catch(function(error) {
                console.log(error);
            });
        this.ParseURL();
    },
    methods: {
        ParseURL() {
            let url = new URL(window.location.href);
            if (url.searchParams.get("parent")) {
                this.SelectedParent = url.searchParams.get("parent");
            }
            if (url.searchParams.get("category")) {
                this.SelectedCategory = url.searchParams.get("category");
            }
            if (url.searchParams.get("search")) {
                this.Search = url.searchParams.get("search");
            }
        },
        ChangePage(p) {
            this.Page = p;
            this.$refs.pageTop.scrollIntoView({ behavior: 'smooth' });
        },
        showMore() {
            if (this.PageLength < this.TotalItems) {
                this.PageLength = this.PageLength + this.DefaultPageLength;
            } else {
                this.PageLength = this.TotalItems;
            }
        },
        showAll() {
            this.PageLength = this.TotalItems;
        },
        showTop() {
            this.PageLength = this.DefaultPageLength;
        },
        showLess() {
            if (this.PageLength > this.DefaultPageLength) {
                this.PageLength = this.PageLength - this.DefaultPageLength;
            } else {
                this.PageLength = this.DefaultPageLength;
            }
        },
    },
    computed: {
        ActivityCategories() {
            return this.Activities.length > 0 ? [...new Set(this.Activities.map(a => a.Category))] : [];
        },
        ActivityParents() {
            return this.Activities.length > 0 ? [...new Set(this.Activities.map(a => a.Parent))] : [];
        },
        FilteredActivities() {
            let self = this;
            let Activities = self.Activities;
            let url = new URL(window.location.href);
            let search_params = url.searchParams;

            // Filter Category:
            if (self.SelectedCategory === "Sports" || self.SelectedCategory === "College Sport") {
                self.SelectedParent = "Sports";
                search_params.set('parent', "Sports");
                search_params.set('category', self.SelectedCategory);

                Activities = Activities.filter(a => a.Parent === "Sports");
                Activities = Activities.filter(a => a.Category === self.SelectedCategory);

                console.log(self.Category);
                console.log(self.Parent);

            } else if (self.SelectedCategory) {
                console.log(self.SelectedCategory);
                self.SelectedParent = "Societies";

                Activities = Activities.filter(a => a.Parent === "Societies");
                search_params.delete('parent');
                Activities = Activities.filter(a => a.Category === self.SelectedCategory);
                search_params.set('category', self.SelectedCategory);
            } else {
                search_params.delete('category');
            }

            // Filter Category:
            if (self.SelectedParent === 'Sports') {
                Activities = Activities.filter(a => a.Parent === self.SelectedParent);
                search_params.set('parent', self.SelectedParent);
            } else {
                Activities = Activities.filter(a => a.Parent === "Societies");
                search_params.delete('parent');
            }

            // Filter Search Term:
            if (self.Search) {
                Activities = Activities.filter(a => (a.Name + a.Category).toLowerCase().includes(self.Search.toLowerCase()));
                search_params.set('search', self.Search.toLowerCase());
            } else {
                search_params.delete('search');
            }

            // Update URL:
            url.search = search_params.toString();
            window.history.pushState({ path: url.toString() }, '', url.toString());

            self.TotalItems = Activities.length;
            let current = (self.Page - 1) * self.PageLength;
            return Activities.slice(current, current + self.PageLength);
        },
        FilteredSubCategories() {
            let self = this;
            return self.SelectedParent ? [...new Set(self.Activities.filter(a => a.Parent === self.SelectedParent).map(a => a.Category))] : this.ActivityCategories;
        },
        Pages() {
            return Math.ceil(this.TotalItems / this.PageLength);
        }
    }

});
