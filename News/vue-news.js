let layoutNews = `
<div class="row py-5">
        
        <div class="col-12 col-md-4 col-lg-3 order-md-2 mb-5">
            
            <div class="card sticky-top" style="background-color: #ededed;">
                <div class="card-body">
                    <div class="row">
                        <div class="col-12 mb-4">
                            <label for="search"><h2>Search</h2></label>
                            <div class="input-group">
                                <input id="search" class="search form-control" @keyup.enter="submitSearch">
                                <div class="input-group-append">
                                    <button type="submit" aria-label="Submit" class="btn btn-block btn-secondary" @click="submitSearch">
                                        <i class="fas fa-search"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 mb-4">
                            <label for="categories-small"><h2>Categories</h2></label>
                            <select id="categories-small" class="categories-small w-100" multiple="multiple">
                              <option v-for="(category, categoryID) in NewsCategories" :value="categoryID">{{ category.name }}</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        
        <div class="col-lg-9 col-md-8 order-md-1 right-border mx-2 mx-md-0" style="border-right: 2px solid #ededed;">
            <div id="masonryRow" class="row masonryRow" ref="masonryRow">
                <div v-if="News.length == 0" class="container-fluid">
                  <h2 class="mb-4 text-center">No Articles Found</h2>
                </div>    

                <div class="col-lg-4 col-6 mb-4 news-card px-1 px-md-2 px-xl-3" v-for="article in News">
                  <div style="position: relative">
                    <a :href="'/news/article/' + article.url_title" style="text-decoration: none; color: #333;">
                      <div class="card shadow-sm zoom custom-scroll">
                          <div class="dynamic-img">
                            <div v-if="article.thumbnail" class="square-img" :style="{ 'background-image': 'url(' + wrapURL(article.thumbnail) + ')' }">
                            </div>
                            <div v-else class="square-img" style="background-image: url('https://d350x4n02brjm.cloudfront.net/sums/website/images/500x500_Placeholder.jpg');">
                            </div>
                          </div>
                          <div class="card-body pb-2 text-center">
                              <h3 style="font-size: 25px !important;">{{ article.title }}</h3>
                              <p class="m-0">{{ article.snippet }}</p>
                          </div>
                          <div style="display: flex; justify-content: center;">
                              <p class="m-0 px-3 pb-3 pt-2 text-center" style="border-top: 2px solid #ededed;">{{ formatDate(article.date)}}</p>
                          </div>
                      </div>
                    </a>
                    
                    <div v-if="article.categories.length" class="rounded d-flex tag" style="position: absolute; background-color: #40454d; top: 10px; left: 10px; flex-direction: column; max-width: 100%; max-height: 232.33px; overflow-y: auto;">
                        <div class="d-flex">
                            <i class="fa-solid fa-tag p-2" style="color: #fff;"></i>
                            <p class="m-0 pr-2" style="display: flex; align-items: center; color: #fff;">{{ article.categories.length }}</p>
                        </div>
                        <div class="hide pl-2 pr-3 pb-2" style="color: #fff;">
                            <ul style="padding-inline-start: 22px; margin-bottom: 0px; padding-left: 0px; list-style: none;">
                                <li v-for="category in article.categories" class="zoom">
                                  <span @click="appendCategory(category.id)" style="cursor: pointer">
                                    &#x2022; <span style="text-decoration: underline">{{ category.name }}</span>
                                  </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                  </div>
                </div>
                
            </div>
            <div v-if="MoreResults && !loading" class="row d-flex justify-content-center m-3">
                <button class="rounded shadow-sm zoom" type="button" @click="moreGroups()" style="border: none; border: 1px solid #dfdfdf; background-color: #ededed; ">
                    <div class="d-flex p-3">
                        <h3 class="mb-0" style="color: #555;">Load More</h3>
                        <i class="fa-sharp fa-solid fa-chevron-down pl-2" style="display: flex; align-items: center; font-size: 30px; color: #555;"></i>
                    </div>
                </button>
            </div>
            <div v-if="loading" class="row d-flex justify-content-center m-5 spinner">
                <i class="fas fa-spinner fa-spin" style="font-size: 50px;"></i>
            </div>
        </div>
</div>
`;

