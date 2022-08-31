let layout = `
<section class="g-pt-50 g-pb-50 g-bg-welcomeRed" style="background-image: url('https://3206af7111780558b7b3-c0c78907890fbb9cb201844d036b4a41.ssl.cf3.rackcdn.com/coloured-stripe-bg.png'); background-size: cover; background-repeat: no-repeat; background-color: #e6274c;">
    <div class="">
        <div class="row banner-feature-large">
            <div class="col-md-12 text-center g-bg-white">
                <a :href="'/activities/view/' + GroupUrl">
                    <p class="h3 g-color-black g-pt-20 g-pb-20 g-px-10 g-px-0--lg">Surprise me with a random activity! <span class="g-pl-20"><i class="fas fa-chevron-right" aria-hidden="true"></i></span></p>
                </a>
            </div>
        </div>
    </div>
</section>
`

Vue.component('VRandomActivity', {
    template: layout,
    props: ['siteid', 'selectedparents', 'selectedcategory'],
    data() {
        return {
            Categories: [],
            CategoryIDs: "",
            ParentCategories: [],
            Groups: [],
            SelectedCategory: "",
            SelectedParent: "",
            SelectedParents: [],
            GroupUrl: "",
        }
    },
    created() {
        var self = this;
        if (self.selectedparents) {
            self.SelectedParents = self.selectedparents.split(",");
        } else if (self.selectedcategory) {
            self.CategoryIDs = self.selectedcategory;
        } else {
            self.SelectedParents = "2,24";
        }
        if (!self.selectedcategory) {
            //Get parents
            axios.get('https://pluto.sums.su/api/groups/categories?sortBy=name&isParent=1', {
                headers: {
                    'X-Site-Id': self.siteid
                }
            }).then(function (response) {
                response.data.forEach(category => {
                    if (self.SelectedParents.includes(category.id.toString())) {
                        self.ParentCategories = [...self.ParentCategories, category];
                    }
                });
            });
            //get categories
            axios.get('https://pluto.sums.su/api/groups/categories?sortBy=name&isParent=0&parentIds=' + self.SelectedParents, {
                headers: {
                    'X-Site-Id': self.siteid
                }
            }).then(function (response) {
                self.Categories = response.data;
                let idArray = self.Categories.map(function (item) {
                    return item['id'];
                });
                self.CategoryIDs = idArray.join();
                self.getGroup();
            });
        } else {
            self.getGroup();
        }

    },
    methods: {
        /**
         * Fetch groups from API
         * 
         */
        getGroup: function () {
            let self = this;
            let parameters = 'sortBy=random&perPage=1';
            if (self.CategoryIDs) {
                parameters += '&categoryIds=' + self.CategoryIDs;
            }
            if (self.Search) {
                parameters += '&searchTerm=' + self.Search;
                self.SelectedCategory = self.SelectedParent = "";
            } else if (self.SelectedCategory) {
                parameters += '&categoryId=' + self.SelectedCategory.id;
            } else if (self.SelectedParent) {
                parameters += '&parentCategoryId=' + self.SelectedParent.id;
            }
            axios.get('https://pluto.sums.su/api/groups?' + parameters, {
                headers: {
                    'X-Site-Id': self.siteid
                }
            }).then(function (response) {
                //otherwise replace current events
                console.log(response.data.data[0].url_name);
                self.Groups = response.data.data;
                self.GroupUrl = self.Groups[0].url_name;
            })
        }
    },
    computed: {
        filteredCategories() {
            let self = this;
            return this.Categories.filter(category => {
                if (self.SelectedParent) {
                    return category.parent_id == self.SelectedParent.id
                }

            });
        }
    }
});