import React from 'react'
import { Pagination } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { useState } from 'react'

const Paginate = ({totalItems, itemsPerPage, paginate}) => {

    const [currentPage, setCurrentPage] = useState(1)

    const changePage = (num) => {
        if (num <= pageNumbers.length) {
            setCurrentPage(num)
            paginate(num)
        }
    }

    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i)
    }
    return (
        <div>
            <Pagination>
                <Pagination.First />
                <Pagination.Prev onClick={() => changePage(currentPage - 1)}/>
                {pageNumbers.map(num => (
                    <Pagination.Item key={num} active={num === currentPage} onClick={() => changePage(num)}>
                        {num}
                    </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => changePage(currentPage + 1)}/>
                <Pagination.Last />
            </Pagination>
        </div>
    )
}

// Set defaults of props here.
Paginate.defaultProps = {
    totalItems: 1,
    itemsPerPage: 1
}
// Set type of the prop here.
Paginate.propTypes = {
    totalItems: PropTypes.number,
    itemsPerPage: PropTypes.number,
    paginate: PropTypes.func
}

export default Paginate
