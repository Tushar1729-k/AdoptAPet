import React from 'react'

export const filterOptions = (arr, val) => {
    let temp = [...new Set(arr)]
    temp = temp.map((el) => {
        return { value: `${val}${el}`, label: el, type: val }
    })
    temp.unshift({ value: val, label: "None", type: val })
    return temp
}

const checkfilterQueries = (filter, filterQueries) => {
    for (let i = 0; i < filterQueries.length; i++) {
        if (filter.type === filterQueries[i].type) {
            let newQueries = [...filterQueries];
            newQueries.splice(i, 1)
            filterQueries = [...newQueries, filter]
            return [...newQueries, filter]
        }
    }
    return [...filterQueries, filter]
}

const getQueryString = (queries) => {
    let tempQueryString = ""
    for (let i = 0; i < queries.length; i++) {
        if (queries.length != 1 && i + 1 != queries.length) {
            tempQueryString = tempQueryString.concat(queries[i].type.concat("=", queries[i].label), "&")
        } else {
            tempQueryString = tempQueryString.concat(queries[i].type.concat("=", queries[i].label))
        }
    }
    tempQueryString = tempQueryString.toLowerCase()
    return tempQueryString
}

export const getFilterQueries = (filter, option, filterQueries) => {
    if (filter && filter.label !== "None") {
        let tempFilterQueries = checkfilterQueries(filter, filterQueries)
        let tempQueryString = getQueryString(tempFilterQueries)
        return { query: tempQueryString, filters: tempFilterQueries }
    } else {
        let newQueries = []
        for (let i = 0; i < filterQueries.length; i++) {
            if (option === filterQueries[i].type) {
                newQueries = [...filterQueries];
                newQueries.splice(i, 1)
            }
        }
        if (newQueries.length != 0) {
            let tempQueryString = getQueryString(newQueries)
            return { query: tempQueryString, filters: newQueries }
        } else {
            return { query: "", filters: newQueries }
        }
    }
}
