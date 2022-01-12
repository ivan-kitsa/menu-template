'use strict'

const DATA_MOCK = {
    "menuTypes": [
        {
            "name": "Breakfast menu",
            "startTime": "06:00:00",
            "endTime": "12:00:00",
            "isAllDay": false,
            "preselect": false,
            "menuItems": {
                "Most Popular": [
                    {
                        "itemName": "Boo's Italian Hoagie",
                        "price": 12.45,
                        "image": "https://videodelivery.net/38ccbf62c307c1414d5527ce66e75c64/thumbnails/thumbnail.gif?time=5s&height=250&duration=1s",
                        "description": null,
                        "categoryName": "Most Popular",
                        "isVisual": true
                    }
                ]
            }
        },
        {
            "name": "Wine menu",
            "startTime": null,
            "endTime": null,
            "isAllDay": true,
            "preselect": true,
            "menuItems": {
                "Chicken Cheesesteaks": [
                    {
                        "itemName": "Boo's Chicken Pepper Cheesesteak",
                        "price": 10,
                        "image": "https://videodelivery.net/38ccbf62c307c1414d5527ce66e75c64/thumbnails/thumbnail.gif?time=5s&height=250&duration=1s",
                        "description": null,
                        "categoryName": "Chicken Cheesesteaks",
                        "isVisual": true
                    },
                    {
                        "itemName": "Boo's Chicken Mushroom Cheesesteak",
                        "price": 10,
                        "image": "https://videodelivery.net/38ccbf62c307c1414d5527ce66e75c64/thumbnails/thumbnail.gif?time=5s&height=250&duration=1s",
                        "description": null,
                        "categoryName": "Chicken Cheesesteaks",
                        "isVisual": true
                    }
                ],
                "Most Popular": [
                    {
                        "itemName": "Boo's Cheesesteak",
                        "price": 12.45,
                        "image": "https://videodelivery.net/38ccbf62c307c1414d5527ce66e75c64/thumbnails/thumbnail.gif?time=5s&height=250&duration=1s",
                        "description": null,
                        "categoryName": "Most Popular",
                        "isVisual": true
                    }
                ]
            }
        }
    ]
}

function prefetchMedia() {
    DATA_MOCK.menuTypes.forEach(types => {
        Object.values(types.menuItems).forEach((items, i) => {
            items.forEach(i => {
                const link = document.createElement('link')
                link.rel = 'prefetch'
                link.href = i.image
                document.head.append(link)
            })
        })
    })
}

prefetchMedia()

