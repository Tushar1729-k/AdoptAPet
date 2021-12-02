import React from 'react'
import randomColor from "randomcolor"

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

export const parseVisData = (data, d3) => {
    const list = [];
    let tempMap = new Map()
    for (var key in data) {
      tempMap.set(data[key], typeof tempMap.get(data[key]) !== 'undefined' ? tempMap.get(data[key])+1 : 1)
    }

    tempMap.forEach((value, key) => {
      const obj = {};
      console.log(key)
      if (key !== undefined) {
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
    return list
  }
