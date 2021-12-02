import React from 'react'
import { Pagination } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { useState } from 'react'

const Paginate = ({ totalItems, itemsPerPage, paginate }) => {

    const [currentPage, setCurrentPage] = useState(1)
    // Paginate prop is used so that the appropriate page will be fetched in the model pages.
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
            {/* Using the pagination component from react bootstrap. */}
            <Pagination>
                <Pagination.Prev onClick={() => changePage(currentPage - 1)} />
                {Array.from({ length: pageNumbers.length <= 20 ? pageNumbers.length : 20 }).map((_, idx) => (
                    <Pagination.Item key={pageNumbers[idx]} active={pageNumbers[idx] === currentPage} onClick={() => changePage(pageNumbers[idx])}>
                        {pageNumbers[idx]}
                    </Pagination.Item>
                ))}
                <Pagination.Ellipsis />
                <Pagination.Next onClick={() => changePage(currentPage + 1)} />
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