Vue.component("news", {
  template: layoutNews,
  props: ["siteid"],
  data() {
    return {
      News: [],
      Page: 1,
      MoreResults: false,
      loading: false,
      NewsCategories: {},
      filterCategories: [],
      filterSearch: null,
      formCategoriesElement: null,
      formSearchElement: null,
      awaitMountPromise: null,
      currentURLAccessibilityHelper: null,
    };
  },
  async created() {
    var self = this;

    // set any initial filtering parameters
    let url = new URL(window.location.href);
    let searchParams = new URLSearchParams(url.search);
    let categories = searchParams.get("categories");
    let search = searchParams.get("search");

    if (search) {
      this.filterSearch = search;
    }

    if (categories) {
      this.filterCategories = decodeURIComponent(categories).split(",");
    }

    // create promise to hold mounted() and load data
    this.awaitMountPromise = new Promise(async (resolve) => {
      await self.getNewsCategories();
      await self.getNews(false, self.filterSearch, self.filterCategories);
      resolve();
    });
  },
  async mounted() {
    // wait for the signal that created has finished loading data
    const self = this;
    await self.awaitMountPromise;

    self.formCategoriesElement = $(".categories-small").select2();
    self.formSearchElement = $(".search");

    // set the initial values of the form elements
    self.formSearchElement.val(self.filterSearch);
    self.formCategoriesElement.val(self.filterCategories).trigger("change");

    // set the event handlers for the form elements
    self.formCategoriesElement.on("change", self.submitCategories);

    self.currentURLAccessibilityHelper = window.location.href;

    window.addEventListener("popstate", function (event) {
      // check whether the URL has changed apart from the hash
      if (
        self.currentURLAccessibilityHelper.split("#")[0] !==
        window.location.href.split("#")[0]
      ) {
        // URL has changed, so reload the page
        location.reload();
      }
    });

    this.layout();
  },
  updated() {
    this.layout();
  },
  methods: {
    getNewsCategories: async function () {
      let self = this;
      self.loading = true;

      let categoriesDictionary = {};
      var foundAllCategories = false;
      var categoriesPage = 1;
      while (!foundAllCategories) {
        let categoriesParameters = "perPage=100&page=" + categoriesPage;
        let page = await axios.get(
          "https://pluto.sums.su/api/news/categories?" + categoriesParameters,
          {
            headers: {
              "X-Site-Id": self.siteid,
            },
          }
        );

        page.data.data.forEach((element) => {
          categoriesDictionary[element.id] = {
            id: element.id,
            parent_id: element.parent_id,
            name: element.name,
            url: element.url,
          };
        });

        if (page.data.next_page_url) {
          categoriesPage++;
        } else {
          foundAllCategories = true;
        }
      }
      self.NewsCategories = categoriesDictionary;
      // console.log("Fetching categories took " + categoriesPage + " request");
    },
    getNews: async function (append = false, search = null, categories = null) {
      let self = this;
      self.loading = true;

      if (!append) {
        self.Page = 1;
      }
      let parameters = "sortBy=name&perPage=10&page=" + self.Page;
      if (search) {
        parameters += "&searchTerm=" + search;
      }
      if (categories && categories.length > 0) {
        parameters += "&categoryIds=" + categories.join(",");
      }
      let response = await axios.get(
        "https://pluto.sums.su/api/news?" + parameters,
        {
          headers: {
            "X-Site-Id": self.siteid,
          },
        }
      );

      response.data.data.forEach((article) => {
        article.categories = article.categories.map(
          (category_id) => self.NewsCategories[category_id]
        );
      });

      if (append) {
        self.News = [...self.News, ...response.data.data];
      } else {
        self.News = response.data.data;
      }
      if (response.data.next_page_url) {
        self.MoreResults = true;
      } else {
        self.MoreResults = false;
      }
      self.loading = false;
    },
    submitSearch() {
      this.filterSearch =
        this.formSearchElement.val() == ""
          ? null
          : this.formSearchElement.val();
      this.changeFilteringParameters();
    },
    submitCategories() {
      this.filterCategories = this.formCategoriesElement.val();
      this.changeFilteringParameters();
    },
    changeFilteringParameters() {
      // update URL parameters "categories" and "search" to match the current filtering parameters
      let url = new URL(window.location.href);
      let searchParams = new URLSearchParams(url.search);

      if (this.filterCategories.length > 0) {
        searchParams.set("categories", this.filterCategories.join(","));
      } else {
        searchParams.delete("categories");
      }

      if (this.filterSearch) {
        searchParams.set("search", this.filterSearch);
      } else {
        searchParams.delete("search");
      }

      url.search = searchParams.toString();
      window.history.pushState({}, "", url);
      this.currentURLAccessibilityHelper = url.toString();
      // console.log(url);
      this.getNews(false, this.filterSearch, this.filterCategories);
    },
    appendCategory(categoryID) {
      if (this.filterCategories.includes(categoryID)) {
        return;
      }
      this.filterCategories.push(categoryID);
      this.formCategoriesElement.val(this.filterCategories).trigger("change");
    },
    async moreGroups() {
      const currentNumberOfArticles = this.News.length;
      this.Page++;
      await this.getNews(true, this.filterSearch, this.filterCategories);

      const nextNode = document
        .querySelector(".masonryRow")
        .children[currentNumberOfArticles].querySelector("a");
      nextNode.scrollIntoView({ behavior: "smooth" });
      nextNode.focus();
    },
    layout() {
      var container = document.querySelector(".masonryRow");
      var s = new Masonry(container, {
        // options
        itemSelector: ".news-card",
        percenPosition: true,
      });
    },
    wrapURL(URL) {
      return "'" + URL + "'";
    },
  },
});

function formatDate(date) {
  formattedDate = moment(date).format("DD MMMM YYYY");
  return formattedDate;
}

// $(window).load(function(){
//     var container = document.querySelector('.masonryRow')
//     var msnry = new Masonry( container, {
//     // options
//     itemSelector: '.news-card',
//     percenPosition: true,
// });
// });
