let parameters = 'sortBy=random&perPage=1&categoryIds=4,5,6,12,7,8,27,9,10,11,1,3'
axios.get('https://pluto.sums.su/api/groups?' + parameters, {
    headers: {
        'X-Site-Id': "tZyLG9BX9f4hdTp2HLva5c"
    }
}).then(function (response) {
    window.location.replace('https://yusu.org/activities/view/' + response.data.data[0].url_name)
})