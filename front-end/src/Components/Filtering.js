import React from 'react'
import randomColor from "randomcolor"

// Function to process the filter options data.
export const filterOptions = (arr, val) => {
    // Removing any duplicate option values.
    let temp = [...new Set(arr)]
    // Adding each option to filter array.
    // value is the unique identifer, label is the odisplayed option, and type if the filter type.
    temp = temp.map((el) => {
        return { value: `${val}${el}`, label: el, type: val }
    })
    // Adding a None option so the user can deselect an option.
    temp.unshift({ value: val, label: "None", type: val })
    return temp
}
// Function to process newly selected filter.
const checkfilterQueries = (filter, filterQueries) => {
    for (let i = 0; i < filterQueries.length; i++) {
        /* If a filter type is already in queries, but the option has changed,
           then that option is removed, and the new one is added. */
        if (filter.type === filterQueries[i].type) {
            let newQueries = [...filterQueries];
            newQueries.splice(i, 1)
            return [...newQueries, filter]
        }
    }
    return [...filterQueries, filter]
}
// Function to create a query string depending on which filter options are selected.
const getQueryString = (queries) => {
    let tempQueryString = ""
    for (let i = 0; i < queries.length; i++) {
        if (queries.length != 1 && i + 1 != queries.length) {
            // If the filter is not the first or last one, then an & is also appended.
            tempQueryString = tempQueryString.concat(queries[i].type.concat("=", queries[i].label), "&")
        } else {
            tempQueryString = tempQueryString.concat(queries[i].type.concat("=", queries[i].label))
        }
    }
    // Keeping string lowercase to match with API.
    tempQueryString = tempQueryString.toLowerCase()
    return tempQueryString
}
// This function is used in all of the model pages to process the selected filter options.
export const getFilterQueries = (filter, option, filterQueries) => {
    // If an option has been chosen, then it is added to the filter queries array, and the query string is processed.
    if (filter && filter.label !== "None") {
        let tempFilterQueries = checkfilterQueries(filter, filterQueries)
        let tempQueryString = getQueryString(tempFilterQueries)
        return { query: tempQueryString, filters: tempFilterQueries }
    } else {
        // If a filter option has been deselected, then the filter type is removed from filterQueries.
        let newQueries = []
        for (let i = 0; i < filterQueries.length; i++) {
            if (option === filterQueries[i].type) {
                newQueries = [...filterQueries];
                newQueries.splice(i, 1)
            }
        }
        //If there are selected filters remaining, a new query string is processed and returned along with the current filters.
        // Otherwise an empty string is returned along with the current filters.
        if (newQueries.length != 0) {
            let tempQueryString = getQueryString(newQueries)
            return { query: tempQueryString, filters: newQueries }
        } else {
            return { query: "", filters: newQueries }
        }
    }
}
// Function to parse data for visualisations.
export const parseVisData = (data, d3) => {
    const list = [];
    let tempMap = new Map()
    /* Creating a map that contains each unique attribute,
       and increments the count associated with how many instances are present. */
    for (var key in data) {
        tempMap.set(data[key], typeof tempMap.get(data[key]) !== 'undefined' ? tempMap.get(data[key]) + 1 : 1)
    }
    /* Processing the data into a suitable format for the
       imported visualisation components in OurViz.js and TheirViz.js */
    tempMap.forEach((value, key) => {
        const obj = {}
        if (key !== undefined) {
            // Used to identify if data is for a d3 visualisation component or a recharts one.
            if (d3) {
                obj["label"] = key
            } else {
                obj["name"] = key
            }
            obj["value"] = value
            obj["fill"] = randomColor()
            list.push(obj)
        }
    })
    // Sorting the array of object by the count values in descending order.
    // Desceding order specifically useful for funnel chart.
    list.sort((a, b) => b.value - a.value)
    return list
}
